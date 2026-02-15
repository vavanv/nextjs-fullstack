import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Try to load environment variables from .env file
try {
  process.loadEnvFile();
} catch (e) {
  // .env file might be missing, but variables might be set in environment
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
const connectionString = process.env.DATABASE_URL; // e.g. "postgresql://user:pass@localhost:5432/mydb?schema=public"

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
