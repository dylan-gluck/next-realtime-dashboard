"use client";

import { useState } from "react";
import { Input } from "./ui/input";

export function TestTransactionForm() {
  const [formData, setFormData] = useState({
    customerName: "Test Customer",
    amount: "100",
    currency: "USD",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      console.log("Transaction created:", result);
      
      // Reset form
      setFormData({
        customerName: "Test Customer",
        amount: "100",
        currency: "USD",
      });
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="border border-border rounded-md p-4">
      <h3 className="font-semibold mb-4">Add Test Transaction</h3>
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Customer
          </label>
          <Input 
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-[200px]"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Amount
          </label>
          <Input 
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            className="w-[100px]"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            Currency
          </label>
          <Input 
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-[80px]"
          />
        </div>
        <button 
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
}