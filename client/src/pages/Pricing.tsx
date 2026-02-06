import { useState } from "react";
import { Check, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tiers = [
  {
    name: "FREE",
    monthly: 0,
    annual: 0,
    features: [
      "Online checkout",
      "Payment links",
      "Basic invoicing",
      "Up to 25 products",
      "1 user",
      "Email support",
      "Basic dashboard",
    ],
    cta: "Get Started Free",
    ctaLink: "/register",
    popular: false,
    ctaStyle: "border-2 border-swipes-blue-deep text-swipes-blue-deep bg-transparent hover:bg-swipes-blue-deep/5",
  },
  {
    name: "Starter",
    monthly: 29,
    annual: 290,
    features: [
      "Everything in FREE, plus:",
      "Unlimited products",
      "Abandoned cart recovery (basic)",
      "Discount codes",
      "Basic analytics",
      "3 users",
      "Basic reporting",
    ],
    cta: "Start Free Trial",
    ctaLink: "/register",
    popular: false,
    ctaStyle: "border-2 border-swipes-blue-deep text-swipes-blue-deep bg-transparent hover:bg-swipes-blue-deep/5",
  },
  {
    name: "Pro",
    monthly: 79,
    annual: 790,
    features: [
      "Everything in Starter, plus:",
      "Brand Studio (white-label)",
      "Advanced abandoned cart recovery",
      "Advanced analytics",
      "Fraud prevention tools",
      "Priority support",
      "10 users",
      "Advanced reporting",
    ],
    cta: "Start Free Trial",
    ctaLink: "/register",
    popular: true,
    ctaStyle: "bg-swipes-blue-deep text-white hover:bg-swipes-blue-deep/90",
  },
  {
    name: "Enterprise",
    monthly: 299,
    annual: 2990,
    features: [
      "Everything in Pro, plus:",
      "Multi-gateway routing",
      "Full API access",
      "Webhooks",
      "Custom integrations",
      "Dedicated account manager",
      "Unlimited users",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    ctaLink: "/",
    popular: false,
    ctaStyle: "border-2 border-swipes-teal text-swipes-teal bg-transparent hover:bg-swipes-teal/5",
  },
];

const comparisonCategories = [
  {
    name: "Payments",
    features: [
      { name: "Online checkout", values: [true, true, true, true] },
      { name: "Virtual terminal", values: [false, false, true, true] },
      { name: "Payment links", values: [true, true, true, true] },
      { name: "Invoicing", values: ["Basic", true, true, true] },
      { name: "Recurring billing", values: [false, true, true, true] },
      { name: "Customer vault", values: [false, false, true, true] },
    ],
  },
  {
    name: "E-Commerce",
    features: [
      { name: "Product catalog", values: ["25 max", "Unlimited", "Unlimited", "Unlimited"] },
      { name: "Shopping cart", values: [true, true, true, true] },
      { name: "Abandoned cart recovery", values: [false, "Basic", "Advanced", "Advanced"] },
      { name: "Discount codes", values: [false, true, true, true] },
      { name: "Brand Studio (white-label)", values: [false, false, true, true] },
    ],
  },
  {
    name: "Security & Fraud",
    features: [
      { name: "PCI compliance", values: [true, true, true, true] },
      { name: "Basic fraud detection", values: [true, true, true, true] },
      { name: "Advanced fraud rules", values: [false, false, true, true] },
      { name: "Dispute management", values: [false, false, true, true] },
    ],
  },
  {
    name: "Analytics & Reporting",
    features: [
      { name: "Basic dashboard", values: [true, true, true, true] },
      { name: "Analytics", values: [false, "Basic", "Advanced", "Advanced"] },
      { name: "Reporting", values: [false, "Basic", "Advanced", "Custom"] },
      { name: "Data export", values: [false, "CSV", "CSV, PDF", "CSV, PDF, XLSX"] },
    ],
  },
  {
    name: "Developer",
    features: [
      { name: "API access", values: [false, false, false, true] },
      { name: "Webhooks", values: [false, false, false, true] },
      { name: "Sandbox environment", values: [false, false, false, true] },
      { name: "Custom integrations", values: [false, false, false, true] },
    ],
  },
  {
    name: "Support",
    features: [
      { name: "Email support", values: [true, true, true, true] },
      { name: "Priority support", values: [false, false, true, true] },
      { name: "Dedicated account manager", values: [false, false, false, true] },
      { name: "SLA guarantee", values: [false, false, false, true] },
    ],
  },
  {
    name: "Team",
    features: [
      { name: "Users included", values: ["1", "3", "10", "Unlimited"] },
    ],
  },
];

const additionalFees = [
  { type: "Chargeback fee", amount: "$15.00" },
  { type: "ACH return fee", amount: "$25.00" },
  { type: "Voice authorization", amount: "$0.45" },
  { type: "Retrieval request", amount: "$5.00" },
  { type: "Monthly minimum", amount: "$10.00" },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No. There are no setup fees, no cancellation fees, and no hidden charges.",
  },
  {
    question: "What payment methods can I accept?",
    answer: "Visa, Mastercard, American Express, Discover, JCB, and ACH bank transfers.",
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Enterprise customers can contact sales for custom pricing based on processing volume.",
  },
  {
    question: "What happens if I exceed the free plan limits?",
    answer: "You'll be prompted to upgrade. We'll never charge you without your consent.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. swipesblue is PCI DSS Level 1 compliant with TLS 1.3 encryption on all connections.",
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <CheckCircle className="h-5 w-5 text-swipes-trusted-green mx-auto" />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-gray-300 mx-auto" />;
  }
  return <span className="text-sm text-swipes-pro-gray">{value}</span>;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-swipes-black">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-swipes-pro-gray mt-4">
            No hidden fees. No surprises. Scale with plans that fit your business.
          </p>
          <p className="text-sm text-swipes-pro-gray mt-2">
            All plans include: <span className="font-semibold text-swipes-blue-deep">2.70% + $0.30</span> per transaction
          </p>
        </div>
      </section>

      {/* Toggle */}
      <section className="bg-white pb-8">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annual ? "text-swipes-black" : "text-swipes-pro-gray"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
              annual ? "bg-swipes-blue-deep" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={annual}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
                annual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-swipes-black" : "text-swipes-pro-gray"}`}>
            Annual
          </span>
          {annual && (
            <span className="text-xs font-semibold text-swipes-trusted-green bg-swipes-trusted-green/10 px-2 py-0.5 rounded-[7px]">
              2 months free
            </span>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-[7px] p-8 relative ${
                  tier.popular
                    ? "border-2 border-swipes-blue-deep shadow-card-hover"
                    : "border border-gray-200"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-swipes-gold text-black text-xs font-bold px-2 py-0.5 rounded-[7px]">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-swipes-black mb-4">
                    {tier.name}
                  </h3>
                  <div>
                    <span className="text-4xl font-bold text-swipes-black">
                      ${annual ? tier.annual : tier.monthly}
                    </span>
                    <span className="text-swipes-pro-gray">
                      /{annual ? "yr" : "mo"}
                    </span>
                  </div>
                  <p className="text-sm text-swipes-pro-gray mt-2">
                    2.70% + $0.30 per transaction
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-swipes-pro-gray">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.ctaLink}>
                  <Button
                    className={`w-full rounded-[7px] ${tier.ctaStyle}`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-swipes-black text-center mb-12">
            Compare plans
          </h2>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-50">
              <div className="p-4 text-sm font-semibold text-swipes-black" />
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-4 text-center text-sm font-semibold text-swipes-black ${
                    tier.popular ? "bg-swipes-blue-deep/5" : ""
                  }`}
                >
                  {tier.name}
                </div>
              ))}
            </div>

            {/* Categories */}
            {comparisonCategories.map((category) => (
              <div key={category.name}>
                {/* Category Header */}
                <div className="grid grid-cols-5 bg-gray-50 border-t border-gray-200">
                  <div className="p-4 text-sm font-semibold text-swipes-black col-span-5">
                    {category.name}
                  </div>
                </div>
                {/* Feature Rows */}
                {category.features.map((feature, idx) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-5 border-t border-gray-100 ${
                      idx % 2 === 1 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="p-4 text-sm text-swipes-pro-gray">
                      {feature.name}
                    </div>
                    {feature.values.map((value, i) => (
                      <div
                        key={i}
                        className={`p-4 text-center ${
                          i === 2 ? "bg-swipes-blue-deep/5" : ""
                        }`}
                      >
                        <CellValue value={value} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-swipes-black mb-8">
            Additional fees
          </h2>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            {additionalFees.map((fee, idx) => (
              <div
                key={fee.type}
                className={`flex justify-between px-6 py-3 text-sm ${
                  idx % 2 === 1 ? "bg-gray-50" : "bg-white"
                } ${idx > 0 ? "border-t border-gray-100" : ""}`}
              >
                <span className="text-swipes-pro-gray">{fee.type}</span>
                <span className="text-swipes-pro-gray font-medium">{fee.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-swipes-black text-center mb-12">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-white rounded-[7px] border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-sm font-semibold text-swipes-black hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-swipes-pro-gray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-swipes-black mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-swipes-pro-gray mb-8">
            Start processing payments in minutes.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-swipes-blue-deep text-white rounded-[7px] hover:bg-swipes-blue-deep/90"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
