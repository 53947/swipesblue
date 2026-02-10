import { Lock, Zap, BarChart3, Monitor, Repeat, FileText, CreditCard, Users } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function CustomerVaultProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Payment Tools"
        title="Your customers shouldn't have to repeat themselves."
        subtitle="Every time a repeat customer has to dig out their wallet and re-enter their card number, you're creating friction. The customer vault securely stores their payment methods so you can charge them with one click — for invoices, subscriptions, phone orders, or anything else. They save their card once. You charge it whenever you need to. Securely, instantly, with zero hassle on either side."
        primaryCTA={{ label: "Get Started", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={Users}
        mockupLabel="Customer Vault — Profile & Saved Methods"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Repeat customers deserve a better experience"
        before={[
          "Regular client calls to pay. You ask for their card number. Again. For the eighth time.",
          "Customer's card info is on a sticky note in your desk drawer. You know that's not okay.",
          "You want to charge a client for a recurring service but you need them to go through the whole checkout flow every time.",
        ]}
        after={[
          "Regular client calls. You pull up their profile, click charge, enter the amount. Done in 10 seconds.",
          "Card numbers are tokenized by NMI's PCI Level 1 infrastructure. You never see or store the actual numbers.",
          "Charge saved customers for anything — one-time payments, invoices, subscriptions — without asking them to re-enter payment details.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={3}
        cards={[
          {
            icon: Lock,
            title: "Truly Secure",
            description: "Card numbers are tokenized the moment they're entered. You store a token, not a card number. NMI's PCI DSS Level 1 infrastructure handles the sensitive data.",
          },
          {
            icon: Zap,
            title: "One-Click Charges",
            description: "Select a customer, enter an amount, charge. Their saved payment method is already on file. No card number needed.",
          },
          {
            icon: BarChart3,
            title: "Complete Customer History",
            description: "See every transaction, invoice, and subscription tied to each customer. Full context every time you interact with them.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Build your customer base automatically"
        description="Every time someone pays — through checkout, a payment link, an invoice, or the terminal — you can save their details to the vault. Over time, you build a complete customer database without any extra work."
        imagePosition="left"
        icon={Users}
        mockupLabel="Vault — Auto-Save From Checkout"
      />

      <DeepDiveSection
        heading="Everything about a customer, in one place"
        description="Contact details, saved payment methods, transaction history, active subscriptions, open invoices. When a customer calls, you have full context in seconds."
        imagePosition="right"
        icon={BarChart3}
        mockupLabel="Customer Profile — Full View"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        title="The vault powers everything"
        subtitle="Almost every other feature in swipesblue connects back to the customer vault."
        products={[
          {
            icon: Monitor,
            name: "Virtual Terminal",
            description: "Charge a saved customer over the phone without asking for their card again.",
            href: "/products/terminal",
          },
          {
            icon: Repeat,
            name: "Subscriptions",
            description: "Subscriptions pull from saved payment methods. Card updates automatically when it expires.",
            href: "/products/billing",
          },
          {
            icon: FileText,
            name: "Invoicing",
            description: "Send invoices to vault customers with their info pre-filled. When they pay, the method is updated.",
            href: "/products/invoicing",
          },
          {
            icon: CreditCard,
            name: "Checkout",
            description: "Returning customers can pay with their saved method at checkout. One click, no re-entry.",
            href: "/products/checkout",
          },
        ]}
      />

      {/* SECTION 6: FOR DEVELOPERS */}
      <CodeBlock
        heading="Build this into your workflow"
        description="Create customer profiles and store payment methods programmatically. Use tokens to charge customers without handling card data."
        code={`curl -X POST https://api.swipesblue.com/v1/vault/customers \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "paymentMethod": {
      "type": "card",
      "cardNumber": "4111111111111111",
      "expMonth": "12",
      "expYear": "2028",
      "cvv": "123"
    },
    "metadata": {
      "source": "checkout",
      "plan": "pro"
    }
  }'`}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Make every repeat customer feel like a VIP."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
