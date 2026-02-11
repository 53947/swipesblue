import {
  Store,
  Code,
  ArrowRight,
  Check,
  Shield,
  Lock,
  Zap,
  Server,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// ── THREE PATHS ──────────────────────────────────────────────
const paths = [
  {
    id: "ecommerce",
    icon: Store,
    title: "E-Commerce Suite",
    subtitle: "Sell online with a full storefront",
    color: "#1844A6",
    features: [
      "Shopping cart + one-page checkout",
      "Product catalog with inventory",
      "Invoicing & subscriptions",
      "Customer vault & fraud prevention",
    ],
    cta: "Start Selling",
    href: "/register?path=ecommerce",
  },
  {
    id: "developer",
    icon: Code,
    title: "Developer API",
    subtitle: "Build payments into your platform",
    color: "#0D9488",
    features: [
      "RESTful API with SDKs in 6 languages",
      "Sandbox environment with test cards",
      "Webhooks with HMAC-SHA256 signing",
      "Tokenization & recurring billing",
    ],
    cta: "Get API Keys",
    href: "/register?path=developer",
  },
  {
    id: "gateway",
    icon: CreditCard,
    title: "Gateway Only",
    subtitle: "Just process transactions",
    color: "#374151",
    features: [
      "Virtual terminal for manual charges",
      "Payment links — no website needed",
      "Real-time transaction reporting",
      "PCI-compliant card storage",
    ],
    cta: "Start Processing",
    href: "/register?path=gateway",
  },
];

// ── STATS ────────────────────────────────────────────────────
const stats = [
  { value: "5.8B+", label: "Transactions Processed*" },
  { value: "99.99%", label: "Platform Uptime*" },
  { value: "98.5%", label: "Avg. Approval Rate" },
  { value: "<2 hrs", label: "Support Response" },
];

// ── COMPARISON TABLE ─────────────────────────────────────────
const comparisonRows = [
  { feature: "Setup fees", swipesblue: "None", stripe: "None", square: "None", paypal: "None" },
  { feature: "Monthly fee", swipesblue: "$0 (Free tier)", stripe: "$0", square: "$0", paypal: "$0" },
  { feature: "Processing rate", swipesblue: "2.70% + $0.30", stripe: "2.90% + $0.30", square: "2.90% + $0.30", paypal: "2.99% + $0.49", highlight: true },
  { feature: "Fee on $100 sale", swipesblue: "$3.00", stripe: "$3.20", square: "$3.20", paypal: "$3.48", highlight: true },
  { feature: "You keep", swipesblue: "$97.00", stripe: "$96.80", square: "$96.80", paypal: "$96.52", highlight: true },
  { feature: "Dispute fees", swipesblue: "$15.00", stripe: "$15.00", square: "N/A", paypal: "$20.00" },
  { feature: "Invoicing", swipesblue: "Included", stripe: "Included", square: "Paid add-on", paypal: "Included" },
  { feature: "Recurring billing", swipesblue: "Included (Growth+)", stripe: "0.5% surcharge", square: "Paid add-on", paypal: "Included" },
  { feature: "Virtual terminal", swipesblue: "Included", stripe: "Included", square: "Included", paypal: "$30/mo" },
  { feature: "Developer API", swipesblue: "Included (Scale+)", stripe: "Included", square: "Limited", paypal: "Included" },
];

// ── MOCK DASHBOARD TRANSACTIONS ──────────────────────────────
const mockTxns = [
  { id: "TXN-4821", customer: "Sarah Chen", amount: "$142.00", status: "success" },
  { id: "TXN-4820", customer: "Marcus Rivera", amount: "$89.50", status: "success" },
  { id: "TXN-4819", customer: "Emma Wilson", amount: "$215.00", status: "success" },
  { id: "TXN-4818", customer: "James Park", amount: "$67.99", status: "pending" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Accept payments. Build integrations.
            <br />
            <span className="text-[#1844A6]">Scale your business.</span>
          </h1>
          <p className="text-lg text-gray-500 mt-6 max-w-2xl mx-auto">
            One platform for e-commerce, developer APIs, and gateway processing.
            Transparent pricing starting at 2.70% + $0.30 per transaction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#1844A6] text-white rounded-[7px] px-8 py-3 group"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 rounded-[7px] px-8 py-3"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ THREE PATH CARDS ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Choose your path
            </h2>
            <p className="text-gray-500 mt-2">
              Every path includes a free tier. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="bg-white border border-gray-200 rounded-[7px] p-8 flex flex-col hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-[7px] flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${path.color}10` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: path.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {path.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{path.subtitle}</p>
                  <ul className="space-y-3 flex-1">
                    {path.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className="h-4 w-4 mt-0.5 flex-shrink-0"
                          style={{ color: path.color }}
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={path.href}>
                    <Button
                      className="w-full mt-8 rounded-[7px] text-white group"
                      style={{ backgroundColor: path.color }}
                    >
                      {path.cta}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#F6F9FC] border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ E-COMMERCE DEEP DIVE ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: pitch */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1844A6]/10 rounded-[7px] mb-6">
                <Store className="h-4 w-4 text-[#1844A6]" />
                <span className="text-sm font-medium text-[#1844A6]">E-Commerce Suite</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your entire storefront in one dashboard
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Products, orders, customers, invoices, and subscriptions — all managed
                from a single place. No stitching together five different services.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Drag-and-drop product catalog with variants",
                  "One-page checkout that converts",
                  "Automated invoicing and recurring billing",
                  "Built-in fraud prevention and customer vault",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#1844A6] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register?path=ecommerce">
                <Button className="bg-[#1844A6] text-white rounded-[7px] group">
                  Start Selling Free
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right: CSS-only dashboard mockup */}
            <div className="bg-[#F6F9FC] rounded-[7px] border border-gray-200 p-6 shadow-sm">
              {/* Mock metric cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="h-3.5 w-3.5 text-[#1844A6]" />
                    <span className="text-[10px] text-gray-500 font-medium">Revenue</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">$12,482</div>
                  <div className="text-[10px] text-green-600 font-medium">+18.2% ↑</div>
                </div>
                <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShoppingCart className="h-3.5 w-3.5 text-[#1844A6]" />
                    <span className="text-[10px] text-gray-500 font-medium">Orders</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">284</div>
                  <div className="text-[10px] text-green-600 font-medium">+12.5% ↑</div>
                </div>
                <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="h-3.5 w-3.5 text-[#1844A6]" />
                    <span className="text-[10px] text-gray-500 font-medium">Customers</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">1,247</div>
                  <div className="text-[10px] text-green-600 font-medium">+8.3% ↑</div>
                </div>
              </div>

              {/* Mock chart area */}
              <div className="bg-white rounded-[7px] border border-gray-200 p-4 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5 text-[#1844A6]" />
                    <span className="text-xs font-semibold text-gray-700">Weekly Revenue</span>
                  </div>
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                </div>
                {/* CSS bar chart */}
                <div className="flex items-end gap-2 h-20">
                  {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-[3px] bg-[#1844A6]"
                        style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.6 }}
                      />
                      <span className="text-[8px] text-gray-400">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock transactions */}
              <div className="bg-white rounded-[7px] border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-700">Recent Transactions</span>
                </div>
                {mockTxns.map((txn, i) => (
                  <div
                    key={txn.id}
                    className={`px-3 py-2 flex items-center justify-between text-xs ${
                      i < mockTxns.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <div>
                      <span className="font-medium text-gray-900">{txn.customer}</span>
                      <span className="text-gray-400 ml-2">{txn.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{txn.amount}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          txn.status === "success" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Keep more of what you earn
            </h2>
            <p className="text-lg text-gray-600">
              Side-by-side comparison so you can see exactly where swipesblue saves you money.
            </p>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-5 font-semibold text-gray-900 min-w-[160px]">Feature</th>
                    <th className="text-center py-3 px-4 font-bold text-[#1844A6] min-w-[120px]">
                      <span className="text-[#374151]">swipes</span>
                      <span className="text-[#0000FF]">blue</span>
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 min-w-[120px]">Stripe</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 min-w-[120px]">Square</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 min-w-[120px]">PayPal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-100 last:border-0 ${
                        row.highlight ? "bg-[#1844A6]/[0.03]" : ""
                      }`}
                    >
                      <td className="py-3 px-5 font-medium text-gray-900">{row.feature}</td>
                      <td className="py-3 px-4 text-center font-semibold text-[#1844A6]">{row.swipesblue}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.stripe}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.square}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{row.paypal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button className="bg-[#1844A6] text-white rounded-[7px]">
                See Full Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Start accepting payments today
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Create your free account in minutes. No setup fees, no contracts, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#1844A6] text-white rounded-[7px] px-8 group"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 rounded-[7px] px-8"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ NMI FOOTNOTE ═══ */}
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
