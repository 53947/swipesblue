import { ShoppingCart, CreditCard, Package, Shield, Zap, BarChart3, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import HowItWorks from "@/components/products/HowItWorks";
import ProductCTA from "@/components/products/ProductCTA";

export default function EcommerceSuite() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="E-Commerce Suite"
        title="Everything you need to sell online"
        subtitle="A complete commerce platform with shopping cart, checkout, payment processing, and business tools — all in one account. No plugins, no third-party gateways, no complexity."
        primaryCTA={{ label: "Start Selling", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
        icon={ShoppingCart}
      />

      <FeatureCards
        heading="One platform, complete commerce"
        subheading="From product catalog to checkout to recurring billing — everything works together out of the box"
        cards={[
          {
            icon: ShoppingCart,
            title: "Shopping Cart",
            description: "Product catalog, inventory management, and a beautiful storefront. Sell physical goods, digital products, and services.",
          },
          {
            icon: CreditCard,
            title: "Secure Checkout",
            description: "Hosted, PCI-compliant checkout pages. Mobile-optimized, fully brandable, and designed to convert.",
          },
          {
            icon: Package,
            title: "Order Management",
            description: "Track orders from purchase to fulfillment. Manage shipping, returns, and customer communication.",
          },
          {
            icon: Shield,
            title: "Fraud Protection",
            description: "Real-time fraud scoring, velocity checks, and custom rules. Protect revenue without blocking good customers.",
          },
          {
            icon: Zap,
            title: "Payment Processing",
            description: "Accept cards, ACH, and digital wallets at 2.70% + $0.30. No hidden fees, no monthly minimums.",
          },
          {
            icon: BarChart3,
            title: "Analytics & Reporting",
            description: "Track sales, revenue, conversion rates, and top products. Make data-driven decisions about your business.",
          },
        ]}
      />

      {/* Product links */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
              Explore the suite
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Each tool works on its own or together as a complete commerce solution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Shopping Cart", description: "Product catalog and online storefront", href: "/products/cart", icon: ShoppingCart },
              { title: "Online Checkout", description: "Hosted, PCI-compliant checkout pages", href: "/products/checkout", icon: CreditCard },
              { title: "Virtual Terminal", description: "Process payments from any browser", href: "/products/terminal", icon: CreditCard },
              { title: "Payment Links", description: "Shareable payment URLs", href: "/products/payment-links", icon: Zap },
              { title: "Invoicing", description: "Professional invoices with payment links", href: "/products/invoicing", icon: Package },
              { title: "Recurring Billing", description: "Subscriptions and payment plans", href: "/products/billing", icon: BarChart3 },
              { title: "Customer Vault", description: "Secure payment method storage", href: "/products/customers", icon: Shield },
              { title: "Fraud Prevention", description: "Real-time fraud detection and rules", href: "/products/fraud", icon: Shield },
            ].map((product) => {
              const Icon = product.icon;
              return (
                <Link key={product.title} href={product.href}>
                  <div className="border border-gray-200 rounded-[7px] p-6 hover:border-[#1844A6]/30 hover:shadow-md transition-all cursor-pointer h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1844A6]/10 rounded-[7px] flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-[#1844A6]" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#09080E] mb-1">{product.title}</h3>
                        <p className="text-sm text-[#4B5563]">{product.description}</p>
                        <span className="text-[#1844A6] font-medium text-sm mt-3 inline-flex items-center">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
              How swipesblue compares
            </h2>
            <p className="text-lg text-[#4B5563]">
              See how swipesblue stacks up against other e-commerce platforms.
            </p>
          </div>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden shadow-sm">
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
                {[
                  { feature: "Built-in payment processing", swipes: true, woo: false, shopify: true },
                  { feature: "No third-party gateway needed", swipes: true, woo: false, shopify: false },
                  { feature: "Virtual terminal included", swipes: true, woo: false, shopify: false },
                  { feature: "Recurring billing included", swipes: true, woo: false, shopify: false },
                  { feature: "Customer vault included", swipes: true, woo: false, shopify: false },
                  { feature: "Invoicing included", swipes: true, woo: false, shopify: false },
                  { feature: "No hosting required", swipes: true, woo: false, shopify: true },
                  { feature: "Fraud prevention included", swipes: true, woo: false, shopify: true },
                  { feature: "Transaction fee", swipes: "2.70% + $0.30", woo: "Varies by gateway", shopify: "2.90% + $0.30" },
                  { feature: "Monthly fee (starter)", swipes: "$0", woo: "$0 + hosting", shopify: "$39/mo" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-4 px-6 text-sm text-[#4B5563] font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.swipes === "boolean" ? (
                        row.swipes ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-sm font-semibold text-[#1844A6]">{row.swipes}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.woo === "boolean" ? (
                        row.woo ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-sm text-[#4B5563]">{row.woo}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.shopify === "boolean" ? (
                        row.shopify ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-sm text-[#4B5563]">{row.shopify}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      <HowItWorks
        heading="Get started in minutes"
        steps={[
          {
            title: "Create your account",
            description: "Sign up for free and configure your store settings, branding, and payment preferences.",
          },
          {
            title: "Add your products",
            description: "Upload products, set prices, and organize your catalog. Import from CSV or add manually.",
          },
          {
            title: "Start selling",
            description: "Share your store link, embed on your website, or use payment links. Payments process automatically.",
          },
        ]}
      />

      <ProductCTA
        heading="Ready to sell online?"
        description="Get a complete e-commerce platform with built-in payment processing. Start free, scale as you grow."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
