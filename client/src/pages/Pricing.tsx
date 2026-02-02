import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const ecommerceTiers = [
  {
    name: "FREE",
    price: "$0",
    period: "/mo",
    description: "Get started selling online",
    features: [
      "Up to 25 products",
      "Shopping cart",
      "Basic checkout",
      "Order history",
      "Basic dashboard",
    ],
    cta: "Start Free",
    ctaLink: "/demo",
    popular: false,
    badge: "FREE",
  },
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For growing businesses",
    features: [
      "Unlimited products",
      "Abandoned cart recovery (basic)",
      "Discount codes",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    popular: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    description: "Advanced tools for scaling",
    features: [
      "Everything in Starter",
      "Brand Studio (white-label)",
      "Advanced abandoned cart",
      "Inventory alerts",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    popular: true,
    badge: "POPULAR",
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/mo",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Multi-store support",
      "API access",
      "Webhooks",
      "Custom integrations",
      "Dedicated support",
    ],
    cta: "Contact Us",
    ctaLink: "/contact",
    popular: false,
    badge: null,
  },
];

const developerTiers = [
  {
    name: "Payment API",
    price: "2.70% + $0.30",
    period: "per transaction",
    description: "Integrate payments anywhere",
    features: [
      "Full API access",
      "Webhooks",
      "API keys",
      "Documentation",
      "Community support",
    ],
    cta: "Get API Keys",
    ctaLink: "/dashboard/api-keys",
  },
  {
    name: "API Pro",
    price: "$99/mo",
    subPrice: "+ 2.70% + $0.30 per transaction",
    description: "For high-volume developers",
    features: [
      "Everything in Payment API",
      "Higher rate limits",
      "Priority support",
      "Technical account manager",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
  },
];

const faqs = [
  {
    question: "What payment methods do you support?",
    answer: "We support all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support ACH bank transfers and digital wallets.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. Our pricing is completely transparent. Transaction fees (2.70% + $0.30) apply to all plans including FREE.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes, we offer custom pricing for businesses processing over $100,000/month. Contact our sales team to learn more.",
  },
  {
    question: "What's the difference between E-Commerce Suite and Developer API?",
    answer: "E-Commerce Suite is a complete solution for merchants who want to sell products online with our pre-built tools. Developer API is for developers who want to integrate SwipesBlue payments into their own custom platforms.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-swipes-blue-deep to-swipes-teal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include transaction processing.
          </p>
        </div>
      </section>

      {/* E-Commerce Suite */}
      <section className="py-20" data-testid="section-ecommerce-pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-4">
              E-Commerce Suite
            </h2>
            <p className="text-lg text-swipes-pro-gray max-w-2xl mx-auto">
              Everything you need to sell online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecommerceTiers.map((tier) => (
              <Card 
                key={tier.name}
                className={`border rounded-[7px] bg-white relative ${
                  tier.popular ? "border-swipes-gold shadow-lg ring-2 ring-swipes-gold" : "border-gray-200"
                }`}
                data-testid={`card-pricing-${tier.name.toLowerCase()}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      tier.badge === "POPULAR" ? "bg-swipes-gold text-black" :
                      tier.badge === "FREE" ? "bg-swipes-trusted-green text-white" : ""
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8 pb-4">
                  <CardTitle className="text-xl font-semibold text-swipes-black">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-swipes-black">{tier.price}</span>
                    <span className="text-swipes-pro-gray">{tier.period}</span>
                  </div>
                  <p className="text-sm text-swipes-pro-gray mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-swipes-pro-gray">
                        <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.ctaLink}>
                    <Button 
                      className={`w-full group ${
                        tier.popular 
                          ? "bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white" 
                          : "bg-transparent border-2 border-swipes-teal text-swipes-teal hover:bg-swipes-teal hover:text-white"
                      }`}
                      data-testid={`button-pricing-${tier.name.toLowerCase()}`}
                    >
                      <span className="flex items-center justify-center">
                        {tier.cta}
                        <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </span>
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-swipes-pro-gray">
              <span className="font-semibold text-swipes-black">+ 2.70% + $0.30</span> per transaction on all plans
            </p>
          </div>
        </div>
      </section>

      {/* Developer API */}
      <section className="py-20 bg-gray-50" data-testid="section-developer-pricing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-4">
              Developer API
            </h2>
            <p className="text-lg text-swipes-pro-gray max-w-2xl mx-auto">
              Build custom payment integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {developerTiers.map((tier) => (
              <Card 
                key={tier.name}
                className="border border-gray-200 rounded-[7px] bg-white"
                data-testid={`card-pricing-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader className="text-center pt-8 pb-4">
                  <CardTitle className="text-xl font-semibold text-swipes-black">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-swipes-black">{tier.price}</span>
                  </div>
                  {tier.subPrice && (
                    <p className="text-sm text-swipes-pro-gray mt-1">{tier.subPrice}</p>
                  )}
                  {!tier.subPrice && (
                    <p className="text-sm text-swipes-pro-gray mt-1">{tier.period}</p>
                  )}
                  <p className="text-sm text-swipes-pro-gray mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-swipes-pro-gray">
                        <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.ctaLink}>
                    <Button 
                      className="w-full group bg-swipes-teal hover:bg-swipes-teal/90 text-white"
                      data-testid={`button-pricing-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="flex items-center justify-center">
                        {tier.cta}
                        <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </span>
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swipes-black">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border border-gray-200 rounded-[7px]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-swipes-blue-deep flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-swipes-black mb-2">{faq.question}</h3>
                      <p className="text-swipes-pro-gray">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          <Link href="/demo">
            <Button 
              size="lg" 
              className="group bg-white text-swipes-blue-deep hover:bg-gray-100 px-10"
              data-testid="button-cta-get-started"
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
