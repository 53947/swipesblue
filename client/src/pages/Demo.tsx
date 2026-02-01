import { ShoppingCart, CreditCard, Package, LayoutDashboard, ArrowRight, Palette, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const demos = [
  {
    icon: Package,
    title: "Product Catalog",
    description: "Browse a sample product catalog with categories, search, and filtering.",
    href: "/products",
    color: "#1844A6",
  },
  {
    icon: ShoppingCart,
    title: "Shopping Cart",
    description: "Add items to cart, update quantities, and see real-time totals.",
    href: "/shoppingcart",
    color: "#064A6C",
  },
  {
    icon: CreditCard,
    title: "Checkout Flow",
    description: "Experience our secure, streamlined checkout process.",
    href: "/checkout",
    color: "#1844A6",
  },
  {
    icon: Receipt,
    title: "Order History",
    description: "View order details, status tracking, and transaction history.",
    href: "/orders",
    color: "#10B981",
  },
  {
    icon: LayoutDashboard,
    title: "Merchant Dashboard",
    description: "Real-time analytics, transaction monitoring, and business insights.",
    href: "/dashboard",
    color: "#064A6C",
  },
  {
    icon: Palette,
    title: "Brand Studio",
    description: "Customize your checkout experience with your brand colors and logo.",
    href: "/brand-studio",
    color: "#FFD700",
  },
];

export default function Demo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-swipes-blue-deep to-swipes-teal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See what you can build
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our interactive demos to experience the full SwipesBlue platform.
            All demos are fully functional with test data.
          </p>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link key={demo.title} href={demo.href}>
                  <Card className="border border-gray-200 rounded-card h-full hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-8">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${demo.color}15` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: demo.color }} />
                      </div>
                      <h3 className="text-xl font-semibold text-swipes-black mb-3">
                        {demo.title}
                      </h3>
                      <p className="text-swipes-gray mb-6 leading-relaxed">
                        {demo.description}
                      </p>
                      <span className="inline-flex items-center text-swipes-blue-pure font-medium group-hover:underline">
                        Try demo
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Preview */}
      <section className="py-20 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-swipes-blue-deep uppercase tracking-wider mb-4">
                For Developers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-6">
                Integrate with any platform
              </h2>
              <p className="text-lg text-swipes-gray mb-8 leading-relaxed">
                Our RESTful API works with any technology stack. Whether you're building with 
                React, Vue, WordPress, or Shopify, SwipesBlue integrates seamlessly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin/api-keys">
                  <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white">
                    Get API Keys
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-swipes-blue-deep text-swipes-blue-deep hover:bg-swipes-blue-deep hover:text-white">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-card p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-swipes-blue-pure/10 rounded flex items-center justify-center">
                    <span className="text-swipes-blue-pure font-bold text-sm">WP</span>
                  </div>
                  <span className="font-medium text-swipes-black">WordPress / WooCommerce</span>
                </div>
                <p className="text-sm text-swipes-gray">One-click plugin installation with automatic configuration.</p>
              </div>
              
              <div className="bg-white rounded-card p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">S</span>
                  </div>
                  <span className="font-medium text-swipes-black">Shopify</span>
                </div>
                <p className="text-sm text-swipes-gray">Native app available in the Shopify App Store.</p>
              </div>
              
              <div className="bg-white rounded-card p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-swipes-teal/10 rounded flex items-center justify-center">
                    <span className="text-swipes-teal font-bold text-sm">API</span>
                  </div>
                  <span className="font-medium text-swipes-black">REST API</span>
                </div>
                <p className="text-sm text-swipes-gray">Full API access for custom integrations with any platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-swipes-blue-deep to-swipes-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Create your account in minutes and start accepting payments today.
          </p>
          <Link href="/shoppingcart">
            <Button 
              size="lg" 
              className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white px-10"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
