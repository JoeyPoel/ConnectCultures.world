import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient | undefined;
}

/**
 * Resilient Prisma Client singleton for Vercel Serverless environment.
 * If DATABASE_URL is omitted or invalid, it gracefully flags active state.
 */
export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0);

export const prisma: PrismaClient =
  global.globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.globalPrisma = prisma;
}

export default prisma;
