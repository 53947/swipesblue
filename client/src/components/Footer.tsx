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
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Sales", href: "mailto:sales@swipesblue.com" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Security", href: "/dashboard/security" },
      { label: "Compliance", href: "/dashboard/security" },
      { label: "System Status", href: "/" },
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
      <div className="flex items-center gap-2">
        <img src="/images/logos/swipesblue-icon.png" alt="" className="h-5 w-5" />
        <span className="text-sm font-semibold">
          <span style={{ color: '#374151' }}>swipes</span>
          <span style={{ color: '#0000FF' }}>blue</span>
          <span style={{ color: '#374151' }}>.com</span>
        </span>
      </div>
    ),
  },
  {
    name: "hostsblue",
    href: "https://hostsblue.com",
    isInternal: false,
    descriptor: "hosting",
    renderBrand: () => (
      <div className="flex items-center gap-2">
        <img src="/images/logos/hostsblue-icon.png" alt="" className="h-5 w-5" />
        <span className="text-sm font-semibold">
          <span style={{ color: '#008060' }}>hosts</span>
          <span style={{ color: '#0000FF' }}>blue</span>
          <span style={{ color: '#008060' }}>.com</span>
        </span>
      </div>
    ),
  },
  {
    name: "businessblueprint",
    href: "https://businessblueprint.io",
    isInternal: false,
    descriptor: "websites",
    renderBrand: () => (
      <div className="flex items-center gap-2">
        <img src="/images/logos/businessblueprint-icon.png" alt="" className="h-5 w-5" />
        <span className="text-sm font-semibold">
          <span style={{ color: '#FF6B00' }}>business</span>
          <span style={{ color: '#0000FF' }}>blueprint</span>
          <span style={{ color: '#FF6B00' }}>.io</span>
        </span>
      </div>
    ),
  },
  {
    name: "scansblue",
    href: "https://scansblue.com",
    isInternal: false,
    descriptor: "assessments",
    renderBrand: () => (
      <div className="flex items-center gap-2">
        <img src="/images/logos/scansblue-icon.png" alt="" className="h-5 w-5" />
        <span className="text-sm font-semibold">
          <span style={{ color: '#A00028' }}>scans</span>
          <span style={{ color: '#0000FF' }}>blue</span>
          <span style={{ color: '#A00028' }}>.com</span>
        </span>
      </div>
    ),
  },
  {
    name: "triadblue",
    href: "https://triadblue.com",
    isInternal: false,
    descriptor: "parent company",
    renderBrand: () => (
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold" style={{ color: '#1844A6' }}>triad</span>
        <img src="/images/logos/triadblue-icon.png" alt="" className="h-5 w-5" />
        <span className="text-sm font-semibold">
          <span style={{ color: '#1844A6' }}>blue</span>
          <span style={{ color: '#1844A6' }}>.com</span>
        </span>
      </div>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200" data-testid="footer">
      {/* Top Section — 4-Column Link Grid with Dividers */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {/* Column 1: Products */}
          <div className="pr-8 border-r border-gray-200">
            <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4">
              {footerSections.products.title}
            </h4>
            <ul>
              {footerSections.products.links.map((link) => (
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

          {/* Column 2: Developers */}
          <div className="px-8 border-r border-gray-200">
            <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4">
              {footerSections.developers.title}
            </h4>
            <ul>
              {footerSections.developers.links.map((link) => (
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

          {/* Column 3: Company + Resources */}
          <div className="px-8 border-r border-gray-200">
            <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4">
              {footerSections.company.title}
            </h4>
            <ul>
              {footerSections.company.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-sm text-swipes-pro-gray hover:text-swipes-blue-deep transition-colors block py-1"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-swipes-pro-gray hover:text-swipes-blue-deep transition-colors block py-1"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4 mt-6">
              {footerSections.resources.title}
            </h4>
            <ul>
              {footerSections.resources.links.map((link) => (
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

          {/* Column 4: TriadBlue Ecosystem */}
          <div className="pl-8">
            <h4 className="text-sm font-semibold text-swipes-black uppercase tracking-wider mb-4">
              triadblue ecosystem
            </h4>
            <div className="flex flex-col gap-4">
              {ecosystemPlatforms.map((platform) => (
                <div key={platform.name}>
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
                  <span className="text-xs text-gray-400 ml-7">
                    {platform.descriptor}
                  </span>
                </div>
              ))}
            </div>
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
            <span>·</span>
            <Link href="/admin/login" className="hover:text-swipes-pro-gray transition-colors" data-testid="link-footer-admin-login">
              admin login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
