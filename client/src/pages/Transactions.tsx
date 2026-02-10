import TransactionTable from "@/components/TransactionTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockTransactions = [
    { id: "TXN-001", date: "2025-10-24", customer: "John Doe", amount: "$125.00", status: "success" as const, paymentMethod: "Visa ****1234" },
    { id: "TXN-002", date: "2025-10-24", customer: "Jane Smith", amount: "$89.50", status: "pending" as const, paymentMethod: "MC ****5678" },
    { id: "TXN-003", date: "2025-10-23", customer: "Bob Johnson", amount: "$250.00", status: "success" as const, paymentMethod: "Amex ****9012" },
    { id: "TXN-004", date: "2025-10-23", customer: "Alice Williams", amount: "$45.99", status: "failed" as const, paymentMethod: "Visa ****3456" },
    { id: "TXN-005", date: "2025-10-22", customer: "Charlie Brown", amount: "$199.99", status: "success" as const, paymentMethod: "Visa ****7890" },
    { id: "TXN-006", date: "2025-10-22", customer: "David Lee", amount: "$350.00", status: "success" as const, paymentMethod: "Visa ****2468" },
    { id: "TXN-007", date: "2025-10-21", customer: "Emma Wilson", amount: "$75.25", status: "success" as const, paymentMethod: "MC ****1357" },
    { id: "TXN-008", date: "2025-10-21", customer: "Frank Miller", amount: "$120.00", status: "pending" as const, paymentMethod: "Amex ****8642" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#1844A6" }}>Transactions</h1>
        <p className="text-muted-foreground">View and manage all payment transactions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search"
          />
        </div>
        <Button variant="outline" data-testid="button-filter">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <TransactionTable
        transactions={mockTransactions}
        onViewDetails={() => {}}
      />
    </div>
  );
}
