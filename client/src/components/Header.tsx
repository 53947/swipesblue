import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/demo", label: "Products" },
  { path: "/pricing", label: "Pricing" },
  { path: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0" data-testid="link-logo-home">
              <Logo showIcon variant="default" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = location === item.path;
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    <span className={`text-[15px] transition-colors hover:text-swipes-blue-deep ${
                      isActive ? "text-swipes-blue-deep font-medium" : "text-swipes-gray"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin">
              <span 
                className="text-[15px] text-swipes-gray hover:text-swipes-blue-deep transition-colors"
                data-testid="link-sign-in"
              >
                Sign in
              </span>
            </Link>
            <Link href="/shoppingcart">
              <Button 
                className="bg-swipes-red hover:bg-swipes-red/90 text-white px-5 shadow-sm hover:shadow-cta-glow transition-all"
                data-testid="button-get-started"
              >
                Get Started
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
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = location === item.path;
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                  >
                    <span className={`text-[15px] ${
                      isActive ? "text-swipes-blue-deep font-medium" : "text-swipes-gray"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-sign-in">
                  <span className="text-[15px] text-swipes-gray">Sign in</span>
                </Link>
                <Link href="/shoppingcart" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-get-started">
                  <Button className="w-full bg-swipes-red hover:bg-swipes-red/90 text-white" data-testid="button-mobile-get-started">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
