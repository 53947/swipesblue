import { Link as LinkIconLucide, Share2, Clock, BarChart3, Smartphone, Shield } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function PaymentLinksProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Payment Links"
        title="Get paid with a link"
        subtitle="Create shareable payment links in seconds. Send via email, text, or social media — no website required. Customers pay on a secure, hosted page."
        primaryCTA={{ label: "Create a Payment Link", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={LinkIconLucide}
      />

      <FeatureCards
        heading="Simple, shareable, secure"
        subheading="Everything you need to collect payments without building a checkout page"
        cards={[
          {
            icon: Share2,
            title: "Share Anywhere",
            description: "Send payment links via email, SMS, social media, or QR code. Customers click and pay — that's it.",
          },
          {
            icon: Clock,
            title: "Expiration Controls",
            description: "Set links to expire after a date or number of uses. Create urgency for time-sensitive offers.",
          },
          {
            icon: BarChart3,
            title: "Track Performance",
            description: "See who opened, clicked, and paid. Monitor conversion rates and follow up on unpaid links.",
          },
          {
            icon: Smartphone,
            title: "Mobile-Optimized",
            description: "Payment pages are fully responsive. Customers pay easily from any device.",
          },
          {
            icon: Shield,
            title: "PCI-Compliant",
            description: "All payment data is handled on our secure, hosted page. You never touch card numbers.",
          },
          {
            icon: LinkIconLucide,
            title: "Custom Amounts",
            description: "Set a fixed price or let customers enter their own amount. Accept tips, donations, or variable pricing.",
          },
        ]}
      />

      <DeepDiveSection
        heading="No website? No problem."
        description="Payment links are the fastest way to collect money online. Create a link, share it, and get paid — all without writing a single line of code."
        bulletPoints={[
          "Create links from the dashboard in under 30 seconds",
          "Add product descriptions, images, and quantities",
          "Collect shipping addresses and custom form fields",
          "Automatic email receipts sent to customers",
          "Reusable links for products you sell repeatedly",
        ]}
        icon={LinkIconLucide}
      />

      <CodeBlock
        heading="Create links via API"
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

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Create a link",
            description: "Set the amount, add a description, and generate a unique payment URL from your dashboard or API.",
          },
          {
            title: "Share with your customer",
            description: "Send the link via email, text message, social media, or embed it as a QR code.",
          },
          {
            title: "Customer pays securely",
            description: "The customer clicks the link, enters payment details on a secure page, and you receive the funds.",
          },
        ]}
      />

      <ProductCTA
        heading="Start collecting payments today"
        description="Create your first payment link in seconds. No website, no code, no hassle."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
