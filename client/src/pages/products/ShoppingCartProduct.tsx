import { ShoppingCart, Package, Palette, BarChart3, Tag, Globe } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import ProductCTA from "@/components/products/ProductCTA";

export default function ShoppingCartProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Shopping Cart"
        title="Your online store, built in"
        subtitle="A complete shopping cart with product management, inventory tracking, and a beautiful storefront. Sell physical goods, digital products, and services — all from your swipesblue account."
        primaryCTA={{ label: "Start Selling", href: "/register" }}
        secondaryCTA={{ label: "View Demo", href: "/shoppingcart" }}
        icon={ShoppingCart}
      />

      <FeatureCards
        heading="Everything you need to sell online"
        subheading="From product catalog to checkout, the shopping cart handles the full commerce experience"
        cards={[
          {
            icon: Package,
            title: "Product Management",
            description: "Add unlimited products with images, variants, descriptions, and pricing. Manage inventory levels in real time.",
          },
          {
            icon: Palette,
            title: "Brand Studio Integration",
            description: "Customize your storefront with your colors, logo, and messaging. Match your brand across the entire experience.",
          },
          {
            icon: Tag,
            title: "Discounts & Promotions",
            description: "Create coupon codes, percentage discounts, and time-limited sales. Apply discounts automatically at checkout.",
          },
          {
            icon: BarChart3,
            title: "Sales Analytics",
            description: "Track sales volume, top products, conversion rates, and revenue trends. Make data-driven inventory decisions.",
          },
          {
            icon: Globe,
            title: "Embeddable",
            description: "Embed your shopping cart on any website. Use our JavaScript SDK or simple iframe integration.",
          },
          {
            icon: ShoppingCart,
            title: "Abandoned Cart Recovery",
            description: "Automatically email customers who leave items in their cart. Recover lost revenue with targeted reminders.",
          },
        ]}
      />

      <DeepDiveSection
        heading="Sell anything, anywhere"
        description="The swipesblue shopping cart is built for small businesses that want to sell online without the complexity of a standalone e-commerce platform."
        bulletPoints={[
          "Sell physical goods, digital downloads, and services",
          "Support for product variants (size, color, etc.)",
          "Automatic tax calculation by region",
          "Shipping rate configuration and label generation",
          "Customer order history and account management",
        ]}
        icon={ShoppingCart}
      />

      <DeepDiveSection
        heading="Integrated with your payments"
        description="Unlike standalone cart solutions, the swipesblue shopping cart is natively integrated with your payment processing. No third-party plugins or gateway configurations required."
        bulletPoints={[
          "Payments process through your existing swipesblue account",
          "Same low rates: 2.70% + $0.30 per transaction",
          "Automatic receipt generation and email delivery",
          "Refunds and disputes managed from one dashboard",
          "Full transaction history linked to orders and customers",
        ]}
        imagePosition="left"
        icon={Package}
      />

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Add your products",
            description: "Upload images, set prices, and add descriptions. Organize products into categories.",
          },
          {
            title: "Share your store",
            description: "Send customers to your hosted storefront or embed the cart on your existing website.",
          },
          {
            title: "Manage orders",
            description: "Track orders, process fulfillment, and manage inventory from your swipesblue dashboard.",
          },
        ]}
      />

      <ProductCTA
        heading="Start your online store"
        description="Set up your shopping cart and start selling in minutes. Free for up to 25 products."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
