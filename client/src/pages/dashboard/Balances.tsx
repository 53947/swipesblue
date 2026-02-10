import { useLocation } from "wouter";
import { Wallet, ArrowDownRight, ArrowUpRight, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Overview", href: "/dashboard/balances" },
  { label: "Payouts", href: "/dashboard/balances?tab=payouts" },
  { label: "Deposits", href: "/dashboard/balances?tab=deposits" },
  { label: "Fees", href: "/dashboard/balances?tab=fees" },
];

const mockPayouts = [
  { id: "po-001", date: "2025-10-22", amount: "$1,250.00", status: "completed", bank: "Chase ****4567" },
  { id: "po-002", date: "2025-10-15", amount: "$890.50", status: "completed", bank: "Chase ****4567" },
  { id: "po-003", date: "2025-10-08", amount: "$2,100.00", status: "completed", bank: "Chase ****4567" },
];

const mockFees = [
  { id: "fee-001", date: "2025-10-24", description: "Processing fee — TXN-001", amount: "$3.68", rate: "2.70% + $0.30" },
  { id: "fee-002", date: "2025-10-24", description: "Processing fee — TXN-002", amount: "$2.72", rate: "2.70% + $0.30" },
  { id: "fee-003", date: "2025-10-23", description: "Processing fee — TXN-003", amount: "$7.05", rate: "2.70% + $0.30" },
  { id: "fee-004", date: "2025-10-23", description: "Processing fee — TXN-004 (failed)", amount: "$0.00", rate: "No charge" },
  { id: "fee-005", date: "2025-10-22", description: "Processing fee — TXN-005", amount: "$5.70", rate: "2.70% + $0.30" },
];

export default function Balances() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "overview";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balances</h1>
          <p className="text-gray-500 mt-1">Track your incoming payments, available balance, and payouts</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Balance Summary Cards — always visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-[7px]">
                <ArrowDownRight className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Incoming</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$1,245.50</p>
            <p className="text-xs text-gray-400 mt-1">Processing in 2-3 business days</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 rounded-[7px]">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Available</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$4,890.25</p>
            <p className="text-xs text-gray-400 mt-1">Ready for payout</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-50 rounded-[7px]">
                <ArrowUpRight className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Total Paid Out</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$24,340.50</p>
            <p className="text-xs text-gray-400 mt-1">Last payout: Oct 22, 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Content */}
      {(activeTab === "overview" || activeTab === "payouts") && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {activeTab === "overview" ? "Recent Payouts" : "Payout History"}
          </h3>
          {mockPayouts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
              <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No payouts yet</h3>
              <p className="text-gray-500 text-sm">Payouts will appear here once you start processing payments.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payout ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bank Account</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{payout.date}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{payout.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payout.bank}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{payout.amount}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {payout.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "deposits" && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Deposit History</h3>
          <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deposits coming soon</h3>
            <p className="text-gray-500 text-sm">Direct deposit tracking will be available as you process more payments.</p>
          </div>
        </div>
      )}

      {activeTab === "fees" && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Processing Fees</h3>
          <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fee</th>
                </tr>
              </thead>
              <tbody>
                {mockFees.map((fee) => (
                  <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{fee.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{fee.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{fee.rate}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
