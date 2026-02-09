import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
  Key,
  Link2,
  ExternalLink,
  ArrowRight,
  Users,
  Layers,
  Zap,
  Lock,
  Code,
  Receipt,
  RefreshCw,
  Link as LinkIcon,
  AlertTriangle,
  FileText,
  Plus,
  Table2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const paymentsNavItems = [
  { name: "Virtual Terminal", href: "/dashboard/virtual-terminal", icon: CreditCard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Invoicing", href: "/dashboard/invoicing", icon: Receipt },
  { name: "Payment Links", href: "/dashboard/payment-links", icon: LinkIcon },
  { name: "Reporting", href: "/dashboard/reporting", icon: FileText },
  { name: "Fraud Prevention", href: "/dashboard/fraud-prevention", icon: Shield },
];

const billingNavItems = [
  { name: "Recurring Billing", href: "/dashboard/recurring-billing", icon: RefreshCw },
  { name: "Customer Vault", href: "/dashboard/customer-vault", icon: Users },
  { name: "Dispute Management", href: "/dashboard/dispute-management", icon: AlertTriangle },
];

const addOnNavItems = [
  { name: "Customer Portal", href: "/dashboard/customer-portal", icon: Users, slug: "customer-portal" },
  { name: "Security Suite", href: "/dashboard/security", icon: Shield, slug: "security-suite" },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, slug: "advanced-analytics" },
  { name: "Checkout Optimizer", href: "/dashboard/checkout-optimizer", icon: Zap, slug: "checkout-optimizer" },
  { name: "Cart Pro", href: "/dashboard/cart-settings", icon: ShoppingCart, slug: "shopping-cart-pro" },
  { name: "Multi-Gateway", href: "/dashboard/gateways", icon: Layers, slug: "multi-gateway" },
  { name: "API Access", href: "/dashboard/api-keys", icon: Code, slug: "premium-api" },
];

const developerNavItems = [
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Link2 },
];

const platformLinks = [
  {
    name: "swipesblue.com",
    href: "/",
    external: false,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: '#374151' }}>swipes</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#374151' }}>.com</span>
      </span>
    ),
  },
  {
    name: "hostsblue.com",
    href: "https://hostsblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: '#008060' }}>hosts</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#008060' }}>.com</span>
      </span>
    ),
  },
  {
    name: "businessblueprint.io",
    href: "https://businessblueprint.io",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: '#FF6B00' }}>business</span>
        <span style={{ color: '#0000FF' }}>blueprint</span>
        <span style={{ color: '#FF6B00' }}>.io</span>
      </span>
    ),
  },
  {
    name: "scansblue.com",
    href: "https://scansblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm">
        <span style={{ color: '#A00028' }}>scans</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#A00028' }}>.com</span>
      </span>
    ),
  },
  {
    name: "triadblue.com",
    href: "https://triadblue.com",
    external: true,
    renderName: () => (
      <span className="text-sm" style={{ color: '#1844A6' }}>
        triadblue.com
      </span>
    ),
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { tier, canAccess, hasAddon, addons } = useMerchantAuth();

  const showDeveloperSection = canAccess("Scale") || hasAddon("premium-api");

  const NavLink = ({ item }: { item: { name: string; href: string; icon: React.ElementType; badge?: string; locked?: boolean } }) => {
    const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
    const Icon = item.icon;

    return (
      <Link href={item.href}>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer hover-elevate ${
            isActive
              ? "bg-swipes-blue-deep text-white"
              : "text-swipes-pro-gray"
          }`}
          data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.name}</span>
          {item.badge && (
            <Badge
              className={`text-xs no-default-hover-elevate ${
                item.badge === "FREE"
                  ? "bg-swipes-trusted-green text-white"
                  : "bg-swipes-blue-deep text-white"
              }`}
              data-testid={`badge-${item.name.toLowerCase().replace(/\s+/g, '-')}-${item.badge.toLowerCase()}`}
            >
              {item.badge}
            </Badge>
          )}
          {item.locked && (
            <Lock className="h-3 w-3" />
          )}
        </div>
      </Link>
    );
  };

  const AddOnNavLink = ({ item }: { item: { name: string; href: string; icon: React.ElementType; slug: string } }) => {
    const isActive = location === item.href || location.startsWith(item.href);
    const Icon = item.icon;
    const isSubscribed = addons.includes(item.slug);

    const linkHref = isSubscribed ? item.href : `/products/${item.slug}`;

    return (
      <Link href={linkHref}>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer hover-elevate ${
            isActive
              ? "bg-swipes-blue-deep text-white"
              : "text-swipes-pro-gray"
          }`}
          data-testid={`nav-addon-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.name}</span>
          {isSubscribed ? (
            <Badge className="text-xs bg-swipes-trusted-green text-white no-default-hover-elevate" data-testid={`badge-addon-${item.slug}-active`}>
              ACTIVE
            </Badge>
          ) : (
            <>
              <Badge className="text-xs bg-gray-200 text-gray-600 no-default-hover-elevate" data-testid={`badge-addon-${item.slug}-upgrade`}>
                UPGRADE
              </Badge>
              <Lock className="h-3 w-3" />
            </>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
        <div className="flex-1 py-6 px-4 space-y-4 overflow-y-auto">
          {/* Dashboard Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Dashboard
            </h4>
            <nav className="space-y-1">
              <NavLink item={{ name: "Overview", href: "/dashboard", icon: LayoutDashboard }} />
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* My Product Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              My Product
            </h4>
            <nav className="space-y-1">
              <NavLink item={{ name: "All Products", href: "/dashboard/catalog", icon: Package }} />
              <NavLink item={{ name: "Add Product", href: "/dashboard/catalog/create", icon: Plus }} />
              <Link href="/dashboard/catalog/bulk-edit">
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer hover-elevate ${
                    location === "/dashboard/catalog/bulk-edit"
                      ? "bg-swipes-blue-deep text-white"
                      : "text-swipes-pro-gray"
                  }`}
                >
                  <Table2 className="h-4 w-4" />
                  <span className="flex-1">Bulk Editor</span>
                  {!canAccess("Growth") && (
                    <>
                      <Badge className="text-xs bg-[#1844A6] text-white no-default-hover-elevate">GROWTH+</Badge>
                      <Lock className="h-3 w-3" />
                    </>
                  )}
                </div>
              </Link>
              <Link href="/dashboard/catalog/import">
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer hover-elevate ${
                    location === "/dashboard/catalog/import"
                      ? "bg-swipes-blue-deep text-white"
                      : "text-swipes-pro-gray"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span className="flex-1">Import / Export</span>
                  {!canAccess("Growth") && (
                    <>
                      <Badge className="text-xs bg-[#1844A6] text-white no-default-hover-elevate">GROWTH+</Badge>
                      <Lock className="h-3 w-3" />
                    </>
                  )}
                </div>
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Payments Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Payments
            </h4>
            <nav className="space-y-1">
              {paymentsNavItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Billing Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Billing
            </h4>
            <nav className="space-y-1">
              {billingNavItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Enhancements Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Enhancements
            </h4>
            <nav className="space-y-1">
              {addOnNavItems.map((item) => (
                <AddOnNavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Developers Section — only visible for Scale+ or Premium API Access holders */}
          {showDeveloperSection && (
            <>
              <div>
                <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
                  Developers
                </h4>
                <nav className="space-y-1">
                  {developerNavItems.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </nav>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* Settings Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Settings
            </h4>
            <nav className="space-y-1">
              <NavLink item={{ name: "Settings", href: "/dashboard/settings", icon: Settings }} />
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Platform
            </h4>
            <nav className="space-y-1">
              {platformLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-[7px] transition-colors hover-elevate"
                    data-testid={`nav-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                  >
                    <ExternalLink className="h-4 w-4 text-swipes-pro-gray" />
                    {link.renderName()}
                  </a>
                ) : (
                  <Link key={link.name} href={link.href}>
                    <div
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-[7px] transition-colors cursor-pointer hover-elevate"
                      data-testid={`nav-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                    >
                      <ExternalLink className="h-4 w-4 text-swipes-pro-gray" />
                      {link.renderName()}
                    </div>
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>

        {/* Plan & Upgrade Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3">
            <span className="text-xs text-swipes-pro-gray">Your Plan:</span>
            <span className="ml-2 text-sm font-semibold text-swipes-black">{tier}</span>
          </div>
          <Link href="/pricing">
            <Button
              className="w-full group bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white text-sm"
              data-testid="button-upgrade-to-scale"
            >
              <span className="flex items-center justify-center">
                Upgrade to Scale
                <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
