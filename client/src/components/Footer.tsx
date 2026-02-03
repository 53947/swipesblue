import { Link } from "wouter";
import Logo from "@/components/Logo";
import { ExternalLink, ArrowRight } from "lucide-react";
import triadBlueIcon from "@assets/Final_Master_Triad_Blue_Icon_1770041420368.png";
import swipesBlueIcon from "@assets/swipesblue_logo_1769971645259.png";
import hostsBlueIcon from "@assets/HostsBlue_Logo_1770042263409.png";
import businessBlueprintIcon from "@assets/1-Master_business_blueprint_icon_1770041450074.png";

const footerSections = {
  products: {
    title: "Products",
    links: [
      { label: "Virtual Terminal", href: "/demo" },
      { label: "Online Checkout", href: "/checkout" },
      { label: "Payment Links", href: "/demo" },
      { label: "Invoicing", href: "/demo" },
      { label: "Recurring Billing", href: "/demo" },
      { label: "Customer Vault", href: "/demo" },
      { label: "Fraud Prevention", href: "/demo" },
    ],
  },
  developers: {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/developers" },
      { label: "API Reference", href: "/developers" },
      { label: "API Keys", href: "/dashboard/api-keys" },
      { label: "Webhooks", href: "/dashboard/webhooks" },
      { label: "SDKs & Libraries", href: "/developers" },
      { label: "System Status", href: "/" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Contact Sales", href: "/" },
      { label: "Help Center", href: "/" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and description - spans 4 columns on desktop */}
          <div className="col-span-2 md:col-span-4 lg:pr-8">
            <div className="mb-6">
              <Logo showIcon variant="default" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Payment infrastructure for ambitious businesses. Accept payments, manage subscriptions, and grow your business with lower fees and real-time analytics.
            </p>
            
            {/* Rate highlight */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-swipes-blue-deep/5 rounded-[7px]">
              <span className="text-lg font-bold text-swipes-blue-deep">2.70% + $0.30</span>
              <span className="text-xs text-gray-500">per transaction</span>
            </div>
          </div>

          {/* Products column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              {footerSections.products.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.products.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-500 text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              {footerSections.developers.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.developers.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-500 text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              {footerSections.company.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.company.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-gray-500 text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms column - Triad Blue Ecosystem */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-sm text-gray-900 mb-4">
              Platforms
            </h4>
            <ul className="space-y-4">
              {/* Triad Blue - Parent Company */}
              <li>
                <a 
                  href="https://triadblue.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  data-testid="link-footer-platform-triadblue-com"
                >
                  <img src={triadBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#1844A6", fontSize: "12px" }}>triad</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#1844A6", fontSize: "12px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              </li>
              
              {/* SwipesBlue - Current */}
              <li>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2"
                  data-testid="link-footer-platform-swipesblue-com"
                >
                  <img src={swipesBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#374151", fontSize: "12px" }}>swipes</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "12px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
                  </span>
                </Link>
              </li>
              
              {/* HostsBlue */}
              <li>
                <a 
                  href="https://hostsblue.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  data-testid="link-footer-platform-hostsblue-com"
                >
                  <img src={hostsBlueIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#008060", fontSize: "12px" }}>hosts</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "12px" }}>blue</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.com</span>
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
                  className="inline-flex items-center gap-2"
                  data-testid="link-footer-platform-businessblueprint-io"
                >
                  <img src={businessBlueprintIcon} alt="" className="h-5 w-auto" />
                  <span className="flex items-baseline">
                    <span className="font-archivo-semi-expanded font-bold lowercase" style={{ color: "#F97316", fontSize: "12px" }}>business</span>
                    <span className="font-archivo-narrow font-bold lowercase" style={{ color: "#0000FF", fontSize: "12px" }}>blueprint</span>
                    <span className="font-archivo font-bold lowercase" style={{ color: "#10B981", fontSize: "12px" }}>.io</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SwipesBlue, Inc. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link href="/" data-testid="link-footer-terms">
                <span className="text-gray-500 text-sm">
                  Terms of Service
                </span>
              </Link>
              <Link href="/" data-testid="link-footer-privacy">
                <span className="text-gray-500 text-sm">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/" data-testid="link-footer-cookies">
                <span className="text-gray-500 text-sm">
                  Cookie Settings
                </span>
              </Link>
              <Link href="/admin" data-testid="link-footer-admin">
                <span className="text-gray-400 text-sm">
                  Admin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
