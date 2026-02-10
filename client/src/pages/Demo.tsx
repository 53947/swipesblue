import { useState, useEffect } from "react";
import { ShoppingCart, CreditCard, Package, LayoutDashboard, ArrowRight, Palette, Receipt, CheckCircle2, Loader2, Send, Shield } from "lucide-react";
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

const paymentSteps = [
  { id: 1, label: "Customer clicks pay", icon: ShoppingCart, description: "Customer initiates payment" },
  { id: 2, label: "Card info encrypted", icon: Shield, description: "256-bit SSL encryption" },
  { id: 3, label: "Processing payment", icon: Loader2, description: "Secure transaction processing" },
  { id: 4, label: "Funds transferred", icon: Send, description: "Money moves to your account" },
  { id: 5, label: "Payment complete", icon: CheckCircle2, description: "Confirmation sent instantly" },
];

function AnimatedPaymentFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (activeStep > paymentSteps.length) {
      setShowSuccess(true);
      const resetTimer = setTimeout(() => {
        setShowSuccess(false);
        setActiveStep(0);
      }, 2000);
      return () => clearTimeout(resetTimer);
    }

    const stepTimer = setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(stepTimer);
  }, [activeStep]);

  const handleRestart = () => {
    setShowSuccess(false);
    setActiveStep(0);
  };

  return (
    <div className="relative py-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Payment Flow</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRestart}
          className="text-[#1844A6] border-[#1844A6]"
          data-testid="button-restart-animation"
        >
          Restart Animation
        </Button>
      </div>

      <div className="relative">
        <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#1844A6] to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${(Math.min(activeStep, paymentSteps.length) / paymentSteps.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between relative z-10">
          {paymentSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep >= step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center w-1/5"
                data-testid={`step-${step.id}`}
              >
                <div
                  className={`
                    w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 mb-4
                    ${isActive
                      ? "bg-gradient-to-br from-[#1844A6] to-teal-600 shadow-lg"
                      : "bg-white border-2 border-gray-200"
                    }
                    ${isCurrent ? "scale-110 ring-4 ring-[#1844A6]/20" : ""}
                  `}
                >
                  <Icon
                    className={`h-10 w-10 transition-all duration-500 ${
                      isActive ? "text-white" : "text-gray-400"
                    } ${isCurrent && step.id === 3 ? "animate-spin" : ""}`}
                  />
                </div>
                <p
                  className={`text-sm font-medium text-center transition-all duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs text-center mt-1 transition-all duration-300 ${
                    isActive ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h4>
              <p className="text-gray-500">Transaction completed in under 2 seconds</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-3xl font-bold text-[#1844A6]">{"<"}2s</p>
          <p className="text-sm text-gray-500 mt-1">Average processing time</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-3xl font-bold text-green-600">99.9%</p>
          <p className="text-sm text-gray-500 mt-1">Transaction success rate</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-3xl font-bold text-teal-600">PCI-DSS</p>
          <p className="text-sm text-gray-500 mt-1">Level 1 certified</p>
        </div>
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1844A6] to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See what you can build
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our interactive demos to experience the full swipesblue platform.
            All demos are fully functional with test data.
          </p>
        </div>
      </section>

      {/* Animated Payment Flow */}
      <section className="py-20 bg-white" data-testid="section-payment-flow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch payments flow in real-time
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              See how swipesblue processes payments securely and instantly
            </p>
          </div>
          <Card className="border border-gray-200 rounded-[7px] overflow-hidden">
            <CardContent className="p-8">
              <AnimatedPaymentFlow />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="py-20 bg-gray-50" data-testid="section-demo-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive Demos
            </h2>
            <p className="text-lg text-gray-500">
              Try our fully functional demos with test data
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Link key={demo.title} href={demo.href}>
                  <Card className="border border-gray-200 rounded-[7px] h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group bg-white">
                    <CardContent className="p-8">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${demo.color}15` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: demo.color }} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {demo.title}
                      </h3>
                      <p className="text-gray-500 mb-6 leading-relaxed">
                        {demo.description}
                      </p>
                      <span className="inline-flex items-center text-[#1844A6] font-medium group-hover:underline">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#1844A6] uppercase tracking-wider mb-4">
                For Developers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Integrate with any platform
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Our RESTful API works with any technology stack. Whether you're building with 
                React, Vue, WordPress, or Shopify, swipesblue integrates seamlessly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/api-keys">
                  <Button className="group bg-[#1844A6] text-white">
                    <span className="flex items-center">
                      Get API Keys
                      <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </span>
                  </Button>
                </Link>
                <Link href="/developers">
                  <Button variant="outline" className="group border-2 border-teal-600 text-teal-600">
                    <span className="flex items-center">
                      View Documentation
                      <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-[7px] p-6 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#1844A6]/10 rounded flex items-center justify-center">
                    <span className="text-[#1844A6] font-bold text-sm">WP</span>
                  </div>
                  <span className="font-medium text-gray-900">WordPress / WooCommerce</span>
                </div>
                <p className="text-sm text-gray-500">One-click plugin installation with automatic configuration.</p>
              </div>
              
              <div className="bg-gray-50 rounded-[7px] p-6 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-600/10 rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">S</span>
                  </div>
                  <span className="font-medium text-gray-900">Shopify</span>
                </div>
                <p className="text-sm text-gray-500">Native app available in the Shopify App Store.</p>
              </div>
              
              <div className="bg-gray-50 rounded-[7px] p-6 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-teal-600/10 rounded flex items-center justify-center">
                    <span className="text-teal-600 font-bold text-sm">API</span>
                  </div>
                  <span className="font-medium text-gray-900">REST API</span>
                </div>
                <p className="text-sm text-gray-500">Full API access for custom integrations with any platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1844A6] to-teal-600">
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
              className="group bg-white text-[#1844A6]"
              data-testid="button-cta-demo"
            >
              <span className="flex items-center">
                Get Started Free
                <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
