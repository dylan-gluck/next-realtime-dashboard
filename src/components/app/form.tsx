"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TransactionForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "100",
    currency: "USD",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Reset form
      setFormData({
        customerName: "",
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
    <section className="py-10 px-4 container mx-auto gap-4">
      <div className="border border-border rounded-md p-4 mx-auto">
        <h3 className="font-bold text-lg mb-2">Add Transaction</h3>
        <form
          onSubmit={handleSubmit}
          className="flex max-lg:flex-col lg:items-end gap-4"
        >
          <div className="w-full">
            <label className="text-sm text-muted-foreground mb-1 block">
              Customer
            </label>
            <Input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-ful"
            />
          </div>
          <div className="flex gap-4 items-start w-full">
            <div className="w-full">
              <label className="text-sm text-muted-foreground mb-1 block">
                Amount
              </label>
              <Input
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-muted-foreground mb-1 block">
                Currency
              </label>
              <Select
                value={formData.currency}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    currency: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Add</Button>
        </form>
      </div>
    </section>
  );
}
