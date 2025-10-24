import { DollarSign, CreditCard, TrendingUp, Users } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import TransactionTable from "@/components/TransactionTable";

export default function Dashboard() {
  const mockTransactions = [
    { id: "TXN-001", date: "2025-10-24", customer: "John Doe", amount: "$125.00", status: "success" as const, paymentMethod: "Visa ****1234" },
    { id: "TXN-002", date: "2025-10-24", customer: "Jane Smith", amount: "$89.50", status: "pending" as const, paymentMethod: "MC ****5678" },
    { id: "TXN-003", date: "2025-10-23", customer: "Bob Johnson", amount: "$250.00", status: "success" as const, paymentMethod: "Amex ****9012" },
    { id: "TXN-004", date: "2025-10-23", customer: "Alice Williams", amount: "$45.99", status: "failed" as const, paymentMethod: "Visa ****3456" },
    { id: "TXN-005", date: "2025-10-22", customer: "Charlie Brown", amount: "$199.99", status: "success" as const, paymentMethod: "Visa ****7890" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#0000FF" }}>Dashboard</h1>
        <p className="text-muted-foreground">Monitor your payment gateway performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Transactions"
          value="2,350"
          change="+15.3% from last month"
          changeType="positive"
          icon={CreditCard}
        />
        <MetricCard
          title="Success Rate"
          value="98.2%"
          change="+2.5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Customers"
          value="573"
          change="+12 new this week"
          changeType="neutral"
          icon={Users}
        />
      </div>

      <TransactionTable
        transactions={mockTransactions}
        onViewDetails={(id) => console.log("View transaction details:", id)}
      />
    </div>
  );
}
