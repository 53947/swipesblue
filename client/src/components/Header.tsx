import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { 
  Menu, 
  X, 
  ArrowRight, 
  CreditCard, 
  Code, 
  LayoutDashboard, 
  ShoppingCart, 
  ChevronDown, 
  FileText, 
  Users, 
  Key, 
  Webhook, 
  Package, 
  Palette, 
  BookOpen, 
  Phone, 
  Activity,
  RefreshCw,
  Lock,
  Link as LinkIcon,
  Receipt,
  BarChart3,
  Settings,
  Globe,
  Terminal,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface MenuItem {
  icon: any;
  label: string;
  description: string;
  href: string;
  badge?: "FREE" | "NEW" | "PRO" | null;
}

interface MenuColumn {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

const megaMenus: Record<string, { columns: MenuColumn[] }> = {
  products: {
    columns: [
      {
        title: "Accept Payments",
        subtitle: "In-person and online payment solutions",
        items: [
          { icon: CreditCard, label: "Virtual Terminal", description: "Process cards in your browser", href: "/dashboard/virtual-terminal" },
          { icon: ShoppingCart, label: "Online Checkout", description: "Secure hosted checkout pages", href: "/checkout" },
          { icon: LinkIcon, label: "Payment Links", description: "Shareable payment URLs", href: "/dashboard/payment-links" },
          { icon: Receipt, label: "Invoicing", description: "Send professional invoices", href: "/dashboard/invoicing" },
        ],
        ctaLabel: "View all payment features",
        ctaHref: "/demo"
      },
      {
        title: "Manage Business",
        subtitle: "Tools to run your business",
        items: [
          { icon: Users, label: "Customer Vault", description: "Store payment methods securely", href: "/dashboard/customer-vault" },
          { icon: RefreshCw, label: "Recurring Billing", description: "Subscriptions & payment plans", href: "/dashboard/recurring-billing" },
          { icon: Package, label: "Product Catalog", description: "Manage products & inventory", href: "/products", badge: "FREE" },
          { icon: Palette, label: "Brand Studio", description: "White-label your checkout", href: "/brand-studio", badge: "PRO" },
        ],
        ctaLabel: "Explore business tools",
        ctaHref: "/products"
      },
      {
        title: "Protect & Analyze",
        subtitle: "Security and insights",
        items: [
          { icon: Lock, label: "Fraud Prevention", description: "Real-time fraud detection", href: "/dashboard/fraud-prevention" },
          { icon: BarChart3, label: "Analytics", description: "Revenue & performance insights", href: "/dashboard/analytics" },
          { icon: Shield, label: "Security Suite", description: "PCI compliance & encryption", href: "/demo" },
          { icon: Activity, label: "Dispute Management", description: "Handle chargebacks efficiently", href: "/dashboard/dispute-management" },
        ],
        ctaLabel: "View security features",
        ctaHref: "/demo"
      }
    ]
  },
  developers: {
    columns: [
      {
        title: "Get Started",
        subtitle: "Everything you need to integrate",
        items: [
          { icon: BookOpen, label: "Quick Start Guide", description: "Get up and running in minutes", href: "/developers", badge: "FREE" },
          { icon: Terminal, label: "API Reference", description: "Complete endpoint documentation", href: "/developers" },
          { icon: Code, label: "SDKs & Libraries", description: "Code samples in every language", href: "/developers" },
        ],
        ctaLabel: "Read the docs",
        ctaHref: "/developers"
      },
      {
        title: "Build & Test",
        subtitle: "Developer tools",
        items: [
          { icon: Key, label: "API Keys", description: "Manage your credentials", href: "/dashboard/api-keys" },
          { icon: Webhook, label: "Webhooks", description: "Real-time event notifications", href: "/dashboard/webhooks" },
          { icon: Globe, label: "Sandbox", description: "Test in a safe environment", href: "/demo" },
        ],
        ctaLabel: "Get API keys",
        ctaHref: "/dashboard/api-keys"
      },
      {
        title: "Learn More",
        subtitle: "Resources & support",
        items: [
          { icon: FileText, label: "Changelog", description: "Latest updates & releases", href: "/developers" },
          { icon: Users, label: "Community", description: "Connect with other developers", href: "/developers" },
          { icon: Zap, label: "System Status", description: "Uptime & incident history", href: "/" },
        ],
        ctaLabel: "View status page",
        ctaHref: "/"
      }
    ]
  },
  resources: {
    columns: [
      {
        title: "Support",
        subtitle: "Get help when you need it",
        items: [
          { icon: Users, label: "Help Center", description: "FAQs and tutorials", href: "/" },
          { icon: Phone, label: "Contact Sales", description: "Talk to our team", href: "/" },
          { icon: Activity, label: "System Status", description: "Uptime and incidents", href: "/" },
        ],
        ctaLabel: "Get support",
        ctaHref: "/"
      },
      {
        title: "Company",
        subtitle: "Learn about SwipesBlue",
        items: [
          { icon: Globe, label: "About Us", description: "Our mission and story", href: "/" },
          { icon: FileText, label: "Blog", description: "News and updates", href: "/" },
          { icon: Users, label: "Careers", description: "Join our team", href: "/" },
        ],
        ctaLabel: "Learn more",
        ctaHref: "/"
      }
    ]
  }
};

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "FREE":
        return "bg-swipes-trusted-green text-white";
      case "NEW":
        return "bg-swipes-gold text-black";
      case "PRO":
        return "bg-swipes-blue-deep text-white";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      {activeMenu && (
        <div
          className="fixed inset-0 top-16 bg-black/5 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setActiveMenu(null)}
        />
      )}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
        data-testid="header"
        ref={menuRef}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-logo-home">
          <Logo showIcon variant="default" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Products dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 text-[15px] font-medium rounded-[7px] ${
                activeMenu === 'products' ? "text-swipes-blue-deep bg-gray-50" : "text-gray-600"
              }`}
              data-testid="button-nav-products"
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Developers dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('developers')}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 text-[15px] font-medium rounded-[7px] ${
                activeMenu === 'developers' ? "text-swipes-blue-deep bg-gray-50" : "text-gray-600"
              }`}
              data-testid="button-nav-developers"
            >
              Developers
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === 'developers' ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Pricing link */}
          <Link href="/pricing" data-testid="link-nav-pricing">
            <Button
              variant="ghost"
              size="sm"
              className={`text-[15px] font-medium rounded-[7px] ${
                location === '/pricing' ? "text-swipes-blue-deep bg-gray-50" : "text-gray-600"
              }`}
              data-testid="button-nav-pricing"
            >
              Pricing
            </Button>
          </Link>

          {/* Resources dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 text-[15px] font-medium rounded-[7px] ${
                activeMenu === 'resources' ? "text-swipes-blue-deep bg-gray-50" : "text-gray-600"
              }`}
              data-testid="button-nav-resources"
            >
              Resources
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/admin" className="flex items-center" data-testid="link-sign-in">
            <span 
              className="text-[15px] font-medium text-gray-600"
            >
              Sign in
            </span>
          </Link>
          <Link href="/dashboard" className="flex items-center" data-testid="link-dashboard">
            <Button 
              variant="outline"
              className="border-2 border-swipes-teal text-swipes-teal rounded-[7px]"
              data-testid="button-dashboard"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/shoppingcart" className="flex items-center" data-testid="link-get-started">
            <Button 
              className="bg-swipes-blue-deep text-white rounded-[7px]"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mega Menu Dropdowns */}
      {activeMenu && megaMenus[activeMenu] && (
        <div 
          className="absolute left-0 right-0 bg-white border-t border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
          data-testid={`mega-menu-${activeMenu}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`grid gap-8 ${megaMenus[activeMenu].columns.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {megaMenus[activeMenu].columns.map((column, colIndex) => (
                <div key={colIndex} className={colIndex > 0 ? "border-l border-gray-100 pl-8" : ""}>
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      {column.title}
                    </h3>
                    {column.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">{column.subtitle}</p>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {column.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <li key={itemIndex}>
                          <Link href={item.href} onClick={() => setActiveMenu(null)} data-testid={`link-mega-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            <div className="flex items-start gap-3 p-3 rounded-[7px] cursor-pointer">
                              <div className="flex-shrink-0 w-10 h-10 rounded-[7px] bg-swipes-blue-deep/5 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-swipes-blue-deep" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getBadgeStyles(item.badge)}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {column.ctaLabel && column.ctaHref && (
                    <Link href={column.ctaHref} onClick={() => setActiveMenu(null)} data-testid={`link-mega-menu-cta-${column.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span className="inline-flex items-center text-sm font-medium text-swipes-blue-deep underline mt-4">
                        {column.ctaLabel}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden py-4 border-t border-gray-100 bg-white shadow-lg">
          <nav className="flex flex-col gap-1 px-4">
            <Link href="/demo" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-products">
              <span className="block py-3 px-4 text-[15px] font-medium text-gray-600 rounded-[7px]">Products</span>
            </Link>
            <Link href="/developers" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-developers">
              <span className="block py-3 px-4 text-[15px] font-medium text-gray-600 rounded-[7px]">Developers</span>
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-pricing">
              <span className="block py-3 px-4 text-[15px] font-medium text-gray-600 rounded-[7px]">Pricing</span>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-dashboard">
              <span className="block py-3 px-4 text-[15px] font-medium text-gray-600 rounded-[7px]">Dashboard</span>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-sign-in">
                <span className="block py-3 px-4 text-[15px] font-medium text-gray-600">Sign in</span>
              </Link>
              <Link href="/shoppingcart" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-get-started">
                <Button className="w-full bg-swipes-blue-deep text-white rounded-[7px]" data-testid="button-mobile-get-started">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
