import { FileText, Send, Clock, BarChart3, CreditCard, RefreshCw } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function InvoicingProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Invoicing"
        title="Send invoices, get paid faster"
        subtitle="Create professional invoices with built-in payment links. Customers pay with one click — no logging in, no checks to mail, no waiting."
        primaryCTA={{ label: "Start Invoicing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={FileText}
      />

      <FeatureCards
        heading="Professional invoicing, built in"
        subheading="Everything you need to bill customers and collect payments efficiently"
        cards={[
          {
            icon: Send,
            title: "One-Click Sending",
            description: "Email invoices directly from your dashboard. Customers receive a branded email with a pay-now button.",
          },
          {
            icon: CreditCard,
            title: "Integrated Payments",
            description: "Every invoice includes a secure payment link. Customers pay by card — funds go directly to your account.",
          },
          {
            icon: Clock,
            title: "Automatic Reminders",
            description: "Set up payment reminders for overdue invoices. Reduce follow-up time and get paid faster.",
          },
          {
            icon: BarChart3,
            title: "Payment Tracking",
            description: "See which invoices are sent, viewed, paid, or overdue in real time from your dashboard.",
          },
          {
            icon: FileText,
            title: "Custom Templates",
            description: "Add your logo, colors, and payment terms. Create consistent, branded invoices every time.",
          },
          {
            icon: RefreshCw,
            title: "Recurring Invoices",
            description: "Set invoices to auto-send on a schedule. Bill retainer clients, subscriptions, or maintenance plans automatically.",
          },
        ]}
      />

      <DeepDiveSection
        heading="Built for service businesses"
        description="Whether you're a freelancer, consultant, or agency, swipesblue invoicing helps you bill professionally and collect payments without chasing clients."
        bulletPoints={[
          "Add line items with descriptions, quantities, and rates",
          "Apply taxes, discounts, and late fees automatically",
          "Attach files like contracts or project deliverables",
          "Accept partial payments and payment plans",
          "Export invoice data for accounting and tax reporting",
        ]}
        icon={FileText}
      />

      <CodeBlock
        heading="Create invoices programmatically"
        description="Generate and send invoices from your application using the swipesblue API. Automate billing workflows for your platform or marketplace."
        code={`curl -X POST https://api.swipesblue.com/v1/invoices \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerEmail": "client@example.com",
    "customerName": "Acme Corp",
    "dueDate": "2026-03-15",
    "items": [
      {
        "description": "Website Redesign",
        "quantity": 1,
        "unitPrice": 2500.00
      },
      {
        "description": "Monthly Hosting",
        "quantity": 3,
        "unitPrice": 49.99
      }
    ],
    "notes": "Thank you for your business!",
    "sendEmail": true
  }'`}
      />

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Create your invoice",
            description: "Add line items, set due dates, and apply your branding. Use templates for repeat clients.",
          },
          {
            title: "Send to your customer",
            description: "Email the invoice with one click. The customer receives a professional email with a payment link.",
          },
          {
            title: "Get paid instantly",
            description: "The customer clicks pay, enters their card, and you receive the funds. Track everything in your dashboard.",
          },
        ]}
      />

      <ProductCTA
        heading="Start sending invoices"
        description="Create professional invoices and get paid faster with built-in payment links."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
