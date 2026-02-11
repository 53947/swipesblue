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
  Package,
  Key,
  Code,
  Zap,
  Terminal,
  BarChart3,
  Webhook,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import TransactionTable from "@/components/TransactionTable";
import TierBadge from "@/components/TierBadge";
import OnboardingCard from "@/components/dashboard/OnboardingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import { TIER_PRODUCT_LIMITS } from "@shared/tier-constants";
import type { AddOnProduct } from "@shared/schema";

// ── QUICK ACTIONS (per path) ────────────────────────────────
const ecommerceActions = [
  { label: "New Transaction", href: "/dashboard/terminal", icon: CreditCard },
  { label: "Create Invoice", href: "/dashboard/invoices", icon: Receipt },
  { label: "Add Product", href: "/dashboard/catalog/create", icon: Plus },
  { label: "Payment Link", href: "/dashboard/payment-links", icon: Link2 },
];

const developerActions = [
  { label: "API Keys", href: "/dashboard/enhance/premium-api", icon: Key },
  { label: "View Docs", href: "/developers", icon: Code },
  { label: "Webhooks", href: "/dashboard/enhance/premium-api", icon: Webhook },
  { label: "Test Sandbox", href: "/developers#quick-start", icon: Zap },
];

const gatewayActions = [
  { label: "Process Payment", href: "/dashboard/terminal", icon: CreditCard },
  { label: "Payment Link", href: "/dashboard/payment-links", icon: Link2 },
  { label: "View Transactions", href: "/dashboard/transactions", icon: BarChart3 },
  { label: "Create Invoice", href: "/dashboard/invoices", icon: Receipt },
];

const mockTransactions = [
  { id: "TXN-001", date: "2025-10-24", customer: "John Doe", amount: "$125.00", status: "success" as const, paymentMethod: "Visa ****1234" },
  { id: "TXN-002", date: "2025-10-24", customer: "Jane Smith", amount: "$89.50", status: "pending" as const, paymentMethod: "MC ****5678" },
  { id: "TXN-003", date: "2025-10-23", customer: "Bob Johnson", amount: "$250.00", status: "success" as const, paymentMethod: "Amex ****9012" },
  { id: "TXN-004", date: "2025-10-23", customer: "Alice Williams", amount: "$45.99", status: "failed" as const, paymentMethod: "Visa ****3456" },
  { id: "TXN-005", date: "2025-10-22", customer: "Charlie Brown", amount: "$199.99", status: "success" as const, paymentMethod: "Visa ****7890" },
];

const upgradeRecommendations: Record<string, { message: string; cta: string; tier: string; price: string }> = {
  Free: {
    message: "You're leaving money on the table. Subscriptions, full invoicing, and a customer vault are one upgrade away. Merchants who switch to Growth see an average 23% increase in repeat purchases within 90 days.",
    cta: "Upgrade to Growth",
    tier: "Growth",
    price: "$29/month",
  },
  Growth: {
    message: "Your business outgrew its plan. Unlimited products, advanced analytics, and priority support are waiting. Scale merchants process 3x more volume with lower per-transaction costs.",
    cta: "Upgrade to Scale",
    tier: "Scale",
    price: "$79/month",
  },
  Scale: {
    message: "You need a partner, not just a platform. Dedicated account management, custom integrations, and SLA guarantees for businesses that can't afford downtime.",
    cta: "Upgrade to Enterprise",
    tier: "Enterprise",
    price: "Custom pricing",
  },
};

// ── SUBTITLE PER PATH ───────────────────────────────────────
const pathSubtitles: Record<string, string> = {
  ecommerce: "E-Commerce Suite",
  developer: "Developer API",
  gateway: "Gateway Processing",
};

export default function Dashboard() {
  const { tier, businessName, addons, signupPath } = useMerchantAuth();
  const path = signupPath || "ecommerce";

  const { data: allAddOns = [] } = useQuery<AddOnProduct[]>({
    queryKey: ["/api/add-ons"],
    queryFn: async () => {
      const res = await fetch("/api/add-ons");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: countData } = useQuery<{ count: number; limit: number }>({
    queryKey: ["/api/merchant/products/count"],
    queryFn: async () => {
      const res = await fetch("/api/merchant/products/count");
      if (!res.ok) return { count: 0, limit: 25 };
      return res.json();
    },
  });

  const activeAddOns = allAddOns.filter((a) => addons.includes(a.slug));
  const upgrade = upgradeRecommendations[tier];
  const productCount = countData?.count ?? 0;
  const productLimit = TIER_PRODUCT_LIMITS[tier] ?? 25;

  // Pick quick actions based on path
  const quickActions =
    path === "developer" ? developerActions :
    path === "gateway" ? gatewayActions :
    ecommerceActions;

  return (
    <div className="p-8 space-y-8">
      {/* Header with greeting + TierBadge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{businessName ? `, ${businessName}` : ""}
          </h1>
          <p className="text-gray-500 mt-1">
            {pathSubtitles[path] || "E-Commerce Suite"}
          </p>
        </div>
        <TierBadge tier={tier} size="lg" />
      </div>

      {/* Onboarding Card (first-time users) */}
      <OnboardingCard />

      {/* Metric Cards — vary by path */}
      {path === "developer" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="API Calls (30d)"
            value="12,847"
            change="+32.1% from last month"
            changeType="positive"
            icon={Code}
          />
          <MetricCard
            title="Success Rate"
            value="99.4%"
            change="Stable"
            changeType="neutral"
            icon={Zap}
          />
          <MetricCard
            title="Webhooks Delivered"
            value="8,291"
            change="+18.5% from last month"
            changeType="positive"
            icon={Webhook}
          />
          <MetricCard
            title="Revenue (API)"
            value="$28,450"
            change="+22.3% from last month"
            changeType="positive"
            icon={DollarSign}
          />
        </div>
      ) : path === "gateway" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Processed"
            value="$85,312"
            change="+14.8% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Transactions"
            value="1,842"
            change="+11.2% from last month"
            changeType="positive"
            icon={CreditCard}
          />
          <MetricCard
            title="Approval Rate"
            value="98.2%"
            change="+0.3% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Avg. Transaction"
            value="$46.32"
            change="+$2.10 from last month"
            changeType="positive"
            icon={BarChart3}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Revenue"
            value="$45,231.89"
            change="+20.1% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Orders"
            value="2,350"
            change="+15.3% from last month"
            changeType="positive"
            icon={CreditCard}
          />
          <MetricCard
            title="Products"
            value={`${productCount} / ${productLimit === Infinity ? "\u221E" : productLimit}`}
            change={productLimit !== Infinity && productCount >= productLimit * 0.9 ? "Near limit" : "active"}
            changeType="neutral"
            icon={Package}
          />
          <MetricCard
            title="Customers"
            value="573"
            change="+12 new this week"
            changeType="neutral"
            icon={Users}
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const isExternal = action.href.startsWith("/developers");
          return (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col items-center gap-2 rounded-[7px] border-gray-200 hover:border-[#1844A6] hover:text-[#1844A6] transition-colors group"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Developer path: API quick-start snippet */}
      {path === "developer" && (
        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-[#1844A6]" />
              <h3 className="font-semibold text-gray-900">Quick Start</h3>
            </div>
            <div className="bg-[#1a1a2e] rounded-[7px] p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-100">
                <code>{`curl -X POST https://api.swipesblue.com/v1/charges \\
  -u sb_test_xxxxxxxxxxxx: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d source=tok_visa \\
  -d description="Test payment"`}</code>
              </pre>
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/developers">
                <Button variant="outline" className="rounded-[7px] border-gray-300 text-sm">
                  Full Documentation
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two-column bottom: Transactions + Active Enhancements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Table — 2/3 width */}
        <div className="lg:col-span-2">
          <TransactionTable
            transactions={mockTransactions}
            onViewDetails={() => {}}
          />
        </div>

        {/* Active Enhancements — 1/3 width */}
        <div>
          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-[#1844A6]" />
                <h3 className="font-semibold text-gray-900">Active Enhancements</h3>
              </div>

              {activeAddOns.length > 0 ? (
                <div className="space-y-3">
                  {activeAddOns.map((addon) => (
                    <Link key={addon.slug} href={`/dashboard/enhance/${addon.slug}`}>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[7px] cursor-pointer hover:bg-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-900">{addon.name}</span>
                        <Badge className="text-xs bg-green-100 text-green-700 no-default-hover-elevate">
                          Active
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Layers className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-1">No active enhancements</p>
                  <p className="text-xs text-gray-400">Add enhancements to unlock more features</p>
                </div>
              )}

              <Link href="/dashboard/ecommerce">
                <Button
                  variant="outline"
                  className="w-full mt-4 rounded-[7px] border-gray-300 text-gray-600 group"
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

      {/* Recommended for You */}
      {upgrade && (
        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Recommended for You
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {upgrade.message}
            </p>
            <Link href="/dashboard/settings?tab=billing">
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px] group">
                {upgrade.cta} — {upgrade.price}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
