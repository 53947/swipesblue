import { useState } from "react";
import { useLocation } from "wouter";
import { CreditCard, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "All Transactions", href: "/dashboard/transactions" },
  { label: "Successful", href: "/dashboard/transactions?tab=successful" },
  { label: "Pending", href: "/dashboard/transactions?tab=pending" },
  { label: "Failed", href: "/dashboard/transactions?tab=failed" },
  { label: "Refunded", href: "/dashboard/transactions?tab=refunded" },
];

interface MockTransaction {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: "success" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  type: string;
}

const mockTransactions: MockTransaction[] = [
  { id: "TXN-001", date: "2025-10-24", customer: "John Doe", amount: "$125.00", status: "success", paymentMethod: "Visa ****1234", type: "Payment" },
  { id: "TXN-002", date: "2025-10-24", customer: "Jane Smith", amount: "$89.50", status: "pending", paymentMethod: "MC ****5678", type: "Payment" },
  { id: "TXN-003", date: "2025-10-23", customer: "Bob Johnson", amount: "$250.00", status: "success", paymentMethod: "Amex ****9012", type: "Payment" },
  { id: "TXN-004", date: "2025-10-23", customer: "Alice Williams", amount: "$45.99", status: "failed", paymentMethod: "Visa ****3456", type: "Payment" },
  { id: "TXN-005", date: "2025-10-22", customer: "Charlie Brown", amount: "$199.99", status: "success", paymentMethod: "Visa ****7890", type: "Payment" },
  { id: "TXN-006", date: "2025-10-22", customer: "David Lee", amount: "$350.00", status: "success", paymentMethod: "Visa ****2468", type: "Payment" },
  { id: "TXN-007", date: "2025-10-21", customer: "Emma Wilson", amount: "$75.25", status: "success", paymentMethod: "MC ****1357", type: "Subscription" },
  { id: "TXN-008", date: "2025-10-21", customer: "Frank Miller", amount: "$120.00", status: "pending", paymentMethod: "Amex ****8642", type: "Invoice" },
  { id: "TXN-009", date: "2025-10-20", customer: "Grace Lee", amount: "-$49.99", status: "refunded", paymentMethod: "Visa ****1234", type: "Refund" },
  { id: "TXN-010", date: "2025-10-19", customer: "Henry Kim", amount: "$89.00", status: "failed", paymentMethod: "MC ****9876", type: "Payment" },
];

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-600",
  refunded: "bg-gray-100 text-gray-600",
};

export default function TransactionsDashboard() {
  const [search, setSearch] = useState("");
  const [location] = useLocation();

  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  let filteredTxns = mockTransactions;
  if (activeTab === "successful") {
    filteredTxns = mockTransactions.filter((t) => t.status === "success");
  } else if (activeTab === "pending") {
    filteredTxns = mockTransactions.filter((t) => t.status === "pending");
  } else if (activeTab === "failed") {
    filteredTxns = mockTransactions.filter((t) => t.status === "failed");
  } else if (activeTab === "refunded") {
    filteredTxns = mockTransactions.filter((t) => t.status === "refunded");
  }

  if (search) {
    const q = search.toLowerCase();
    filteredTxns = filteredTxns.filter(
      (t) => t.customer.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500 mt-1">View and manage all payment transactions</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by transaction ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[7px]"
          />
        </div>
      </div>

      {/* Transaction Table */}
      {filteredTxns.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500 text-sm">Transactions will appear here as you process payments.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-gray-900">{txn.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{txn.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${txn.status === "refunded" ? "text-gray-500" : "text-gray-900"}`}>
                      {txn.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${statusColors[txn.status]}`}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View details">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">{filteredTxns.length} transactions</span>
      </div>
    </div>
  );
}
