import { Calendar, RefreshCw, AlertTriangle, ArrowUpCircle, Users, FileText, CreditCard } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function RecurringBillingProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Payment Tools"
        title="Get paid on schedule. Without lifting a finger."
        subtitle="If you have customers who pay you the same amount every month — memberships, retainers, subscriptions, maintenance plans — you shouldn't be manually invoicing them each time. Set up the billing plan once. swipesblue charges their saved payment method automatically on schedule. You get paid. They get a receipt. Nobody has to remember anything."
        primaryCTA={{ label: "Start Billing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={RefreshCw}
        mockupLabel="Billing Plans Dashboard"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Monthly billing shouldn't be a monthly chore"
        before={[
          "First of the month: create 15 invoices for recurring clients. Send them all. Hope they pay on time.",
          "A card expires. The charge fails silently. You don't find out until the client is 30 days past due.",
          "Client wants to upgrade their plan mid-cycle. You do the math on a napkin.",
        ]}
        after={[
          "First of the month: swipesblue charges everyone automatically. You wake up and the money is there.",
          "Card expires? Automatic card updater tries to update it. Charge fails? Automatic retry with dunning emails.",
          "Client upgrades mid-cycle. Proration calculated automatically. No napkin required.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: Calendar,
            title: "Any Billing Cycle",
            description: "Daily, weekly, monthly, quarterly, annual — whatever your business needs. Set the schedule and forget it.",
          },
          {
            icon: RefreshCw,
            title: "Automatic Charges",
            description: "Customer's saved payment method is charged on schedule. No manual invoicing. No reminders. No chasing.",
          },
          {
            icon: AlertTriangle,
            title: "Smart Failure Handling",
            description: "When a charge fails, swipesblue retries automatically and notifies the customer. Reduce involuntary churn without doing anything.",
          },
          {
            icon: ArrowUpCircle,
            title: "Plan Changes Made Easy",
            description: "Upgrades, downgrades, and cancellations handled from the dashboard. Proration calculated automatically.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Set it up once"
        description="Create a billing plan: name, amount, billing cycle, trial period if you want one. Then subscribe customers to it — from the dashboard or via API. That's the last time you think about it."
        imagePosition="left"
        icon={Calendar}
        mockupLabel="Billing Plan — Setup"
      />

      <DeepDiveSection
        heading="What your customers see"
        description="They get an email when they're charged, with a receipt and a link to manage their subscription. If their card fails, they get a friendly notification with a link to update their payment method. No awkward phone calls."
        imagePosition="right"
        icon={RefreshCw}
        mockupLabel="Customer — Subscription Email"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: Users,
            name: "Customer Vault",
            description: "Recurring billing uses saved payment methods from the vault. Customer saves their card once, gets charged automatically forever.",
            href: "/products/customers",
          },
          {
            icon: FileText,
            name: "Invoicing",
            description: "Need to bill a one-off charge alongside a subscription? Create an invoice for the customer without disrupting their recurring plan.",
            href: "/products/invoicing",
          },
          {
            icon: CreditCard,
            name: "Checkout",
            description: "Customers can subscribe directly during checkout. Same cart, same payment flow, automatic recurring charges.",
            href: "/products/checkout",
          },
        ]}
      />

      {/* SECTION 6: FOR DEVELOPERS */}
      <CodeBlock
        heading="Build this into your workflow"
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

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Set up your billing. Then go run your business."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
