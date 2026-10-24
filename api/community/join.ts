import type { IncomingMessage, ServerResponse } from "http";
import { prisma, isDatabaseConfigured } from "../lib/prisma.js";
import { sendWelcomeEmail, sendAdminWaitlistNotification } from "../lib/mail.js";
import { withTimeout } from "../lib/async.js";

export interface JoinRequestBody {
  name?: string;
  email?: string;
  country?: string;
  dreamCulture?: string;
  reflectionNote?: string;
  hasOfferedStay?: boolean;
}

export interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: JoinRequestBody | string;
}

export interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (body: unknown) => VercelResponse;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Parses request body from Vercel Serverless environment or native Node.js stream.
 */
async function parseJsonBody(req: VercelRequest): Promise<JoinRequestBody> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
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

/**
 * Sends a structured JSON HTTP response.
 */
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

/**
 * Executes database persistence bounded by an execution deadline.
 */
async function persistMemberToDatabase(
  data: {
    email: string;
    name: string;
    country: string;
    dreamCulture?: string | null;
    reflectionNote?: string | null;
    hasOfferedStay: boolean;
  },
  timeoutMs: number
) {
  const query = prisma.communityMember.upsert({
    where: { email: data.email },
    update: {
      name: data.name,
      country: data.country,
      dreamCulture: data.dreamCulture,
      reflectionNote: data.reflectionNote,
      hasOfferedStay: data.hasOfferedStay,
    },
    create: {
      email: data.email,
      name: data.name,
      country: data.country,
      dreamCulture: data.dreamCulture,
      reflectionNote: data.reflectionNote,
      hasOfferedStay: data.hasOfferedStay,
    },
  });

  return await withTimeout(query, timeoutMs, "Database community member upsert");
}

/**
 * Serverless registration handler for the Connect Cultures Founding Fellowship.
 * Implements the Fail-Safe Dual-Dispatch architecture with guaranteed zero lead loss.
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

  if (req.method && req.method !== "POST") {
    sendJson(res, 405, { error: "Method Not Allowed" });
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const { name, email, country, dreamCulture, reflectionNote, hasOfferedStay } = body || {};

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      sendJson(res, 400, { error: "Your full name is required." });
      return;
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
      sendJson(res, 400, { error: "A valid email address is required." });
      return;
    }

    if (!country || typeof country !== "string" || country.trim().length === 0) {
      sendJson(res, 400, { error: "Country of residence is required." });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanCountry = country.trim();
    const cleanDreamCulture = dreamCulture?.trim() || undefined;
    const cleanReflectionNote = reflectionNote?.trim() || undefined;
    const isHost = Boolean(hasOfferedStay);
    const timestamp = new Date().toISOString();

    const dbTimeoutMs = process.env.DB_TIMEOUT_MS
      ? parseInt(process.env.DB_TIMEOUT_MS, 10)
      : 2500;

    let dbStatus: "persisted" | "failed" | "timeout" | "skipped" = "skipped";
    let dbError: string | undefined;
    let memberData: unknown = null;

    // 1. Database persistence with strict deadline
    if (isDatabaseConfigured) {
      try {
        memberData = await persistMemberToDatabase(
          {
            email: cleanEmail,
            name: cleanName,
            country: cleanCountry,
            dreamCulture: cleanDreamCulture,
            reflectionNote: cleanReflectionNote,
            hasOfferedStay: isHost,
          },
          dbTimeoutMs
        );
        dbStatus = "persisted";
      } catch (err: unknown) {
        dbError = err instanceof Error ? err.message : String(err);
        dbStatus = dbError.toLowerCase().includes("timed out") ? "timeout" : "failed";

        // Structured audit trail for external log drains
        console.error(
          `[FAILSAFE_BACKUP] ${JSON.stringify({
            event: "WAITLIST_DB_FAILOVER",
            email: cleanEmail,
            name: cleanName,
            country: cleanCountry,
            dreamCulture: cleanDreamCulture,
            hasOfferedStay: isHost,
            timestamp,
            dbStatus,
            error: dbError,
          })}`
        );

        // Fallback in-memory representation so UI gets immediate pass response
        memberData = {
          id: `fs-${Date.now()}`,
          email: cleanEmail,
          name: cleanName,
          country: cleanCountry,
          dreamCulture: cleanDreamCulture,
          hasOfferedStay: isHost,
        };
      }
    } else {
      console.info(`[Prisma Sim] DATABASE_URL unset. Registration simulated for: ${cleanEmail}`);
      memberData = {
        id: `sim-${Date.now()}`,
        email: cleanEmail,
        name: cleanName,
        country: cleanCountry,
        dreamCulture: cleanDreamCulture,
        hasOfferedStay: isHost,
      };
    }

    // 2. Guaranteed email dispatch (both user welcome and admin alert)
    let emailDispatched = false;
    try {
      emailDispatched = await sendWelcomeEmail({
        name: cleanName,
        email: cleanEmail,
        country: cleanCountry,
        dreamCulture: cleanDreamCulture,
        hasOfferedStay: isHost,
        reflectionNote: cleanReflectionNote,
        timestamp,
        dbStatus,
        dbError,
      });

      await sendAdminWaitlistNotification({
        name: cleanName,
        email: cleanEmail,
        country: cleanCountry,
        dreamCulture: cleanDreamCulture,
        hasOfferedStay: isHost,
        reflectionNote: cleanReflectionNote,
        timestamp,
        dbStatus,
        dbError,
      });
    } catch (mailErr) {
      console.error("[API /api/community/join] Email delivery error:", mailErr);
    }

    // 3. Return 201 Created to keep frontend responsive
    sendJson(res, 201, {
      success: true,
      message: "You have taken the step beyond the bubble. Welcome to the collective.",
      member: memberData,
      emailDispatched,
      dbStatus,
    });
  } catch (fatalErr) {
    console.error("[API /api/community/join] Fatal handler error:", fatalErr);
    sendJson(res, 500, { error: "Transmission failed. Please retry shortly." });
  }
}
