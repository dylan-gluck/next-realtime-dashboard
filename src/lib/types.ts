export interface Transaction {
  id: string;
  date: Date;
  customerName: string;
  amount: number;
  currency: string;
}

export interface Analytics {
  totalRevenue: number;
}

export interface StateUpdate {
  transactions: Transaction[];
  analytics: Analytics;
}
