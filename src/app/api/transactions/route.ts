import { NextResponse } from "next/server";
import { getTransactions } from "@/lib/transactions";

// GET handler for transactions
export async function GET() {
  try {
    // Get all transactions
    const transactions = await getTransactions();

    return NextResponse.json({
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}