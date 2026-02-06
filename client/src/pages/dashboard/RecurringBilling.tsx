import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/MetricCard";

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
  {
    id: "SUB-001",
    planName: "Business Pro",
    customer: "Greenfield Industries",
    amount: 249.00,
    frequency: "Monthly",
    nextBilling: "2026-03-01",
    status: "Active",
  },
  {
    id: "SUB-002",
    planName: "Starter Plan",
    customer: "Maria Gonzalez",
    amount: 29.99,
    frequency: "Monthly",
    nextBilling: "2026-02-15",
    status: "Active",
  },
  {
    id: "SUB-003",
    planName: "Enterprise Suite",
    customer: "Pinnacle Health Group",
    amount: 1499.00,
    frequency: "Annual",
    nextBilling: "2026-11-20",
    status: "Active",
  },
  {
    id: "SUB-004",
    planName: "Growth Plan",
    customer: "Hartley & Associates",
    amount: 99.00,
    frequency: "Monthly",
    nextBilling: "2026-02-28",
    status: "Paused",
  },
  {
    id: "SUB-005",
    planName: "Basic Weekly",
    customer: "QuickServe Logistics",
    amount: 19.99,
    frequency: "Weekly",
    nextBilling: "2026-02-12",
    status: "Active",
  },
  {
    id: "SUB-006",
    planName: "Premium Plan",
    customer: "Lakewood Dental",
    amount: 199.00,
    frequency: "Monthly",
    nextBilling: "2026-03-05",
    status: "Past Due",
  },
  {
    id: "SUB-007",
    planName: "Starter Plan",
    customer: "Tom Richardson",
    amount: 29.99,
    frequency: "Monthly",
    nextBilling: "—",
    status: "Cancelled",
  },
  {
    id: "SUB-008",
    planName: "Annual Pro",
    customer: "Eastside Fitness",
    amount: 899.00,
    frequency: "Annual",
    nextBilling: "2026-08-14",
    status: "Active",
  },
  {
    id: "SUB-009",
    planName: "Growth Plan",
    customer: "Bright Minds Academy",
    amount: 99.00,
    frequency: "Monthly",
    nextBilling: "2026-02-22",
    status: "Paused",
  },
  {
    id: "SUB-010",
    planName: "Weekly Essentials",
    customer: "NovaTech Solutions",
    amount: 49.99,
    frequency: "Weekly",
    nextBilling: "2026-02-10",
    status: "Active",
  },
];

function getStatusBadge(status: SubscriptionStatus) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green">
          Active
        </Badge>
      );
    case "Paused":
      return (
        <Badge className="bg-swipes-gold text-black hover:bg-swipes-gold">
          Paused
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
          Cancelled
        </Badge>
      );
    case "Past Due":
      return (
        <Badge className="bg-swipes-muted-red text-white hover:bg-swipes-muted-red">
          Past Due
        </Badge>
      );
  }
}

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(dateStr: string) {
  if (dateStr === "—") return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecurringBilling() {
  const [activeTab, setActiveTab] = useState("active");

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    switch (activeTab) {
      case "active":
        return sub.status === "Active";
      case "paused":
        return sub.status === "Paused";
      case "cancelled":
        return sub.status === "Cancelled";
      case "all":
        return true;
      default:
        return true;
    }
  });

  return (
    <div className="p-8 space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-swipes-black">
            Recurring Billing
          </h1>
          <p className="text-sm text-swipes-pro-gray mt-1">
            Manage subscriptions, payment plans, and recurring charges
          </p>
        </div>
        <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Tabs and Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="rounded-[7px]">
          <TabsTrigger value="active" className="rounded-[7px]">
            Active Plans
          </TabsTrigger>
          <TabsTrigger value="paused" className="rounded-[7px]">
            Paused
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-[7px]">
            Cancelled
          </TabsTrigger>
          <TabsTrigger value="all" className="rounded-[7px]">
            All
          </TabsTrigger>
        </TabsList>

        {["active", "paused", "cancelled", "all"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Plan Name
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Customer
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Amount
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Frequency
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Next Billing
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray">
                        Status
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-swipes-pro-gray text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredSubscriptions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-swipes-pro-gray"
                        >
                          <RefreshCw className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                          <p className="text-sm">
                            No subscriptions found in this category.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredSubscriptions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50/50">
                          <td className="py-4">
                            <div className="font-medium text-swipes-black text-sm">
                              {sub.planName}
                            </div>
                            <div className="text-xs text-swipes-pro-gray">
                              {sub.id}
                            </div>
                          </td>
                          <td className="py-4 text-sm text-swipes-black">
                            {sub.customer}
                          </td>
                          <td className="py-4 text-sm font-medium text-swipes-black">
                            {formatCurrency(sub.amount)}
                          </td>
                          <td className="py-4 text-sm text-swipes-pro-gray">
                            {sub.frequency}
                          </td>
                          <td className="py-4 text-sm text-swipes-pro-gray">
                            {formatDate(sub.nextBilling)}
                          </td>
                          <td className="py-4">{getStatusBadge(sub.status)}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-swipes-pro-gray hover:text-swipes-black"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-swipes-pro-gray hover:text-swipes-black"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {sub.status === "Active" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-swipes-gold hover:text-swipes-gold/80"
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>
                              )}
                              {sub.status === "Paused" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-swipes-trusted-green hover:text-swipes-trusted-green/80"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              {sub.status === "Past Due" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-swipes-gold hover:text-swipes-gold/80"
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
