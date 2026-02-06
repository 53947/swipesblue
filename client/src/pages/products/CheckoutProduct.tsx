import { Zap, Palette, Lock, CreditCard, ShoppingCart, Users, Shield } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function CheckoutProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="E-Commerce Suite"
        title="The moment of truth. Make it count."
        subtitle="Your customer found what they wanted, added it to their cart, and clicked checkout. This is where most businesses lose them — complicated forms, forced account creation, slow loading, and payment errors. swipesblue checkout is one page, one click, and done. You get paid. They get their confirmation. Nobody gets frustrated."
        primaryCTA={{ label: "Start Accepting Payments", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={CreditCard}
        mockupLabel="Branded Checkout Page"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Where sales go to die — and how to fix it"
        before={[
          "Customer has to create an account before they can pay. 23% of them leave.",
          "Checkout is three pages. Each page is another chance to lose them.",
          "Payment fails with a generic error. Customer doesn't know why. They don't try again.",
        ]}
        after={[
          "Guest checkout by default. No account required. Enter payment info, click pay, done.",
          "One page. Everything visible. No surprises between cart and confirmation.",
          "Clear, specific error messages. 'Card declined — try another card' not 'Error 500.'",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: Zap,
            title: "One-Page Checkout",
            description: "Everything on a single page. Billing, shipping, payment method, order summary. Customer sees exactly what they're paying before they click.",
          },
          {
            icon: Palette,
            title: "Fully Branded",
            description: "Your logo, your colors, your domain. Customers feel like they're buying from YOU, not from some third-party payment page.",
          },
          {
            icon: Lock,
            title: "PCI Compliant",
            description: "You never see or store raw card numbers. swipesblue handles all the security through NMI's PCI DSS Level 1 infrastructure. You just get paid.",
          },
          {
            icon: CreditCard,
            title: "Every Payment Method",
            description: "Visa, Mastercard, Amex, Discover, ACH bank transfers, Apple Pay, Google Pay. Your customer pays however they want.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Hosted or embedded — your call"
        description="Use swipesblue's hosted checkout page and we handle everything. Or drop the checkout form directly into your website with our JavaScript SDK. Both options are fully PCI compliant, because the sensitive data never touches your servers."
        imagePosition="left"
        icon={CreditCard}
        mockupLabel="Hosted Checkout Page"
      />

      <DeepDiveSection
        heading="Built-in fraud protection"
        description="Every transaction runs through AVS verification, CVV checks, and velocity controls. 3D Secure authentication is built in for high-risk transactions. You reduce chargebacks without adding friction for good customers."
        imagePosition="right"
        icon={Shield}
        mockupLabel="Fraud Rules Dashboard"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: ShoppingCart,
            name: "Shopping Cart",
            description: "Cart totals, items, and discount codes flow directly into checkout. Zero re-entry for your customer.",
            href: "/products/cart",
          },
          {
            icon: Users,
            name: "Customer Vault",
            description: "When a customer pays, their details can be saved to the vault for one-click future purchases.",
            href: "/products/customers",
          },
          {
            icon: Shield,
            name: "Fraud Prevention",
            description: "Your fraud rules run automatically on every checkout transaction. Block bad actors without blocking good customers.",
            href: "/products/fraud",
          },
        ]}
      />

      {/* SECTION 6: FOR DEVELOPERS */}
      <CodeBlock
        heading="Build this into your workflow"
        description="Drop in our JavaScript SDK to embed checkout inline, or redirect customers to a hosted page. Both approaches are fully PCI-compliant."
        code={`// Embed swipesblue checkout
const checkout = SwipesBlue.createCheckout({
  apiKey: "sb_live_xxxxxxxxxxxx",
  amount: 49.99,
  currency: "USD",
  items: [
    { name: "Pro Plan", quantity: 1, price: 49.99 }
  ],
  onSuccess: (result) => {
    console.log("Payment complete:", result.transactionId);
  },
  onError: (error) => {
    console.error("Payment failed:", error.message);
  }
});

checkout.mount("#checkout-container");`}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Stop losing sales at the finish line."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
