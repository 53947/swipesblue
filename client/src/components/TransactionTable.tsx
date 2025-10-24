import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: "success" | "pending" | "failed";
  paymentMethod: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetails?: (id: string) => void;
}

export default function TransactionTable({ transactions, onViewDetails }: TransactionTableProps) {
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return "bg-[#00FF40] text-[#09080e]";
      case "pending":
        return "bg-[#0000FF] text-white";
      case "failed":
        return "bg-[#FF0040] text-white";
    }
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover-elevate"
                  onClick={() => handleSort("date")}
                  data-testid="header-date"
                >
                  Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover-elevate"
                  onClick={() => handleSort("id")}
                  data-testid="header-id"
                >
                  ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover-elevate"
                  onClick={() => handleSort("customer")}
                  data-testid="header-customer"
                >
                  Customer {sortField === "customer" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover-elevate"
                  onClick={() => handleSort("amount")}
                  data-testid="header-amount"
                >
                  Amount {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover-elevate" data-testid={`row-transaction-${transaction.id}`}>
                  <td className="py-4 px-4 text-sm">{transaction.date}</td>
                  <td className="py-4 px-4 text-sm font-mono text-muted-foreground">{transaction.id}</td>
                  <td className="py-4 px-4 text-sm">{transaction.customer}</td>
                  <td className="py-4 px-4 text-sm font-semibold" style={{ color: "#0000FF" }}>{transaction.amount}</td>
                  <td className="py-4 px-4">
                    <Badge className={`${getStatusColor(transaction.status)} no-default-hover-elevate no-default-active-elevate`}>
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onViewDetails?.(transaction.id)}
                      data-testid={`button-view-${transaction.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
