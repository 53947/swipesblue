import { Link } from "wouter";

const footerSections = {
  products: {
    title: "Products",
    links: [
      { label: "Virtual Terminal", href: "/dashboard/virtual-terminal" },
      { label: "Online Checkout", href: "/checkout" },
      { label: "Payment Links", href: "/dashboard/payment-links" },
      { label: "Invoicing", href: "/dashboard/invoicing" },
      { label: "Recurring Billing", href: "/dashboard/recurring-billing" },
      { label: "Customer Vault", href: "/dashboard/customer-vault" },
      { label: "Fraud Prevention", href: "/dashboard/fraud-prevention" },
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
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Security", href: "/dashboard/security" },
      { label: "Compliance", href: "/dashboard/security" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Acceptable Use", href: "/acceptable-use" },
    ],
  },
};

const ecosystemPlatforms = [
  {
    name: "swipesblue",
    href: "/",
    isInternal: true,
    descriptor: "payments",
    renderBrand: () => (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <div className="w-4 h-4 rounded-full bg-[#374151]" />
        <span style={{ color: '#374151' }}>swipes</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#374151' }}>.com</span>
      </span>
    ),
  },
  {
    name: "hostsblue",
    href: "https://hostsblue.com",
    isInternal: false,
    descriptor: "hosting",
    renderBrand: () => (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <div className="w-4 h-4 rounded-full bg-[#008060]" />
        <span style={{ color: '#008060' }}>hosts</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#008060' }}>.com</span>
      </span>
    ),
  },
  {
    name: "businessblueprint",
    href: "https://businessblueprint.io",
    isInternal: false,
    descriptor: "websites",
    renderBrand: () => (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <div className="w-4 h-4 rounded-full bg-[#FF6B00]" />
        <span style={{ color: '#FF6B00' }}>business</span>
        <span style={{ color: '#0000FF' }}>blueprint</span>
        <span style={{ color: '#FF6B00' }}>.io</span>
      </span>
    ),
  },
  {
    name: "scansblue",
    href: "https://scansblue.com",
    isInternal: false,
    descriptor: "assessments",
    renderBrand: () => (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <div className="w-4 h-4 rounded-full bg-[#A00028]" />
        <span style={{ color: '#A00028' }}>scans</span>
        <span style={{ color: '#0000FF' }}>blue</span>
        <span style={{ color: '#A00028' }}>.com</span>
      </span>
    ),
  },
  {
    name: "triadblue",
    href: "https://triadblue.com",
    isInternal: false,
    descriptor: "parent company",
    renderBrand: () => (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <span style={{ color: '#1844A6' }}>triad</span>
        <div className="w-4 h-4 rounded-full bg-[#1844A6]" />
        <span style={{ color: '#1844A6' }}>blue</span>
        <span style={{ color: '#1844A6' }}>.com</span>
      </span>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200" data-testid="footer">
      {/* Top Section — 4-Column Link Grid */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-swipes-pro-gray hover:text-swipes-blue-deep transition-colors block py-1"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section — TriadBlue Ecosystem Brand Signatures */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-8">
          <p className="text-xs text-swipes-pro-gray uppercase tracking-wider mb-4 text-center">
            part of the triadblue ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {ecosystemPlatforms.map((platform) => (
              <div key={platform.name} className="flex flex-col items-center">
                {platform.isInternal ? (
                  <Link href={platform.href} data-testid={`link-footer-platform-${platform.name}`}>
                    {platform.renderBrand()}
                  </Link>
                ) : (
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-footer-platform-${platform.name}`}
                  >
                    {platform.renderBrand()}
                  </a>
                )}
                <span className="text-xs text-gray-400 text-center mt-1">
                  {platform.descriptor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section — Copyright Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            © 2026 swipesblue, inc. all rights reserved.
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-swipes-pro-gray transition-colors" data-testid="link-footer-terms">
              terms of service
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-swipes-pro-gray transition-colors" data-testid="link-footer-privacy">
              privacy policy
            </Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-swipes-pro-gray transition-colors" data-testid="link-footer-cookies">
              cookie settings
            </Link>
            <span>·</span>
            <Link href="/acceptable-use" className="hover:text-swipes-pro-gray transition-colors" data-testid="link-footer-acceptable-use">
              acceptable use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
