import { useState } from "react";
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// ── STATS ────────────────────────────────────────────────────
const stats = [
  { value: "5.8B+", label: "Transactions powered annually" },
  { value: "2.70%", label: "Processing rate — beats Stripe, PayPal, Square" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "$0", label: "To get started" },
];

// ── COMPARISON TABLE ─────────────────────────────────────────
const competitors = [
  { name: "swipesblue", rate: "2.70% + $0.30", fee: "$3.00", keep: "$97.00", best: true },
  { name: "Stripe", rate: "2.90% + $0.30", fee: "$3.20", keep: "$96.80" },
  { name: "PayPal", rate: "2.99% + $0.49", fee: "$3.48", keep: "$96.52" },
  { name: "Square", rate: "2.90% + $0.30", fee: "$3.20", keep: "$96.80" },
];

// ── E-COMMERCE SUITE PRODUCTS ────────────────────────────────
const suiteProducts = [
  "Shopping Cart", "One-Page Checkout", "Product Catalog", "Invoicing",
  "Subscriptions", "Payment Links", "Customer Vault", "Fraud Prevention",
];

// ── MOCK DASHBOARD DATA ──────────────────────────────────────
const dashboardNav = ["Overview", "Customers", "Orders", "Transactions"];
const dashboardProducts = ["E-Commerce Suite", "Virtual Terminal", "Payment Links", "Invoicing"];
const dashboardMetrics = [
  { label: "Revenue", value: "$4,280" },
  { label: "Orders", value: "47" },
  { label: "Customers", value: "156" },
];
const dashboardTxns = [
  { name: "Jane Smith", amount: "$49.99" },
  { name: "Mike Johnson", amount: "$125.00" },
  { name: "Sarah Davis", amount: "$32.50" },
];

// ── ALT DASHBOARD MOCKUP DATA ──────────────────────────────
const altMockTxns = [
  { id: "TXN-4821", customer: "Sarah Chen", amount: "$142.00", status: "success" },
  { id: "TXN-4820", customer: "Marcus Rivera", amount: "$89.50", status: "success" },
  { id: "TXN-4819", customer: "Emma Wilson", amount: "$215.00", status: "success" },
  { id: "TXN-4818", customer: "James Park", amount: "$67.99", status: "pending" },
];

export default function Home() {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [dashboardView, setDashboardView] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-14 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-[44px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
          One platform.
          <br />
          <span className="text-[#1844A6]">Every way to get paid.</span>
        </h1>
        <p className="text-xl text-gray-500 mt-4 max-w-[600px] mx-auto leading-relaxed">
          Whether you're launching a store, integrating payments, or replacing your current processor — swipesblue has what you need at 2.70% + $0.30.
        </p>

        {/* Trust badges inline */}
        <div className="flex justify-center gap-6 md:gap-8 mt-7 flex-wrap">
          {["PCI Level 1", "99.99% Uptime", "256-bit TLS", "Built on NMI"].map((badge) => (
            <span
              key={badge}
              className="text-xs text-gray-400 font-semibold uppercase tracking-wide"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ THREE PATH CARDS ═══ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PATH 1: E-COMMERCE */}
          <div
            onMouseEnter={() => setHoveredPath("ecom")}
            onMouseLeave={() => setHoveredPath(null)}
            className="flex flex-col overflow-hidden cursor-pointer"
            style={{
              border: hoveredPath === "ecom" ? "2px solid #1844A6" : "2px solid #e5e7eb",
              borderRadius: 12,
              transition: "all 0.25s ease",
              transform: hoveredPath === "ecom" ? "translateY(-4px)" : "none",
              boxShadow: hoveredPath === "ecom" ? "0 12px 40px rgba(24,68,166,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Gradient header */}
            <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1844A6 0%, #2563eb 100%)", padding: "36px 28px 28px" }}>
              {/* SVG decoration */}
              <div className="absolute top-3 right-4 opacity-15">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="30" width="60" height="40" rx="4" stroke="white" strokeWidth="2" />
                  <path d="M10 42H70" stroke="white" strokeWidth="2" />
                  <rect x="20" y="50" width="16" height="14" rx="2" stroke="white" strokeWidth="2" />
                  <rect x="44" y="50" width="16" height="14" rx="2" stroke="white" strokeWidth="2" />
                  <path d="M25 30V18L40 10L55 18V30" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.2)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h3 className="text-white text-[22px] font-bold leading-tight">
                I want to sell
                <br />
                things online
              </h3>
              <p className="text-white/75 text-[13px] mt-2 leading-relaxed">
                Launch your store with zero monthly fees
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col" style={{ padding: "24px 28px 28px" }}>
              <p className="text-sm text-gray-600 leading-[1.7] mb-5">
                A complete e-commerce suite — shopping cart, checkout, product catalog, invoicing, subscriptions, and payment links. Everything you need to start selling, managed from one dashboard.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {["Shopping cart & one-page checkout", "Product catalog (up to 25 free)", "Invoicing & subscriptions", "Payment links — no website needed", "Fraud prevention built in"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-green-600 text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-[13px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <div className="text-xs text-gray-400 font-medium mb-2.5">
                  STARTS AT $0/MONTH
                </div>
                <Link href="/register?path=ecommerce">
                  <button className="w-full bg-[#1844A6] text-white border-none rounded-[7px] py-3 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#1844A6]/90">
                    Start Selling Free →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* PATH 2: DEVELOPER */}
          <div
            onMouseEnter={() => setHoveredPath("dev")}
            onMouseLeave={() => setHoveredPath(null)}
            className="flex flex-col overflow-hidden cursor-pointer"
            style={{
              border: hoveredPath === "dev" ? "2px solid #0d9488" : "2px solid #e5e7eb",
              borderRadius: 12,
              transition: "all 0.25s ease",
              transform: hoveredPath === "dev" ? "translateY(-4px)" : "none",
              boxShadow: hoveredPath === "dev" ? "0 12px 40px rgba(13,148,136,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)", padding: "36px 28px 28px" }}>
              <div className="absolute top-3.5 right-4 opacity-15">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <path d="M20 25L8 40L20 55" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <path d="M60 25L72 40L60 55" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <path d="M48 15L32 65" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.2)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-white text-[22px] font-bold leading-tight">
                I want to integrate
                <br />
                payments
              </h3>
              <p className="text-white/75 text-[13px] mt-2 leading-relaxed">
                Clean APIs, fast integration, full control
              </p>
            </div>

            <div className="flex-1 flex flex-col" style={{ padding: "24px 28px 28px" }}>
              <p className="text-sm text-gray-600 leading-[1.7] mb-5">
                RESTful payment APIs with comprehensive documentation, sandbox testing, and webhooks. Process payments, manage customers, and handle subscriptions programmatically.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {["RESTful API with full documentation", "Sandbox environment for testing", "Webhooks for real-time events", "SDKs & code samples", "Partner platform integration"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-green-600 text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-[13px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <div className="text-xs text-gray-400 font-medium mb-2.5">
                  2.70% + $0.30 PER TRANSACTION
                </div>
                <Link href="/register?path=developer">
                  <button className="w-full bg-[#0d9488] text-white border-none rounded-[7px] py-3 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#0d9488]/90">
                    Get a Free Sandbox →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* PATH 3: GATEWAY */}
          <div
            onMouseEnter={() => setHoveredPath("gateway")}
            onMouseLeave={() => setHoveredPath(null)}
            className="flex flex-col overflow-hidden cursor-pointer"
            style={{
              border: hoveredPath === "gateway" ? "2px solid #374151" : "2px solid #e5e7eb",
              borderRadius: 12,
              transition: "all 0.25s ease",
              transform: hoveredPath === "gateway" ? "translateY(-4px)" : "none",
              boxShadow: hoveredPath === "gateway" ? "0 12px 40px rgba(55,65,81,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)", padding: "36px 28px 28px" }}>
              <div className="absolute top-3.5 right-4 opacity-15">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="22" width="60" height="38" rx="4" stroke="white" strokeWidth="2" />
                  <path d="M10 34H70" stroke="white" strokeWidth="2" />
                  <rect x="16" y="44" width="20" height="4" rx="1" stroke="white" strokeWidth="1.5" />
                  <rect x="16" y="52" width="12" height="4" rx="1" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.2)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3 className="text-white text-[22px] font-bold leading-tight">
                I just need to
                <br />
                process payments
              </h3>
              <p className="text-white/75 text-[13px] mt-2 leading-relaxed">
                Switch processors and keep more revenue
              </p>
            </div>

            <div className="flex-1 flex flex-col" style={{ padding: "24px 28px 28px" }}>
              <p className="text-sm text-gray-600 leading-[1.7] mb-5">
                Already running a business? Key in cards over the phone, send payment links to clients, invoice for completed work. No store needed — just a faster, cheaper way to get paid.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {["Virtual terminal — key in cards anywhere", "Payment links via text or email", "Professional invoicing", "Lower fees than Square or PayPal", "Switch in under 10 minutes"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-green-600 text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-[13px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <div className="text-xs text-gray-400 font-medium mb-2.5">
                  SAVE UP TO $0.48 PER TRANSACTION
                </div>
                <Link href="/register?path=gateway">
                  <button className="w-full bg-[#374151] text-white border-none rounded-[7px] py-3 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#374151]/90">
                    Switch to swipesblue →
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#f9fafb] border-y border-gray-200 py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[13px] text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ E-COMMERCE SUITE DEEP DIVE ═══ */}
      <section className="py-20 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#1844A6]/10 rounded-full px-3.5 py-1.5 mb-5">
              <span className="text-xs font-semibold text-[#1844A6] uppercase tracking-wide">E-Commerce Suite</span>
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight mb-4">
              Your entire store.
              <br />
              One dashboard.
            </h2>
            <p className="text-base text-gray-500 leading-[1.7] mb-7">
              Shopping cart, checkout, product catalog, invoicing, subscriptions, payment links, customer vault, and fraud prevention — all included. Start free with 25 products, scale to unlimited.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-7">
              {suiteProducts.map((product) => (
                <div key={product} className="flex items-center gap-2 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1844A6] flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{product}</span>
                </div>
              ))}
            </div>
            <Link href="/products/ecommerce">
              <Button className="bg-[#1844A6] text-white rounded-[7px] px-7 py-3 text-sm font-semibold">
                Explore the E-Commerce Suite →
              </Button>
            </Link>
          </div>

          {/* Right column: toggleable dashboard mockups */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => setDashboardView(dashboardView === 0 ? 1 : 0)}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous view"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => setDashboardView(dashboardView === 0 ? 1 : 0)}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next view"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4 absolute bottom-[-28px] left-0 right-0">
              <button
                onClick={() => setDashboardView(0)}
                className={`w-2 h-2 rounded-full transition-colors ${dashboardView === 0 ? "bg-[#1844A6]" : "bg-gray-300"}`}
                aria-label="View 1"
              />
              <button
                onClick={() => setDashboardView(1)}
                className={`w-2 h-2 rounded-full transition-colors ${dashboardView === 1 ? "bg-[#1844A6]" : "bg-gray-300"}`}
                aria-label="View 2"
              />
            </div>

            {/* View 1: Browser chrome dashboard */}
            <div
              className="transition-opacity duration-300"
              style={{ display: dashboardView === 0 ? "block" : "none" }}
            >
              <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1a1a2e" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-[11px] ml-2">swipesblue dashboard</span>
                  </div>
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="w-40 bg-[#f9fafb] border-r border-gray-200" style={{ padding: "12px 8px" }}>
                      {dashboardNav.map((item, i) => (
                        <div
                          key={item}
                          className="text-[11px] font-medium mb-0.5 rounded"
                          style={{
                            padding: "6px 10px",
                            background: i === 0 ? "#1844A6" : "transparent",
                            color: i === 0 ? "#fff" : "#6b7280",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="text-[9px] text-gray-400 font-semibold uppercase px-2.5 mb-1">Products</div>
                        {dashboardProducts.map((item) => (
                          <div key={item} className="text-[10px] text-gray-500 px-2.5 py-1">{item}</div>
                        ))}
                      </div>
                    </div>
                    {/* Body */}
                    <div className="flex-1 p-4">
                      <div className="text-[13px] font-bold text-gray-900 mb-3">Overview</div>
                      <div className="grid grid-cols-3 gap-2">
                        {dashboardMetrics.map((card) => (
                          <div key={card.label} className="bg-[#f9fafb] rounded-md px-3 py-2.5">
                            <div className="text-[9px] text-gray-400 font-medium">{card.label}</div>
                            <div className="text-base font-bold text-gray-900 mt-0.5">{card.value}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-[#f9fafb] rounded-md p-3 mt-3">
                        <div className="text-[9px] text-gray-400 font-medium mb-2">Recent Transactions</div>
                        {dashboardTxns.map((tx) => (
                          <div
                            key={tx.name}
                            className="flex justify-between text-[10px] text-gray-600 py-1 border-b border-gray-100 last:border-0"
                          >
                            <span>{tx.name}</span>
                            <span className="flex gap-2">
                              <span className="font-semibold">{tx.amount}</span>
                              <span className="text-green-600">✓</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View 2: Analytics dashboard */}
            <div
              className="transition-opacity duration-300"
              style={{ display: dashboardView === 1 ? "block" : "none" }}
            >
              <div className="bg-[#F6F9FC] rounded-[7px] border border-gray-200 p-6 shadow-sm">
                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign className="h-3.5 w-3.5 text-[#1844A6]" />
                      <span className="text-[10px] text-gray-500 font-medium">Revenue</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">$12,482</div>
                    <div className="text-[10px] text-green-600 font-medium">+18.2%</div>
                  </div>
                  <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShoppingCart className="h-3.5 w-3.5 text-[#1844A6]" />
                      <span className="text-[10px] text-gray-500 font-medium">Orders</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">284</div>
                    <div className="text-[10px] text-green-600 font-medium">+12.5%</div>
                  </div>
                  <div className="bg-white rounded-[7px] border border-gray-200 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="h-3.5 w-3.5 text-[#1844A6]" />
                      <span className="text-[10px] text-gray-500 font-medium">Customers</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">1,247</div>
                    <div className="text-[10px] text-green-600 font-medium">+8.3%</div>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="bg-white rounded-[7px] border border-gray-200 p-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-[#1844A6]" />
                      <span className="text-xs font-semibold text-gray-700">Weekly Revenue</span>
                    </div>
                    <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  </div>
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

                {/* Transactions */}
                <div className="bg-white rounded-[7px] border border-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-700">Recent Transactions</span>
                  </div>
                  {altMockTxns.map((txn, i) => (
                    <div
                      key={txn.id}
                      className={`px-3 py-2 flex items-center justify-between text-xs ${
                        i < altMockTxns.length - 1 ? "border-b border-gray-50" : ""
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
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="bg-[#f9fafb] border-t border-gray-200 py-20 md:py-24">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">
              Keep more of what you earn
            </h2>
            <p className="text-base text-gray-500">
              Compare processing fees on a $100 sale
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3.5 px-5 text-[13px] font-semibold text-gray-700">Provider</th>
                  <th className="text-left py-3.5 px-5 text-[13px] font-semibold text-gray-700">Rate</th>
                  <th className="text-right py-3.5 px-5 text-[13px] font-semibold text-gray-700">Fee on $100</th>
                  <th className="text-right py-3.5 px-5 text-[13px] font-semibold text-gray-700">You Keep</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-gray-100 last:border-0"
                    style={{ background: row.best ? "#1844A608" : "transparent" }}
                  >
                    <td className="py-3 px-5 text-sm" style={{ fontWeight: row.best ? 700 : 400, color: row.best ? "#1844A6" : "#4b5563" }}>
                      {row.name}
                    </td>
                    <td className="py-3 px-5 text-sm" style={{ color: row.best ? "#1844A6" : "#6b7280" }}>
                      {row.rate}
                    </td>
                    <td className="py-3 px-5 text-sm text-right" style={{ fontWeight: row.best ? 600 : 400, color: row.best ? "#1844A6" : "#6b7280" }}>
                      {row.fee}
                    </td>
                    <td className="py-3 px-5 text-sm text-right" style={{ fontWeight: row.best ? 700 : 400, color: row.best ? "#16a34a" : "#6b7280" }}>
                      {row.keep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-24 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
          Ready to get started?
        </h2>
        <p className="text-base text-gray-500 mb-8 leading-relaxed">
          Create your account in under two minutes. No credit card required. Start processing payments today.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/register">
            <Button className="bg-[#1844A6] text-white rounded-[7px] px-8 py-3.5 text-[15px] font-semibold">
              Get Started Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              variant="outline"
              className="border-2 border-teal-600 text-teal-600 rounded-[7px] px-8 py-3.5 text-[15px] font-semibold"
            >
              View Pricing
            </Button>
          </Link>
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
