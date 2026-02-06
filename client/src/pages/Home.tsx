import {
  CreditCard,
  Code,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Users,
  Lock,
  RefreshCw,
  FileText,
  Link as LinkIcon,
  Activity,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const stats = [
  { value: "5.8B+", label: "Transactions Powered Annually" },
  { value: "99.99%", label: "Uptime" },
  { value: "200+", label: "Processor Integrations" },
  { value: "<100ms", label: "Response Time" },
];

const bentoFeatures = [
  {
    icon: CreditCard,
    title: "Virtual Terminal",
    description: "Process cards in your browser. No hardware required. Accept payments from anywhere.",
    link: "/demo",
    linkText: "Try Virtual Terminal",
  },
  {
    icon: Users,
    title: "Customer Vault",
    description: "Securely store customer payment methods for faster repeat purchases.",
    link: "/demo",
    linkText: "Learn more",
  },
  {
    icon: FileText,
    title: "Invoicing",
    description: "Send professional invoices with one-click payment links.",
    link: "/demo",
    linkText: "Learn more",
  },
  {
    icon: RefreshCw,
    title: "Recurring Billing",
    description: "Automate subscriptions, memberships, and payment plans with flexible scheduling.",
    link: "/demo",
    linkText: "Learn more",
  },
  {
    icon: LinkIcon,
    title: "Payment Links",
    description: "Create shareable payment links in seconds. No website needed.",
    link: "/demo",
    linkText: "Learn more",
  },
  {
    icon: Lock,
    title: "Fraud Prevention",
    description: "Real-time fraud detection with customizable rules and velocity checks.",
    link: "/demo",
    linkText: "Learn more",
  },
];

const pricingTiers = [
  {
    name: "FREE",
    price: "$0",
    period: "forever",
    description: "Start selling with zero monthly fees",
    features: [
      "Up to 25 products",
      "Basic checkout",
      "Order management",
      "Email receipts",
    ],
    cta: "Start Free",
    href: "/shoppingcart",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Unlimited products",
      "Abandoned cart recovery",
      "Discount codes",
      "Basic analytics",
    ],
    cta: "Get Started",
    href: "/pricing",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For established businesses",
    features: [
      "Everything in Starter",
      "Brand Studio (white-label)",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Started",
    href: "/pricing",
    highlight: true,
    badge: "POPULAR",
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "For high-volume merchants",
    features: [
      "Everything in Pro",
      "Multi-store support",
      "API access & webhooks",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    href: "/pricing",
    highlight: false,
  },
];

const competitors = [
  { name: "swipesblue", rate: "2.70% + $0.30", fee: "$3.00", keep: "$97.00", isBest: true },
  { name: "Stripe", rate: "2.90% + $0.30", fee: "$3.20", keep: "$96.80", savings: "$0.20" },
  { name: "PayPal", rate: "2.99% + $0.49", fee: "$3.48", keep: "$96.52", savings: "$0.48" },
  { name: "Square", rate: "2.90% + $0.30", fee: "$3.20", keep: "$96.80", savings: "$0.20" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h1 className="text-5xl font-bold text-swipes-black leading-tight">
                Built for businesses to grow
              </h1>
              <p className="text-xl font-semibold text-swipes-blue-deep mt-2">
                Less fees. More revenue.
              </p>
              <p className="text-lg text-swipes-pro-gray mt-4 max-w-lg">
                Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Link href="/register" data-testid="link-hero-get-started">
                  <Button
                    size="lg"
                    className="bg-swipes-blue-deep text-white rounded-[7px] px-6 py-3"
                    data-testid="button-hero-get-started"
                  >
                    Start Accepting Payments
                  </Button>
                </Link>
                <Link href="/developers" data-testid="link-hero-view-api-docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-swipes-teal text-swipes-teal rounded-[7px] px-6 py-3"
                    data-testid="button-hero-contact-sales"
                  >
                    View API Docs
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-swipes-pro-gray mt-4">
                2.70% + $0.30 per transaction · No hidden fees
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center">
              <img
                src="/images/less_fees_more_revenue.jpg"
                alt="Less fees, more revenue"
                className="w-full rounded-[7px] shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-swipes-trusted-green" />
                <span className="text-sm font-medium">PCI DSS Level 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-swipes-blue-deep" />
                <span className="text-sm font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-swipes-gold" />
                <span className="text-sm font-medium">99.99% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-swipes-teal" />
                <span className="text-sm font-medium">Built on NMI Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#F6F9FC] border-y border-gray-200 py-12" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-3xl md:text-4xl font-bold text-swipes-black">
                  {stat.value}
                </div>
                <div className="text-sm text-swipes-pro-gray mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 md:py-28" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to accept payments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From virtual terminals to recurring billing, swipesblue provides complete payment infrastructure.
            </p>
          </div>

          {/* Feature Grid — 3x2 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white border border-gray-200 rounded-[7px] p-8 flex flex-col h-full"
                  data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-[7px] flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-swipes-blue-deep" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <Link href={feature.link} data-testid={`link-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-swipes-blue-deep font-medium text-sm mt-6 inline-flex items-center">
                      {feature.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-28 bg-gray-50" data-testid="section-comparison">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Keep more of what you earn
            </h2>
            <p className="text-lg text-gray-600">
              Compare processing fees on a $100 sale. Less fees. More revenue.
            </p>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full" data-testid="table-comparison">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Provider</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Rate</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900">Fee</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900">You Keep</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor) => (
                  <tr
                    key={competitor.name}
                    className={`border-b border-gray-100 ${competitor.isBest ? "bg-swipes-blue-deep/5" : ""}`}
                    data-testid={`row-${competitor.name.toLowerCase()}`}
                  >
                    <td className="py-4 px-6">
                      <span className={competitor.isBest ? "font-bold text-swipes-blue-deep" : "text-gray-600"}>
                        {competitor.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={competitor.isBest ? "font-semibold text-swipes-blue-deep" : "text-gray-600"}>
                        {competitor.rate}
                      </span>
                    </td>
                    <td className="text-right py-4 px-6">
                      <span className={competitor.isBest ? "font-bold text-swipes-blue-deep" : "text-gray-600"}>
                        {competitor.fee}
                      </span>
                    </td>
                    <td className="text-right py-4 px-6">
                      <span className={competitor.isBest ? "font-bold text-swipes-trusted-green" : "text-gray-600"}>
                        {competitor.keep}
                      </span>
                      {competitor.savings && (
                        <span className="ml-2 text-xs text-swipes-trusted-green">
                          (Save {competitor.savings})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" data-testid="link-see-full-pricing">
              <Button className="bg-swipes-blue-deep text-white rounded-[7px]" data-testid="button-see-full-pricing">
                See Full Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600">
              Start free, scale as you grow. Plus <span className="font-semibold text-swipes-blue-deep">2.70% + $0.30</span> per transaction on all tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`rounded-[7px] relative ${
                  tier.highlight
                    ? "border-2 border-swipes-blue-deep shadow-card-hover"
                    : "border border-gray-200"
                }`}
                data-testid={`pricing-tier-${tier.name.toLowerCase()}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-swipes-gold text-black font-semibold px-3">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                      <span className="text-gray-500">{tier.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={tier.href} data-testid={`link-pricing-${tier.name.toLowerCase()}`}>
                    <Button
                      className={`w-full rounded-[7px] ${
                        tier.highlight
                          ? "bg-swipes-blue-deep text-white"
                          : "bg-white border-2 border-swipes-teal text-swipes-teal"
                      }`}
                      data-testid={`button-pricing-${tier.name.toLowerCase()}`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Preview */}
      <section className="py-20 md:py-28 bg-white" data-testid="section-developer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-swipes-blue-deep/10 rounded-[7px] mb-6">
                <Code className="h-4 w-4 text-swipes-blue-deep" />
                <span className="text-sm font-medium text-swipes-blue-deep">Developer API</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built for developers
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Clean RESTful APIs, comprehensive documentation, and sandbox testing.
                Integrate swipesblue payments into your platform in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/developers" data-testid="link-developer-read-docs">
                  <Button className="bg-swipes-blue-deep text-white rounded-[7px]" data-testid="button-developer-read-docs">
                    Read the docs
                  </Button>
                </Link>
                <Link href="/dashboard/api-keys" data-testid="link-developer-api-keys">
                  <Button variant="outline" className="border-2 border-swipes-teal text-swipes-teal rounded-[7px]" data-testid="button-developer-api-keys">
                    Get API keys
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-[7px] p-6 overflow-x-auto">
              <div className="mb-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Request</span>
              </div>
              <pre className="text-sm font-mono text-gray-100">
                <code>{`curl -X POST https://api.swipesblue.com/v1/payments/process \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchantId": "your-merchant-id",
    "amount": 49.99,
    "currency": "USD",
    "cardNumber": "4111111111111111",
    "cardName": "Jane Smith",
    "expiry": "1228",
    "cvv": "123",
    "customerEmail": "jane@example.com",
    "description": "Order #1042"
  }'`}</code>
              </pre>
              <div className="mt-5 pt-4 border-t border-gray-700">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Response</span>
              </div>
              <pre className="text-sm font-mono text-gray-100 mt-3">
                <code>{`{
  "success": true,
  "transactionId": "txn_a1b2c3d4e5f6",
  "gatewayTransactionId": "3847261950",
  "authCode": "A11234",
  "amount": 49.99,
  "currency": "USD",
  "status": "success",
  "cardBrand": "visa",
  "cardLastFour": "1111",
  "message": "Payment processed successfully"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#F6F9FC]" data-testid="section-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-swipes-blue-deep" />
              <span className="text-sm text-swipes-pro-gray font-medium">PCI DSS Level 1 Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-swipes-blue-deep" />
              <span className="text-sm text-swipes-pro-gray font-medium">256-bit TLS Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-swipes-blue-deep" />
              <span className="text-sm text-swipes-pro-gray font-medium">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-swipes-blue-deep" />
              <span className="text-sm text-swipes-pro-gray font-medium">Built on NMI's Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to start accepting payments?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Create your account in minutes. Start processing payments today with transparent pricing and no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" data-testid="link-cta-get-started">
              <Button
                size="lg"
                className="bg-swipes-blue-deep text-white rounded-[7px]"
                data-testid="button-cta-get-started"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/pricing" data-testid="link-cta-view-pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-swipes-teal text-swipes-teal rounded-[7px]"
                data-testid="button-cta-view-pricing"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NMI Footnote */}
      <div className="bg-white border-t border-gray-100 py-4 px-8">
        <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
          * Platform statistics reflect NMI's global payment gateway network, on which swipesblue is built.
          Transaction volume, uptime, and processing figures are sourced from NMI's published platform data.
          swipesblue is an independent platform powered by NMI's payment infrastructure.
        </p>
      </div>
    </div>
  );
}
