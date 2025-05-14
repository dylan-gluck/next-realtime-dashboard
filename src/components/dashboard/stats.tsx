import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Analytics, Transaction } from "@/lib/types";

type StatsProps = {
  analytics: Analytics;
  transactions: Transaction[];
};

export default function Stats({ analytics, transactions }: StatsProps) {
  return (
    <section className="py-10 px-4 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
}
