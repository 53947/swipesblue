import { Zap, Smartphone, Link as LinkIcon, Users, FileText, Monitor } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function PaymentLinksProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Payment Tools"
        title="No website? No problem. Just send a link."
        subtitle="You don't need a website, a shopping cart, or a developer to get paid. Create a payment link in 30 seconds, send it via email, text, or social media, and your customer pays on a secure page. That's it. You get notified when the money lands. They get a receipt."
        primaryCTA={{ label: "Create a Payment Link", href: "/register" }}
        secondaryCTA={{ label: "See API Docs", href: "/developers" }}
        icon={LinkIcon}
        mockupLabel="Payment Link — Creation & Customer View"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Getting paid shouldn't require a tech degree"
        before={[
          "Client says 'just send me a link to pay.' You don't have one. You send them your bank wire details and hope.",
          "You set up a whole website just to accept a single payment.",
          "You're chasing invoices via email. Client says they'll pay 'soon.' It's been three weeks.",
        ]}
        after={[
          "Client says 'send me a link.' You create one in 30 seconds and text it to them.",
          "No website needed. swipesblue hosts the payment page. Your logo, your branding.",
          "Client clicks the link, pays immediately. You get notified. Money in your account.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={3}
        cards={[
          {
            icon: Zap,
            title: "30-Second Setup",
            description: "Set the amount, add a description, click create. Your payment link is ready to share.",
          },
          {
            icon: Smartphone,
            title: "Send It Anywhere",
            description: "Email, text message, social media DM, embed on a webpage, or print as a QR code. Wherever your customer is, the link works.",
          },
          {
            icon: LinkIcon,
            title: "Reusable or One-Time",
            description: "Create a permanent link for a service you sell regularly, or a one-time link for a specific transaction. Set expiration dates if needed.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Perfect for service businesses"
        description="Consultants, contractors, freelancers, salons, repair shops — if you provide a service and need to collect payment, a link is the simplest way. No invoicing system required. No website required. Just a link."
        imagePosition="left"
        icon={LinkIcon}
        mockupLabel="Payment Link — Service Business"
      />

      <DeepDiveSection
        heading="QR codes for in-person payments"
        description="Print your payment link as a QR code. Stick it at the register, on a menu, or on a poster. Customer scans with their phone and pays instantly. No card reader needed."
        imagePosition="right"
        icon={Smartphone}
        mockupLabel="QR Code Payment"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: Users,
            name: "Customer Vault",
            description: "When someone pays via a link, their info can be saved for future charges. Build your customer base with every payment.",
            href: "/products/customers",
          },
          {
            icon: FileText,
            name: "Invoicing",
            description: "Need something more formal? Create a full invoice instead. Or start with a link and upgrade to invoicing when your business grows.",
            href: "/products/invoicing",
          },
          {
            icon: Monitor,
            name: "Virtual Terminal",
            description: "Need to key in a card instead? Open the terminal and process the payment directly from your browser.",
            href: "/products/terminal",
          },
        ]}
      />

      {/* SECTION 6: FOR DEVELOPERS */}
      <CodeBlock
        heading="Build this into your workflow"
        description="Automate payment link creation from your backend. Generate unique links for each customer or order programmatically."
        code={`curl -X POST https://api.swipesblue.com/v1/payment-links \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 150.00,
    "currency": "USD",
    "description": "Website Design Deposit",
    "customerEmail": "client@example.com",
    "expiresAt": "2026-03-01T00:00:00Z",
    "redirectUrl": "https://yoursite.com/thank-you",
    "metadata": {
      "projectId": "proj_123",
      "invoiceNumber": "INV-0042"
    }
  }'`}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Your next payment is one link away."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
