import type { IncomingMessage, ServerResponse } from "http";
import { prisma, isDatabaseConfigured } from "../lib/prisma.js";
import { sendWelcomeEmail, sendAdminWaitlistNotification } from "../lib/mail.js";
import { withTimeout } from "../lib/async.js";

export interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: unknown;
}

export interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (body: unknown) => VercelResponse;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function parseJsonBody(req: VercelRequest): Promise<Record<string, unknown>> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === "string" ? JSON.parse(req.body) : (req.body as Record<string, unknown>);
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk: Buffer | string) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw.trim() ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

function sendJson(res: VercelResponse, code: number, data: unknown): void {
  const statusFn = res.status;
  const jsonFn = res.json;
  if (typeof statusFn === "function" && typeof jsonFn === "function") {
    statusFn.call(res, code);
    jsonFn.call(res, data);
    return;
  }
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

async function persistWaitlistToDatabase(email: string, source: string, timeoutMs: number) {
  const query = prisma.communityMember.upsert({
    where: { email },
    update: {
      dreamCulture: source,
    },
    create: {
      email,
      name: email.split("@")[0] || "Fellow",
      country: "Global",
      dreamCulture: source,
    },
  });

  return await withTimeout(query, timeoutMs, "Database waitlist upsert");
}

/**
 * Standard Waitlist endpoint implementing the Fail-Safe Dual-Dispatch architecture.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    if (req.method && req.method !== "POST") {
      sendJson(res, 405, { error: "Method Not Allowed" });
      return;
    }

    const body = await parseJsonBody(req);
    const email = typeof body.email === "string" ? body.email : undefined;
    const source = typeof body.source === "string" ? body.source : "connect_cultures_waitlist";
    const name = typeof body.name === "string" ? body.name : undefined;

    if (!email || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
      sendJson(res, 400, { error: "Invalid email address" });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const displayName = name?.trim() || normalizedEmail.split("@")[0] || "Cultural Fellow";
    const timestamp = new Date().toISOString();
    const dbTimeoutMs = process.env.DB_TIMEOUT_MS ? parseInt(process.env.DB_TIMEOUT_MS, 10) : 2500;

    let dbStatus: "persisted" | "failed" | "timeout" | "skipped" = "skipped";
    let dbError: string | undefined;

    // 1. Database persistence with strict deadline
    if (isDatabaseConfigured) {
      try {
        await persistWaitlistToDatabase(normalizedEmail, source, dbTimeoutMs);
        dbStatus = "persisted";
      } catch (err: unknown) {
        dbError = err instanceof Error ? err.message : String(err);
        dbStatus = dbError.toLowerCase().includes("timed out") ? "timeout" : "failed";

        // Fail-safe audit log for log drains (Datadog / Papertrail / Vercel)
        console.error(
          `[FAILSAFE_BACKUP] ${JSON.stringify({
            event: "WAITLIST_DB_FAILOVER",
            email: normalizedEmail,
            source,
            timestamp,
            dbStatus,
            error: dbError,
          })}`
        );
      }
    }

    // 2. Guaranteed email dispatch
    let emailDispatched = false;
    try {
      emailDispatched = await sendWelcomeEmail({
        name: displayName,
        email: normalizedEmail,
        country: "Global",
        dreamCulture: source,
        timestamp,
        dbStatus,
        dbError,
      });

      await sendAdminWaitlistNotification({
        name: displayName,
        email: normalizedEmail,
        country: "Global",
        dreamCulture: source,
        timestamp,
        dbStatus,
        dbError,
      });
    } catch (mailErr) {
      console.error("[API /api/waitlist] Email delivery error:", mailErr);
    }

    // 3. Return 201 Created to keep frontend responsive
    sendJson(res, 201, {
      success: true,
      message: "Check your email for confirmation.",
      email: normalizedEmail,
      emailDispatched,
      dbStatus,
    });
  } catch (fatalErr) {
    console.error("[API /api/waitlist] Fatal handler error:", fatalErr);
    sendJson(res, 500, { error: "Transmission failed. Please retry shortly." });
  }
}
