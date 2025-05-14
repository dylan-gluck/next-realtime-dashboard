import { useState, useEffect, useRef } from "react";
import { StateUpdate } from "@/lib/types";

export function useSSE() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<StateUpdate>({
    transactions: [],
    analytics: { totalRevenue: 0 },
  });
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // If there's already an active connection, don't create a new one
    if (eventSourceRef.current) {
      return;
    }

    const events = new EventSource("/api/events");
    eventSourceRef.current = events;

    events.onopen = () => {
      setIsConnected(true);
      console.log("EventSource opened");
    };

    events.onmessage = (event) => {
      console.log("EventSource message", event);
    };

    events.addEventListener("ping", (event) => {
      console.log("EventSource ping", event);
    });

    events.addEventListener("state-update", (event) => {
      console.log("EventSource state-update", event);
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Parsed data:", parsedData);
        setData(parsedData);
      } catch (e) {
        console.error("Failed to parse SSE data:", e);
      }
    });

    events.onerror = (error) => {
      console.log("EventSource error:", error);
      setIsConnected(false);
    };

    return () => {
      events.close();
      eventSourceRef.current = null;
    };
  }, []);

  return { ...data, isConnected };
}
