import { Funnel } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Transaction } from "@/lib/types";

interface TableProps {
  transactions: Transaction[];
}

export default function DashboardTable({ transactions }: TableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setfilteredTransactions] =
    useState(transactions);

  // Filter transactions based on search term
  useEffect(() => {
    const filtered = transactions.filter((tx) =>
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setfilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  return (
    <section className="py-10 container mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center mt-6">
        <h3 className="font-semibold">Recent Transactions</h3>
        <div className="flex items-center gap-3">
          <Funnel className="text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Filter by customer"
            className="max-w-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            {filteredTransactions && filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
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
  );
}
