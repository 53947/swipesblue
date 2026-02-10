import { ShoppingCart, CreditCard, Package, ClipboardList, Users, FileText, Repeat, Shield, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import ProductCTA from "@/components/products/ProductCTA";

export default function EcommerceSuite() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="E-Commerce Suite"
        title="You built your business. Now sell online without the headache."
        subtitle="You shouldn't need WordPress, five plugins, a developer, and a separate payment processor just to sell your products online. swipesblue gives you the cart, checkout, product catalog, and order management in one place — with payment processing already built in. No piecing things together. No surprise fees from three different vendors."
        primaryCTA={{ label: "Start Selling for Free", href: "/register" }}
        secondaryCTA={{ label: "See Pricing", href: "/pricing" }}
        icon={ShoppingCart}
        mockupLabel="Product Catalog Dashboard"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Sound familiar?"
        before={[
          "You're paying $30/month for hosting, $79/year for an abandoned cart plugin, 2.9% + $0.30 to Stripe, and spending weekends updating WordPress.",
          "Your cart lives on one platform, your payments on another, and your order tracking in a spreadsheet.",
          "Every new plugin is another subscription, another login, another thing that can break.",
        ]}
        after={[
          "One platform. One login. One fee. Cart, checkout, payments, orders — all connected.",
          "You add products, your customers buy them, and the money shows up in your account. That's it.",
          "No WordPress. No plugins. No developer required.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: ShoppingCart,
            title: "Shopping Cart",
            description: "Your customers add items, see their totals, and check out — all on your branded storefront. Works on mobile, tablet, and desktop.",
          },
          {
            icon: CreditCard,
            title: "One-Page Checkout",
            description: "No multi-step forms. No account creation required. Customer enters their info, clicks pay, done. Conversion rates go up when friction goes down.",
          },
          {
            icon: Package,
            title: "Product Catalog",
            description: "Add products with images, descriptions, pricing, variants, and inventory tracking. Import from CSV or add them one at a time.",
          },
          {
            icon: ClipboardList,
            title: "Order Management",
            description: "Every order from payment to fulfillment, in one place. Automated receipts, refund processing, shipping status, and customer communication.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Add your products in minutes"
        description="Upload your catalog with photos, descriptions, and pricing. Set up variants like size and color. Track inventory automatically — when stock gets low, you'll know before your customers do."
        imagePosition="left"
        icon={Package}
        mockupLabel="Product Catalog — Add/Edit Screen"
      />

      <DeepDiveSection
        heading="Your customers shop on your terms"
        description="Whether you embed the storefront on your existing website or use a hosted shop page, your customers see YOUR brand. Your logo, your colors, your domain. They never know swipesblue is behind the scenes."
        imagePosition="right"
        icon={ShoppingCart}
        mockupLabel="Branded Storefront"
        bgColor="gray"
      />

      <DeepDiveSection
        heading="Orders tracked from click to delivery"
        description="When a customer buys, you see it immediately. Order details, payment confirmation, shipping status, and customer info — all in your dashboard. Issue refunds with one click if you need to."
        imagePosition="left"
        icon={ClipboardList}
        mockupLabel="Order Management Dashboard"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: Users,
            name: "Customer Vault",
            description: "Every customer who buys from your store is automatically saved. Charge them again with one click.",
            href: "/products/customers",
          },
          {
            icon: FileText,
            name: "Invoicing",
            description: "Need to bill a customer manually? Create an invoice right from their order history.",
            href: "/products/invoicing",
          },
          {
            icon: Repeat,
            name: "Subscriptions",
            description: "Sell subscriptions and memberships alongside one-time products. Same cart, same checkout.",
            href: "/products/billing",
          },
          {
            icon: Shield,
            name: "Fraud Prevention",
            description: "Every checkout transaction is automatically screened. Block bad actors without blocking good customers.",
            href: "/products/fraud",
          },
        ]}
      />

      {/* SECTION 6: COMPARISON TABLE */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
              How swipesblue compares
            </h2>
            <p className="text-lg text-[#4B5563]">
              See what you're actually paying across platforms.
            </p>
          </div>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-[#09080E]">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-[#1844A6]">swipesblue</th>
                    <th className="text-center py-4 px-6 font-semibold text-[#09080E]">WooCommerce</th>
                    <th className="text-center py-4 px-6 font-semibold text-[#09080E]">Shopify</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "Cart + Checkout", swipes: "Included", woo: "Free (requires WordPress + hosting)", shopify: "$39+/mo" },
                    { feature: "Payment processing", swipesCheck: true, woo: "Stripe/PayPal required", shopify: "Built in" },
                    { feature: "Transaction fees", swipes: "2.70% + $0.30", woo: "2.90% + $0.30 (Stripe)", shopify: "2.90% + $0.30" },
                    { feature: "Hosting required", swipes: "Included", woo: "$30+/mo separate", shopify: "Included" },
                    { feature: "Plugins required", swipes: "None", woo: "10+ average", shopify: "Varies" },
                    { feature: "Abandoned cart recovery", swipes: "Growth plan", woo: "$79-399/yr plugin", shopify: "$79+/mo plan" },
                  ] as Array<{ feature: string; swipes?: string; swipesCheck?: boolean; woo: string; shopify: string }>).map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-4 px-6 text-sm text-[#4B5563] font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {row.swipesCheck ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-sm font-semibold text-[#1844A6]">{row.swipes}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-[#4B5563]">{row.woo}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-[#4B5563]">{row.shopify}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button className="bg-[#1844A6] text-white rounded-[7px]">
                See Full Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Ready to sell online without the complexity?"
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
