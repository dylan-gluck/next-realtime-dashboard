import { useState, useEffect, useRef, useCallback } from "react";
import { StateUpdate } from "@/lib/types";

export function useSSE() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<StateUpdate>({
    transactions: [],
    analytics: { totalRevenue: 0 },
  });
  const eventSourceRef = useRef<EventSource | null>(null);

  // Function to fetch transactions and analytics data
  const fetchData = useCallback(async () => {
    try {
      // Fetch transactions and analytics in parallel
      const [transactionsRes, analyticsRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/analytics')
      ]);

      // Check for successful responses
      if (!transactionsRes.ok || !analyticsRes.ok) {
        console.error("Failed to fetch data");
        return;
      }

      // Parse the responses
      const transactionsData = await transactionsRes.json();
      const analyticsData = await analyticsRes.json();

      // Update state with the new data
      setData({
        transactions: transactionsData.transactions,
        analytics: analyticsData.analytics
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // If there's already an active connection, don't create a new one
    if (eventSourceRef.current) {
      return;
    }

    const events = new EventSource("/api/events");
    eventSourceRef.current = events;

    events.onopen = () => {
      setIsConnected(true);
    };

    events.onmessage = (event) => {
      console.log("EventSource message", event);
    };

    // Listen for update events which now only contain a timestamp
    events.addEventListener("update", (event) => {
      console.log("EventSource update", event);
      // When we receive an update event, fetch fresh data
      fetchData();
    });

    events.onerror = (error) => {
      console.log("EventSource error:", error);
      setIsConnected(false);
    };

    return () => {
      events.close();
      eventSourceRef.current = null;
    };
  }, [fetchData]);

  return { ...data, isConnected };
}
