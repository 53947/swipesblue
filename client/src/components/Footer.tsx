import { Link } from "wouter";
import Logo from "@/components/Logo";

const footerLinks = {
  products: [
    { label: "Payments", href: "/demo" },
    { label: "E-commerce", href: "/products" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    { label: "Documentation", href: "/dashboard" },
    { label: "API Reference", href: "/admin/api-keys" },
    { label: "Support", href: "/" },
  ],
  company: [
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-swipes-teal text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo showIcon variant="small" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Built for businesses to grow. Simple payment processing for small businesses and developers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-product-${link.label.toLowerCase()}`}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-resource-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-company-${link.label.toLowerCase()}`}>
                    <span className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SwipesBlue, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" data-testid="link-footer-terms">
              <span className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms
              </span>
            </Link>
            <Link href="/" data-testid="link-footer-privacy">
              <span className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
