import { TransactionForm } from "@/components/app/form";
import Header from "@/components/app/header";

export default function NewTransaction() {
  return (
    <div className="contents">
      <Header title="New Transaction" />
      <TransactionForm />
    </div>
  );
}
