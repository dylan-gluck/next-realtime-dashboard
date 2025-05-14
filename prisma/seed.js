import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.transaction.deleteMany({});
    console.log("Cleared existing transactions");

    // Initial seed data
    const seedData = [
      {
        date: new Date("2025-03-23T04:00:00.000Z"),
        customerName: "John Doe",
        amount: 100.22,
        currency: "USD",
      },
      {
        date: new Date("2025-03-23T04:02:00.000Z"),
        customerName: "John Smith",
        amount: 200.1,
        currency: "USD",
      },
      {
        date: new Date("2025-03-25T12:10:00.000Z"),
        customerName: "Jane Doe",
        amount: 132.18,
        currency: "USD",
      },
      {
        date: new Date("2025-03-26T05:32:00.000Z"),
        customerName: "Jane Smith",
        amount: 553.23,
        currency: "USD",
      },
      {
        date: new Date("2025-03-27T06:45:00.000Z"),
        customerName: "Elon Musk",
        amount: 150.5,
        currency: "USD",
      },
      {
        date: new Date("2025-03-28T07:55:00.000Z"),
        customerName: "Jeff Bezos",
        amount: 250.75,
        currency: "USD",
      },
      {
        date: new Date("2025-03-29T08:05:00.000Z"),
        customerName: "Mark Zuckerberg",
        amount: 350.9,
        currency: "USD",
      },
    ];

    const transactions = await prisma.transaction.createMany({
      data: seedData,
    });

    console.log(
      `Database has been seeded with ${transactions.count} transactions`,
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
