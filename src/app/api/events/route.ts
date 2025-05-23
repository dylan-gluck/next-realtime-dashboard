import { NextRequest, NextResponse } from "next/server";
import { addClient, formatSSE, removeClient } from "@/lib/sse";

// SSE endpoint
export async function GET(request: NextRequest) {
  // Create a new stream with a controller
  const stream = new ReadableStream({
    async start(controller) {
      // Add this client to our connected clients
      const client = addClient(controller);

      // Send initial update notification
      try {
        controller.enqueue(
          new TextEncoder().encode(
            formatSSE("update", JSON.stringify({ timestamp: Date.now() })),
          ),
        );
      } catch (error) {
        console.error("Error sending initial notification:", error);
        controller.enqueue(
          new TextEncoder().encode(
            formatSSE(
              "error",
              JSON.stringify({ message: "Internal server error" }),
            ),
          ),
        );
      }

      // Keep-alive ping every 30 seconds
      const pingInterval = setInterval(() => {
        controller.enqueue(new TextEncoder().encode(formatSSE("ping", "ping")));
      }, 30000);

      // Handle client disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(pingInterval);
        removeClient(client);
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
