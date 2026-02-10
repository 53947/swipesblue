import { Send, CreditCard, Bell, BarChart3, Users, Repeat, Monitor, FileText } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function InvoicingProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Payment Tools"
        title="Send the invoice. Get paid. Stop chasing."
        subtitle="You did the work. Now you're spending your evenings writing invoices in Word, emailing PDFs, and following up when clients &quot;forget&quot; to pay. swipesblue invoicing lets you create professional invoices in minutes, email them with a built-in pay button, and get notified the moment they're paid. Automatic reminders handle the chasing so you don't have to."
        primaryCTA={{ label: "Start Invoicing", href: "/register" }}
        secondaryCTA={{ label: "See API Docs", href: "/developers" }}
        icon={FileText}
        mockupLabel="Invoice Creation Screen"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="The invoicing cycle you know too well"
        before={[
          "Create invoice in Word. Save as PDF. Attach to email. Hope client opens it.",
          "Client says they paid. You check your bank. Nothing. You send another email.",
          "End of month: you're reconciling invoices against bank deposits in a spreadsheet at midnight.",
        ]}
        after={[
          "Create invoice in swipesblue. Click send. Client gets an email with a 'Pay Now' button.",
          "Client clicks, pays with their card or bank account. Invoice automatically marked as paid.",
          "Automatic reminders for overdue invoices. You never send an awkward follow-up again.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: Send,
            title: "One-Click Send",
            description: "Create the invoice, click send. Your client receives a professional email with a direct link to pay. No PDF attachments. No confusion.",
          },
          {
            icon: CreditCard,
            title: "Built-In Payments",
            description: "Your client clicks 'Pay Now' and pays right there — card or bank transfer. No logging into a portal. No mailing a check.",
          },
          {
            icon: Bell,
            title: "Automatic Reminders",
            description: "Overdue invoice? swipesblue sends polite reminders on your behalf. You set the schedule. The awkward conversations handle themselves.",
          },
          {
            icon: BarChart3,
            title: "Real-Time Tracking",
            description: "See which invoices are sent, viewed, paid, and overdue — at a glance. Know exactly where your money stands.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Professional invoices in 2 minutes"
        description="Add line items, quantities, tax, and notes. Your logo and business details are already saved. Hit send and the client receives a clean, branded invoice that looks like you hired a designer."
        imagePosition="left"
        icon={FileText}
        mockupLabel="Invoice — Line Items & Branding"
      />

      <DeepDiveSection
        heading="Your client's experience"
        description="They get an email. It has your logo, the amount due, and a big blue 'Pay Now' button. They click it, enter their card (or select their saved method), and pay. They get a receipt. You get notified. The invoice is closed."
        imagePosition="right"
        icon={CreditCard}
        mockupLabel="Client — Pay Now Email"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: Users,
            name: "Customer Vault",
            description: "Invoice a saved customer with their details pre-filled. If they pay, their method is saved for next time.",
            href: "/products/customers",
          },
          {
            icon: Repeat,
            name: "Subscriptions",
            description: "Have a client you invoice every month for the same amount? Set up a subscription instead and automate the whole thing.",
            href: "/products/billing",
          },
          {
            icon: Monitor,
            name: "Virtual Terminal",
            description: "Client wants to pay the invoice over the phone? Open the terminal, pull up their invoice, charge their card. Invoice marked as paid.",
            href: "/products/terminal",
          },
        ]}
      />

      {/* SECTION 6: FOR DEVELOPERS */}
      <CodeBlock
        heading="Build this into your workflow"
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

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Do the work. Send the invoice. Get paid. That's it."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
