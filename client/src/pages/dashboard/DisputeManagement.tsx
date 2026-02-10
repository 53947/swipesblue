import { useState } from "react";
import { AlertTriangle, FileText, CheckCircle, XCircle, Clock, DollarSign, TrendingUp, Shield, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/MetricCard";

type DisputeStatus = "needs_response" | "under_review" | "won" | "lost";
type DisputeReason = "Fraud" | "Not Received" | "Not as Described" | "Duplicate" | "Other";

interface Dispute {
  id: string;
  transactionId: string;
  customer: string;
  amount: string;
  reason: DisputeReason;
  status: DisputeStatus;
  deadline: string;
}

const mockDisputes: Dispute[] = [
  { id: "DSP-001", transactionId: "TXN-4821", customer: "Marcus Chen", amount: "$850.00", reason: "Fraud", status: "needs_response", deadline: "2025-11-18" },
  { id: "DSP-002", transactionId: "TXN-4756", customer: "Sarah Mitchell", amount: "$320.00", reason: "Not Received", status: "needs_response", deadline: "2025-11-15" },
  { id: "DSP-003", transactionId: "TXN-4698", customer: "James Rodriguez", amount: "$1,200.00", reason: "Not as Described", status: "under_review", deadline: "2025-11-22" },
  { id: "DSP-004", transactionId: "TXN-4510", customer: "Emily Watson", amount: "$475.00", reason: "Duplicate", status: "under_review", deadline: "2025-11-20" },
  { id: "DSP-005", transactionId: "TXN-4389", customer: "David Park", amount: "$180.00", reason: "Fraud", status: "won", deadline: "2025-10-28" },
  { id: "DSP-006", transactionId: "TXN-4267", customer: "Lisa Thompson", amount: "$620.00", reason: "Not Received", status: "won", deadline: "2025-10-15" },
  { id: "DSP-007", transactionId: "TXN-4145", customer: "Robert Kim", amount: "$95.00", reason: "Other", status: "lost", deadline: "2025-10-10" },
  { id: "DSP-008", transactionId: "TXN-4033", customer: "Anna Kowalski", amount: "$540.00", reason: "Not as Described", status: "lost", deadline: "2025-10-05" },
];

const statusConfig: Record<DisputeStatus, { label: string; className: string }> = {
  needs_response: { label: "Needs Response", className: "bg-red-600 text-white hover:bg-red-600" },
  under_review: { label: "Under Review", className: "bg-yellow-500 text-black hover:bg-yellow-500" },
  won: { label: "Won", className: "bg-green-600 text-white hover:bg-green-600" },
  lost: { label: "Lost", className: "bg-gray-100 text-gray-600 hover:bg-gray-100" },
};

function DisputeTable({ disputes }: { disputes: Dispute[] }) {
  return (
    <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute ID</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {disputes.map((dispute) => (
            <tr key={dispute.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{dispute.id}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{dispute.transactionId}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{dispute.customer}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{dispute.amount}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{dispute.reason}</td>
              <td className="px-6 py-4">
                <Badge className={statusConfig[dispute.status].className}>
                  {statusConfig[dispute.status].label}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{dispute.deadline}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-[7px]">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View Details
                  </Button>
                  {dispute.status === "needs_response" && (
                    <>
                      <Button variant="outline" size="sm" className="rounded-[7px]">
                        <Upload className="h-3.5 w-3.5 mr-1" />
                        Submit Evidence
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-[7px]">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Accept
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {disputes.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500">
                No disputes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function DisputeManagement() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDisputes = activeTab === "all"
    ? mockDisputes
    : mockDisputes.filter((dispute) => dispute.status === activeTab);

  return (
    <div className="p-8 space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Open Disputes"
          value="8"
          change="2 need immediate response"
          changeType="negative"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Win Rate"
          value="72%"
          change="+5% from last quarter"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Disputed Amount"
          value="$4,280"
          change="Across all open disputes"
          changeType="neutral"
          icon={DollarSign}
        />
        <MetricCard
          title="Avg Resolution Time"
          value="12 days"
          change="-2 days from last month"
          changeType="positive"
          icon={Clock}
        />
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispute Management</h1>
          <p className="text-gray-500">Track and respond to chargebacks and payment disputes</p>
        </div>
        <Button className="bg-[#1844A6] rounded-[7px] hover:bg-[#1844A6]/90">
          <Shield className="h-4 w-4 mr-2" />
          Dispute Prevention Tips
        </Button>
      </div>

      {/* Tabs and Dispute Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="rounded-[7px]">
          <TabsTrigger value="all" className="rounded-[7px]">
            <FileText className="h-4 w-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger value="needs_response" className="rounded-[7px]">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Needs Response
          </TabsTrigger>
          <TabsTrigger value="under_review" className="rounded-[7px]">
            <Clock className="h-4 w-4 mr-2" />
            Under Review
          </TabsTrigger>
          <TabsTrigger value="won" className="rounded-[7px]">
            <CheckCircle className="h-4 w-4 mr-2" />
            Won
          </TabsTrigger>
          <TabsTrigger value="lost" className="rounded-[7px]">
            <XCircle className="h-4 w-4 mr-2" />
            Lost
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <DisputeTable disputes={filteredDisputes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
