import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Mail, 
  Palette, 
  BarChart3,
  Shield,
  Settings,
  Key,
  Link2,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const mainNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
];

const proNavItems = [
  { name: "Abandoned Carts", href: "/dashboard/abandoned-carts", icon: Mail, badge: "PRO" },
  { name: "Brand Studio", href: "/dashboard/brand-studio", icon: Palette, badge: "PRO" },
];

const toolsNavItems = [
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Security", href: "/dashboard/security", icon: Shield },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const developerNavItems = [
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Link2 },
];

const platformLinks = [
  { name: "SwipesBlue.com", href: "/" },
  { name: "HostsBlue.com", href: "https://hostsblue.com", external: true },
  { name: "BusinessBlueprint.io", href: "https://businessblueprint.io", external: true },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  const NavLink = ({ item }: { item: { name: string; href: string; icon: React.ElementType; badge?: string } }) => {
    const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
    const Icon = item.icon;
    
    return (
      <Link href={item.href}>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-[7px] text-sm transition-colors cursor-pointer ${
            isActive 
              ? "bg-swipes-blue-deep text-white" 
              : "text-swipes-pro-gray hover:bg-gray-100"
          }`}
          data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.name}</span>
          {item.badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-swipes-blue-deep text-white">
              {item.badge}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          {/* Pro Features */}
          <div className="space-y-1">
            {proNavItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Tools */}
          <nav className="space-y-1">
            {toolsNavItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Developer Section */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Developer
            </h4>
            <nav className="space-y-1">
              {developerNavItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-swipes-pro-gray uppercase tracking-wider mb-2 px-3">
              Platforms
            </h4>
            <nav className="space-y-1">
              {platformLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-swipes-pro-gray hover:bg-gray-100 rounded-[7px] transition-colors"
                    data-testid={`nav-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{link.name}</span>
                  </a>
                ) : (
                  <Link key={link.name} href={link.href}>
                    <div
                      className="flex items-center gap-3 px-3 py-2 text-sm text-swipes-pro-gray hover:bg-gray-100 rounded-[7px] transition-colors cursor-pointer"
                      data-testid={`nav-platform-${link.name.toLowerCase().replace(/\./g, '-')}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>{link.name}</span>
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
            <span className="ml-2 text-sm font-semibold text-swipes-black">FREE</span>
          </div>
          <Link href="/pricing">
            <Button 
              className="w-full group bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white text-sm"
              data-testid="button-upgrade-to-pro"
            >
              <span className="flex items-center justify-center">
                Upgrade to Pro
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
