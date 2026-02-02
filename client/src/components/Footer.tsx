import { Link } from "wouter";
import Logo from "@/components/Logo";
import { ExternalLink } from "lucide-react";
import triadBlueIcon from "@assets/Final_Master_Triad_Blue_Icon_1770041420368.png";
import swipesBlueIcon from "@assets/swipesblue_logo_1769971645259.png";
import hostsBlueIcon from "@assets/HostsBlue_Logo_1770042263409.png";
import businessBlueprintIcon from "@assets/1-Master_business_blueprint_icon_1770041450074.png";

const footerLinks = {
  products: [
    { label: "Payments", href: "/demo" },
    { label: "E-commerce Suite", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  developers: [
    { label: "Documentation", href: "/dashboard" },
    { label: "API Keys", href: "/dashboard/api-keys" },
    { label: "Webhooks", href: "/dashboard/webhooks" },
    { label: "Status", href: "/" },
  ],
  support: [
    { label: "Help Center", href: "/" },
    { label: "Contact Sales", href: "/" },
    { label: "About", href: "/" },
    { label: "Blog", href: "/" },
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
              Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity.
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
                  <Link href={link.href} data-testid={`link-footer-product-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
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

          {/* Platforms - Triad Blue Ecosystem */}
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Platforms
            </h4>
            <ul className="space-y-3">
              {/* Triad Blue - Parent Company */}
              <li>
                <a 
                  href="https://triadblue.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group"
                  data-testid="link-footer-platform-triadblue-com"
                >
                  <img src={triadBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#1844A6", fontSize: "13px" }}>triad</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#1844A6", fontSize: "13px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "13px" }}>.com</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              </li>
              {/* SwipesBlue */}
              <li>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 group"
                  data-testid="link-footer-platform-swipesblue-com"
                >
                  <img src={swipesBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#374151", fontSize: "13px" }}>swipes</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "13px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "13px" }}>.com</span>
                  </span>
                </Link>
              </li>
              {/* HostsBlue */}
              <li>
                <a 
                  href="https://hostsblue.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group"
                  data-testid="link-footer-platform-hostsblue-com"
                >
                  <img src={hostsBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#008060", fontSize: "13px" }}>hosts</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "13px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "13px" }}>.com</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              </li>
              {/* BusinessBlueprint */}
              <li>
                <a 
                  href="https://businessblueprint.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group"
                  data-testid="link-footer-platform-businessblueprint-io"
                >
                  <img src={businessBlueprintIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#F97316", fontSize: "13px" }}>business</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "13px" }}>blueprint</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "13px" }}>.io</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              </li>
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
              <Link href="/admin" data-testid="link-footer-admin">
                <span className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
                  Site Admin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
