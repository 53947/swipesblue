import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  Wallet,
  Package,
  Store,
  Terminal,
  Link2,
  FileText,
  RefreshCw,
  UserCheck,
  Shield,
  Settings,
  ExternalLink,
  Lock,
  Zap,
  BarChart3,
  Layers,
  Code,
  ShoppingBag,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import TierBadge from "@/components/TierBadge";
import {
  SidebarNavLink,
  SidebarSectionGroup,
  type SidebarNavItem,
} from "@/components/dashboard/SidebarSection";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// ── PLATFORM LINKS ────────────────────────────────────────────
const platformLinks = [
  {
    name: "swipesblue.com",
    href: "/",
    external: false,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: "#374151" }}>swipes</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#374151" }}>.com</span>
      </span>
    ),
  },
  {
    name: "hostsblue.com",
    href: "https://hostsblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: "#008060" }}>hosts</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#008060" }}>.com</span>
      </span>
    ),
  },
  {
    name: "businessblueprint.io",
    href: "https://businessblueprint.io",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: "#FF6B00" }}>business</span>
        <span style={{ color: "#0000FF" }}>blueprint</span>
        <span style={{ color: "#FF6B00" }}>.io</span>
      </span>
    ),
  },
  {
    name: "scansblue.com",
    href: "https://scansblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: "#A00028" }}>scans</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#A00028" }}>.com</span>
      </span>
    ),
  },
  {
    name: "triadblue.com",
    href: "https://triadblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm" style={{ color: "#1844A6" }}>
        triadblue.com
      </span>
    ),
  },
];

// ── ENHANCEMENT DEFINITIONS ───────────────────────────────────
interface EnhancementDef {
  name: string;
  slug: string;
  icon: React.ElementType;
  requiredTier: string;
  includedTiers?: string[];
}

const enhancementDefs: EnhancementDef[] = [
  { name: "Customer Portal", slug: "customer-portal", icon: Users, requiredTier: "Growth", includedTiers: ["Enterprise"] },
  { name: "Security Suite", slug: "security-suite", icon: Shield, requiredTier: "Growth", includedTiers: ["Enterprise"] },
  { name: "Analytics", slug: "advanced-analytics", icon: BarChart3, requiredTier: "Growth", includedTiers: ["Scale", "Enterprise"] },
  { name: "Checkout Optimizer", slug: "checkout-optimizer", icon: Zap, requiredTier: "Growth", includedTiers: [] },
  { name: "Cart Pro", slug: "shopping-cart-pro", icon: ShoppingBag, requiredTier: "Growth", includedTiers: [] },
  { name: "Multi-Gateway", slug: "multi-gateway", icon: Layers, requiredTier: "Scale", includedTiers: ["Enterprise"] },
  { name: "API Access", slug: "premium-api", icon: Code, requiredTier: "Scale", includedTiers: ["Enterprise"] },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { tier, canAccess, hasAddon, businessName } = useMerchantAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── WORKSPACE NAV ITEMS ───────────────────────────────────
  const workspaceItems: SidebarNavItem[] = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Customer List",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Order Management",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      name: "Balances",
      href: "/dashboard/balances",
      icon: Wallet,
    },
    {
      name: "Product Catalog",
      href: "/dashboard/catalog",
      icon: Package,
    },
  ];

  // ── CORE PRODUCTS NAV ITEMS ───────────────────────────────
  const coreProductItems: SidebarNavItem[] = [
    {
      name: "E-Commerce Suite",
      href: "/dashboard/ecommerce",
      icon: Store,
      badge: tier,
      badgeVariant: "tier" as const,
      subItems: [
        { name: "Shopping Cart", href: "/dashboard/ecommerce/cart" },
        { name: "One-Page Checkout", href: "/dashboard/ecommerce/checkout" },
      ],
    },
    {
      name: "Virtual Terminal",
      href: "/dashboard/terminal",
      icon: Terminal,
    },
    {
      name: "Payment Links",
      href: "/dashboard/payment-links",
      icon: Link2,
    },
    {
      name: "Invoicing",
      href: "/dashboard/invoices",
      icon: FileText,
      subItems: [
        { name: "All Invoices", href: "/dashboard/invoices" },
        { name: "Create Invoice", href: "/dashboard/invoices?tab=create" },
        { name: "Overdue", href: "/dashboard/invoices?tab=overdue" },
      ],
    },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: RefreshCw,
      subItems: [
        { name: "Active Subscriptions", href: "/dashboard/subscriptions" },
        { name: "Preset Subscriptions", href: "/dashboard/subscriptions?tab=templates" },
        { name: "Create Subscription", href: "/dashboard/subscriptions?tab=create" },
      ],
    },
    {
      name: "Customer Vault",
      href: "/dashboard/vault",
      icon: UserCheck,
    },
    {
      name: "Fraud Prevention",
      href: "/dashboard/fraud",
      icon: Shield,
    },
  ];

  // ── ENHANCEMENT NAV ITEMS (dynamic based on entitlements) ──
  function getEnhancementBadge(enh: EnhancementDef): { badge: string; badgeVariant: "green" | "blue" | "gray"; locked: boolean } {
    // Check if addon is actively subscribed
    if (hasAddon(enh.slug)) {
      return { badge: "ACTIVE", badgeVariant: "green", locked: false };
    }

    // Check if included with current tier
    if (enh.includedTiers && enh.includedTiers.includes(tier)) {
      return { badge: "INCLUDED", badgeVariant: "blue", locked: false };
    }

    // Check if merchant's tier meets the requirement
    if (!canAccess(enh.requiredTier)) {
      return { badge: "UPGRADE", badgeVariant: "gray", locked: true };
    }

    // Eligible but not purchased — no badge, show in body
    return { badge: "UPGRADE", badgeVariant: "gray", locked: false };
  }

  const enhancementItems: SidebarNavItem[] = enhancementDefs.map((enh) => {
    const { badge, badgeVariant, locked } = getEnhancementBadge(enh);
    const href = `/dashboard/enhance/${enh.slug}`;

    return {
      name: enh.name,
      href,
      icon: enh.icon,
      badge,
      badgeVariant,
      locked,
    };
  });

  // ── SETTINGS NAV ITEM ─────────────────────────────────────
  const settingsItem: SidebarNavItem = {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  };

  // ── SIDEBAR CONTENT ───────────────────────────────────────
  const sidebarContent = (
    <div className="flex-1 py-6 px-4 xl:px-5 space-y-4 overflow-y-auto">
      {/* Business name + tier */}
      <div className="px-3 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 truncate">
            {businessName || "My Business"}
          </span>
          <TierBadge tier={tier} size="sm" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* WORKSPACE */}
      <SidebarSectionGroup title="Workspace">
        {workspaceItems.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
      </SidebarSectionGroup>

      <div className="border-t border-gray-200" />

      {/* CORE PRODUCTS */}
      <SidebarSectionGroup title="Core Products">
        {coreProductItems.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
      </SidebarSectionGroup>

      <div className="border-t border-gray-200" />

      {/* ENHANCEMENTS */}
      <SidebarSectionGroup title="Enhancements">
        {enhancementItems.map((item) => (
          <SidebarNavLink key={item.href} item={item} />
        ))}
      </SidebarSectionGroup>

      <div className="border-t border-gray-200" />

      {/* SETTINGS */}
      <SidebarSectionGroup title="Settings">
        <SidebarNavLink item={settingsItem} />
      </SidebarSectionGroup>

      <div className="border-t border-gray-200" />

      {/* PLATFORM */}
      <SidebarSectionGroup title="Platform">
        {platformLinks.map((link) =>
          link.external ? (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-[7px] transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4 text-gray-400" />
              {link.renderName()}
            </a>
          ) : (
            <Link key={link.name} href={link.href}>
              <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-[7px] transition-colors cursor-pointer hover:bg-gray-50">
                <ExternalLink className="h-4 w-4 text-gray-400" />
                {link.renderName()}
              </div>
            </Link>
          )
        )}
      </SidebarSectionGroup>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-[72px] left-4 z-50 p-2 bg-white border border-gray-200 rounded-[7px] shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-40 lg:z-auto
          w-64 xl:w-72 2xl:w-80
          border-r border-gray-200 bg-white
          flex flex-col shrink-0
          h-[calc(100vh-64px)] lg:h-auto
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
