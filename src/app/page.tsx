"use client";

import Image from "next/image";
import { Check, Funnel, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSSE } from "@/hooks/useSSE";

export default function Dashboard() {
  const { transactions, analytics, isConnected } = useSSE();

  return (
    <div className="contents">
      <header className="border-b border-border">
        <div className="py-6 flex justify-between container mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/globe.svg" alt="Logo" width={24} height={24} />
            <h1 className="text-2xl font-bold text-foreground leading-0">
              Sales Dashboard
            </h1>
          </div>
          <Badge>
            {!isConnected && <Loader className="w-2 h-2 animate-spin mr-1" />}
            {isConnected && <Check className="w-2 h-2 mr-1" />}
            <span>{isConnected ? "Connected" : "Establishing connection"}</span>
          </Badge>
        </div>
      </header>
      <section className="py-10 container mx-auto grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {!analytics.totalRevenue && (
              <span className="text-3xl font-bold">--</span>
            )}
            {analytics.totalRevenue > 0 && (
              <span className="text-3xl font-bold">
                ${analytics.totalRevenue}
              </span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">
              {transactions?.length || 0}
            </span>
          </CardContent>
        </Card>
      </section>
      <section className="py-10 container mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center mt-6">
          <h3 className="font-semibold">Recent Transactions</h3>
          <div className="flex items-center gap-3">
            <Funnel className="text-muted-foreground w-4 h-4" />
            <Input placeholder="Filter by customer" className="max-w-lg" />
          </div>
        </div>
        <div className="p-4 border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.customerName}</TableCell>
                    <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No transactions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
