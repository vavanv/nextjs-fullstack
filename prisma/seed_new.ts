import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Try to load environment variables from .env file
try {
  process.loadEnvFile();
} catch (e) {
  // .env file might be missing, but variables might be set in environment
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    quantity: 15,
    category: "Furniture",
  },
  {
    name: "Wireless Mechanical Keyboard",
    price: 129.5,
    quantity: 42,
    category: "Electronics",
  },
  {
    name: "27-inch 4K Monitor",
    price: 449.0,
    quantity: 8,
    category: "Electronics",
  },
  {
    name: "Noise Cancelling Headphones",
    price: 349.99,
    quantity: 23,
    category: "Audio",
  },
  {
    name: "Standing Desk Converter",
    price: 189.0,
    quantity: 5,
    category: "Furniture",
  },
  {
    name: "USB-C Docking Station",
    price: 89.99,
    quantity: 30,
    category: "Electronics",
  },
  { name: "Laptop Stand", price: 45.0, quantity: 55, category: "Accessories" },
  {
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 80,
    category: "Electronics",
  },
  { name: "Webcam 1080p", price: 69.95, quantity: 12, category: "Electronics" },
  {
    name: "Desk Lamp with Wireless Charger",
    price: 55.0,
    quantity: 20,
    category: "Lighting",
  },
  {
    name: "Cable Management Organizer",
    price: 15.99,
    quantity: 100,
    category: "Accessories",
  },
  { name: "Bluetooth Speaker", price: 79.99, quantity: 18, category: "Audio" },
  { name: "Portable SSD 1TB", price: 119.0, quantity: 25, category: "Storage" },
  { name: "Tablet Stand", price: 25.5, quantity: 40, category: "Accessories" },
  {
    name: "Smart Power Strip",
    price: 35.0,
    quantity: 33,
    category: "Electronics",
  },
  {
    name: "Monitor Arm Mount",
    price: 59.99,
    quantity: 10,
    category: "Furniture",
  },
  {
    name: "Vertical Mouse",
    price: 39.95,
    quantity: 14,
    category: "Electronics",
  },
  {
    name: "Writing Desk Pad",
    price: 22.0,
    quantity: 60,
    category: "Accessories",
  },
  { name: "Foot Rest", price: 32.99, quantity: 7, category: "Furniture" },
  { name: "Microphone Arm", price: 49.5, quantity: 9, category: "Audio" },
  { name: "Ring Light", price: 35.99, quantity: 22, category: "Lighting" },
  { name: "HDMI Cable (6ft)", price: 12.99, quantity: 150, category: "Cables" },
  {
    name: "Ethernet Cable (10ft)",
    price: 9.99,
    quantity: 120,
    category: "Cables",
  },
  { name: "Laptop Briefcase", price: 65.0, quantity: 16, category: "Bags" },
  {
    name: "Backpack with USB Port",
    price: 55.0,
    quantity: 28,
    category: "Bags",
  },
  {
    name: "Gel Wrist Rest",
    price: 18.5,
    quantity: 35,
    category: "Accessories",
  },
  {
    name: "Screen Cleaning Kit",
    price: 12.99,
    quantity: 90,
    category: "Cleaning",
  },
  { name: "Air Duster Can", price: 8.99, quantity: 200, category: "Cleaning" },
  {
    name: "AA Batteries (Pack of 12)",
    price: 14.99,
    quantity: 150,
    category: "Batteries",
  },
  {
    name: "AAA Batteries (Pack of 12)",
    price: 14.99,
    quantity: 140,
    category: "Batteries",
  },
  {
    name: "Surge Protector (12 outlets)",
    price: 29.99,
    quantity: 45,
    category: "Electronics",
  },
  {
    name: "Whiteboard (Small)",
    price: 24.99,
    quantity: 25,
    category: "Office Supplies",
  },
  {
    name: "Dry Erase Markers (Set of 4)",
    price: 6.99,
    quantity: 110,
    category: "Office Supplies",
  },
  {
    name: "Cork Board",
    price: 19.99,
    quantity: 15,
    category: "Office Supplies",
  },
  {
    name: "Push Pins (Box of 100)",
    price: 4.99,
    quantity: 300,
    category: "Office Supplies",
  },
  {
    name: "Sticky Notes (Pastel Pack)",
    price: 7.99,
    quantity: 250,
    category: "Office Supplies",
  },
  {
    name: "Ballpoint Pens (Blue, Box of 12)",
    price: 5.99,
    quantity: 180,
    category: "Office Supplies",
  },
  {
    name: "Mechanical Pencils (0.7mm)",
    price: 8.99,
    quantity: 90,
    category: "Office Supplies",
  },
  {
    name: "Highlighters (Assorted Colors)",
    price: 6.99,
    quantity: 120,
    category: "Office Supplies",
  },
  { name: "Stapler", price: 11.99, quantity: 60, category: "Office Supplies" },
  {
    name: "Staples (Box of 5000)",
    price: 3.99,
    quantity: 150,
    category: "Office Supplies",
  },
  {
    name: "Tape Dispenser",
    price: 8.5,
    quantity: 70,
    category: "Office Supplies",
  },
  {
    name: "Scissors (8 inch)",
    price: 7.5,
    quantity: 85,
    category: "Office Supplies",
  },
  {
    name: "Paper Clips (Jumbo)",
    price: 2.99,
    quantity: 400,
    category: "Office Supplies",
  },
  {
    name: "Binder Clips (Medium)",
    price: 3.5,
    quantity: 350,
    category: "Office Supplies",
  },
  {
    name: "File Organizer (Mesh)",
    price: 18.99,
    quantity: 30,
    category: "Storage",
  },
  {
    name: "Desk Drawer Organizer",
    price: 14.99,
    quantity: 40,
    category: "Storage",
  },
  {
    name: "Paper Shredder",
    price: 49.99,
    quantity: 12,
    category: "Office Equipment",
  },
  {
    name: "Label Maker",
    price: 39.99,
    quantity: 18,
    category: "Office Equipment",
  },
  {
    name: "Replacement Label Tape",
    price: 12.99,
    quantity: 50,
    category: "Office Supplies",
  },
  {
    name: "Scientific Calculator",
    price: 15.99,
    quantity: 65,
    category: "Office Supplies",
  },
  { name: "Desk Fan (USB)", price: 19.99, quantity: 35, category: "Cooling" },
  {
    name: "Heater (Under Desk)",
    price: 34.99,
    quantity: 10,
    category: "Heating",
  },
  {
    name: "Coffee Mug Warmer",
    price: 22.99,
    quantity: 28,
    category: "Appliances",
  },
  {
    name: "Water Bottle (Stainless Steel)",
    price: 25.0,
    quantity: 75,
    category: "Accessories",
  },
  {
    name: "Office Plant (Artificial)",
    price: 29.99,
    quantity: 20,
    category: "Decor",
  },
];

async function main() {
  const userIds = [
    "9607d873-1327-4802-a091-665960184407",
    "5b402b3a-2504-40b8-b02d-e7810914642e",
  ];

  console.log(`Starting seeding for ${userIds.length} users...`);

  for (const userId of userIds) {
    console.log(`Creating products for user: ${userId}`);

    // Clear existing products for this user (optional, but good for clean seed)
    // await prisma.product.deleteMany({ where: { userId } });

    const seedData = products.map((product, i) => ({
      userId: userId,
      name: product.name,
      price: product.price,
      quantity: product.quantity, // You can vary this randomly if you want: Math.floor(product.quantity * (0.5 + Math.random())),
      lowStockAt: 5,
      // Spread createdAt over the year to create historical data
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i % 60)),
    }));

    const created = await prisma.product.createMany({
      data: seedData,
    });
    console.log(`Created ${created.count} products for user ID: ${userId}`);
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
