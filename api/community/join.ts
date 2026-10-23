import type { IncomingMessage, ServerResponse } from "http";
import { prisma, isDatabaseConfigured } from "../lib/prisma.js";
import { sendWelcomeEmail } from "../lib/mail.js";

interface JoinRequestBody {
  name?: string;
  email?: string;
  country?: string;
  dreamCulture?: string;
  reflectionNote?: string;
  hasOfferedStay?: boolean;
}

// RFC 5322 compliant regex simplified for safe JSON input validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Serverless registration handler for the Beyond The Bubble waitlist.
 */
export default async function handler(req: IncomingMessage & { body?: JoinRequestBody }, res: ServerResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    let body: JoinRequestBody = req.body || {};

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error("Failed to parse request body:", e);
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        return;
      }
    } else if (!req.body) {
      // Stream parse for Node native serverless
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        buffers.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(buffers).toString("utf-8");
      if (raw) {
        try {
          body = JSON.parse(raw);
        } catch (e) {
          console.error("Failed to parse body stream:", e);
        }
      }
    }

    const { name, email, country, dreamCulture, reflectionNote, hasOfferedStay } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Name is required" }));
      return;
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "A valid email address is required (RFC 5322)" }));
      return;
    }

    if (!country || typeof country !== "string" || country.trim().length === 0) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Country of residence is required" }));
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanCountry = country.trim();

    // Database operation with fallback
    let member;
    if (isDatabaseConfigured) {
      try {
        const existing = await prisma.communityMember.findUnique({
          where: { email: cleanEmail },
        });

        if (existing) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: true,
              alreadyRegistered: true,
              message: "Welcome back! You are already registered with our global collective.",
              member: existing,
            })
          );
          return;
        }

        member = await prisma.communityMember.create({
          data: {
            email: cleanEmail,
            name: cleanName,
            country: cleanCountry,
            dreamCulture: dreamCulture?.trim() || null,
            reflectionNote: reflectionNote?.trim() || null,
            hasOfferedStay: Boolean(hasOfferedStay),
          },
        });
      } catch (dbError) {
        console.warn("Prisma error during join, falling back to simulated session:", dbError);
        member = {
          id: `sim-${Date.now()}`,
          email: cleanEmail,
          name: cleanName,
          country: cleanCountry,
          dreamCulture: dreamCulture || null,
          hasOfferedStay: Boolean(hasOfferedStay),
        };
      }
    } else {
      console.info(`[Prisma Sim] DATABASE_URL unset. Registration simulated for: ${cleanEmail}`);
      member = {
        id: `sim-${Date.now()}`,
        email: cleanEmail,
        name: cleanName,
        country: cleanCountry,
        dreamCulture: dreamCulture || null,
        hasOfferedStay: Boolean(hasOfferedStay),
      };
    }

    // Trigger Welcome Email (non-blocking)
    sendWelcomeEmail({
      name: cleanName,
      email: cleanEmail,
      country: cleanCountry,
      dreamCulture: dreamCulture?.trim(),
    }).catch((err) => console.error("Email dispatch async error:", err));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: true,
        alreadyRegistered: false,
        message: "You have taken the step beyond the bubble. Welcome to the collective.",
        member,
      })
    );
  } catch (err) {
    console.error("Unhandled error in /api/community/join:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}
