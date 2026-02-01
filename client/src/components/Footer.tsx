import { Link } from "wouter";
import Logo from "@/components/Logo";

const footerLinks = {
  products: [
    { label: "Payments", href: "/demo" },
    { label: "E-commerce", href: "/products" },
    { label: "Terminal", href: "/demo" },
    { label: "Invoicing", href: "/demo" },
  ],
  developers: [
    { label: "Documentation", href: "/dashboard" },
    { label: "API Reference", href: "/admin/api-keys" },
    { label: "Webhooks", href: "/admin/webhooks" },
    { label: "Status", href: "/" },
  ],
  company: [
    { label: "About", href: "/" },
    { label: "Customers", href: "/" },
    { label: "Partners", href: "/" },
    { label: "Blog", href: "/" },
  ],
  support: [
    { label: "Help Center", href: "/" },
    { label: "Contact Sales", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#F6F9FC] border-t border-gray-200" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-0">
          {/* Logo and tagline */}
          <div className="col-span-2 pr-8">
            <div className="mb-6">
              <Logo showIcon variant="default" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Financial infrastructure for the internet. Accept payments, send payouts, and manage your business online.
            </p>
          </div>

          {/* Products */}
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-product-${link.label.toLowerCase()}`}>
                    <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Developers
            </h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-developer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-company-${link.label.toLowerCase()}`}>
                    <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-support-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SwipesBlue, Inc.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" data-testid="link-footer-terms">
                <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                  Terms
                </span>
              </Link>
              <Link href="/" data-testid="link-footer-privacy">
                <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                  Privacy
                </span>
              </Link>
              <Link href="/" data-testid="link-footer-cookies">
                <span className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                  Cookies
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
