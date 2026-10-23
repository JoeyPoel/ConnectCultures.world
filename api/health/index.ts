import type { IncomingMessage, ServerResponse } from "http";
import { prisma, isDatabaseConfigured } from "../lib/prisma.js";

/**
 * Healthcheck and diagnostics endpoint.
 */
export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  let dbOk = false;
  if (isDatabaseConfigured) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbOk = true;
    } catch {
      dbOk = false;
    }
  }

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "operational",
      timestamp: new Date().toISOString(),
      service: "BeyondTheBubble-API",
      database: isDatabaseConfigured ? (dbOk ? "connected" : "unreachable") : "simulated_mode",
    })
  );
}
