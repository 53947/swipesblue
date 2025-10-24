import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/transactions", label: "Transactions" },
  { path: "/products", label: "Products" },
  { path: "/orders", label: "Orders" },
  { path: "/shoppingcart", label: "shoppingcart" },
  { path: "/checkout", label: "checkout" },
  { path: "/brand-studio", label: "Brand Studio" },
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
              const isCartOrCheckout = item.path === "/shoppingcart" || item.path === "/checkout";
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <span className={`flex items-center gap-0 text-base transition-opacity hover:opacity-70 ${
                    isActive ? 'font-medium' : ''
                  }`}>
                    {isCartOrCheckout && (
                      <span style={{ color: "#00FF40" }}>/</span>
                    )}
                    <span style={{ color: "#09080e" }}>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/shoppingcart">
              <Button size="icon" variant="ghost" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
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
                const isCartOrCheckout = item.path === "/shoppingcart" || item.path === "/checkout";
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-0">
                      {isCartOrCheckout && (
                        <span style={{ color: "#00FF40" }}>/</span>
                      )}
                      <span style={{ color: "#09080e" }}>{item.label}</span>
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
