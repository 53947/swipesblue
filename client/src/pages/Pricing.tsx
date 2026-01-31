import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const transactionFeatures = [
  "All major credit and debit cards",
  "Real-time fraud protection",
  "Instant payouts available",
  "No monthly fees",
  "No setup fees",
  "No hidden costs",
  "PCI DSS compliant",
  "24/7 support",
];

const ecommerceTiers = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses just getting started",
    features: [
      "Shopping cart widget",
      "Basic checkout flow",
      "Up to 100 products",
      "Email support",
      "Basic analytics",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For growing businesses with advanced needs",
    features: [
      "Everything in Starter",
      "Advanced checkout customization",
      "Unlimited products",
      "Subscription billing",
      "Priority support",
      "Advanced analytics",
      "Custom domain",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom requirements",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Volume discounts",
      "White-label options",
      "On-premise available",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "What payment methods do you support?",
    answer: "We support all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support ACH bank transfers and digital wallets.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. Our pricing is completely transparent. You only pay the transaction fee (2.9% + 30¢) with no monthly fees, setup fees, or hidden costs.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes, we offer custom pricing for businesses processing over $100,000/month. Contact our sales team to learn more.",
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
            No hidden fees. No surprises. Just straightforward pricing that scales with your business.
          </p>
        </div>
      </section>

      {/* Transaction Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-swipes-red uppercase tracking-wider mb-4">
                Transaction Pricing
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-swipes-black mb-6">
                Pay only for what you use
              </h2>
              <div className="mb-8">
                <span className="text-5xl font-bold text-swipes-red">2.9% + 30¢</span>
                <span className="text-xl text-swipes-gray ml-2">per transaction</span>
              </div>
              <ul className="space-y-3 mb-8">
                {transactionFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-swipes-gray">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/shoppingcart">
                <Button className="bg-swipes-red hover:bg-swipes-red/90 text-white px-8">
                  Start accepting payments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="border border-gray-200 rounded-card bg-swipes-gray-light">
              <CardContent className="p-8">
                <h3 className="font-semibold text-swipes-black mb-4">Example transaction</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-swipes-gray">Sale amount</span>
                    <span className="font-medium text-swipes-black">$100.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-swipes-gray">SwipesBlue fee (2.9%)</span>
                    <span className="font-medium text-swipes-black">-$2.90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-swipes-gray">Fixed fee</span>
                    <span className="font-medium text-swipes-black">-$0.30</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between">
                    <span className="font-semibold text-swipes-black">You receive</span>
                    <span className="font-bold text-swipes-blue-deep text-xl">$96.80</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* E-commerce Tiers */}
      <section className="py-20 bg-swipes-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-swipes-red uppercase tracking-wider mb-4">
              E-commerce Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-swipes-black">
              Complete e-commerce solutions
            </h2>
            <p className="mt-4 text-lg text-swipes-gray max-w-2xl mx-auto">
              Everything you need to run your online store. All plans include transaction processing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ecommerceTiers.map((tier) => (
              <Card 
                key={tier.name}
                className={`border rounded-card bg-white relative ${
                  tier.popular ? "border-swipes-red shadow-lg" : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-swipes-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-xl font-semibold text-swipes-black">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-swipes-black">{tier.price}</span>
                    <span className="text-swipes-gray">{tier.period}</span>
                  </div>
                  <p className="text-sm text-swipes-gray mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-swipes-gray">
                        <Check className="h-4 w-4 text-swipes-blue-pure flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? "bg-swipes-red hover:bg-swipes-red/90 text-white" 
                        : "bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swipes-black">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border border-gray-200 rounded-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-swipes-blue-deep flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-swipes-black mb-2">{faq.question}</h3>
                      <p className="text-swipes-gray">{faq.answer}</p>
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
          <Link href="/shoppingcart">
            <Button 
              size="lg" 
              className="bg-swipes-red hover:bg-swipes-red/90 text-white px-10"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
