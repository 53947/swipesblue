import { CreditCard, Code, LayoutDashboard, ShoppingCart, ArrowRight, Check, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import heroImage from "@assets/stand_out_in_a_crowd3_1769891865100.png";

const stats = [
  { value: "$2.4M+", label: "Processed" },
  { value: "99.99%", label: "Uptime" },
  { value: "500+", label: "Businesses" },
  { value: "<2 sec", label: "Avg Response" },
];

const features = [
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept all major cards online and in-person. Competitive rates with no hidden fees.",
    link: "/demo",
    linkText: "Learn more",
    color: "#1844A6",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with clear docs. Integrate in minutes, not days.",
    link: "/dashboard/api-keys",
    linkText: "View docs",
    color: "#064A6C",
  },
  {
    icon: LayoutDashboard,
    title: "Merchant Dashboard",
    description: "Real-time transaction monitoring. See every payment as it happens.",
    link: "/dashboard",
    linkText: "See dashboard",
    color: "#10B981",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Tools",
    description: "Cart, checkout, and subscription management for your online store.",
    link: "/products",
    linkText: "Explore tools",
    color: "#064A6C",
  },
];

const demos = [
  { icon: ShoppingCart, label: "Cart", href: "/shoppingcart" },
  { icon: CreditCard, label: "Checkout", href: "/checkout" },
  { icon: LayoutDashboard, label: "Orders", href: "/orders" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with marching colored rods image */}
      <section className="relative overflow-hidden bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 text-left">
              <p className="text-sm font-medium text-gray-500 tracking-wide">
                Payments processed on SwipesBlue: <span className="text-swipes-blue-deep font-semibold">$2.4M+</span>
              </p>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Built for businesses to grow
              </h1>
              
              <p className="text-lg md:text-xl font-medium text-swipes-blue-deep">
                Less fees. More revenue.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <Link href="/shoppingcart">
                  <Button 
                    size="lg" 
                    className="group bg-swipes-teal text-white shadow-md font-medium"
                    data-testid="button-hero-get-started"
                  >
                    <span className="flex items-center">
                      Get Started
                      <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </span>
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 font-medium"
                    data-testid="button-hero-documentation"
                  >
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side - Stand Out Hero Image */}
            <div className="hidden lg:block">
              <img 
                src={heroImage}
                alt="Stand out in a crowd - colorful bars with dollar sign"
                className="w-full h-auto max-h-[500px] object-contain"
                data-testid="img-hero-visual"
              />
            </div>
          </div>
        </div>

        {/* Company logos bar */}
        <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-400">
              <span className="text-sm font-medium tracking-wide">Trusted by growing businesses</span>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-swipes-trusted-green" />
                <span className="text-sm text-gray-600">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-swipes-gold" />
                <span className="text-sm text-gray-600">Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-swipes-blue-deep" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-swipes-gray-light border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-swipes-blue-deep">
                  {stat.value}
                </div>
                <div className="text-sm text-swipes-gray mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              Everything you need to accept payments
            </h2>
            <p className="mt-4 text-lg text-swipes-gray max-w-2xl mx-auto">
              Modular tools that work together seamlessly. Start small and scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="border border-gray-200 rounded-card shadow-card-subtle hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-swipes-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-swipes-gray mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <Link href={feature.link}>
                      <span className="inline-flex items-center text-swipes-blue-deep font-medium hover:underline">
                        {feature.linkText}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              Simple, transparent pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 rounded-card bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-sm font-semibold text-swipes-gray uppercase tracking-wider mb-4">
                  Transaction
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-swipes-blue-deep">2.70% + $0.30</span>
                  <div className="text-sm text-swipes-gray mt-1">per transaction</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["No monthly fees", "No setup fees", "No hidden costs"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-gray">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/shoppingcart">
                  <Button className="w-full bg-swipes-blue-deep text-white">
                    Start processing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-card bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-sm font-semibold text-swipes-gray uppercase tracking-wider mb-4">
                  E-commerce Suite
                </div>
                <div className="mb-6">
                  <span className="text-sm text-swipes-gray">Starting at</span>
                  <div className="text-4xl font-bold text-swipes-blue-deep">FREE</div>
                  <div className="text-sm text-swipes-gray mt-1">+ paid tiers from $29/mo</div>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  {["Shopping cart", "Checkout system", "Subscription billing"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-swipes-gray">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full border-swipes-blue-deep text-swipes-blue-deep">
                    View plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <span className="text-swipes-blue-deep font-medium hover:underline inline-flex items-center">
                See full pricing details
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Preview */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-6">
                Start accepting payments in minutes
              </h2>
              <p className="text-lg text-swipes-gray mb-8 leading-relaxed">
                Our RESTful API is designed for developers who want to integrate fast without the complexity. 
                Clear documentation, predictable responses, and sandbox testing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button className="bg-swipes-blue-deep text-white">
                    Read the docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/api-keys">
                  <Button variant="outline" className="border-swipes-blue-deep text-swipes-blue-deep">
                    Get API keys
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-swipes-black rounded-card p-6 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code className="text-gray-300">
{`curl https://api.swipesblue.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -d amount=2000 \\
  -d currency=usd \\
  -d description="Payment for order #1234"`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 md:py-28 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              See it in action
            </h2>
            <p className="mt-4 text-lg text-swipes-gray">
              Experience SwipesBlue-powered commerce with our live demos.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg mx-auto">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link key={demo.label} href={demo.href}>
                  <Card className="border border-gray-200 rounded-card bg-white hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-swipes-blue-deep" />
                      <div className="font-medium text-swipes-black mb-2">{demo.label}</div>
                      <span className="text-sm text-swipes-blue-deep inline-flex items-center">
                        Try
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-swipes-blue-deep to-swipes-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Create your account in minutes and start accepting payments today.
          </p>
          <Link href="/shoppingcart">
            <Button 
              size="lg" 
              className="bg-swipes-blue-deep text-white shadow-lg"
              data-testid="button-cta-get-started"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
