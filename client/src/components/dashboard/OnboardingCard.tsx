import { useState } from "react";
import { Link } from "wouter";
import { Package, CreditCard, Link2, DollarSign, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = "swipesblue-onboarding-dismissed";

interface OnboardingStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  ctaLabel: string;
}

const steps: OnboardingStep[] = [
  {
    id: "add-product",
    number: 1,
    title: "Add your first product",
    description: "Create a product in your catalog to sell to customers.",
    icon: Package,
    href: "/dashboard/catalog/create",
    ctaLabel: "Start",
  },
  {
    id: "setup-checkout",
    number: 2,
    title: "Set up checkout",
    description: "Configure your one-page checkout experience.",
    icon: CreditCard,
    href: "/dashboard/ecommerce/checkout",
    ctaLabel: "Start",
  },
  {
    id: "payment-link",
    number: 3,
    title: "Share a payment link",
    description: "Create a link your customers can use to pay you.",
    icon: Link2,
    href: "/dashboard/payment-links",
    ctaLabel: "Start",
  },
  {
    id: "get-paid",
    number: 4,
    title: "Get paid",
    description: "Process your first transaction and see it in your dashboard.",
    icon: DollarSign,
    href: "/dashboard/transactions",
    ctaLabel: "Done",
  },
];

export default function OnboardingCard() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  return (
    <Card className="rounded-[7px] border-[#1844A6]/20 bg-[#1844A6]/5 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-1 rounded-[7px] hover:bg-white/50 transition-colors text-gray-400 hover:text-gray-600"
        aria-label="Dismiss onboarding"
      >
        <X className="h-4 w-4" />
      </button>

      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Welcome to swipesblue
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          You're set up with the E-Commerce Suite on the Free plan. Here's how to get started:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white border border-gray-200 rounded-[7px] p-4 flex flex-col items-center text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#1844A6]/10 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-[#1844A6]">{step.number}</span>
                </div>
                <Icon className="h-5 w-5 text-gray-600 mb-2" />
                <h4 className="text-sm font-medium text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500 mb-3 flex-1">{step.description}</p>
                <Link href={step.href}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-[7px] text-xs border-[#1844A6]/30 text-[#1844A6] hover:bg-[#1844A6]/5"
                  >
                    {step.ctaLabel}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          This guide disappears after you complete the steps or dismiss it.
        </p>
      </CardContent>
    </Card>
  );
}
