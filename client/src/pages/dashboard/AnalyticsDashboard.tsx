import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
  FileText,
  Download,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type DateRange = "today" | "7d" | "30d" | "90d";

const revenueByMethod = [
  { method: "Visa", amount: "$48,320.00", percent: 42 },
  { method: "Mastercard", amount: "$31,050.00", percent: 27 },
  { method: "Amex", amount: "$23,000.00", percent: 20 },
  { method: "Discover", amount: "$12,630.00", percent: 11 },
];

const revenueByPlan = [
  { plan: "Enterprise Plan", revenue: "$52,400.00", customers: 12, avgOrder: "$4,366.67" },
  { plan: "Pro Plan", revenue: "$34,200.00", customers: 38, avgOrder: "$900.00" },
  { plan: "Starter Plan", revenue: "$18,600.00", customers: 62, avgOrder: "$300.00" },
  { plan: "One-time Purchases", revenue: "$9,800.00", customers: 145, avgOrder: "$67.59" },
];

const topRevenueDays = [
  { date: "Oct 15, 2025", revenue: "$8,420.00", transactions: 134 },
  { date: "Oct 1, 2025", revenue: "$7,890.00", transactions: 128 },
  { date: "Oct 10, 2025", revenue: "$7,340.00", transactions: 119 },
  { date: "Sep 30, 2025", revenue: "$7,120.00", transactions: 115 },
  { date: "Oct 20, 2025", revenue: "$6,980.00", transactions: 112 },
  { date: "Oct 5, 2025", revenue: "$6,750.00", transactions: 108 },
  { date: "Sep 25, 2025", revenue: "$6,540.00", transactions: 105 },
  { date: "Oct 18, 2025", revenue: "$6,320.00", transactions: 102 },
  { date: "Sep 20, 2025", revenue: "$6,100.00", transactions: 98 },
  { date: "Oct 8, 2025", revenue: "$5,980.00", transactions: 96 },
];

const hourlyDistribution = [
  { hour: "12 AM", count: 12 },
  { hour: "2 AM", count: 5 },
  { hour: "4 AM", count: 3 },
  { hour: "6 AM", count: 18 },
  { hour: "8 AM", count: 45 },
  { hour: "10 AM", count: 78 },
  { hour: "12 PM", count: 95 },
  { hour: "2 PM", count: 88 },
  { hour: "4 PM", count: 72 },
  { hour: "6 PM", count: 65 },
  { hour: "8 PM", count: 52 },
  { hour: "10 PM", count: 28 },
];

const topCustomers = [
  { name: "Acme Corporation", totalSpent: "$12,450.00", transactions: 34, avgOrder: "$366.18", lastPurchase: "Oct 24, 2025" },
  { name: "TechStart Inc.", totalSpent: "$8,920.00", transactions: 22, avgOrder: "$405.45", lastPurchase: "Oct 23, 2025" },
  { name: "Global Retail Co.", totalSpent: "$7,340.00", transactions: 18, avgOrder: "$407.78", lastPurchase: "Oct 22, 2025" },
  { name: "Summit Digital", totalSpent: "$6,100.00", transactions: 15, avgOrder: "$406.67", lastPurchase: "Oct 21, 2025" },
  { name: "Bright Solutions", totalSpent: "$5,680.00", transactions: 28, avgOrder: "$202.86", lastPurchase: "Oct 24, 2025" },
];

const geoDistribution = [
  { region: "United States", count: 1842, percent: 62 },
  { region: "Canada", count: 420, percent: 14 },
  { region: "United Kingdom", count: 298, percent: 10 },
  { region: "Germany", count: 178, percent: 6 },
  { region: "Australia", count: 148, percent: 5 },
  { region: "Other", count: 89, percent: 3 },
];

const reports = [
  { name: "Daily Settlement Report", description: "End-of-day settlement summary with batch totals", frequency: "Daily", format: "CSV" },
  { name: "Monthly Revenue Summary", description: "Complete monthly revenue breakdown by source and method", frequency: "Monthly", format: "PDF" },
  { name: "Transaction Detail Export", description: "Full transaction log with all metadata fields", frequency: "On-demand", format: "CSV" },
  { name: "Chargeback Report", description: "Summary of all chargebacks, reasons, and resolution status", frequency: "Monthly", format: "PDF" },
  { name: "Tax Summary Report", description: "Tax-ready summary of all collected and remitted amounts", frequency: "Monthly", format: "PDF" },
];

const maxHourly = Math.max(...hourlyDistribution.map((h) => h.count));

// Mock chart bar data for Revenue Over Time
const revenueChartBars = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 78 },
  { label: "Wed", value: 52 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 85 },
  { label: "Sat", value: 42 },
  { label: "Sun", value: 38 },
];

const volumeChartBars = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 145 },
  { label: "Wed", value: 98 },
  { label: "Thu", value: 168 },
  { label: "Fri", value: 155 },
  { label: "Sat", value: 78 },
  { label: "Sun", value: 65 },
];

const maxRevenue = Math.max(...revenueChartBars.map((b) => b.value));
const maxVolume = Math.max(...volumeChartBars.map((b) => b.value));

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-swipes-black">Analytics</h1>
          <p className="text-swipes-pro-gray">
            Revenue analytics, transaction trends, customer insights, and performance reporting
          </p>
        </div>
        <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
          <SelectTrigger className="w-[140px] rounded-[7px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Gross Revenue"
          value="$115,000"
          change="+12.5% from last period"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Net Revenue"
          value="$108,450"
          change="+11.8% from last period"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Transactions"
          value="2,975"
          change="+8.3% from last period"
          changeType="positive"
          icon={CreditCard}
        />
        <MetricCard
          title="Avg Transaction Value"
          value="$38.66"
          change="+3.9% from last period"
          changeType="positive"
          icon={BarChart3}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-6">Revenue Over Time</h3>
            <div className="flex items-end gap-3 h-48">
              {revenueChartBars.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-swipes-pro-gray font-medium">
                    ${(bar.value * 100).toLocaleString()}
                  </span>
                  <div
                    className="w-full bg-swipes-blue-deep rounded-t-[4px] transition-all"
                    style={{ height: `${(bar.value / maxRevenue) * 160}px` }}
                  />
                  <span className="text-xs text-swipes-pro-gray">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Payment Method */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">
              Revenue by Payment Method
            </h3>
            <div className="space-y-4">
              {revenueByMethod.map((item) => (
                <div key={item.method} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-swipes-black">{item.method}</span>
                    <span className="text-swipes-pro-gray">
                      {item.amount} ({item.percent}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-swipes-blue-deep rounded-full transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Plan + Top Revenue Days */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-swipes-black">Revenue by Product/Plan</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Avg Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueByPlan.map((row) => (
                    <TableRow key={row.plan}>
                      <TableCell className="font-medium text-swipes-black">{row.plan}</TableCell>
                      <TableCell className="text-swipes-black">{row.revenue}</TableCell>
                      <TableCell className="text-swipes-pro-gray">{row.customers}</TableCell>
                      <TableCell className="text-swipes-pro-gray">{row.avgOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-swipes-black">Top 10 Revenue Days</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRevenueDays.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell className="text-swipes-black">{row.date}</TableCell>
                      <TableCell className="font-medium text-swipes-black">{row.revenue}</TableCell>
                      <TableCell className="text-swipes-pro-gray">{row.transactions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Volume Chart */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-6">
              Transaction Volume
            </h3>
            <div className="flex items-end gap-3 h-48">
              {volumeChartBars.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-swipes-pro-gray font-medium">{bar.value}</span>
                  <div
                    className="w-full bg-swipes-trusted-green rounded-t-[4px] transition-all"
                    style={{ height: `${(bar.value / maxVolume) * 160}px` }}
                  />
                  <span className="text-xs text-swipes-pro-gray">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Breakdown + Processing Time */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                Transaction Status Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Successful", count: 2831, percent: 95.2, color: "bg-swipes-trusted-green" },
                  { label: "Failed", count: 89, percent: 3.0, color: "bg-swipes-muted-red" },
                  { label: "Pending", count: 55, percent: 1.8, color: "bg-swipes-gold" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-swipes-black">{item.label}</span>
                      <span className="text-swipes-pro-gray">
                        {item.count.toLocaleString()} ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">Processing Metrics</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-swipes-pro-gray">Average Processing Time</p>
                  <p className="text-3xl font-bold text-swipes-blue-deep mt-1">1.2s</p>
                </div>
                <div>
                  <p className="text-sm text-swipes-pro-gray">Success Rate</p>
                  <p className="text-3xl font-bold text-swipes-trusted-green mt-1">95.2%</p>
                </div>
                <div>
                  <p className="text-sm text-swipes-pro-gray">Payment Method Distribution</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge className="bg-swipes-blue-deep text-white">Visa 42%</Badge>
                    <Badge className="bg-swipes-blue-deep/80 text-white">MC 27%</Badge>
                    <Badge className="bg-swipes-blue-deep/60 text-white">Amex 20%</Badge>
                    <Badge className="bg-swipes-blue-deep/40 text-white">Discover 11%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">
              Transactions by Hour of Day
            </h3>
            <div className="space-y-2">
              {hourlyDistribution.map((item) => (
                <div key={item.hour} className="flex items-center gap-3">
                  <span className="text-xs text-swipes-pro-gray w-12 text-right shrink-0">
                    {item.hour}
                  </span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-[4px] overflow-hidden">
                    <div
                      className="h-full bg-swipes-blue-deep rounded-[4px] transition-all"
                      style={{ width: `${(item.count / maxHourly) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-swipes-pro-gray w-8 shrink-0">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          {/* New vs Returning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                New vs Returning Customers
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-swipes-black">New Customers</span>
                    <span className="text-swipes-pro-gray">847 (38%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-swipes-blue-deep rounded-full" style={{ width: "38%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-swipes-black">Returning Customers</span>
                    <span className="text-swipes-pro-gray">1,385 (62%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-swipes-trusted-green rounded-full" style={{ width: "62%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                Customer Acquisition Trend
              </h3>
              <div className="flex items-end gap-2 h-32">
                {[28, 35, 42, 38, 52, 48, 55, 60, 45, 62, 58, 68].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-swipes-blue-deep/70 rounded-t-[3px]"
                      style={{ height: `${(val / 68) * 100}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-swipes-pro-gray">Jan</span>
                <span className="text-xs text-swipes-pro-gray">Jun</span>
                <span className="text-xs text-swipes-pro-gray">Dec</span>
              </div>
            </div>
          </div>

          {/* Top Customers Table */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Top Customers</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Avg Order</TableHead>
                  <TableHead>Last Purchase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.name}>
                    <TableCell className="font-medium text-swipes-black">{customer.name}</TableCell>
                    <TableCell className="text-swipes-black">{customer.totalSpent}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{customer.transactions}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{customer.avgOrder}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{customer.lastPurchase}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">
              Geographic Distribution
            </h3>
            <div className="space-y-3">
              {geoDistribution.map((item) => (
                <div key={item.region} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-swipes-black w-36 shrink-0">
                    {item.region}
                  </span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-[4px] overflow-hidden">
                    <div
                      className="h-full bg-swipes-blue-deep rounded-[4px] transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-swipes-pro-gray w-20 text-right shrink-0">
                    {item.count.toLocaleString()} ({item.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Available Reports</h3>
              <p className="text-sm text-swipes-pro-gray mt-1">
                Generate and download reports for your records.
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.name}>
                    <TableCell className="font-medium text-swipes-black">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-swipes-blue-deep" />
                        {report.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray text-sm">
                      {report.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {report.frequency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-blue-deep text-white">{report.format}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </TableCell>
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
