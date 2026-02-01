import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { Menu, X, ArrowRight, CreditCard, Code, LayoutDashboard, ShoppingCart, Zap, Shield, ChevronDown, FileText, Settings, Users, Key, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const megaMenus = {
  products: {
    columns: [
      {
        title: "Payments",
        items: [
          { icon: CreditCard, label: "Payment Processing", description: "Accept cards and digital wallets", href: "/demo" },
          { icon: ShoppingCart, label: "E-commerce", description: "Online store integration", href: "/products" },
          { icon: Zap, label: "Instant Payouts", description: "Fast access to your funds", href: "/demo" },
        ]
      },
      {
        title: "Business Tools",
        items: [
          { icon: LayoutDashboard, label: "Dashboard", description: "Monitor your business", href: "/dashboard" },
          { icon: FileText, label: "Invoicing", description: "Send and track invoices", href: "/demo" },
          { icon: Shield, label: "Fraud Protection", description: "Advanced security features", href: "/demo" },
        ]
      },
      {
        title: "Developer",
        items: [
          { icon: Code, label: "API", description: "Build custom integrations", href: "/admin/api-keys" },
          { icon: Webhook, label: "Webhooks", description: "Real-time event notifications", href: "/admin/webhooks" },
          { icon: Key, label: "API Keys", description: "Manage your credentials", href: "/admin/api-keys" },
        ]
      }
    ]
  },
  resources: {
    columns: [
      {
        title: "Documentation",
        items: [
          { icon: FileText, label: "Getting Started", description: "Quick start guide", href: "/dashboard" },
          { icon: Code, label: "API Reference", description: "Complete API docs", href: "/admin/api-keys" },
          { icon: Settings, label: "Integration Guides", description: "Step-by-step tutorials", href: "/demo" },
        ]
      },
      {
        title: "Support",
        items: [
          { icon: Users, label: "Contact Sales", description: "Talk to our team", href: "/" },
          { icon: Shield, label: "Help Center", description: "FAQs and support", href: "/" },
        ]
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
        {/* Left: Logo */}
        <Link href="/" className="flex items-center -mt-1.5" data-testid="link-logo-home">
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
      {activeMenu && megaMenus[activeMenu as keyof typeof megaMenus] && (
        <div 
          className="absolute left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-3 gap-8">
              {megaMenus[activeMenu as keyof typeof megaMenus].columns.map((column, colIndex) => (
                <div key={colIndex} className={colIndex > 0 ? "border-l border-gray-100 pl-8" : ""}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-1">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link href={item.href} onClick={() => setActiveMenu(null)}>
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-swipes-teal/10 to-swipes-blue-pure/10 flex items-center justify-center group-hover:from-swipes-teal/20 group-hover:to-swipes-blue-pure/20 transition-colors">
                              <item.icon className="h-5 w-5 text-swipes-teal" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 group-hover:text-swipes-blue-deep transition-colors">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
