import { Globe, Zap, Users, Mail, CreditCard, FileText } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import ProductCTA from "@/components/products/ProductCTA";

export default function VirtualTerminalProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Payment Tools"
        title="Your customer is on the phone. They want to pay. Let them."
        subtitle="Not every transaction happens online. A customer calls to place an order. Someone walks in and wants to pay an invoice. A client mails a check and you need to record it. The virtual terminal lets you key in payments from any browser — no card reader, no hardware, no app. Just log in and process."
        primaryCTA={{ label: "Start Processing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={CreditCard}
        mockupLabel="Virtual Terminal — Payment Form"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="How payment processing should feel"
        before={[
          "Customer wants to pay over the phone. You tell them to go to your website because you can't key in cards.",
          "You bought a card reader that only works with one app. It's in a drawer somewhere.",
          "A client mails a check. You deposit it, but there's no record tying it to their account.",
        ]}
        after={[
          "Customer calls, you open the terminal, type in their card, hit charge. Done. Receipt emailed automatically.",
          "No hardware. No app. Open your browser from any computer, tablet, or phone.",
          "Record cash and check payments so every dollar is tracked, even the offline ones.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: Globe,
            title: "Any Device, Any Browser",
            description: "Process payments from your laptop, tablet, or phone. No special hardware. No software to install.",
          },
          {
            icon: Zap,
            title: "Instant Processing",
            description: "Key in the card, hit charge, get a response in under 3 seconds. Authorize now, capture later if you need to.",
          },
          {
            icon: Users,
            title: "Vault Integration",
            description: "Save the customer's card while you're processing. Next time they call, one click to charge them again.",
          },
          {
            icon: Mail,
            title: "Automatic Receipts",
            description: "Customer gets an email receipt the moment the payment processes. You get the transaction logged in your dashboard.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Phone orders in 30 seconds"
        description="Customer gives you their card number over the phone. You enter it, add the amount and a description, click charge. They get a receipt. You get paid. Total time: less than a minute."
        imagePosition="left"
        icon={CreditCard}
        mockupLabel="Terminal — Processing a Phone Order"
      />

      <DeepDiveSection
        heading="Every payment type, one screen"
        description="Credit cards, debit cards, ACH bank transfers, even cash recording. Split payments. Partial refunds. Authorize and capture later. Everything from one terminal screen."
        imagePosition="right"
        icon={Globe}
        mockupLabel="Terminal — Payment Methods"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: Users,
            name: "Customer Vault",
            description: "Save payment methods during terminal transactions. Next time, select the customer and charge with one click.",
            href: "/products/customers",
          },
          {
            icon: FileText,
            name: "Invoicing",
            description: "Processing a phone payment for an invoice? Link the terminal transaction directly to the open invoice.",
            href: "/products/invoicing",
          },
          {
            icon: CreditCard,
            name: "Payment Links",
            description: "Customer on the phone but can't give their card? Send them a payment link instead. They pay on their own time.",
            href: "/products/payment-links",
          },
        ]}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Your customers want to pay you. Make it easy for both of you."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
