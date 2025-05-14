import { prisma } from './prisma';
import { Analytics, StateUpdate } from './types';

// Get all transactions
export async function getTransactions() {
  return prisma.transaction.findMany({
    orderBy: {
      date: 'desc'
    }
  });
}

// Create a new transaction
export async function createTransaction(data: {
  customerName: string;
  amount: number;
  currency: string;
}) {
  return prisma.transaction.create({
    data: {
      customerName: data.customerName,
      amount: data.amount,
      currency: data.currency
    }
  });
}

// Calculate analytics
export async function calculateAnalytics(): Promise<Analytics> {
  // Sum all transaction amounts
  const result = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    }
  });

  return { 
    totalRevenue: result._sum.amount || 0 
  };
}

// Get current state (transactions + analytics)
export async function getCurrentState(): Promise<StateUpdate> {
  const [transactions, analytics] = await Promise.all([
    getTransactions(),
    calculateAnalytics()
  ]);

  return {
    transactions,
    analytics
  };
}