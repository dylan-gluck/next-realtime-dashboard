import Image from "next/image";
import { Funnel, Loader } from "lucide-react";
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

export default function Home() {
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
            <Loader className="w-2 h-2 animate-spin" />
            <span>Establishing connection</span>
          </Badge>
        </div>
      </header>
      <section className="py-10 container mx-auto grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revinue</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">$25,000</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">10</span>
          </CardContent>
        </Card>
      </section>
      <section className="py-10 container mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Recent Transactions</h3>
          <div className="flex items-center gap-3">
            <Funnel className="text-muted-foreground w-4 h-4" />
            <Input placeholder="Filter transactions" className="max-w-lg" />
          </div>
        </div>
        <div className="p-4 border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10/10/2025 4:01</TableCell>
                <TableCell>ABC Company</TableCell>
                <TableCell>2500.23</TableCell>
                <TableCell>USD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10/10/2025 4:00</TableCell>
                <TableCell>ABC Company</TableCell>
                <TableCell>2500.23</TableCell>
                <TableCell>USD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
