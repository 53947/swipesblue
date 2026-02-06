import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "@/components/MetricCard";

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
      return "bg-swipes-trusted-green text-white";
    case "Inactive":
      return "bg-gray-400 text-white";
    case "Error":
      return "bg-swipes-muted-red text-white";
  }
}

function getResultClasses(result: string): string {
  switch (result) {
    case "Success":
      return "bg-swipes-trusted-green text-white";
    case "Declined":
      return "bg-swipes-gold text-white";
    case "Error":
    case "Failed":
      return "bg-swipes-muted-red text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

export default function MultiGateway() {
  const [showAddGateway, setShowAddGateway] = useState(false);
  const [logFilter, setLogFilter] = useState("all");
  const [logSearch, setLogSearch] = useState("");

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
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Multi-Gateway</h1>
        <p className="text-swipes-pro-gray">
          Configure and manage multiple payment gateways with routing rules, failover, and per-gateway analytics
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Tabs */}
      <Tabs defaultValue="gateways" className="space-y-6">
        <TabsList>
          <TabsTrigger value="gateways">Gateways</TabsTrigger>
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        {/* Gateways Tab */}
        <TabsContent value="gateways" className="space-y-6">
          {/* Gateway Cards */}
          <div className="space-y-4">
            {gateways.map((gw) => (
              <div
                key={gw.id}
                className="bg-white rounded-[7px] border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center">
                      <Layers className="h-6 w-6 text-swipes-blue-deep" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-swipes-black">{gw.name}</h3>
                        <Badge className={getGatewayStatusClasses(gw.status)}>{gw.status}</Badge>
                        <Badge className="bg-swipes-blue-deep text-white">{gw.priority}</Badge>
                        {gw.status === "Active" && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-swipes-trusted-green" />
                            <span className="text-xs text-swipes-trusted-green">Connected</span>
                          </div>
                        )}
                        {gw.status === "Inactive" && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span className="text-xs text-swipes-pro-gray">Not configured</span>
                          </div>
                        )}
                      </div>
                      {gw.status === "Active" && (
                        <div className="flex gap-6 mt-2 text-sm text-swipes-pro-gray">
                          <span>Auth rate: <strong className="text-swipes-black">{gw.authRate}</strong></span>
                          <span>Avg response: <strong className="text-swipes-black">{gw.avgResponse}</strong></span>
                          <span>Today: <strong className="text-swipes-black">{gw.transactionsToday} transactions</strong></span>
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
                      <Button variant="outline" size="sm" className="rounded-[7px] text-swipes-muted-red border-swipes-muted-red">
                        <WifiOff className="h-4 w-4 mr-1" />
                        Disable
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-swipes-trusted-green hover:bg-swipes-trusted-green/90 text-white rounded-[7px]">
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
            className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Gateway
          </Button>

          {showAddGateway && (
            <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-swipes-black">Add New Gateway</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-swipes-black">Gateway Type</Label>
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
                  <Label className="text-sm font-medium text-swipes-black">Label / Nickname</Label>
                  <Input placeholder="e.g., My NMI Gateway" className="rounded-[7px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-swipes-black">API Key</Label>
                  <Input type="password" placeholder="Enter API key" className="rounded-[7px]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-swipes-black">API Secret</Label>
                  <Input type="password" placeholder="Enter API secret" className="rounded-[7px]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Priority</Label>
                <div className="flex gap-3">
                  {["Primary", "Fallback", "Disabled"].map((opt) => (
                    <button
                      key={opt}
                      className="px-4 py-2 rounded-[7px] text-sm font-medium border border-gray-200 bg-white text-swipes-pro-gray hover:border-gray-300 transition-colors"
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
                <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                  Save Gateway
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Routing Rules Tab */}
        <TabsContent value="routing" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Routing Rules</h3>
              <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routingRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium text-swipes-black">{rule.name}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{rule.condition}</TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-blue-deep text-white">{rule.gateway}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">#{rule.priority}</TableCell>
                    <TableCell>
                      <Switch checked={rule.enabled} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="rounded-[7px]">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-swipes-muted-red h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Per-gateway Comparison */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Gateway Comparison</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Auth Rate</TableHead>
                  <TableHead>Avg Response</TableHead>
                  <TableHead>Declines</TableHead>
                  <TableHead>Errors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((row) => (
                  <TableRow key={row.gateway}>
                    <TableCell className="font-medium text-swipes-black">{row.gateway}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{row.transactions}</TableCell>
                    <TableCell className="text-swipes-black">{row.volume}</TableCell>
                    <TableCell>
                      {row.authRate !== "—" ? (
                        <Badge className="bg-swipes-trusted-green text-white">{row.authRate}</Badge>
                      ) : (
                        <span className="text-swipes-pro-gray">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">{row.avgResponse}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{row.declines}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{row.errors}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Auth Rate Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">Authorization Rate</h3>
              <div className="space-y-4">
                {performanceData.filter((r) => r.authRate !== "—").map((row) => (
                  <div key={row.gateway} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-swipes-black">{row.gateway}</span>
                      <span className="text-swipes-pro-gray">{row.authRate}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-swipes-trusted-green rounded-full transition-all"
                        style={{ width: row.authRate }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">Decline Code Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Decline Reason</TableHead>
                    <TableHead>NMI</TableHead>
                    <TableHead>Stripe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {declineBreakdown.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell className="font-medium text-swipes-black">{row.code}</TableCell>
                      <TableCell className="text-swipes-pro-gray">{row.nmi}</TableCell>
                      <TableCell className="text-swipes-pro-gray">{row.stripe}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">Response Time Distribution</h3>
            <div className="space-y-4">
              {[
                { range: "< 200ms", nmi: 35, stripe: 52 },
                { range: "200–300ms", nmi: 48, stripe: 38 },
                { range: "300–500ms", nmi: 12, stripe: 8 },
                { range: "> 500ms", nmi: 5, stripe: 2 },
              ].map((row) => (
                <div key={row.range} className="space-y-2">
                  <span className="text-sm font-medium text-swipes-black">{row.range}</span>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-swipes-pro-gray w-12">NMI</span>
                        <div className="flex-1 h-4 bg-gray-100 rounded-[4px] overflow-hidden">
                          <div
                            className="h-full bg-swipes-blue-deep rounded-[4px]"
                            style={{ width: `${row.nmi}%` }}
                          />
                        </div>
                        <span className="text-xs text-swipes-pro-gray w-8 text-right">{row.nmi}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-swipes-pro-gray w-12">Stripe</span>
                        <div className="flex-1 h-4 bg-gray-100 rounded-[4px] overflow-hidden">
                          <div
                            className="h-full bg-swipes-trusted-green rounded-[4px]"
                            style={{ width: `${row.stripe}%` }}
                          />
                        </div>
                        <span className="text-xs text-swipes-pro-gray w-8 text-right">{row.stripe}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-gray-200">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-swipes-pro-gray" />
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Failover</TableHead>
                  <TableHead>Final</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-swipes-pro-gray text-sm font-mono">{entry.timestamp}</TableCell>
                    <TableCell className="font-medium text-swipes-black font-mono text-sm">{entry.transactionId}</TableCell>
                    <TableCell className="text-swipes-black">{entry.amount}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{entry.initialGateway}</TableCell>
                    <TableCell>
                      <Badge className={getResultClasses(entry.result)}>{entry.result}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">
                      {entry.failoverGateway !== "—" ? (
                        <Badge variant="outline">{entry.failoverGateway}</Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getResultClasses(entry.finalResult)}>{entry.finalResult}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray text-sm">{entry.totalTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
