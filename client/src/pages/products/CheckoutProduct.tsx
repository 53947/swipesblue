import { ShoppingCart, Shield, Palette, Smartphone, Globe, Zap } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function CheckoutProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Online Checkout"
        title="A checkout experience that converts"
        subtitle="Hosted, PCI-compliant checkout pages that match your brand. Embed on your site or redirect customers — either way, you're covered."
        primaryCTA={{ label: "Start Selling", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={ShoppingCart}
      />

      <FeatureCards
        heading="Conversion-optimized checkout"
        subheading="Every detail designed to reduce cart abandonment and increase completed purchases"
        cards={[
          {
            icon: Palette,
            title: "Fully Brandable",
            description: "Customize colors, logos, and messaging with Brand Studio. Your checkout, your brand.",
          },
          {
            icon: Smartphone,
            title: "Mobile-First Design",
            description: "Responsive layouts that look great on any device. Optimized input fields for mobile keyboards.",
          },
          {
            icon: Shield,
            title: "PCI DSS Level 1",
            description: "Card data never touches your servers. Fully hosted checkout handles all PCI compliance for you.",
          },
          {
            icon: Globe,
            title: "Multi-Currency",
            description: "Accept payments in USD and major currencies. Automatic currency display for international customers.",
          },
          {
            icon: Zap,
            title: "One-Click Payments",
            description: "Returning customers pay with saved cards from the Customer Vault. Fewer fields, faster checkout.",
          },
          {
            icon: ShoppingCart,
            title: "Cart Integration",
            description: "Works with the swipesblue Shopping Cart or your own. Pass line items for itemized receipts.",
          },
        ]}
      />

      <DeepDiveSection
        heading="Reduce abandonment, increase revenue"
        description="Our checkout pages are designed to remove friction at every step. Customers complete purchases faster with fewer form fields and smart defaults."
        bulletPoints={[
          "Address auto-complete reduces typing by 60%",
          "Real-time card validation catches errors before submission",
          "Guest checkout — no forced account creation",
          "Automatic tax calculation based on customer location",
          "Support for discount codes and promotional pricing",
        ]}
        icon={ShoppingCart}
      />

      <CodeBlock
        heading="Embed or redirect — your choice"
        description="Drop in our JavaScript SDK to embed checkout inline, or redirect customers to a hosted page. Both approaches are fully PCI-compliant and require zero card data handling on your end."
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

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Create a checkout session",
            description: "Use the API or dashboard to create a checkout with your products, prices, and branding.",
          },
          {
            title: "Customer completes payment",
            description: "The customer enters their payment details on the secure, PCI-compliant checkout page.",
          },
          {
            title: "Receive confirmation",
            description: "Get a webhook notification and redirect the customer to your success page.",
          },
        ]}
      />

      <ProductCTA
        heading="Build your checkout today"
        description="Start accepting payments with a secure, branded checkout experience in minutes."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
