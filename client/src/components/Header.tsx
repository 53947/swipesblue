import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { ShoppingCart as CartIcon, Menu, CreditCard, Palette, Home as HomeIcon, LayoutDashboard, Receipt, Package, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  path: string;
  label: string;
  icon?: React.ElementType;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/transactions", label: "Transactions", icon: Receipt },
  { path: "/products", label: "Products", icon: Package },
  { path: "/orders", label: "Orders", icon: FileText },
  { path: "/shoppingcart", label: "shoppingcart", icon: CartIcon },
  { path: "/checkout", label: "checkout", icon: CreditCard },
  { path: "/brand-studio", label: "brand-studio", icon: Palette },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex-shrink-0">
            <Logo showIcon />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const isAppRoute = item.path === "/shoppingcart" || item.path === "/checkout" || item.path === "/brand-studio";
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <span className={`flex items-center gap-1.5 text-base transition-opacity hover:opacity-70 ${
                    isActive ? 'font-medium' : ''
                  }`}>
                    {Icon && <Icon className="h-4 w-4" style={{ color: isAppRoute ? "#00FF40" : "#09080e" }} />}
                    {isAppRoute && (
                      <span style={{ color: "#09080e" }}>/</span>
                    )}
                    <span style={{ color: isAppRoute ? "#00FF40" : "#09080e" }}>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/shoppingcart">
              <Button size="icon" variant="ghost" data-testid="button-cart">
                <CartIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isAppRoute = item.path === "/shoppingcart" || item.path === "/checkout" || item.path === "/brand-studio";
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-1.5">
                      {Icon && <Icon className="h-4 w-4" style={{ color: isAppRoute ? "#00FF40" : "#09080e" }} />}
                      {isAppRoute && (
                        <span style={{ color: "#09080e" }}>/</span>
                      )}
                      <span style={{ color: isAppRoute ? "#00FF40" : "#09080e" }}>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
