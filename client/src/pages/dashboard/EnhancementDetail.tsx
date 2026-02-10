import { useRoute } from "wouter";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import FeatureMarketingPage from "@/components/dashboard/FeatureMarketingPage";
import AnalyticsDashboard from "@/pages/dashboard/AnalyticsDashboard";
import SecurityDashboard from "@/pages/dashboard/SecurityDashboard";
import CheckoutOptimizer from "@/pages/dashboard/CheckoutOptimizer";
import CartSettings from "@/pages/dashboard/CartSettings";
import MultiGateway from "@/pages/dashboard/MultiGateway";
import CustomerPortal from "@/pages/dashboard/CustomerPortal";

interface EnhancementMeta {
  name: string;
  slug: string;
  headline: string;
  description: string;
  benefits: string[];
  requiredTier: string;
  price: string;
  includedTiers: string[];
  component: React.ComponentType;
}

const enhancementRegistry: Record<string, EnhancementMeta> = {
  "customer-portal": {
    name: "Customer Portal",
    slug: "customer-portal",
    headline: "Let your customers help themselves.",
    description: "A self-service portal where customers can view invoices, update payment methods, manage subscriptions, and download receipts — without contacting you.",
    benefits: [
      "Self-service invoice viewing and payment",
      "Subscription management (upgrade, downgrade, cancel)",
      "Payment method updates",
      "Receipt and invoice PDF downloads",
      "Branded portal matching your business",
    ],
    requiredTier: "Growth",
    price: "$149.99/year",
    includedTiers: ["Enterprise"],
    component: CustomerPortal,
  },
  "security-suite": {
    name: "Security Suite",
    slug: "security-suite",
    headline: "Sleep well knowing your payments are protected.",
    description: "Advanced security features including PCI compliance tools, fraud analytics, and real-time threat monitoring for your payment infrastructure.",
    benefits: [
      "PCI DSS compliance dashboard",
      "Real-time threat monitoring",
      "Security audit logging",
      "IP allowlist/blocklist management",
      "Automated vulnerability scanning",
    ],
    requiredTier: "Growth",
    price: "$199.99/year",
    includedTiers: ["Enterprise"],
    component: SecurityDashboard,
  },
  "advanced-analytics": {
    name: "Advanced Analytics Dashboard",
    slug: "advanced-analytics",
    headline: "Know your numbers. Grow your business.",
    description: "Deep analytics on revenue trends, customer lifetime value, product performance, and conversion funnels — all in one dashboard.",
    benefits: [
      "Revenue trend analysis and forecasting",
      "Customer lifetime value tracking",
      "Product performance rankings",
      "Conversion funnel visualization",
      "Cohort analysis and retention metrics",
      "Exportable reports (PDF, CSV)",
    ],
    requiredTier: "Growth",
    price: "$99.99/year",
    includedTiers: ["Scale", "Enterprise"],
    component: AnalyticsDashboard,
  },
  "checkout-optimizer": {
    name: "Checkout Optimizer",
    slug: "checkout-optimizer",
    headline: "Turn more visitors into customers.",
    description: "One-click checkout, A/B testing, and conversion analytics for your store. Optimize every step of the checkout flow.",
    benefits: [
      "One-click checkout for returning customers",
      "A/B testing on checkout layouts",
      "Dynamic form optimization",
      "Conversion funnel analytics",
      "Smart payment method ordering",
    ],
    requiredTier: "Growth",
    price: "$249.99/year",
    includedTiers: [],
    component: CheckoutOptimizer,
  },
  "shopping-cart-pro": {
    name: "Cart Pro",
    slug: "shopping-cart-pro",
    headline: "Recover abandoned carts automatically.",
    description: "Advanced cart features including abandoned cart recovery emails, cart analytics, upsell prompts, and dynamic discount rules.",
    benefits: [
      "Automated abandoned cart recovery emails",
      "Cart-level discount rules",
      "Upsell and cross-sell prompts",
      "Advanced cart analytics",
      "Exit-intent popup configuration",
    ],
    requiredTier: "Growth",
    price: "$149.99/year",
    includedTiers: [],
    component: CartSettings,
  },
  "multi-gateway": {
    name: "Multi-Gateway",
    slug: "multi-gateway",
    headline: "Never be locked into one processor.",
    description: "Route payments across multiple gateway connections for redundancy, better rates, and international coverage.",
    benefits: [
      "Connect multiple payment processors",
      "Intelligent routing based on card type",
      "Automatic failover between gateways",
      "Geographic routing for international payments",
      "Per-gateway analytics and reporting",
    ],
    requiredTier: "Scale",
    price: "$299.99/year",
    includedTiers: ["Enterprise"],
    component: MultiGateway,
  },
  "premium-api": {
    name: "API Access",
    slug: "premium-api",
    headline: "Build exactly what you need.",
    description: "Full REST API access with webhooks, sandbox environment, and developer documentation for custom integrations.",
    benefits: [
      "Full REST API with comprehensive documentation",
      "Webhook event subscriptions",
      "Sandbox testing environment",
      "API key management (multiple keys)",
      "Rate limiting dashboard",
    ],
    requiredTier: "Scale",
    price: "$199.99/year",
    includedTiers: ["Enterprise"],
    component: () => (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">API Access</h1>
        <p className="text-gray-500">Manage your API keys and webhook configurations from the developer console.</p>
      </div>
    ),
  },
};

export default function EnhancementDetail() {
  const [, params] = useRoute("/dashboard/enhance/:slug");
  const slug = params?.slug || "";
  const { tier, hasAddon } = useMerchantAuth();

  const meta = enhancementRegistry[slug];

  if (!meta) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhancement Not Found</h1>
        <p className="text-gray-500">The enhancement "{slug}" could not be found.</p>
      </div>
    );
  }

  const isOwned = hasAddon(meta.slug);
  const isIncluded = meta.includedTiers.includes(tier);
  const Component = meta.component;

  return (
    <FeatureMarketingPage
      featureName={meta.name}
      headline={meta.headline}
      description={meta.description}
      benefits={meta.benefits}
      requiredTier={meta.requiredTier}
      currentTier={tier}
      price={meta.price}
      ctaText={
        isOwned || isIncluded
          ? ""
          : `Add ${meta.name} — ${meta.price}`
      }
      ctaLink={`/subscribe/${meta.slug}`}
      isOwned={isOwned}
      isIncluded={isIncluded}
    >
      <Component />
    </FeatureMarketingPage>
  );
}
