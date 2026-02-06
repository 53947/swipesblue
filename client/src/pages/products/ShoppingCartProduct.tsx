import { ShoppingCart, RefreshCw, Smartphone, Tag, CreditCard, Package, Mail } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import ProductCTA from "@/components/products/ProductCTA";

export default function ShoppingCartProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="E-Commerce Suite"
        title="Your customers want to buy. Don't make it complicated."
        subtitle="A shopping cart should be invisible. Your customer adds what they want, sees their total, and moves to checkout. No account creation walls. No confusing multi-page flows. No &quot;session expired&quot; errors. swipesblue's cart just works — on every device, every time."
        primaryCTA={{ label: "Start Selling", href: "/register" }}
        secondaryCTA={{ label: "View E-Commerce Suite", href: "/products/ecommerce" }}
        icon={ShoppingCart}
        mockupLabel="Shopping Cart — Desktop & Mobile"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="What your customers are dealing with"
        before={[
          "Customer adds items, gets distracted, comes back — cart is empty.",
          "Cart doesn't work right on mobile. Customer gives up.",
          "Discount code field is hidden or broken. Customer leaves.",
        ]}
        after={[
          "Cart persists across sessions. They come back tomorrow, their items are still there.",
          "Fully responsive. Looks great on a phone. Easy to tap, easy to pay.",
          "Discount codes work the first time. Apply percentage or fixed amount. Customer feels rewarded.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={3}
        cards={[
          {
            icon: RefreshCw,
            title: "Persistent Cart",
            description: "Your customer's cart survives page refreshes, browser restarts, and second thoughts. When they come back, their items are waiting.",
          },
          {
            icon: Smartphone,
            title: "Mobile-First",
            description: "More than half your customers are shopping on their phone. The cart is built for thumbs, not cursors.",
          },
          {
            icon: Tag,
            title: "Smart Discounts",
            description: "Create percentage or fixed-amount discount codes. Set expiration dates, usage limits, and minimum order amounts. Customers apply them at cart — no confusion.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Built for real shopping behavior"
        description="Your customers don't always buy on the first visit. They browse, compare, and come back. The swipesblue cart remembers what they wanted so they don't have to start over."
        imagePosition="left"
        icon={ShoppingCart}
        mockupLabel="Persistent Cart — Return Visit"
      />

      <DeepDiveSection
        heading="Embed it anywhere"
        description="Drop the cart widget into your existing website with a single line of code. Or use swipesblue's hosted storefront. Either way, it's your brand, your experience."
        imagePosition="right"
        icon={Package}
        mockupLabel="Embedded Cart Widget"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: CreditCard,
            name: "Checkout",
            description: "Seamless handoff. Cart totals, discounts, and customer info carry straight into checkout with zero re-entry.",
            href: "/products/checkout",
          },
          {
            icon: Package,
            name: "Product Catalog",
            description: "Cart pulls real-time pricing, inventory, and product details from your catalog. Always accurate.",
            href: "/products/ecommerce",
          },
          {
            icon: Mail,
            name: "Abandoned Cart Recovery",
            description: "When a customer leaves items behind, swipesblue can automatically email them a reminder. (Starter plan+)",
            href: "/products/ecommerce",
          },
        ]}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Give your customers a reason to finish what they started."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
