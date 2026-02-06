import { useState } from "react";
import {
  FileText,
  Landmark,
  List,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Users,
  Receipt,
  Activity,
  DollarSign,
  Shield,
  Download,
  Calendar,
  Clock,
  HardDrive,
  Plus,
  Pause,
  Play,
  Trash2,
  Edit,
  RotateCcw,
  Loader2,
  CheckCircle,
  XCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Available reports data
const availableReports = [
  {
    name: "Daily Settlement Report",
    icon: Landmark,
    description: "End-of-day settlement summary with batch totals, fees, and net deposits",
    formats: ["CSV", "PDF"],
  },
  {
    name: "Transaction Detail Export",
    icon: List,
    description: "Complete transaction data with all fields including customer info, card details (masked), and gateway responses",
    formats: ["CSV", "XLSX"],
  },
  {
    name: "Monthly Revenue Summary",
    icon: TrendingUp,
    description: "Month-over-month revenue breakdown by payment method, product, and channel",
    formats: ["PDF", "CSV"],
  },
  {
    name: "Chargeback & Dispute Report",
    icon: AlertTriangle,
    description: "All disputes, chargebacks, and representments with reason codes and outcomes",
    formats: ["CSV", "PDF"],
  },
  {
    name: "Recurring Billing Report",
    icon: RefreshCw,
    description: "Subscription status, upcoming renewals, failed rebills, and churn metrics",
    formats: ["CSV", "PDF"],
  },
  {
    name: "Customer Payment Report",
    icon: Users,
    description: "Customer-level payment activity including stored cards, lifetime value, and payment history",
    formats: ["CSV", "XLSX"],
  },
  {
    name: "Tax Summary Report",
    icon: Receipt,
    description: "Tax collected by jurisdiction, ready for filing. Includes transaction-level tax detail",
    formats: ["PDF", "CSV"],
  },
  {
    name: "Gateway Performance Report",
    icon: Activity,
    description: "Authorization rates, decline codes, response times, and gateway health metrics",
    formats: ["PDF", "CSV"],
  },
  {
    name: "Fee & Rate Analysis",
    icon: DollarSign,
    description: "Breakdown of processing fees, interchange costs, and effective rate by card type",
    formats: ["PDF", "CSV", "XLSX"],
  },
  {
    name: "Fraud & Risk Report",
    icon: Shield,
    description: "Flagged transactions, fraud rule triggers, risk scores, and false positive rates",
    formats: ["PDF", "CSV"],
  },
];

// Scheduled reports mock data
const mockScheduledReports = [
  { id: "SCH-001", name: "Daily Settlement Report", frequency: "Daily", format: "CSV", recipients: "finance@acme.com", nextRun: "2025-11-16 06:00 AM", status: "Active" as const },
  { id: "SCH-002", name: "Monthly Revenue Summary", frequency: "Monthly", format: "PDF", recipients: "cfo@acme.com, finance@acme.com", nextRun: "2025-12-01 08:00 AM", status: "Active" as const },
  { id: "SCH-003", name: "Chargeback & Dispute Report", frequency: "Weekly", format: "CSV", recipients: "risk@acme.com", nextRun: "2025-11-18 07:00 AM", status: "Active" as const },
  { id: "SCH-004", name: "Transaction Detail Export", frequency: "Daily", format: "XLSX", recipients: "ops@acme.com", nextRun: "2025-11-16 06:30 AM", status: "Paused" as const },
  { id: "SCH-005", name: "Fraud & Risk Report", frequency: "Weekly", format: "PDF", recipients: "security@acme.com, risk@acme.com", nextRun: "2025-11-20 09:00 AM", status: "Active" as const },
];

// History mock data
const mockHistoryReports = [
  { id: "RPT-001", name: "Daily Settlement Report", generatedDate: "2025-11-15 06:00 AM", dateRange: "Nov 14, 2025", format: "CSV", size: "245 KB", status: "Ready" as const },
  { id: "RPT-002", name: "Transaction Detail Export", generatedDate: "2025-11-15 06:30 AM", dateRange: "Nov 14, 2025", format: "XLSX", size: "1.2 MB", status: "Ready" as const },
  { id: "RPT-003", name: "Monthly Revenue Summary", generatedDate: "2025-11-15 10:15 AM", dateRange: "Oct 1–31, 2025", format: "PDF", size: "890 KB", status: "Ready" as const },
  { id: "RPT-004", name: "Fraud & Risk Report", generatedDate: "2025-11-15 11:00 AM", dateRange: "Nov 8–14, 2025", format: "PDF", size: "—", status: "Processing" as const },
  { id: "RPT-005", name: "Daily Settlement Report", generatedDate: "2025-11-14 06:00 AM", dateRange: "Nov 13, 2025", format: "CSV", size: "238 KB", status: "Ready" as const },
  { id: "RPT-006", name: "Chargeback & Dispute Report", generatedDate: "2025-11-14 07:00 AM", dateRange: "Nov 7–13, 2025", format: "CSV", size: "156 KB", status: "Ready" as const },
  { id: "RPT-007", name: "Customer Payment Report", generatedDate: "2025-11-13 09:00 AM", dateRange: "Oct 1–Nov 13, 2025", format: "XLSX", size: "2.1 MB", status: "Ready" as const },
  { id: "RPT-008", name: "Gateway Performance Report", generatedDate: "2025-11-13 02:30 PM", dateRange: "Nov 6–12, 2025", format: "PDF", size: "—", status: "Failed" as const },
  { id: "RPT-009", name: "Daily Settlement Report", generatedDate: "2025-11-13 06:00 AM", dateRange: "Nov 12, 2025", format: "CSV", size: "251 KB", status: "Ready" as const },
  { id: "RPT-010", name: "Tax Summary Report", generatedDate: "2025-11-12 08:00 AM", dateRange: "Q3 2025", format: "PDF", size: "1.8 MB", status: "Ready" as const },
  { id: "RPT-011", name: "Recurring Billing Report", generatedDate: "2025-11-12 09:30 AM", dateRange: "Oct 1–31, 2025", format: "CSV", size: "420 KB", status: "Ready" as const },
  { id: "RPT-012", name: "Fee & Rate Analysis", generatedDate: "2025-11-11 10:00 AM", dateRange: "Oct 1–31, 2025", format: "PDF", size: "675 KB", status: "Ready" as const },
  { id: "RPT-013", name: "Daily Settlement Report", generatedDate: "2025-11-11 06:00 AM", dateRange: "Nov 10, 2025", format: "CSV", size: "229 KB", status: "Ready" as const },
  { id: "RPT-014", name: "Transaction Detail Export", generatedDate: "2025-11-10 06:30 AM", dateRange: "Nov 9, 2025", format: "XLSX", size: "1.1 MB", status: "Ready" as const },
  { id: "RPT-015", name: "Fraud & Risk Report", generatedDate: "2025-11-10 09:00 AM", dateRange: "Nov 3–9, 2025", format: "PDF", size: "540 KB", status: "Ready" as const },
  { id: "RPT-016", name: "Daily Settlement Report", generatedDate: "2025-11-09 06:00 AM", dateRange: "Nov 8, 2025", format: "CSV", size: "210 KB", status: "Ready" as const },
  { id: "RPT-017", name: "Monthly Revenue Summary", generatedDate: "2025-11-01 08:00 AM", dateRange: "Sep 1–30, 2025", format: "PDF", size: "920 KB", status: "Ready" as const },
  { id: "RPT-018", name: "Chargeback & Dispute Report", generatedDate: "2025-11-07 07:00 AM", dateRange: "Oct 31–Nov 6, 2025", format: "CSV", size: "132 KB", status: "Ready" as const },
];

// Custom builder field definitions
const dataSourceFields: Record<string, { label: string; checked: boolean }[]> = {
  Transactions: [
    { label: "Transaction ID", checked: true },
    { label: "Date", checked: true },
    { label: "Amount", checked: true },
    { label: "Currency", checked: true },
    { label: "Status", checked: true },
    { label: "Card Type", checked: true },
    { label: "Last 4", checked: true },
    { label: "Customer Name", checked: false },
    { label: "Email", checked: false },
    { label: "Order ID", checked: false },
    { label: "Gateway Response", checked: false },
    { label: "Fee", checked: false },
    { label: "Net", checked: false },
  ],
  Customers: [
    { label: "Customer ID", checked: true },
    { label: "Name", checked: true },
    { label: "Email", checked: true },
    { label: "Phone", checked: false },
    { label: "Cards on File", checked: false },
    { label: "Total Spent", checked: true },
    { label: "Transaction Count", checked: true },
    { label: "First Purchase", checked: false },
    { label: "Last Purchase", checked: false },
  ],
  Subscriptions: [
    { label: "Subscription ID", checked: true },
    { label: "Customer Name", checked: true },
    { label: "Plan Name", checked: true },
    { label: "Amount", checked: true },
    { label: "Status", checked: true },
    { label: "Start Date", checked: false },
    { label: "Next Billing", checked: false },
    { label: "Failed Attempts", checked: false },
  ],
  Settlements: [
    { label: "Batch ID", checked: true },
    { label: "Settlement Date", checked: true },
    { label: "Transaction Count", checked: true },
    { label: "Gross Amount", checked: true },
    { label: "Fees", checked: true },
    { label: "Net Amount", checked: true },
    { label: "Status", checked: true },
  ],
  Disputes: [
    { label: "Dispute ID", checked: true },
    { label: "Transaction ID", checked: true },
    { label: "Amount", checked: true },
    { label: "Reason Code", checked: true },
    { label: "Status", checked: true },
    { label: "Customer Name", checked: false },
    { label: "Filed Date", checked: false },
    { label: "Deadline", checked: false },
  ],
};

interface FilterRow {
  id: number;
  field: string;
  operator: string;
  value: string;
}

export default function Reporting() {
  const [dateRange, setDateRange] = useState("30 Days");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [activeTab, setActiveTab] = useState("available");

  // History filters
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const [historyStatusFilter, setHistoryStatusFilter] = useState("all");

  // Custom builder state
  const [builderStep, setBuilderStep] = useState(1);
  const [builderDataSource, setBuilderDataSource] = useState("Transactions");
  const [builderColumns, setBuilderColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    dataSourceFields["Transactions"].forEach((f) => {
      initial[f.label] = f.checked;
    });
    return initial;
  });
  const [builderFilters, setBuilderFilters] = useState<FilterRow[]>([
    { id: 1, field: "", operator: "equals", value: "" },
  ]);
  const [builderFilterLogic, setBuilderFilterLogic] = useState<"AND" | "OR">("AND");
  const [builderFormat, setBuilderFormat] = useState("CSV");
  const [builderDelivery, setBuilderDelivery] = useState("download");
  const [builderEmail, setBuilderEmail] = useState("");
  const [builderFrequency, setBuilderFrequency] = useState("daily");

  const handleDataSourceChange = (source: string) => {
    setBuilderDataSource(source);
    const initial: Record<string, boolean> = {};
    dataSourceFields[source].forEach((f) => {
      initial[f.label] = f.checked;
    });
    setBuilderColumns(initial);
  };

  const toggleColumn = (label: string) => {
    setBuilderColumns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const selectAllColumns = () => {
    const updated: Record<string, boolean> = {};
    dataSourceFields[builderDataSource].forEach((f) => {
      updated[f.label] = true;
    });
    setBuilderColumns(updated);
  };

  const deselectAllColumns = () => {
    const updated: Record<string, boolean> = {};
    dataSourceFields[builderDataSource].forEach((f) => {
      updated[f.label] = false;
    });
    setBuilderColumns(updated);
  };

  const addFilter = () => {
    setBuilderFilters((prev) => [
      ...prev,
      { id: Date.now(), field: "", operator: "equals", value: "" },
    ]);
  };

  const removeFilter = (id: number) => {
    setBuilderFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFilter = (id: number, key: keyof FilterRow, value: string) => {
    setBuilderFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  // Filter history reports
  const filteredHistory = mockHistoryReports.filter((r) => {
    if (historyTypeFilter !== "all" && r.name !== historyTypeFilter) return false;
    if (historyStatusFilter !== "all" && r.status !== historyStatusFilter) return false;
    return true;
  });

  const historyStatusBadge = (status: "Ready" | "Processing" | "Failed") => {
    if (status === "Ready") {
      return (
        <Badge className="bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green">
          <CheckCircle className="h-3 w-3 mr-1" />
          Ready
        </Badge>
      );
    }
    if (status === "Processing") {
      return (
        <Badge className="bg-swipes-gold text-black hover:bg-swipes-gold">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Processing
        </Badge>
      );
    }
    return (
      <Badge className="bg-swipes-muted-red text-white hover:bg-swipes-muted-red">
        <XCircle className="h-3 w-3 mr-1" />
        Failed
      </Badge>
    );
  };

  const currentFields = dataSourceFields[builderDataSource] || [];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-swipes-black">Reporting</h1>
          <p className="text-swipes-pro-gray">Generate, schedule, and download reports for your business</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date range presets */}
          <div className="flex items-center gap-1 bg-white rounded-[7px] border border-gray-200 p-1">
            {["Today", "7 Days", "30 Days", "90 Days", "This Year"].map((preset) => (
              <button
                key={preset}
                onClick={() => setDateRange(preset)}
                className={`px-3 py-1.5 text-sm rounded-[5px] transition-colors ${
                  dateRange === preset
                    ? "bg-swipes-blue-deep text-white"
                    : "text-swipes-pro-gray hover:bg-gray-100"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          {/* Custom date inputs */}
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={customFrom}
              onChange={(e) => {
                setCustomFrom(e.target.value);
                setDateRange("custom");
              }}
              className="h-9 rounded-[7px] text-sm w-36"
              placeholder="From"
            />
            <span className="text-swipes-pro-gray text-sm">to</span>
            <Input
              type="date"
              value={customTo}
              onChange={(e) => {
                setCustomTo(e.target.value);
                setDateRange("custom");
              }}
              className="h-9 rounded-[7px] text-sm w-36"
              placeholder="To"
            />
          </div>
          <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Reports Generated This Month", value: "47", icon: FileText },
          { label: "Scheduled Reports", value: "5 active", icon: Calendar },
          { label: "Last Generated", value: "2 hours ago", icon: Clock },
          { label: "Data Export Size", value: "12.4 MB total", icon: HardDrive },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-[7px] border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-swipes-pro-gray">{metric.label}</span>
                <Icon className="h-5 w-5 text-swipes-blue-deep" />
              </div>
              <p className="text-2xl font-bold text-swipes-black">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200 rounded-[7px] p-1">
          <TabsTrigger value="available" className="rounded-[5px] data-[state=active]:bg-swipes-blue-deep data-[state=active]:text-white">
            Available Reports
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="rounded-[5px] data-[state=active]:bg-swipes-blue-deep data-[state=active]:text-white">
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-[5px] data-[state=active]:bg-swipes-blue-deep data-[state=active]:text-white">
            History
          </TabsTrigger>
          <TabsTrigger value="builder" className="rounded-[5px] data-[state=active]:bg-swipes-blue-deep data-[state=active]:text-white">
            Custom Builder
          </TabsTrigger>
        </TabsList>

        {/* Available Reports Tab */}
        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {availableReports.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.name} className="bg-white rounded-[7px] border border-gray-200 p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-swipes-blue-deep" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-swipes-black mb-1">{report.name}</h3>
                    <p className="text-sm text-swipes-pro-gray mb-3">{report.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {report.formats.map((fmt) => (
                          <Badge key={fmt} variant="outline" className="text-xs rounded-[5px] text-swipes-pro-gray">
                            {fmt}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-swipes-pro-gray">{mockScheduledReports.length} scheduled reports</p>
            <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Report Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Frequency</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Format</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Recipients</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Next Run</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockScheduledReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-swipes-black">{report.name}</td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray">{report.frequency}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-xs rounded-[5px]">{report.format}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray max-w-[200px] truncate">{report.recipients}</td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray">{report.nextRun}</td>
                    <td className="px-6 py-4">
                      <Badge className={
                        report.status === "Active"
                          ? "bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-200"
                      }>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px]" title="Edit">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px]" title={report.status === "Active" ? "Pause" : "Resume"}>
                          {report.status === "Active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px] text-swipes-muted-red hover:text-swipes-muted-red" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={historyTypeFilter} onValueChange={setHistoryTypeFilter}>
              <SelectTrigger className="w-[220px] rounded-[7px]">
                <SelectValue placeholder="Filter by report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Report Types</SelectItem>
                {Array.from(new Set(mockHistoryReports.map((r) => r.name))).map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={historyStatusFilter} onValueChange={setHistoryStatusFilter}>
              <SelectTrigger className="w-[160px] rounded-[7px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-swipes-pro-gray">{filteredHistory.length} reports</span>
          </div>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Report Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Generated</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Date Range</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Format</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Size</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHistory.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-swipes-black">{report.name}</td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray">{report.generatedDate}</td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray">{report.dateRange}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-xs rounded-[5px]">{report.format}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-swipes-pro-gray">{report.size}</td>
                    <td className="px-6 py-4">{historyStatusBadge(report.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {report.status === "Ready" && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px]" title="Download">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {report.status === "Failed" && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px]" title="Regenerate">
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[7px] text-swipes-muted-red hover:text-swipes-muted-red" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-swipes-pro-gray">
                      No reports match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Custom Builder Tab */}
        <TabsContent value="builder" className="mt-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[
                { num: 1, label: "Data Source" },
                { num: 2, label: "Columns" },
                { num: 3, label: "Filters" },
                { num: 4, label: "Format & Delivery" },
              ].map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                  <button
                    onClick={() => setBuilderStep(step.num)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[7px] text-sm font-medium transition-colors ${
                      builderStep === step.num
                        ? "bg-swipes-blue-deep text-white"
                        : builderStep > step.num
                        ? "bg-swipes-trusted-green/10 text-swipes-trusted-green"
                        : "bg-gray-100 text-swipes-pro-gray"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      builderStep === step.num
                        ? "bg-white/20 text-white"
                        : builderStep > step.num
                        ? "bg-swipes-trusted-green text-white"
                        : "bg-gray-300 text-white"
                    }`}>
                      {builderStep > step.num ? "✓" : step.num}
                    </span>
                    {step.label}
                  </button>
                  {i < 3 && <ChevronRight className="h-4 w-4 text-gray-300" />}
                </div>
              ))}
            </div>

            {/* Step 1 — Data Source */}
            {builderStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-swipes-black">Step 1 — Select Data Source</h3>
                <p className="text-sm text-swipes-pro-gray">Choose the type of data you want to include in your report.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
                  {Object.keys(dataSourceFields).map((source) => (
                    <button
                      key={source}
                      onClick={() => handleDataSourceChange(source)}
                      className={`p-4 rounded-[7px] border-2 text-sm font-medium transition-colors text-center ${
                        builderDataSource === source
                          ? "border-swipes-blue-deep bg-swipes-blue-deep/5 text-swipes-blue-deep"
                          : "border-gray-200 text-swipes-pro-gray hover:border-gray-300"
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setBuilderStep(2)}
                    className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]"
                  >
                    Next: Columns
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 — Columns */}
            {builderStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-swipes-black">Step 2 — Select Columns</h3>
                    <p className="text-sm text-swipes-pro-gray">Choose which fields to include for <span className="font-medium text-swipes-black">{builderDataSource}</span>.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-[7px]" onClick={selectAllColumns}>Select All</Button>
                    <Button variant="outline" size="sm" className="rounded-[7px]" onClick={deselectAllColumns}>Deselect All</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                  {currentFields.map((field) => (
                    <label
                      key={field.label}
                      className={`flex items-center gap-3 p-3 rounded-[7px] border cursor-pointer transition-colors ${
                        builderColumns[field.label]
                          ? "border-swipes-blue-deep bg-swipes-blue-deep/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Checkbox
                        checked={builderColumns[field.label] || false}
                        onCheckedChange={() => toggleColumn(field.label)}
                      />
                      <span className="text-sm text-swipes-black">{field.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setBuilderStep(1)} className="rounded-[7px]">
                    Back
                  </Button>
                  <Button
                    onClick={() => setBuilderStep(3)}
                    className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]"
                  >
                    Next: Filters
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 — Filters */}
            {builderStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-swipes-black">Step 3 — Add Filters</h3>
                <p className="text-sm text-swipes-pro-gray">Narrow down the data included in your report. Filters are optional.</p>

                {builderFilters.length > 1 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Label className="text-sm text-swipes-pro-gray">Combine filters with:</Label>
                    <div className="flex items-center gap-1 bg-white rounded-[7px] border border-gray-200 p-1">
                      {(["AND", "OR"] as const).map((logic) => (
                        <button
                          key={logic}
                          onClick={() => setBuilderFilterLogic(logic)}
                          className={`px-3 py-1 text-sm rounded-[5px] transition-colors ${
                            builderFilterLogic === logic
                              ? "bg-swipes-blue-deep text-white"
                              : "text-swipes-pro-gray hover:bg-gray-100"
                          }`}
                        >
                          {logic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  {builderFilters.map((filter, idx) => (
                    <div key={filter.id} className="flex items-center gap-3">
                      {idx > 0 && (
                        <span className="text-xs font-medium text-swipes-pro-gray w-8 text-center">{builderFilterLogic}</span>
                      )}
                      {idx === 0 && builderFilters.length > 1 && <div className="w-8" />}
                      <Select value={filter.field} onValueChange={(v) => updateFilter(filter.id, "field", v)}>
                        <SelectTrigger className="w-[180px] rounded-[7px]">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentFields.map((f) => (
                            <SelectItem key={f.label} value={f.label}>{f.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={filter.operator} onValueChange={(v) => updateFilter(filter.id, "operator", v)}>
                        <SelectTrigger className="w-[160px] rounded-[7px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="greater_than">Greater than</SelectItem>
                          <SelectItem value="less_than">Less than</SelectItem>
                          <SelectItem value="between">Between</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                        placeholder="Value"
                        className="flex-1 rounded-[7px]"
                      />
                      {builderFilters.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-[7px] text-swipes-muted-red hover:text-swipes-muted-red"
                          onClick={() => removeFilter(filter.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="rounded-[7px]" onClick={addFilter}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Filter
                </Button>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setBuilderStep(2)} className="rounded-[7px]">
                    Back
                  </Button>
                  <Button
                    onClick={() => setBuilderStep(4)}
                    className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]"
                  >
                    Next: Format & Delivery
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4 — Format & Delivery */}
            {builderStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-swipes-black">Step 4 — Format & Delivery</h3>
                <p className="text-sm text-swipes-pro-gray">Choose how you want your report formatted and delivered.</p>

                {/* Format */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-swipes-black">Format</Label>
                  <div className="flex items-center gap-3">
                    {["CSV", "XLSX", "PDF"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setBuilderFormat(fmt)}
                        className={`px-4 py-2 rounded-[7px] border-2 text-sm font-medium transition-colors ${
                          builderFormat === fmt
                            ? "border-swipes-blue-deep bg-swipes-blue-deep/5 text-swipes-blue-deep"
                            : "border-gray-200 text-swipes-pro-gray hover:border-gray-300"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-swipes-black">Delivery</Label>
                  <div className="space-y-3">
                    {[
                      { value: "download", label: "Download now" },
                      { value: "email", label: "Email to" },
                      { value: "schedule", label: "Schedule" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-[7px] border-2 cursor-pointer transition-colors ${
                          builderDelivery === option.value
                            ? "border-swipes-blue-deep bg-swipes-blue-deep/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value={option.value}
                          checked={builderDelivery === option.value}
                          onChange={(e) => setBuilderDelivery(e.target.value)}
                          className="mt-0.5 accent-[#1844A6]"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-swipes-black">{option.label}</span>
                          {option.value === "email" && builderDelivery === "email" && (
                            <Input
                              value={builderEmail}
                              onChange={(e) => setBuilderEmail(e.target.value)}
                              placeholder="recipient@example.com"
                              className="mt-2 rounded-[7px]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          )}
                          {option.value === "schedule" && builderDelivery === "schedule" && (
                            <Select value={builderFrequency} onValueChange={setBuilderFrequency}>
                              <SelectTrigger className="w-[200px] mt-2 rounded-[7px]" onClick={(e) => e.stopPropagation()}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-[7px] p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-swipes-black">Report Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-swipes-pro-gray">Data Source:</span>
                    <span className="text-swipes-black font-medium">{builderDataSource}</span>
                    <span className="text-swipes-pro-gray">Columns:</span>
                    <span className="text-swipes-black font-medium">
                      {Object.values(builderColumns).filter(Boolean).length} selected
                    </span>
                    <span className="text-swipes-pro-gray">Filters:</span>
                    <span className="text-swipes-black font-medium">
                      {builderFilters.filter((f) => f.field && f.value).length} active
                    </span>
                    <span className="text-swipes-pro-gray">Format:</span>
                    <span className="text-swipes-black font-medium">{builderFormat}</span>
                    <span className="text-swipes-pro-gray">Delivery:</span>
                    <span className="text-swipes-black font-medium capitalize">{builderDelivery === "email" ? `Email to ${builderEmail || "..."}` : builderDelivery === "schedule" ? `Scheduled (${builderFrequency})` : "Download now"}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setBuilderStep(3)} className="rounded-[7px]">
                    Back
                  </Button>
                  <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
