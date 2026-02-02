import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Rate {
  tierName: string;
  tierType: string;
  monthlyFee: string;
  transactionPercent: string;
  transactionFlat: string;
  description: string | null;
  features: string[] | null;
}

const faqs = [
  {
    question: "What payment methods do you support?",
    answer: "We support all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support ACH bank transfers and digital wallets.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. Our pricing is completely transparent. Transaction fees apply to all plans including FREE.",
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

function formatPrice(monthlyFee: string): string {
  const fee = parseFloat(monthlyFee);
  if (fee === 0) return "$0";
  return `$${fee.toFixed(0)}`;
}

function formatTransactionFee(percent: string, flat: string): string {
  const p = parseFloat(percent).toFixed(2);
  const f = parseFloat(flat).toFixed(2);
  return `${p}% + $${f}`;
}

function getTierConfig(tierName: string) {
  const configs: Record<string, { cta: string; ctaLink: string; popular: boolean; badge: string | null }> = {
    "FREE": { cta: "Start Free", ctaLink: "/demo", popular: false, badge: "FREE" },
    "Starter": { cta: "Get Started", ctaLink: "/demo", popular: false, badge: null },
    "Pro": { cta: "Get Started", ctaLink: "/demo", popular: true, badge: "POPULAR" },
    "Enterprise": { cta: "Contact Us", ctaLink: "/contact", popular: false, badge: null },
    "API": { cta: "Get API Keys", ctaLink: "/dashboard/api-keys", popular: false, badge: null },
    "API Pro": { cta: "Contact Sales", ctaLink: "/contact", popular: false, badge: null },
  };
  return configs[tierName] || { cta: "Get Started", ctaLink: "/demo", popular: false, badge: null };
}

export default function Pricing() {
  const { data: rates = [], isLoading } = useQuery<Rate[]>({
    queryKey: ["/api/rates"],
  });

  const ecommerceRates = rates.filter(r => r.tierType === "ecommerce");
  const developerRates = rates.filter(r => r.tierType === "developer");

  const defaultTransactionFee = rates.length > 0 
    ? formatTransactionFee(rates[0].transactionPercent, rates[0].transactionFlat)
    : "2.90% + $0.30";

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

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border border-gray-200 rounded-[7px] bg-white animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-24 mx-auto" />
                    <div className="h-10 bg-gray-200 rounded mb-4 w-20 mx-auto" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecommerceRates.map((rate) => {
                const config = getTierConfig(rate.tierName);
                return (
                  <Card 
                    key={rate.tierName}
                    className={`border rounded-[7px] bg-white relative ${
                      config.popular ? "border-swipes-gold shadow-lg ring-2 ring-swipes-gold" : "border-gray-200"
                    }`}
                    data-testid={`card-pricing-${rate.tierName.toLowerCase()}`}
                  >
                    {config.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          config.badge === "POPULAR" ? "bg-swipes-gold text-black" :
                          config.badge === "FREE" ? "bg-swipes-trusted-green text-white" : ""
                        }`}>
                          {config.badge}
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pt-8 pb-4">
                      <CardTitle className="text-xl font-semibold text-swipes-black">
                        {rate.tierName}
                      </CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-swipes-black">
                          {formatPrice(rate.monthlyFee)}
                        </span>
                        <span className="text-swipes-pro-gray">/mo</span>
                      </div>
                      <p className="text-sm text-swipes-pro-gray mt-2">{rate.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-6">
                        {(rate.features || []).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-swipes-pro-gray">
                            <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={config.ctaLink}>
                        <Button 
                          className={`w-full group ${
                            config.popular 
                              ? "bg-swipes-blue-deep text-white" 
                              : "bg-transparent border-2 border-swipes-teal text-swipes-teal"
                          }`}
                          data-testid={`button-pricing-${rate.tierName.toLowerCase()}`}
                        >
                          <span className="flex items-center justify-center">
                            {config.cta}
                            <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </span>
                          </span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-swipes-pro-gray">
              <span className="font-semibold text-swipes-black">+ {defaultTransactionFee}</span> per transaction on all plans
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

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="border border-gray-200 rounded-[7px] bg-white animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-32 mx-auto" />
                    <div className="h-8 bg-gray-200 rounded mb-4 w-40 mx-auto" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {developerRates.map((rate) => {
                const config = getTierConfig(rate.tierName);
                const isApiPro = rate.tierName === "API Pro";
                return (
                  <Card 
                    key={rate.tierName}
                    className="border border-gray-200 rounded-[7px] bg-white"
                    data-testid={`card-pricing-${rate.tierName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <CardHeader className="text-center pt-8 pb-4">
                      <CardTitle className="text-xl font-semibold text-swipes-black">
                        {rate.tierName}
                      </CardTitle>
                      <div className="mt-4">
                        {isApiPro ? (
                          <>
                            <span className="text-3xl font-bold text-swipes-black">
                              {formatPrice(rate.monthlyFee)}/mo
                            </span>
                            <p className="text-sm text-swipes-pro-gray mt-1">
                              + {formatTransactionFee(rate.transactionPercent, rate.transactionFlat)} per transaction
                            </p>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-swipes-black">
                              {formatTransactionFee(rate.transactionPercent, rate.transactionFlat)}
                            </span>
                            <p className="text-sm text-swipes-pro-gray mt-1">per transaction</p>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-swipes-pro-gray mt-2">{rate.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-6">
                        {(rate.features || []).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-swipes-pro-gray">
                            <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={config.ctaLink}>
                        <Button 
                          className="w-full group bg-swipes-teal text-white"
                          data-testid={`button-pricing-${rate.tierName.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="flex items-center justify-center">
                            {config.cta}
                            <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </span>
                          </span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
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
              className="group bg-white text-swipes-blue-deep"
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
