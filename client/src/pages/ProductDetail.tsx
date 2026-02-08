import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Users, Layers, Shield, Zap, ShoppingCart, BarChart3, Palette, Code } from "lucide-react";
import type { AddOnProduct } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
  "users": Users,
  "layers": Layers,
  "shield": Shield,
  "zap": Zap,
  "shopping-cart": ShoppingCart,
  "bar-chart-3": BarChart3,
  "palette": Palette,
  "code": Code,
};

const productDetails: Record<string, {
  freeFeatures?: string[];
  paidFeatures: string[];
  freePrice?: string;
  requiresProPlus?: boolean;
  howItWorks: { title: string; description: string }[];
  featuresInfo: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}> = {
  "customer-portal": {
    freeFeatures: ["Last 10 orders", "Order status viewing"],
    paidFeatures: [
      "Unlimited order history",
      "Download invoices (PDF)",
      "Manage payment methods",
      "Subscription management",
      "Support ticket submission",
      "Real-time order tracking"
    ],
    freePrice: "$0",
    howItWorks: [
      { title: "1. Enable", description: "Turn on the portal in your dashboard" },
      { title: "2. Customers Register", description: "Customers create accounts using their email" },
      { title: "3. Self-Service", description: "Customers view orders, download invoices, manage payment methods" }
    ],
    featuresInfo: [
      { title: "Order History", description: "Customers see all past orders with details, dates, amounts, and current status." },
      { title: "Payment Methods", description: "Customers can add, remove, and update their saved credit cards for faster checkout." },
      { title: "Invoice Downloads", description: "PDF invoices for any order, ready for accounting or expense reports." },
      { title: "Subscription Management", description: "Customers can pause, cancel, or update their recurring subscriptions without contacting support." },
      { title: "Support Tickets", description: "Customers submit support requests directly. You see them in your dashboard." },
      { title: "Order Tracking", description: "Real-time tracking with carrier integration showing delivery status and ETA." }
    ],
    faqs: [
      { question: "How do my customers access the portal?", answer: "They visit yourdomain.com/portal and log in with their email." },
      { question: "Can I customize the portal appearance?", answer: "Yes, basic branding is available on all tiers through Settings. Scale and Enterprise plans include Brand Studio for full white-label customization." },
      { question: "Is the Free version limited?", answer: "The free version shows the last 10 orders only. Upgrade for unlimited." },
      { question: "Can customers update their own payment methods?", answer: "Yes, with the paid version they can add, remove, and set default cards." }
    ]
  },
  "multi-gateway": {
    paidFeatures: [
      "Connect up to 3 additional gateways",
      "Smart routing by card type, amount, or geography",
      "Automatic failover protection",
      "Split processing across multiple processors",
      "Real-time routing analytics"
    ],
    requiresProPlus: true,
    howItWorks: [
      { title: "Transaction Comes In", description: "Your customer initiates a payment" },
      { title: "Routing Rules Engine", description: "Smart rules evaluate card type, amount, and geography" },
      { title: "Best Gateway Selected", description: "Transaction routed to optimal processor" }
    ],
    featuresInfo: [
      { title: "Smart Routing", description: "Route AMEX to lower-fee processors, large orders to high-approval gateways, international to PayPal." },
      { title: "Failover Protection", description: "If your primary gateway fails, transactions automatically retry on your backup gateway." },
      { title: "Split Processing", description: "A/B test gateway performance by splitting transactions 50/50 between processors." },
      { title: "Routing Analytics", description: "Real-time dashboards showing approval rates, fees, and performance by gateway." }
    ],
    faqs: [
      { question: "Why do I need multiple gateways?", answer: "Different gateways have different strengths: approval rates, fees, currency support, and fraud detection. Multi-gateway lets you optimize." },
      { question: "What happens to existing transactions?", answer: "Existing transactions stay with their original gateway. New routing rules only apply to new transactions." },
      { question: "Can I add my own gateway credentials?", answer: "Yes. You'll enter your API keys for each gateway you want to connect." }
    ]
  },
  "security-suite": {
    freeFeatures: ["Basic fraud scoring", "Transaction monitoring"],
    paidFeatures: [
      "Velocity checks",
      "Geolocation blocking",
      "Device fingerprinting",
      "3D Secure 2.0",
      "Real-time fraud scoring (0-100)",
      "Manual review queue",
      "Chargeback alerts (Verifi, Ethoca)"
    ],
    freePrice: "$0",
    howItWorks: [
      { title: "1. Transaction Received", description: "Payment request comes in from customer" },
      { title: "2. Multi-Layer Analysis", description: "Velocity, geolocation, device, and behavior analysis" },
      { title: "3. Risk Score Generated", description: "0-100 score determines approve, review, or decline" }
    ],
    featuresInfo: [
      { title: "Velocity Checks", description: "Detect rapid-fire transaction attempts from the same card, IP, or device." },
      { title: "Geolocation Blocking", description: "Block or flag transactions from high-risk countries or regions." },
      { title: "Device Fingerprinting", description: "Track devices across sessions to identify repeat fraudsters." },
      { title: "3D Secure 2.0", description: "Add an extra authentication layer for risky transactions." },
      { title: "Chargeback Alerts", description: "Get notified before chargebacks hit your account via Verifi and Ethoca." }
    ],
    faqs: [
      { question: "Will this slow down my checkout?", answer: "No. Our fraud checks run in under 100ms and don't add noticeable delay." },
      { question: "What happens when a transaction is flagged?", answer: "It goes to your manual review queue where you can approve or decline." },
      { question: "Can I customize the risk thresholds?", answer: "Yes. Set your own thresholds for auto-approve, manual review, and auto-decline." }
    ]
  },
  "checkout-optimizer": {
    paidFeatures: [
      "One-click checkout",
      "Express checkout (Apple Pay, Google Pay)",
      "Address autocomplete",
      "Smart form validation",
      "A/B testing",
      "Conversion analytics funnel"
    ],
    howItWorks: [
      { title: "1. Enable Features", description: "Turn on the optimizations you want in your dashboard" },
      { title: "2. Track Performance", description: "Monitor conversion rates with detailed analytics" },
      { title: "3. Optimize", description: "A/B test different configurations to maximize conversions" }
    ],
    featuresInfo: [
      { title: "One-Click Checkout", description: "Returning customers can complete purchase with a single click using saved payment methods." },
      { title: "Express Checkout", description: "Apple Pay and Google Pay for mobile customers - checkout in seconds." },
      { title: "Address Autocomplete", description: "Google-powered address suggestions reduce form friction and errors." },
      { title: "A/B Testing", description: "Test different checkout layouts, colors, and flows to find what converts best." }
    ],
    faqs: [
      { question: "How much can this improve my conversion rate?", answer: "Customers typically see 15-30% improvement in checkout completion rates." },
      { question: "Does this work with my existing checkout?", answer: "Yes. These are enhancements that layer on top of your existing swipesblue checkout." },
      { question: "Can I see which optimizations work best?", answer: "Yes. The conversion funnel shows exactly where customers drop off and which features help." }
    ]
  },
  "shopping-cart-pro": {
    paidFeatures: [
      "Save cart for later",
      "Cart sharing (shareable link)",
      "Cross-sell/upsell suggestions",
      "Cart notes (gift messages, special instructions)",
      "Multi-currency display",
      "Inventory reservation (countdown timer)"
    ],
    howItWorks: [
      { title: "1. Customer Adds Items", description: "Products added to enhanced shopping cart" },
      { title: "2. Smart Features Activate", description: "Cross-sells, reservations, and sharing become available" },
      { title: "3. Higher Conversion", description: "More features mean more completed purchases" }
    ],
    featuresInfo: [
      { title: "Save Cart for Later", description: "Cart saved automatically. Email sent with link to restore cart. Configurable timing." },
      { title: "Cart Sharing", description: "Perfect for gift registries, team purchases, or 'what do you think?' sharing." },
      { title: "Inventory Reservation", description: "Items held while customer completes checkout. Timer creates urgency." },
      { title: "Cross-sell/Upsell", description: "Intelligent product recommendations based on cart contents." }
    ],
    faqs: [
      { question: "How long are items reserved?", answer: "Configurable from 5 to 60 minutes. Default is 15 minutes." },
      { question: "Do saved carts expire?", answer: "By default, saved carts are available for 30 days. Configurable in settings." },
      { question: "Can I customize cross-sell recommendations?", answer: "Yes. Set your own product associations or let our AI suggest based on purchase patterns." }
    ]
  },
  "advanced-analytics": {
    freeFeatures: [
      "Total revenue (today/week/month)",
      "Transaction count",
      "Success rate",
      "Last 5 transactions"
    ],
    paidFeatures: [
      "Revenue breakdown (by product, category, time, payment method)",
      "Customer analytics (LTV, AOV, purchase frequency)",
      "Cohort analysis",
      "Funnel visualization",
      "Exportable reports (CSV, PDF)",
      "Scheduled email reports",
      "Custom date ranges",
      "Year-over-year comparison"
    ],
    freePrice: "$0",
    howItWorks: [
      { title: "1. Data Collection", description: "Every transaction is automatically tracked and analyzed" },
      { title: "2. Insights Generated", description: "AI identifies trends, patterns, and opportunities" },
      { title: "3. Actionable Reports", description: "Get scheduled reports or export for your team" }
    ],
    featuresInfo: [
      { title: "Customer Lifetime Value", description: "See which customers are most valuable: total spent, order count, average order value." },
      { title: "Cohort Analysis", description: "Track customer behavior over time. Do January customers return in February?" },
      { title: "Scheduled Reports", description: "Get daily summaries, weekly revenue reports, or monthly business reviews in your inbox." },
      { title: "Funnel Visualization", description: "See exactly where customers drop off in your purchase flow." }
    ],
    faqs: [
      { question: "How far back can I see data?", answer: "With the paid plan, you can see all historical data since you joined swipesblue." },
      { question: "Can I share reports with my team?", answer: "Yes. Schedule reports to be sent to multiple email addresses." },
      { question: "What export formats are available?", answer: "CSV for spreadsheet analysis and PDF for presentations." }
    ]
  },
  "premium-api": {
    paidFeatures: [
      "Full REST API access",
      "Webhooks with automatic retry",
      "Test and live API keys",
      "Sandbox environment",
      "SDK libraries (JavaScript, PHP, Python, Ruby)",
      "Interactive API documentation",
      "Priority developer support"
    ],
    howItWorks: [
      { title: "1. Get API Keys", description: "Generate test and live API keys from your dashboard" },
      { title: "2. Integrate", description: "Use our SDKs or REST API to connect your platform" },
      { title: "3. Go Live", description: "Switch from test to live keys when ready" }
    ],
    featuresInfo: [
      { title: "REST API", description: "Full access to transactions, customers, subscriptions, and more via standard REST endpoints." },
      { title: "Webhooks", description: "Subscribe to real-time events: payment.success, subscription.cancelled, chargeback.received." },
      { title: "SDK Libraries", description: "Native libraries for JavaScript, PHP, Python, and Ruby. NPM, Composer, PyPI, and RubyGems." },
      { title: "Sandbox Environment", description: "Full test environment with test cards and simulated responses." }
    ],
    faqs: [
      { question: "Is API access included in Enterprise?", answer: "Yes. Enterprise tier includes full API access. This add-on is for Free, Growth, and Scale users." },
      { question: "What's the rate limit?", answer: "1,000 requests per minute for standard, 10,000 for Enterprise." },
      { question: "Is there a sandbox for testing?", answer: "Yes. Full sandbox environment with test cards and simulated responses." }
    ]
  }
};

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: addOn, isLoading, error } = useQuery<AddOnProduct>({
    queryKey: ["/api/add-ons", slug],
    queryFn: async () => {
      const res = await fetch(`/api/add-ons/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8" />
            <div className="h-12 bg-muted rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !addOn) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const details = productDetails[slug || ""] || productDetails["customer-portal"];
  const IconComponent = iconMap[addOn.icon || ""] || Layers;
  const hasFreeOption = !!details.freeFeatures;
  const requiresProPlus = details.requiresProPlus || false;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center text-swipes-blue-deep hover:underline mb-8" data-testid="link-back-to-products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-[7px] p-8 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="inline-flex p-6 bg-white rounded-2xl shadow-sm mb-4">
                <IconComponent className="h-16 w-16 text-swipes-blue-deep" />
              </div>
              <p className="text-sm text-swipes-pro-gray">Product Preview</p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-swipes-black mb-4" data-testid="text-product-title">{addOn.name}</h1>
            <p className="text-swipes-pro-gray mb-6" data-testid="text-product-description">{addOn.description}</p>

            {requiresProPlus && (
              <Card className="border-2 border-swipes-gold bg-yellow-50 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-swipes-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-swipes-black">Requires Scale or Enterprise Plan</p>
                      <p className="text-sm text-swipes-pro-gray">This add-on is only available for Scale ($79/mo) and Enterprise ($299/mo) subscribers.</p>
                      <Link href="/pricing">
                        <Button variant="ghost" className="text-swipes-blue-deep p-0 h-auto mt-2">
                          Upgrade to Scale
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasFreeOption && (
              <Card className="border-2 border-swipes-trusted-green rounded-[7px] mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-swipes-trusted-green text-white no-default-hover-elevate">FREE</Badge>
                    <span className="text-2xl font-bold text-swipes-black">$0/year</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {details.freeFeatures?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-swipes-pro-gray">
                        <span className="text-swipes-trusted-green">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/subscribe/${slug}?plan=free`}>
                    <Button 
                      className="w-full bg-swipes-trusted-green text-white rounded-[7px] group"
                      data-testid="button-start-free"
                    >
                      <span className="flex items-center justify-center">
                        Start Free
                        <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </span>
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-swipes-blue-deep rounded-[7px] bg-slate-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-swipes-blue-deep text-white no-default-hover-elevate">
                    {hasFreeOption ? "FULL ACCESS" : "PAID"}
                  </Badge>
                  <span className="text-2xl font-bold text-swipes-blue-deep" data-testid="text-product-price">
                    ${parseFloat(addOn.annualPrice || "0").toFixed(2)}/year
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {details.paidFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-swipes-black">
                      <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/subscribe/${slug}?plan=paid`}>
                  <Button 
                    className="w-full bg-swipes-blue-deep text-white rounded-[7px] group"
                    disabled={requiresProPlus}
                    data-testid="button-subscribe"
                  >
                    <span className="flex items-center justify-center">
                      Subscribe — ${parseFloat(addOn.annualPrice || "0").toFixed(2)}/year
                      <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </span>
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-12">
          <h2 className="text-2xl font-semibold text-swipes-black mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {details.howItWorks.map((step, i) => (
              <Card key={i} className="border border-gray-200 rounded-[7px]">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-swipes-blue-deep text-white rounded-full mb-4 font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-swipes-black mb-2">{step.title}</h3>
                  <p className="text-sm text-swipes-pro-gray">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-12">
          <h2 className="text-2xl font-semibold text-swipes-black mb-8">Features Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {details.featuresInfo.map((feature, i) => (
              <div key={i}>
                <h3 className="font-semibold text-swipes-black mb-2">{feature.title}</h3>
                <p className="text-sm text-swipes-pro-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-12">
          <h2 className="text-2xl font-semibold text-swipes-black mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {details.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-medium text-swipes-black hover:no-underline" data-testid={`faq-trigger-${i}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-swipes-pro-gray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-swipes-black mb-4">
              Ready to get started with {addOn.name}?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {hasFreeOption && (
                <Link href={`/subscribe/${slug}?plan=free`}>
                  <Button 
                    variant="outline" 
                    className="border-swipes-blue-deep text-swipes-blue-deep rounded-[7px]"
                    data-testid="button-cta-start-free"
                  >
                    Start Free
                  </Button>
                </Link>
              )}
              <Link href={`/subscribe/${slug}?plan=paid`}>
                <Button 
                  className="bg-swipes-blue-deep text-white rounded-[7px] group"
                  disabled={requiresProPlus}
                  data-testid="button-cta-subscribe"
                >
                  <span className="flex items-center">
                    Subscribe — ${parseFloat(addOn.annualPrice || "0").toFixed(2)}/year
                    <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
