import { NextRequest, NextResponse } from "next/server";
import { Analytics, StateUpdate, Transaction } from "@/lib/types";

// In-memory storage
let transactions: Transaction[] = [
  {
    id: crypto.randomUUID(),
    date: new Date("03/23/25 04:00"),
    customerName: "John Doe",
    amount: 100.22,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/23/25 04:02"),
    customerName: "John Smith",
    amount: 200.1,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/25/25 12:10"),
    customerName: "Jane Doe",
    amount: 132.18,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/26/25 05:32"),
    customerName: "Jane Smith",
    amount: 553.23,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/27/25 06:45"),
    customerName: "Elon Musk",
    amount: 150.5,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/28/25 07:55"),
    customerName: "Jeff Bezos",
    amount: 250.75,
    currency: "USD",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("03/29/25 08:05"),
    customerName: "Mark Zuckerberg",
    amount: 350.9,
    currency: "USD",
  },
];

// Track connected clients' response objects with their controllers
type Client = {
  controller: ReadableStreamDefaultController;
};
const clients = new Set<Client>();

// Calculate analytics
const calculateAnalytics = (): Analytics => {
  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  return { totalRevenue };
};

// Helper to send SSE formatted messages
function formatSSE(event: string, data: string) {
  return `event: ${event}\ndata: ${data}\n\n`;
}

// SSE endpoint
export async function GET(request: NextRequest) {
  // Path matching for route handling
  const pathname = request.nextUrl.pathname;

  if (pathname === "/api/events") {
    // Create a new stream with a controller
    const stream = new ReadableStream({
      start(controller) {
        const client = { controller };
        clients.add(client);

        // Send initial state
        const initialState: StateUpdate = {
          transactions,
          analytics: calculateAnalytics(),
        };

        // Send initial state
        controller.enqueue(
          new TextEncoder().encode(
            formatSSE("state-update", JSON.stringify(initialState)),
          ),
        );

        // Keep-alive ping every 30 seconds
        const pingInterval = setInterval(() => {
          controller.enqueue(
            new TextEncoder().encode(formatSSE("ping", "ping")),
          );
        }, 30000);

        // Handle client disconnect
        request.signal.addEventListener("abort", () => {
          clearInterval(pingInterval);
          clients.delete(client);
        });
      },
    });

    // Return the stream with appropriate headers
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  }

  // Handle other GET routes
  return new NextResponse("Not found", { status: 404 });
}

// POST handler for transactions
export async function POST(request: NextRequest) {
  // Path matching for route handling
  const pathname = request.nextUrl.pathname;

  if (pathname === "/api/transaction") {
    try {
      const data = await request.json();

      // Validate transaction data
      if (!data.customerName || !data.amount || !data.currency) {
        return NextResponse.json(
          { error: "Invalid transaction data" },
          { status: 400 },
        );
      }

      // Create new transaction
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        date: new Date(),
        customerName: data.customerName,
        amount: Number(data.amount),
        currency: data.currency,
      };

      // Add to transactions
      transactions = [...transactions, newTransaction];

      // Broadcast update to all connected clients
      const update: StateUpdate = {
        transactions,
        analytics: calculateAnalytics(),
      };

      // Send updates to all connected clients
      clients.forEach((client) => {
        client.controller.enqueue(
          new TextEncoder().encode(
            formatSSE("state-update", JSON.stringify(update)),
          ),
        );
      });

      return NextResponse.json({ success: true, transaction: newTransaction });
    } catch (error) {
      console.error("Error processing transaction:", error);
      return NextResponse.json(
        { error: "Failed to process transaction" },
        { status: 500 },
      );
    }
  }

  // Handle other POST routes
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
