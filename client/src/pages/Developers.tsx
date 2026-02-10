import {
  Key,
  CreditCard,
  Zap,
  DollarSign,
  Users,
  FileText,
  RefreshCw,
  Link2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const steps = [
  {
    number: 1,
    icon: Key,
    title: "Get your API keys",
    description:
      "Create your account and generate API keys from the dashboard. Use test keys for sandbox, live keys for production.",
    code: `# Your API keys
Test: sb_test_xxxxxxxxxxxx
Live: sb_live_xxxxxxxxxxxx`,
  },
  {
    number: 2,
    icon: CreditCard,
    title: "Make your first charge",
    description:
      "Process a test payment using our simple REST API. All you need is your API key and the payment details.",
    code: `curl https://api.swipesblue.com/v1/charges \\
  -u sb_test_key: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d source=tok_visa \\
  -d description="Test payment"`,
  },
  {
    number: 3,
    icon: Zap,
    title: "Go live",
    description:
      "Switch from test keys to live keys. That's it — you're processing real payments.",
    code: `# Just swap your key
-u sb_test_key:  →  -u sb_live_key:`,
  },
];

const apiCategories = [
  {
    title: "Charges",
    icon: DollarSign,
    endpoints: [
      { method: "POST", path: "/v1/charges", desc: "Create a charge" },
      { method: "GET", path: "/v1/charges/:id", desc: "Retrieve a charge" },
      { method: "POST", path: "/v1/charges/:id/refund", desc: "Refund a charge" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    endpoints: [
      { method: "POST", path: "/v1/customers", desc: "Create a customer" },
      { method: "GET", path: "/v1/customers/:id", desc: "Retrieve a customer" },
      { method: "PUT", path: "/v1/customers/:id", desc: "Update a customer" },
      { method: "DELETE", path: "/v1/customers/:id", desc: "Delete a customer" },
    ],
  },
  {
    title: "Invoices",
    icon: FileText,
    endpoints: [
      { method: "POST", path: "/v1/invoices", desc: "Create an invoice" },
      { method: "GET", path: "/v1/invoices/:id", desc: "Retrieve an invoice" },
      { method: "POST", path: "/v1/invoices/:id/send", desc: "Send an invoice" },
      { method: "POST", path: "/v1/invoices/:id/pay", desc: "Mark as paid" },
    ],
  },
  {
    title: "Subscriptions",
    icon: RefreshCw,
    endpoints: [
      { method: "POST", path: "/v1/subscriptions", desc: "Create a subscription" },
      { method: "GET", path: "/v1/subscriptions/:id", desc: "Retrieve a subscription" },
      { method: "PUT", path: "/v1/subscriptions/:id", desc: "Update a subscription" },
      { method: "DELETE", path: "/v1/subscriptions/:id", desc: "Cancel a subscription" },
    ],
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    endpoints: [
      { method: "POST", path: "/v1/payment_methods", desc: "Store a payment method" },
      { method: "GET", path: "/v1/payment_methods/:id", desc: "Retrieve stored method" },
      { method: "DELETE", path: "/v1/payment_methods/:id", desc: "Remove stored method" },
    ],
  },
  {
    title: "Webhooks",
    icon: Link2,
    endpoints: [
      { method: "POST", path: "/v1/webhooks", desc: "Register webhook endpoint" },
      { method: "GET", path: "/v1/webhooks", desc: "List webhooks" },
      { method: "DELETE", path: "/v1/webhooks/:id", desc: "Remove webhook" },
    ],
    extra: "Events: payment.success, payment.failed, payment.refunded",
  },
];

const sdks = [
  { language: "Node.js", color: "bg-green-500", install: "npm install swipesblue" },
  { language: "Python", color: "bg-blue-500", install: "pip install swipesblue" },
  { language: "PHP", color: "bg-indigo-500", install: "composer require swipesblue/swipesblue-php" },
  { language: "Ruby", color: "bg-red-500", install: "gem install swipesblue" },
  { language: "Java", color: "bg-orange-500", install: "<groupId>com.swipesblue</groupId>" },
  { language: "Go", color: "bg-cyan-500", install: "go get github.com/swipesblue/swipesblue-go" },
];

const webhookFeatures = [
  "HMAC-SHA256 signed for security",
  "Automatic retry with exponential backoff",
  "Event filtering per endpoint",
  "Test endpoint for verification",
];

const testCards = [
  { card: "Visa (success)", number: "4111 1111 1111 1111", result: "Approved", resultColor: "text-green-600" },
  { card: "Visa (decline)", number: "4000 0000 0000 0002", result: "Declined", resultColor: "text-red-600" },
  { card: "Mastercard", number: "5500 0000 0000 0004", result: "Approved", resultColor: "text-green-600" },
  { card: "Amex", number: "3400 0000 0000 009", result: "Approved", resultColor: "text-green-600" },
  { card: "Insufficient funds", number: "4000 0000 0000 9995", result: "Declined", resultColor: "text-red-600" },
];

const webhookPayload = `{
  "event": "payment.success",
  "data": {
    "id": "ch_1a2b3c4d",
    "amount": 2000,
    "currency": "usd",
    "status": "succeeded",
    "customer": "cus_5e6f7g8h",
    "created": "2026-02-05T12:00:00Z"
  }
}`;

export default function Developers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-bold text-gray-900"
            data-testid="text-developers-title"
          >
            Built for developers
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Clean REST APIs, comprehensive documentation, and SDKs in every
            major language. Get your first integration running in minutes.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#quick-start">
              <Button
                className="bg-[#1844A6] text-white rounded-[7px] px-6 py-3"
                data-testid="button-quick-start"
              >
                Quick Start Guide
              </Button>
            </a>
            <Link href="/dashboard/api-keys">
              <Button
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 rounded-[7px] px-6 py-3"
                data-testid="button-get-api-keys"
              >
                Get API Keys
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            Get started in 3 steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-[7px] border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1844A6] text-white text-sm font-bold">
                      {step.number}
                    </span>
                    <Icon className="h-5 w-5 text-[#1844A6]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {step.description}
                  </p>
                  <div className="bg-[#1a1a2e] text-gray-100 rounded-[7px] p-4 font-mono text-sm mt-4 overflow-x-auto">
                    <pre className="whitespace-pre">{step.code}</pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            API Reference
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl">
            RESTful API with consistent patterns, predictable responses, and
            comprehensive error handling.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {apiCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="bg-white rounded-[7px] border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="h-5 w-5 text-[#1844A6]" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {cat.endpoints.map((ep) => (
                      <div
                        key={ep.method + ep.path}
                        className="flex items-baseline gap-2 font-mono text-sm text-gray-500"
                      >
                        <span className="font-semibold text-[#1844A6] w-16 flex-shrink-0">
                          {ep.method}
                        </span>
                        <span>{ep.path}</span>
                        <span className="text-gray-400 ml-auto text-xs hidden sm:inline">
                          {ep.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                  {cat.extra && (
                    <p className="text-xs text-gray-400 mt-3 font-mono">
                      {cat.extra}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SDKs & Libraries */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            SDKs & Libraries
          </h2>
          <p className="text-gray-500 mb-12">
            Official libraries in every major language.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk) => (
              <div
                key={sdk.language}
                className="bg-white rounded-[7px] border border-gray-200 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-8 h-8 rounded-full ${sdk.color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {sdk.language.charAt(0)}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {sdk.language}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-[7px] p-2 font-mono text-xs overflow-x-auto">
                  {sdk.install}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real-time Webhooks
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl">
            Get instant notifications for every event in your payment lifecycle.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                {webhookFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-gray-500"
                  >
                    <Zap className="h-4 w-4 text-[#1844A6] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1a2e] text-gray-100 rounded-[7px] p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre">{webhookPayload}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Sandbox / Testing */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Test before you launch
          </h2>
          <p className="text-gray-500 mb-12">
            Full sandbox environment with test cards and simulated responses.
          </p>
          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                    Card
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                    Number
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {testCards.map((tc) => (
                  <tr
                    key={tc.number}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {tc.card}
                    </td>
                    <td className="px-6 py-3 font-mono text-sm text-gray-900">
                      {tc.number}
                    </td>
                    <td className={`px-6 py-3 text-sm font-semibold ${tc.resultColor}`}>
                      {tc.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to integrate?
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Create your account and start building in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/api-keys">
              <Button
                className="bg-[#1844A6] text-white rounded-[7px] px-6 py-3"
                data-testid="button-cta-get-api-keys"
              >
                <span className="flex items-center">
                  Get API Keys
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </Button>
            </Link>
            <Link href="/developers">
              <Button
                variant="outline"
                className="border-2 border-teal-600 text-teal-600 rounded-[7px] px-6 py-3"
                data-testid="button-cta-view-docs"
              >
                View Full Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
