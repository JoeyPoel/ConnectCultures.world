import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

/**
 * Checks if DATABASE_URL is configured in environment.
 */
export const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0
);

/**
 * Lazy instantiation singleton for PrismaClient.
 * Avoids module crashes when DATABASE_URL is unset or database connection handshakes lag.
 *
 * @returns Initialized PrismaClient instance or null if unconfigured
 */
export function getPrismaClient(): PrismaClient | null {
  if (!isDatabaseConfigured) return null;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    return client;
  } catch (err) {
    console.error("[Prisma] Instantiation error:", err);
    return null;
  }
}

/**
 * Resilient Prisma proxy that dynamically delegates method calls to the active client.
 * Throws a clean, catchable error if accessed when the database is unconfigured.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrismaClient();
    if (!client) {
      throw new Error(
        `Prisma unavailable: DATABASE_URL unset or initialization failed for "${String(prop)}".`
      );
    }
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? (val as (...args: unknown[]) => unknown).bind(client) : val;
  },
});

export default prisma;
