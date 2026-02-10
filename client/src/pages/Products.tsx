import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowRight,
  Package,
  ShoppingCart,
  CreditCard,
  Monitor,
  Link as LinkIcon,
  FileText,
  RefreshCw,
  Users,
  Shield,
} from "lucide-react";
import EnhancementCard from "@/components/EnhancementCard";
import type { AddOnProduct } from "@shared/schema";

const coreProducts = [
  {
    name: "E-Commerce Platform",
    href: "/products/ecommerce",
    icon: Package,
    description: "Full-featured online storefront with product management, inventory tracking, and order fulfillment.",
  },
  {
    name: "Shopping Cart",
    href: "/products/cart",
    icon: ShoppingCart,
    description: "Optimized cart experience with smart upsells, saved carts, and seamless guest checkout.",
  },
  {
    name: "Checkout",
    href: "/products/checkout",
    icon: CreditCard,
    description: "Conversion-optimized checkout flow with multiple payment methods and address verification.",
  },
  {
    name: "Virtual Terminal",
    href: "/products/terminal",
    icon: Monitor,
    description: "Accept phone and mail-order payments from any browser — no hardware required.",
  },
  {
    name: "Payment Links",
    href: "/products/payment-links",
    icon: LinkIcon,
    description: "Generate shareable payment links for invoices, donations, or one-time purchases.",
  },
  {
    name: "Invoicing",
    href: "/products/invoicing",
    icon: FileText,
    description: "Professional invoices with automated reminders, partial payments, and real-time tracking.",
  },
  {
    name: "Recurring Billing",
    href: "/products/billing",
    icon: RefreshCw,
    description: "Subscription management with flexible billing cycles, dunning, and revenue analytics.",
  },
  {
    name: "Customer Management",
    href: "/products/customers",
    icon: Users,
    description: "Centralized customer profiles with payment history, saved methods, and lifetime value insights.",
  },
  {
    name: "Fraud Prevention",
    href: "/products/fraud",
    icon: Shield,
    description: "AI-powered fraud detection with velocity checks, device fingerprinting, and chargeback protection.",
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: addOns, isLoading } = useQuery<AddOnProduct[]>({
    queryKey: ["/api/add-ons"],
  });

  const filteredAddOns = addOns?.filter((addOn) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      addOn.name.toLowerCase().includes(term) ||
      addOn.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Products</h1>
          <p className="text-gray-500">
            Everything you need to accept payments, manage customers, and grow your business.
          </p>
        </div>

        {/* ─── Section 1: Core Products ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Core Products</h2>
          <p className="text-gray-500 mb-6">
            The building blocks of your swipesblue payment stack.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreProducts.map((product) => {
              const Icon = product.icon;
              return (
                <Card
                  key={product.href}
                  className="flex flex-col border border-gray-200 rounded-[7px] hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex flex-col flex-1 p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 bg-gray-100 rounded-full shrink-0">
                        <Icon className="h-5 w-5 text-[#1844A6]" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base leading-tight pt-1">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 mb-6 flex-1">
                      {product.description}
                    </p>

                    <Link href={product.href}>
                      <button className="w-full flex items-center justify-center gap-1 text-sm font-medium text-[#1844A6] hover:underline group">
                        Learn More
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ─── Section 2: Enhancements ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Enhancements</h2>
          <p className="text-gray-500 mb-6">
            Extend your swipesblue platform with powerful enhancements.
          </p>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enhancements..."
              className="pl-10 rounded-[7px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-addon-search"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse border border-gray-200 rounded-[7px]">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-10 bg-muted rounded w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAddOns && filteredAddOns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAddOns.map((addOn) => (
                <EnhancementCard key={addOn.id} addOn={addOn} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-2">No enhancements found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search term</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
