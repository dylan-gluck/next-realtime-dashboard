"use client";

import { useSSE } from "@/hooks/useSSE";
import Header from "@/components/app/header";
import Stats from "@/components/dashboard/stats";
import DashboardTable from "@/components/dashboard/table";

export default function Dashboard() {
  const { transactions, analytics, isConnected } = useSSE();

  return (
    <div className="contents">
      <Header
        title="Sales Dashboard"
        isConnected={isConnected}
        showConnection={true}
      />
      <Stats analytics={analytics} transactions={transactions} />
      <DashboardTable transactions={transactions} />
    </div>
  );
}
