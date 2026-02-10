import { useState } from "react";
import { useLocation } from "wouter";
import {
  Layers,
  DollarSign,
  Shield,
  AlertTriangle,
  Plus,
  Settings,
  Wifi,
  WifiOff,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowRight,
  Search,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const basePath = "/dashboard/enhance/multi-gateway";

const tabs = [
  { label: "Gateways", href: basePath },
  { label: "Routing Rules", href: `${basePath}?tab=routing` },
  { label: "Performance", href: `${basePath}?tab=performance` },
  { label: "Logs", href: `${basePath}?tab=logs` },
];

interface Gateway {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Error";
  authRate: string;
  avgResponse: string;
  transactionsToday: number;
  priority: "Primary" | "Fallback" | "Disabled";
}

interface RoutingRule {
  id: string;
  name: string;
  condition: string;
  gateway: string;
  priority: number;
  enabled: boolean;
}

interface PerformanceRow {
  gateway: string;
  transactions: number;
  volume: string;
  authRate: string;
  avgResponse: string;
  declines: number;
  errors: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  transactionId: string;
  amount: string;
  initialGateway: string;
  result: "Success" | "Declined" | "Error";
  failoverGateway: string;
  finalResult: "Success" | "Failed";
  totalTime: string;
}

const gateways: Gateway[] = [
  { id: "gw-1", name: "NMI", status: "Active", authRate: "97.2%", avgResponse: "245ms", transactionsToday: 187, priority: "Primary" },
  { id: "gw-2", name: "Stripe", status: "Active", authRate: "96.8%", avgResponse: "198ms", transactionsToday: 58, priority: "Fallback" },
  { id: "gw-3", name: "Authorize.net", status: "Inactive", authRate: "—", avgResponse: "—", transactionsToday: 0, priority: "Disabled" },
];

const routingRules: RoutingRule[] = [
  { id: "rule-1", name: "High-value transactions", condition: "Amount > $500", gateway: "NMI", priority: 1, enabled: true },
  { id: "rule-2", name: "International cards", condition: "Card country ≠ US", gateway: "Stripe", priority: 2, enabled: true },
  { id: "rule-3", name: "Amex transactions", condition: "Card brand = Amex", gateway: "NMI", priority: 3, enabled: true },
  { id: "rule-4", name: "After-hours processing", condition: "Time between 11PM–6AM", gateway: "Stripe", priority: 4, enabled: false },
  { id: "rule-5", name: "Retry on decline", condition: "Decline code = soft decline", gateway: "Fallback gateway", priority: 5, enabled: true },
];

const performanceData: PerformanceRow[] = [
  { gateway: "NMI", transactions: 187, volume: "$9,840", authRate: "97.2%", avgResponse: "245ms", declines: 5, errors: 0 },
  { gateway: "Stripe", transactions: 58, volume: "$2,590", authRate: "96.8%", avgResponse: "198ms", declines: 2, errors: 0 },
  { gateway: "Authorize.net", transactions: 0, volume: "$0", authRate: "—", avgResponse: "—", declines: 0, errors: 0 },
];

const declineBreakdown = [
  { code: "Insufficient funds", nmi: 3, stripe: 1 },
  { code: "Card expired", nmi: 1, stripe: 0 },
  { code: "Do not honor", nmi: 1, stripe: 1 },
  { code: "Invalid card number", nmi: 0, stripe: 0 },
];

const logEntries: LogEntry[] = [
  { id: "log-01", timestamp: "10:45:32", transactionId: "TXN-9012", amount: "$124.50", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "238ms" },
  { id: "log-02", timestamp: "10:44:18", transactionId: "TXN-9011", amount: "$67.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "251ms" },
  { id: "log-03", timestamp: "10:42:55", transactionId: "TXN-9010", amount: "$890.00", initialGateway: "NMI", result: "Declined", failoverGateway: "Stripe", finalResult: "Success", totalTime: "1.2s" },
  { id: "log-04", timestamp: "10:41:12", transactionId: "TXN-9009", amount: "$45.99", initialGateway: "Stripe", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "195ms" },
  { id: "log-05", timestamp: "10:39:48", transactionId: "TXN-9008", amount: "$234.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "267ms" },
  { id: "log-06", timestamp: "10:38:05", transactionId: "TXN-9007", amount: "$1,250.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "312ms" },
  { id: "log-07", timestamp: "10:36:22", transactionId: "TXN-9006", amount: "$78.50", initialGateway: "NMI", result: "Declined", failoverGateway: "Stripe", finalResult: "Success", totalTime: "1.4s" },
  { id: "log-08", timestamp: "10:34:11", transactionId: "TXN-9005", amount: "$156.00", initialGateway: "Stripe", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "201ms" },
  { id: "log-09", timestamp: "10:32:45", transactionId: "TXN-9004", amount: "$99.99", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "228ms" },
  { id: "log-10", timestamp: "10:30:18", transactionId: "TXN-9003", amount: "$342.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "255ms" },
  { id: "log-11", timestamp: "10:28:02", transactionId: "TXN-9002", amount: "$67.50", initialGateway: "Stripe", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "189ms" },
  { id: "log-12", timestamp: "10:25:33", transactionId: "TXN-9001", amount: "$445.00", initialGateway: "NMI", result: "Declined", failoverGateway: "Stripe", finalResult: "Failed", totalTime: "2.1s" },
  { id: "log-13", timestamp: "10:23:14", transactionId: "TXN-9000", amount: "$28.99", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "241ms" },
  { id: "log-14", timestamp: "10:21:50", transactionId: "TXN-8999", amount: "$189.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "233ms" },
  { id: "log-15", timestamp: "10:19:28", transactionId: "TXN-8998", amount: "$56.75", initialGateway: "Stripe", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "204ms" },
  { id: "log-16", timestamp: "10:17:05", transactionId: "TXN-8997", amount: "$723.00", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "278ms" },
  { id: "log-17", timestamp: "10:15:42", transactionId: "TXN-8996", amount: "$34.50", initialGateway: "NMI", result: "Success", failoverGateway: "—", finalResult: "Success", totalTime: "219ms" },
];

function getGatewayStatusClasses(status: Gateway["status"]): string {
  switch (status) {
    case "Active":
      return "bg-green-600 text-white";
    case "Inactive":
      return "bg-gray-400 text-white";
    case "Error":
      return "bg-red-600 text-white";
  }
}

function getResultClasses(result: string): string {
  switch (result) {
    case "Success":
      return "bg-green-600 text-white";
    case "Declined":
      return "bg-yellow-500 text-white";
    case "Error":
    case "Failed":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

export default function MultiGateway() {
  const [showAddGateway, setShowAddGateway] = useState(false);
  const [logFilter, setLogFilter] = useState("all");
  const [logSearch, setLogSearch] = useState("");
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "gateways";

  const filteredLogs = logEntries.filter((entry) => {
    const matchesFilter =
      logFilter === "all" ||
      (logFilter === "success" && entry.finalResult === "Success" && entry.failoverGateway === "—") ||
      (logFilter === "failover" && entry.failoverGateway !== "—") ||
      (logFilter === "failed" && entry.finalResult === "Failed");
    const matchesSearch =
      logSearch === "" ||
      entry.transactionId.toLowerCase().includes(logSearch.toLowerCase()) ||
      entry.initialGateway.toLowerCase().includes(logSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <p className="text-gray-500 mb-6">
        Configure and manage multiple payment gateways with routing rules, failover, and per-gateway analytics
      </p>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Gateways"
          value="2 of 3"
          change="NMI (Primary), Stripe (Fallback)"
          changeType="neutral"
          icon={Layers}
        />
        <MetricCard
          title="Total Processed Today"
          value="$12,430"
          change="+18.2% from yesterday"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Overall Auth Rate"
          value="96.8%"
          change="+0.4% from last week"
          changeType="positive"
          icon={Shield}
        />
        <MetricCard
          title="Failover Events Today"
          value="3"
          change="2 recovered, 1 failed"
          changeType="neutral"
          icon={AlertTriangle}
        />
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Gateways Tab */}
      {activeTab === "gateways" && (
        <div className="space-y-6">
          {/* Gateway Cards */}
          <div className="space-y-4">
            {gateways.map((gw) => (
              <div
                key={gw.id}
                className="bg-white rounded-[7px] border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[7px] bg-[#1844A6]/10 flex items-center justify-center">
                      <Layers className="h-6 w-6 text-[#1844A6]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{gw.name}</h3>
                        <Badge className={`rounded-full ${getGatewayStatusClasses(gw.status)}`}>{gw.status}</Badge>
                        <Badge className="rounded-full bg-[#1844A6] text-white">{gw.priority}</Badge>
                        {gw.status === "Active" && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                            <span className="text-xs text-green-600">Connected</span>
                          </div>
                        )}
                        {gw.status === "Inactive" && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span className="text-xs text-gray-500">Not configured</span>
                          </div>
                        )}
                      </div>
                      {gw.status === "Active" && (
                        <div className="flex gap-6 mt-2 text-sm text-gray-500">
                          <span>Auth rate: <strong className="text-gray-900">{gw.authRate}</strong></span>
                          <span>Avg response: <strong className="text-gray-900">{gw.avgResponse}</strong></span>
                          <span>Today: <strong className="text-gray-900">{gw.transactionsToday} transactions</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-[7px]">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-[7px]">
                      <Wifi className="h-4 w-4 mr-1" />
                      Test
                    </Button>
                    {gw.status === "Active" ? (
                      <Button variant="outline" size="sm" className="rounded-[7px] text-red-600 border-red-600">
                        <WifiOff className="h-4 w-4 mr-1" />
                        Disable
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-green-600 hover:bg-green-600/90 text-white rounded-[7px]">
                        Enable
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Gateway */}
          <Button
            onClick={() => setShowAddGateway(!showAddGateway)}
            className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Gateway
          </Button>

          {showAddGateway && (
            <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Gateway</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Gateway Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-[7px]">
                      <SelectValue placeholder="Select gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nmi">NMI</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="authnet">Authorize.net</SelectItem>
                      <SelectItem value="braintree">Braintree</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="adyen">Adyen</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Label / Nickname</Label>
                  <Input placeholder="e.g., My NMI Gateway" className="rounded-[7px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">API Key</Label>
                  <Input type="password" placeholder="Enter API key" className="rounded-[7px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">API Secret</Label>
                  <Input type="password" placeholder="Enter API secret" className="rounded-[7px]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Priority</Label>
                <div className="flex gap-3">
                  {["Primary", "Fallback", "Disabled"].map((opt) => (
                    <button
                      key={opt}
                      className="px-4 py-2 rounded-[7px] text-sm font-medium border border-gray-200 bg-white text-gray-500 hover:border-gray-300 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="rounded-[7px]">
                  <Wifi className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
                  Save Gateway
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Routing Rules Tab */}
      {activeTab === "routing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Routing Rules</h3>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rule Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Condition</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Gateway</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routingRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{rule.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{rule.condition}</td>
                    <td className="px-4 py-3">
                      <Badge className="rounded-full bg-[#1844A6] text-white">{rule.gateway}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">#{rule.priority}</td>
                    <td className="px-4 py-3">
                      <Switch checked={rule.enabled} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="rounded-[7px]">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          {/* Per-gateway Comparison */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Gateway Comparison</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Gateway</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Transactions</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Volume</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Auth Rate</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Avg Response</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Declines</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Errors</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((row) => (
                  <tr key={row.gateway} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.gateway}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.transactions}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.volume}</td>
                    <td className="px-4 py-3">
                      {row.authRate !== "—" ? (
                        <Badge className="rounded-full bg-green-600 text-white">{row.authRate}</Badge>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.avgResponse}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.declines}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Auth Rate Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authorization Rate</h3>
              <div className="space-y-4">
                {performanceData.filter((r) => r.authRate !== "—").map((row) => (
                  <div key={row.gateway} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{row.gateway}</span>
                      <span className="text-gray-500">{row.authRate}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all"
                        style={{ width: row.authRate }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Decline Code Breakdown</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Decline Reason</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">NMI</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stripe</th>
                  </tr>
                </thead>
                <tbody>
                  {declineBreakdown.map((row) => (
                    <tr key={row.code} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.nmi}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.stripe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
            <div className="space-y-4">
              {[
                { range: "< 200ms", nmi: 35, stripe: 52 },
                { range: "200–300ms", nmi: 48, stripe: 38 },
                { range: "300–500ms", nmi: 12, stripe: 8 },
                { range: "> 500ms", nmi: 5, stripe: 2 },
              ].map((row) => (
                <div key={row.range} className="space-y-2">
                  <span className="text-sm font-medium text-gray-900">{row.range}</span>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 w-12">NMI</span>
                        <div className="flex-1 h-4 bg-gray-100 rounded-[4px] overflow-hidden">
                          <div
                            className="h-full bg-[#1844A6] rounded-[4px]"
                            style={{ width: `${row.nmi}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{row.nmi}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-12">Stripe</span>
                        <div className="flex-1 h-4 bg-gray-100 rounded-[4px] overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-[4px]"
                            style={{ width: `${row.stripe}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{row.stripe}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-gray-200">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by transaction ID or gateway..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  className="pl-9 rounded-[7px]"
                />
              </div>
              <Select value={logFilter} onValueChange={setLogFilter}>
                <SelectTrigger className="w-[150px] rounded-[7px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failover">Failover</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Gateway</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Result</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Failover</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Final</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{entry.timestamp}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 font-mono">{entry.transactionId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{entry.initialGateway}</td>
                    <td className="px-4 py-3">
                      <Badge className={`rounded-full ${getResultClasses(entry.result)}`}>{entry.result}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {entry.failoverGateway !== "—" ? (
                        <Badge variant="outline" className="rounded-full">{entry.failoverGateway}</Badge>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`rounded-full ${getResultClasses(entry.finalResult)}`}>{entry.finalResult}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{entry.totalTime}</td>
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
