import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Receipt,
  Plus,
  Link2,
  ArrowRight,
  Layers,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import TransactionTable from "@/components/TransactionTable";
import TierBadge from "@/components/TierBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import type { AddOnProduct } from "@shared/schema";

const quickActions = [
  { label: "New Transaction", href: "/dashboard/virtual-terminal", icon: CreditCard },
  { label: "Create Invoice", href: "/dashboard/invoicing", icon: Receipt },
  { label: "Add Product", href: "/dashboard/catalog/create", icon: Plus },
  { label: "Payment Link", href: "/dashboard/payment-links", icon: Link2 },
];

const mockTransactions = [
  { id: "TXN-001", date: "2025-10-24", customer: "John Doe", amount: "$125.00", status: "success" as const, paymentMethod: "Visa ****1234" },
  { id: "TXN-002", date: "2025-10-24", customer: "Jane Smith", amount: "$89.50", status: "pending" as const, paymentMethod: "MC ****5678" },
  { id: "TXN-003", date: "2025-10-23", customer: "Bob Johnson", amount: "$250.00", status: "success" as const, paymentMethod: "Amex ****9012" },
  { id: "TXN-004", date: "2025-10-23", customer: "Alice Williams", amount: "$45.99", status: "failed" as const, paymentMethod: "Visa ****3456" },
  { id: "TXN-005", date: "2025-10-22", customer: "Charlie Brown", amount: "$199.99", status: "success" as const, paymentMethod: "Visa ****7890" },
];

export default function Dashboard() {
  const { tier, businessName, addons } = useMerchantAuth();

  const { data: allAddOns = [] } = useQuery<AddOnProduct[]>({
    queryKey: ["/api/add-ons"],
    queryFn: async () => {
      const res = await fetch("/api/add-ons");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const activeAddOns = allAddOns.filter((a) => addons.includes(a.slug));

  return (
    <div className="p-8 space-y-8">
      {/* Header with greeting + TierBadge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-swipes-black">
            Welcome back{businessName ? `, ${businessName}` : ""}
          </h1>
          <p className="text-swipes-pro-gray mt-1">Monitor your payment gateway performance</p>
        </div>
        <TierBadge tier={tier} size="lg" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Transactions"
          value="2,350"
          change="+15.3% from last month"
          changeType="positive"
          icon={CreditCard}
        />
        <MetricCard
          title="Success Rate"
          value="98.2%"
          change="+2.5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Customers"
          value="573"
          change="+12 new this week"
          changeType="neutral"
          icon={Users}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col items-center gap-2 rounded-[7px] border-gray-200 hover:border-swipes-blue-deep hover:text-swipes-blue-deep transition-colors group"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Two-column bottom: Transactions + Active Enhancements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Table — 2/3 width */}
        <div className="lg:col-span-2">
          <TransactionTable
            transactions={mockTransactions}
            onViewDetails={(id) => console.log("View transaction details:", id)}
          />
        </div>

        {/* Active Enhancements — 1/3 width */}
        <div>
          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-swipes-blue-deep" />
                <h3 className="font-semibold text-swipes-black">Active Enhancements</h3>
              </div>

              {activeAddOns.length > 0 ? (
                <div className="space-y-3">
                  {activeAddOns.map((addon) => (
                    <div
                      key={addon.slug}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-[7px]"
                    >
                      <span className="text-sm font-medium text-swipes-black">{addon.name}</span>
                      <Badge className="text-xs bg-swipes-trusted-green text-white no-default-hover-elevate">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Layers className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-swipes-pro-gray mb-1">No active enhancements</p>
                  <p className="text-xs text-gray-400">Add enhancements to unlock more features</p>
                </div>
              )}

              <Link href="/products">
                <Button
                  variant="outline"
                  className="w-full mt-4 rounded-[7px] border-gray-300 text-swipes-pro-gray group"
                >
                  <span className="flex items-center justify-center">
                    Browse Enhancements
                    <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
