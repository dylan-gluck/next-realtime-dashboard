import { NextResponse } from "next/server";
import { calculateAnalytics } from "@/lib/transactions";

// GET handler for analytics
export async function GET() {
  try {
    // Get analytics
    const analytics = await calculateAnalytics();

    return NextResponse.json({
      analytics,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}