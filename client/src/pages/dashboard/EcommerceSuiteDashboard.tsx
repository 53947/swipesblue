import { Link } from "wouter";
import {
  Check,
  ArrowRight,
  ShoppingCart,
  CreditCard,
  Terminal,
  Link2,
  FileText,
  RefreshCw,
  UserCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TierBadge from "@/components/TierBadge";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import { meetsMinTier } from "@shared/tier-constants";

const tabs = [
  { label: "Overview", href: "/dashboard/ecommerce" },
  { label: "Shopping Cart", href: "/dashboard/ecommerce/cart" },
  { label: "One-Page Checkout", href: "/dashboard/ecommerce/checkout" },
];

interface SuiteProduct {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
  requiredTier: string;
  freeLabel?: string;
}

const suiteProducts: SuiteProduct[] = [
  {
    name: "Shopping Cart",
    description: "Embeddable cart with tax and shipping calculation",
    icon: ShoppingCart,
    href: "/dashboard/ecommerce/cart",
    requiredTier: "Free",
  },
  {
    name: "One-Page Checkout",
    description: "Streamlined single-page checkout experience",
    icon: CreditCard,
    href: "/dashboard/ecommerce/checkout",
    requiredTier: "Free",
  },
  {
    name: "Virtual Terminal",
    description: "Process card-present and manual entry payments",
    icon: Terminal,
    href: "/dashboard/terminal",
    requiredTier: "Growth",
  },
  {
    name: "Payment Links",
    description: "Share payment links via email, SMS, or social",
    icon: Link2,
    href: "/dashboard/payment-links",
    requiredTier: "Free",
  },
  {
    name: "Invoicing",
    description: "Create and send professional invoices",
    icon: FileText,
    href: "/dashboard/invoices",
    requiredTier: "Free",
    freeLabel: "Basic",
  },
  {
    name: "Recurring Billing",
    description: "Subscription plans with automated billing cycles",
    icon: RefreshCw,
    href: "/dashboard/subscriptions",
    requiredTier: "Growth",
  },
  {
    name: "Customer Vault",
    description: "Securely store payment methods for repeat customers",
    icon: UserCheck,
    href: "/dashboard/vault",
    requiredTier: "Growth",
  },
];

const tierFeatures: Record<string, string[]> = {
  Free: [
    "Shopping Cart",
    "One-Page Checkout",
    "Payment Links",
    "Basic Invoicing",
    "Up to 25 Products",
    "Fraud Prevention (basic)",
    "Email Receipts",
    "2.70% + $0.30 per transaction",
    "No monthly fees",
  ],
  Growth: [
    "Shopping Cart",
    "One-Page Checkout",
    "Payment Links",
    "Invoicing (full — templates, auto-reminders)",
    "Recurring Billing",
    "Customer Vault",
    "Virtual Terminal",
    "Discount Codes",
    "Up to 500 Products",
    "Bulk Editor",
    "CSV Import/Export",
    "Basic Analytics",
    "3 Team Members",
    "Email Support",
  ],
  Scale: [
    "Everything in Growth",
    "Unlimited Products",
    "Advanced Analytics (included)",
    "Advanced Fraud Rules",
    "Priority Support",
    "10 Team Members",
    "Multi-Gateway (included)",
    "API Access (included)",
  ],
  Enterprise: [
    "Everything in Scale",
    "All Enhancements included",
    "Unlimited Team Members",
    "Custom Reporting",
    "Dedicated Account Manager",
    "Custom Integrations",
    "SLA Guarantee",
  ],
};

const tierPricing: Record<string, string> = {
  Free: "Free — 2.70% + $0.30 per transaction",
  Growth: "$29/month — 2.70% + $0.30 per transaction",
  Scale: "$79/month — 2.50% + $0.25 per transaction",
  Enterprise: "Custom pricing",
};

const nextTier: Record<string, { name: string; price: string } | null> = {
  Free: { name: "Growth", price: "$29/month" },
  Growth: { name: "Scale", price: "$79/month" },
  Scale: { name: "Enterprise", price: "Custom" },
  Enterprise: null,
};

export default function EcommerceSuiteDashboard() {
  const { tier } = useMerchantAuth();
  const features = tierFeatures[tier] || tierFeatures["Free"];
  const pricing = tierPricing[tier] || tierPricing["Free"];
  const upgrade = nextTier[tier];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Suite</h1>
          <TierBadge tier={tier} size="sm" />
        </div>
        <Link href="/dashboard/settings/billing">
          <Button variant="outline" className="rounded-[7px] border-gray-300 text-sm">
            Manage Plan
          </Button>
        </Link>
      </div>
      <p className="text-gray-500 mb-6">Your complete payment processing platform</p>

      <SubNavTabs tabs={tabs} />

      {/* Products Grid */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Your Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suiteProducts.map((product) => {
            const Icon = product.icon;
            const isLocked = !meetsMinTier(tier, product.requiredTier);

            return (
              <Link key={product.name} href={product.href}>
                <Card className={`rounded-[7px] border-gray-200 cursor-pointer transition-all hover:border-[#1844A6]/40 hover:shadow-sm ${isLocked ? "opacity-75" : ""}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-gray-50 rounded-[7px]">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      {isLocked ? (
                        <Badge className="text-xs bg-gray-100 text-gray-500 rounded-full">
                          <Lock className="h-3 w-3 mr-1" />
                          {product.requiredTier}+
                        </Badge>
                      ) : product.freeLabel && tier === "Free" ? (
                        <Badge className="text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          {product.freeLabel}
                        </Badge>
                      ) : (
                        <Badge className="text-xs bg-green-100 text-green-700 rounded-full">
                          Available
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Plan info */}
      <Card className="rounded-[7px] border-gray-200 mb-8">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Your Plan
          </h3>
          <p className="text-lg font-semibold text-gray-900">{pricing}</p>
        </CardContent>
      </Card>

      {/* Included features */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Included Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade prompt */}
      {upgrade && (
        <Card className="rounded-[7px] border-[#1844A6]/20 bg-[#1844A6]/5">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Upgrade to {upgrade.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Unlock more features, higher limits, and priority support.
            </p>
            <Link href="/pricing">
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px] group">
                Upgrade to {upgrade.name} — {upgrade.price}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
