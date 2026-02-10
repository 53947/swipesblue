import { useLocation } from "wouter";
import {
  RefreshCw,
  Plus,
  DollarSign,
  Users,
  TrendingDown,
  CreditCard,
  Eye,
  Edit,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Active Plans", href: "/dashboard/subscriptions" },
  { label: "Paused", href: "/dashboard/subscriptions?tab=paused" },
  { label: "Past Due", href: "/dashboard/subscriptions?tab=pastdue" },
  { label: "Cancelled", href: "/dashboard/subscriptions?tab=cancelled" },
  { label: "All", href: "/dashboard/subscriptions?tab=all" },
];

type SubscriptionStatus = "Active" | "Paused" | "Cancelled" | "Past Due";
type BillingFrequency = "Monthly" | "Weekly" | "Annual";

interface Subscription {
  id: string;
  planName: string;
  customer: string;
  amount: number;
  frequency: BillingFrequency;
  nextBilling: string;
  status: SubscriptionStatus;
}

const mockSubscriptions: Subscription[] = [
  { id: "SUB-001", planName: "Business Pro", customer: "Greenfield Industries", amount: 249.00, frequency: "Monthly", nextBilling: "2026-03-01", status: "Active" },
  { id: "SUB-002", planName: "Growth Plan", customer: "Maria Gonzalez", amount: 29.99, frequency: "Monthly", nextBilling: "2026-02-15", status: "Active" },
  { id: "SUB-003", planName: "Enterprise Suite", customer: "Pinnacle Health Group", amount: 1499.00, frequency: "Annual", nextBilling: "2026-11-20", status: "Active" },
  { id: "SUB-004", planName: "Growth Plan", customer: "Hartley & Associates", amount: 99.00, frequency: "Monthly", nextBilling: "2026-02-28", status: "Paused" },
  { id: "SUB-005", planName: "Basic Weekly", customer: "QuickServe Logistics", amount: 19.99, frequency: "Weekly", nextBilling: "2026-02-12", status: "Active" },
  { id: "SUB-006", planName: "Premium Plan", customer: "Lakewood Dental", amount: 199.00, frequency: "Monthly", nextBilling: "2026-03-05", status: "Past Due" },
  { id: "SUB-007", planName: "Growth Plan", customer: "Tom Richardson", amount: 29.99, frequency: "Monthly", nextBilling: "—", status: "Cancelled" },
  { id: "SUB-008", planName: "Annual Pro", customer: "Eastside Fitness", amount: 899.00, frequency: "Annual", nextBilling: "2026-08-14", status: "Active" },
  { id: "SUB-009", planName: "Growth Plan", customer: "Bright Minds Academy", amount: 99.00, frequency: "Monthly", nextBilling: "2026-02-22", status: "Paused" },
  { id: "SUB-010", planName: "Weekly Essentials", customer: "NovaTech Solutions", amount: 49.99, frequency: "Weekly", nextBilling: "2026-02-10", status: "Active" },
];

const statusColors: Record<SubscriptionStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-gray-100 text-gray-600",
  "Past Due": "bg-red-100 text-red-600",
};

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(dateStr: string) {
  if (dateStr === "—") return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function RecurringBilling() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "active";

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    switch (activeTab) {
      case "active": return sub.status === "Active";
      case "paused": return sub.status === "Paused";
      case "pastdue": return sub.status === "Past Due";
      case "cancelled": return sub.status === "Cancelled";
      case "all": return true;
      default: return sub.status === "Active";
    }
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recurring Billing</h1>
          <p className="text-gray-500 mt-1">Manage subscriptions, payment plans, and recurring charges</p>
        </div>
        <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Monthly Recurring Revenue"
          value="$18,450"
          change="+12.3% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Active Subscriptions"
          value="142"
          change="+8 this month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Churn Rate"
          value="2.1%"
          change="-0.4% from last month"
          changeType="positive"
          icon={TrendingDown}
        />
        <MetricCard
          title="Average Plan Value"
          value="$129.93"
          change="+$3.20 from last month"
          changeType="positive"
          icon={CreditCard}
        />
      </div>

      {/* Subscription Table */}
      {filteredSubscriptions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <RefreshCw className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions found</h3>
          <p className="text-gray-500 text-sm">No subscriptions match this filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Next Billing</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-gray-900 block">{sub.planName}</span>
                      <span className="text-xs text-gray-400 font-mono">{sub.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{sub.customer}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(sub.amount)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{sub.frequency}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(sub.nextBilling)}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${statusColors[sub.status]}`}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      {sub.status === "Active" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Pause">
                          <Pause className="h-4 w-4 text-yellow-600" />
                        </Button>
                      )}
                      {sub.status === "Paused" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Resume">
                          <Play className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {sub.status === "Past Due" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Pause">
                          <Pause className="h-4 w-4 text-yellow-600" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">{filteredSubscriptions.length} subscriptions</span>
      </div>
    </div>
  );
}
