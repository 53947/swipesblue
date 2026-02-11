import { Link } from "wouter";
import { BookOpen, CreditCard, Mail, ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const helpCards = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "New to swipesblue? Start here.",
    href: "/developers",
    linkText: "View documentation",
  },
  {
    icon: CreditCard,
    title: "Pricing & Billing",
    description: "Questions about plans, upgrades, or invoices.",
    href: "/pricing",
    linkText: "View pricing",
  },
  {
    icon: Mail,
    title: "Contact Support",
    description: "Can't find what you need? Reach out.",
    email: "support@swipesblue.com",
  },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers, get support, and learn how to get the most out of swipesblue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {helpCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="border border-gray-200 rounded-[7px] p-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-[7px] flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-[#1844A6]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{card.description}</p>
                {card.href ? (
                  <Link href={card.href}>
                    <span className="text-sm font-medium text-[#1844A6] inline-flex items-center">
                      {card.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ) : (
                  <a
                    href={`mailto:${card.email}`}
                    className="text-sm font-medium text-[#1844A6] inline-flex items-center"
                  >
                    {card.email}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="border border-gray-200 rounded-[7px] p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Code className="h-5 w-5 text-[#1844A6]" />
            <span className="text-sm font-semibold text-gray-900">Looking for API documentation?</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Explore our developer docs for integration guides, API reference, and code samples.
          </p>
          <Link href="/developers">
            <Button className="bg-[#1844A6] text-white rounded-[7px]">
              View Developer Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
