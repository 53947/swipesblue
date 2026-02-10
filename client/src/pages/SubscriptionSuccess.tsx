import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { AddOnProduct } from "@shared/schema";
import Logo from "@/components/Logo";

const productSettingsPath: Record<string, string> = {
  "customer-portal": "/dashboard/customer-portal",
  "multi-gateway": "/dashboard/gateways",
  "security-suite": "/dashboard/security",
  "checkout-optimizer": "/dashboard/checkout-optimizer",
  "shopping-cart-pro": "/dashboard/cart-settings",
  "advanced-analytics": "/dashboard/analytics",
  "premium-api": "/dashboard/api-keys"
};

export default function SubscriptionSuccess() {
  const [location] = useLocation();

  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const productSlug = searchParams.get("product") || "";
  const plan = searchParams.get("plan") || "paid";
  const isFree = plan === "free";

  const { data: addOn } = useQuery<AddOnProduct>({
    queryKey: ["/api/add-ons", productSlug],
    queryFn: async () => {
      const res = await fetch(`/api/add-ons/${productSlug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!productSlug
  });

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const renewalDate = nextYear.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const price = isFree ? 0 : parseFloat(addOn?.annualPrice || "0");
  const settingsPath = productSettingsPath[productSlug] || "/dashboard";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-16">
        <Card className="rounded-[7px] shadow-sm text-center">
          <CardContent className="pt-8 pb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/10 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-success-title">
              {isFree ? "Account Created!" : "Subscription Activated!"}
            </h1>

            {addOn && (
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900">{addOn.name}</p>
                <p className="text-sm text-gray-500">{isFree ? "Free Plan" : "Full Access Plan"}</p>
              </div>
            )}

            {!isFree && (
              <div className="bg-gray-50 rounded-[7px] p-4 mb-6">
                <p className="text-2xl font-bold text-[#1844A6]" data-testid="text-price">${price.toFixed(2)}/year</p>
                <p className="text-sm text-gray-500">Next billing: {renewalDate}</p>
              </div>
            )}

            <p className="text-gray-500 mb-6">
              A confirmation email has been sent to your inbox.
            </p>

            <div className="space-y-3">
              <Link href="/dashboard">
                <Button 
                  className="w-full bg-[#1844A6] text-white rounded-[7px] group"
                  data-testid="button-go-to-dashboard"
                >
                  <span className="flex items-center justify-center">
                    Go to Dashboard
                    <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </span>
                </Button>
              </Link>

              <Link href={settingsPath}>
                <Button 
                  variant="outline" 
                  className="w-full border-[#1844A6] text-[#1844A6] rounded-[7px] group"
                  data-testid="button-configure"
                >
                  <span className="flex items-center justify-center">
                    Configure {addOn?.name || "Enhancement"}
                    <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
