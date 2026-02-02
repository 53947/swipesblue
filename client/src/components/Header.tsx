import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { Menu, X, ArrowRight, CreditCard, Code, LayoutDashboard, ShoppingCart, ChevronDown, FileText, Settings, Users, Key, Webhook, Package, Palette, Mail, BookOpen, Phone, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

type BadgeType = "FREE" | "NEW" | "PRO" | null;

interface MenuItem {
  icon: any;
  label: string;
  description: string;
  href: string;
  badge?: BadgeType;
  price?: string;
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
        title: "E-Commerce Suite",
        subtitle: "Everything you need to sell online",
        items: [
          { icon: Package, label: "Product Catalog", description: "List and manage products", href: "/products", badge: "FREE" },
          { icon: ShoppingCart, label: "Shopping Cart", description: "Add to cart, update qty", href: "/shoppingcart", badge: "FREE" },
          { icon: CreditCard, label: "Checkout", description: "Secure payment processing", href: "/checkout", badge: "FREE" },
          { icon: LayoutDashboard, label: "Order Management", description: "Track and fulfill orders", href: "/orders", badge: "FREE" },
          { icon: Palette, label: "Brand Studio", description: "White-label your checkout", href: "/brand-studio", badge: "PRO", price: "$79/mo" },
          { icon: Mail, label: "Abandoned Cart Recovery", description: "Recover lost sales", href: "/demo", badge: "NEW", price: "From $29/mo" },
        ],
        ctaLabel: "View All E-Commerce Features",
        ctaHref: "/demo"
      },
      {
        title: "Developer Tools",
        subtitle: "Build custom payment integrations",
        items: [
          { icon: Code, label: "Payment API", description: "Accept payments anywhere", href: "/developers", price: "2.70% + $0.30" },
          { icon: Webhook, label: "Webhooks", description: "Real-time event notifications", href: "/dashboard/webhooks" },
          { icon: Key, label: "API Keys", description: "Manage your credentials", href: "/dashboard/api-keys" },
          { icon: BookOpen, label: "Documentation", description: "API reference & guides", href: "/developers", badge: "FREE" },
        ],
        ctaLabel: "View API Documentation",
        ctaHref: "/developers"
      }
    ]
  },
  resources: {
    columns: [
      {
        title: "Documentation",
        subtitle: "Learn how to integrate SwipesBlue",
        items: [
          { icon: BookOpen, label: "Getting Started", description: "Quick start guide", href: "/docs/getting-started", badge: "FREE" },
          { icon: Code, label: "API Reference", description: "Complete API docs", href: "/docs/api" },
          { icon: Settings, label: "Integration Guides", description: "Step-by-step tutorials", href: "/docs/guides" },
        ],
        ctaLabel: "Browse All Docs",
        ctaHref: "/docs"
      },
      {
        title: "Support",
        subtitle: "Get help when you need it",
        items: [
          { icon: Users, label: "Help Center", description: "FAQs and tutorials", href: "/support" },
          { icon: Phone, label: "Contact Sales", description: "Talk to our team", href: "/contact" },
          { icon: Activity, label: "System Status", description: "Uptime and incidents", href: "/status" },
        ],
        ctaLabel: "Get Support",
        ctaHref: "/support"
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

  return (
    <header 
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
      data-testid="header"
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo Icon + Company Name */}
        <Link href="/" className="flex items-center" data-testid="link-logo-home">
          <Logo showIcon variant="default" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Products dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-[15px] transition-colors rounded-md hover:bg-gray-50 ${
                activeMenu === 'products' ? "text-swipes-blue-deep" : "text-swipes-gray"
              }`}
              data-testid="button-nav-products"
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Pricing link */}
          <Link href="/pricing" data-testid="link-nav-pricing">
            <span className={`px-4 py-2 text-[15px] transition-colors rounded-md hover:bg-gray-50 inline-block ${
              location === '/pricing' ? "text-swipes-blue-deep font-medium" : "text-swipes-gray"
            }`}>
              Pricing
            </span>
          </Link>

          {/* Resources dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-[15px] transition-colors rounded-md hover:bg-gray-50 ${
                activeMenu === 'resources' ? "text-swipes-blue-deep" : "text-swipes-gray"
              }`}
              data-testid="button-nav-resources"
            >
              Resources
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Dashboard link */}
          <Link href="/dashboard" data-testid="link-nav-dashboard">
            <span className={`px-4 py-2 text-[15px] transition-colors rounded-md hover:bg-gray-50 inline-block ${
              location === '/dashboard' ? "text-swipes-blue-deep font-medium" : "text-swipes-gray"
            }`}>
              Dashboard
            </span>
          </Link>
        </nav>

        {/* Right: Sign in + Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin" className="flex items-center">
            <span 
              className="text-[15px] text-swipes-gray hover:text-swipes-blue-deep transition-colors"
              data-testid="link-sign-in"
            >
              Sign in
            </span>
          </Link>
          <Link href="/shoppingcart" className="flex items-center">
            <Button 
              className="group bg-swipes-teal hover:bg-swipes-teal/90 text-white px-5 shadow-sm hover:shadow-cta-glow transition-all justify-center"
              data-testid="button-get-started"
            >
              <span className="flex items-center">
                Get Started
                <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mega Menu Dropdowns */}
      {activeMenu && megaMenus[activeMenu] && (
        <div 
          className="absolute left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`grid gap-8 ${activeMenu === 'products' ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {megaMenus[activeMenu].columns.map((column, colIndex) => (
                <div key={colIndex} className={colIndex > 0 ? "border-l border-gray-200 pl-8" : ""}>
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-swipes-black uppercase tracking-wider">
                      {column.title}
                    </h3>
                    {column.subtitle && (
                      <p className="text-sm text-swipes-pro-gray mt-1">{column.subtitle}</p>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {column.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <li key={itemIndex}>
                          <Link href={item.href} onClick={() => setActiveMenu(null)}>
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-swipes-blue-deep/10 to-swipes-teal/10 flex items-center justify-center group-hover:from-swipes-blue-deep/20 group-hover:to-swipes-teal/20 transition-colors">
                                <Icon className="h-5 w-5 text-swipes-blue-deep" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-swipes-blue-deep transition-colors">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                      item.badge === 'FREE' ? 'bg-swipes-trusted-green text-white' :
                                      item.badge === 'NEW' ? 'bg-swipes-gold text-black' :
                                      item.badge === 'PRO' ? 'bg-swipes-blue-deep text-white' : ''
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.description}
                                </div>
                                {item.price && (
                                  <div className="text-xs text-swipes-pro-gray mt-1">{item.price}</div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {column.ctaLabel && column.ctaHref && (
                    <Link href={column.ctaHref} onClick={() => setActiveMenu(null)}>
                      <span className="inline-flex items-center text-sm font-medium text-swipes-blue-deep hover:underline mt-4">
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
        <div className="md:hidden py-4 border-t border-gray-100 bg-white">
          <nav className="flex flex-col gap-2 px-4">
            <Link href="/demo" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-products">
              <span className="block py-2 text-[15px] text-swipes-gray">Products</span>
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-pricing">
              <span className="block py-2 text-[15px] text-swipes-gray">Pricing</span>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-nav-dashboard">
              <span className="block py-2 text-[15px] text-swipes-gray">Dashboard</span>
            </Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-sign-in">
                <span className="text-[15px] text-swipes-gray">Sign in</span>
              </Link>
              <Link href="/shoppingcart" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-get-started">
                <Button className="w-full bg-swipes-teal hover:bg-swipes-teal/90 text-white" data-testid="button-mobile-get-started">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
