import { RefreshCw, Calendar, CreditCard, BarChart3, Bell, Shield } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function RecurringBillingProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Recurring Billing"
        title="Automate your revenue"
        subtitle="Set up subscriptions, memberships, and payment plans with flexible scheduling. Charge customers automatically and reduce churn with smart retry logic."
        primaryCTA={{ label: "Start Billing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={RefreshCw}
      />

      <FeatureCards
        heading="Subscription management, simplified"
        subheading="Everything you need to manage recurring revenue at scale"
        cards={[
          {
            icon: Calendar,
            title: "Flexible Scheduling",
            description: "Bill daily, weekly, monthly, or annually. Set custom intervals, trial periods, and start dates.",
          },
          {
            icon: CreditCard,
            title: "Automatic Charging",
            description: "Charge saved cards on schedule. Failed payments retry automatically with configurable retry logic.",
          },
          {
            icon: BarChart3,
            title: "Revenue Analytics",
            description: "Track MRR, churn rate, lifetime value, and growth trends. Understand your recurring revenue at a glance.",
          },
          {
            icon: Bell,
            title: "Customer Notifications",
            description: "Send automated emails for upcoming charges, payment failures, and subscription changes.",
          },
          {
            icon: Shield,
            title: "Dunning Management",
            description: "Automatically retry failed payments, send reminder emails, and pause or cancel after max retries.",
          },
          {
            icon: RefreshCw,
            title: "Plan Management",
            description: "Create unlimited plans with different prices, intervals, and features. Upgrade or downgrade customers seamlessly.",
          },
        ]}
      />

      <DeepDiveSection
        heading="Built for subscription businesses"
        description="From SaaS to memberships to payment plans, swipesblue recurring billing handles the complexity so you can focus on your product."
        bulletPoints={[
          "Support for trial periods with automatic conversion",
          "Proration for mid-cycle plan changes",
          "Coupon codes and promotional discounts",
          "Webhook notifications for all lifecycle events",
          "Customer self-service portal for plan management",
        ]}
        icon={RefreshCw}
      />

      <CodeBlock
        heading="Create subscriptions via API"
        description="Build subscription flows into your application with the swipesblue API. Manage the full subscription lifecycle programmatically."
        code={`curl -X POST https://api.swipesblue.com/v1/subscriptions \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "cus_a1b2c3d4",
    "planId": "plan_pro_monthly",
    "trialDays": 14,
    "paymentMethodId": "pm_xxxxxxxxxxxx",
    "metadata": {
      "source": "website",
      "campaign": "launch-promo"
    },
    "webhookUrl": "https://yoursite.com/webhooks/billing"
  }'`}
      />

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Create a billing plan",
            description: "Define your pricing, billing interval, trial period, and any included features or limits.",
          },
          {
            title: "Subscribe customers",
            description: "Customers sign up through your checkout or you enroll them via the dashboard or API.",
          },
          {
            title: "Automatic billing",
            description: "Payments are charged automatically on schedule. Failed payments retry with smart dunning logic.",
          },
        ]}
      />

      <ProductCTA
        heading="Start automating your billing"
        description="Set up recurring billing and focus on growing your business instead of chasing payments."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
