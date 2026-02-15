import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Try to load environment variables from .env file
try {
  process.loadEnvFile();
} catch (e) {
  // .env file might be missing, but variables might be set in environment
}

// Option A: Simple – pass connection string directly (most common)
const connectionString = process.env.DATABASE_URL; // e.g. "postgresql://user:pass@localhost:5432/mydb?schema=public"

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const demoUserId = "9607d873-1327-4802-a091-665960184407"; //"5b402b3a-2504-40b8-b02d-e7810914642e";

  // Create sample products
  await prisma.product.createMany({
    data: Array.from({ length: 55 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
