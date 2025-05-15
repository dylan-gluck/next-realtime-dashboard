import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { broadcastUpdate } from "@/lib/sse";
import { createTransaction } from "@/lib/transactions";

// Transaction input validation schema
const transactionSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  currency: z.string().min(1, "Currency is required"),
});

// POST handler for transactions
export async function POST(request: NextRequest) {
  try {
    // Parse and validate input
    const data = await request.json();
    const validationResult = transactionSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid transaction data",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    // Create new transaction
    const newTransaction = await createTransaction(validationResult.data);

    // Broadcast update notification to all clients
    broadcastUpdate();

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    return NextResponse.json(
      { error: "Failed to process transaction" },
      { status: 500 },
    );
  }
}
