import { Building2, Globe, Shield, Server } from "lucide-react";

const ecosystemPlatforms = [
  {
    logo: "/images/logos/swipesblue-icon.png",
    domain: "swipesblue.com",
    descriptor: "payments",
    description:
      "The payment gateway you're on right now. Accept cards, manage transactions, send invoices, set up recurring billing, and prevent fraud — all through one clean dashboard backed by NMI's PCI DSS Level 1 certified infrastructure.",
    renderName: () => (
      <span className="text-lg font-semibold">
        <span style={{ color: "#374151" }}>swipes</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#374151" }}>.com</span>
      </span>
    ),
  },
  {
    logo: "/images/logos/hostsblue-icon.png",
    domain: "hostsblue.com",
    descriptor: "hosting",
    description:
      "Web hosting built for speed, uptime, and simplicity. From single-page sites to high-traffic applications, hostsblue provides the infrastructure your business runs on.",
    renderName: () => (
      <span className="text-lg font-semibold">
        <span style={{ color: "#008060" }}>hosts</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#008060" }}>.com</span>
      </span>
    ),
  },
  {
    logo: "/images/logos/businessblueprint-icon.png",
    domain: "businessblueprint.io",
    descriptor: "websites",
    description:
      "The operational platform for modern local businesses. Websites, local SEO, client management, content, reputation, and more — organized into purpose-built apps that turn decisions into execution.",
    renderName: () => (
      <span className="text-lg font-semibold">
        <span style={{ color: "#FF6B00" }}>business</span>
        <span style={{ color: "#0000FF" }}>blueprint</span>
        <span style={{ color: "#FF6B00" }}>.io</span>
      </span>
    ),
  },
  {
    logo: "/images/logos/scansblue-icon.png",
    domain: "scansblue.com",
    descriptor: "assessments",
    description:
      "The assessment engine that powers businessblueprint prescriptions. scansblue analyzes your online presence, brand consistency, local SEO health, and competitive landscape to identify exactly what needs attention and why.",
    renderName: () => (
      <span className="text-lg font-semibold">
        <span style={{ color: "#A00028" }}>scans</span>
        <span style={{ color: "#0000FF" }}>blue</span>
        <span style={{ color: "#A00028" }}>.com</span>
      </span>
    ),
  },
  {
    logo: "/images/logos/triadblue-icon.png",
    domain: "triadblue.com",
    descriptor: "parent company",
    description:
      "The company behind it all. triadblue builds and operates platforms that help businesses move from planning to progress.",
    renderName: () => (
      <span className="text-lg font-semibold">
        <span style={{ color: "#1844A6" }}>triad</span>
        <span style={{ color: "#1844A6" }}>blue</span>
        <span style={{ color: "#1844A6" }}>.com</span>
      </span>
    ),
    isTriadblue: true,
  },
];

const nmiStats = [
  { value: "5.8 billion+", label: "transactions powered annually" },
  { value: "99.99%", label: "uptime across the NMI network" },
  { value: "200+", label: "processor integrations worldwide" },
  { value: "Level 1", label: "PCI DSS certified — the highest security standard" },
];

const contacts = [
  { label: "General", email: "hello@swipesblue.com" },
  { label: "Sales", email: "sales@swipesblue.com" },
  { label: "Support", email: "support@swipesblue.com" },
  { label: "Compliance", email: "compliance@swipesblue.com" },
  { label: "Privacy", email: "privacy@swipesblue.com" },
];

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Hero */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About{" "}
          <span style={{ color: "#374151" }}>swipes</span>
          <span style={{ color: "#0000FF" }}>blue</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          swipesblue is a payment gateway platform built for small businesses and developers who need simple, transparent, and reliable payment processing. Built on NMI's globally certified payment infrastructure, swipesblue delivers enterprise-grade security and processing power at rates that make sense for growing businesses.
        </p>
        <p className="text-lg font-semibold text-gray-900">
          2.70% + $0.30 per transaction. No hidden fees. No surprises.
        </p>

        {/* Ecosystem Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">
          Part of the{" "}
          <span style={{ color: "#1844A6" }}>triad</span>
          <span style={{ color: "#1844A6" }}>blue</span>
          {" "}Ecosystem
        </h2>
        <p className="text-gray-600 leading-relaxed mb-10">
          swipesblue is part of a family of platforms designed to help businesses operate, grow, and succeed — each focused on doing one thing exceptionally well.
        </p>

        <div className="space-y-10">
          {ecosystemPlatforms.map((platform) => (
            <div key={platform.domain} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <img
                  src={platform.logo}
                  alt=""
                  className="h-8 w-8"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {platform.renderName()}
                  <span className="text-sm text-gray-400">— {platform.descriptor}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {platform.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">
          Our Infrastructure
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          swipesblue processes payments through NMI (Network Merchants, LLC), one of the most established payment gateway providers in the industry:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {nmiStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-gray-200 rounded-[7px] p-4"
            >
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed mb-2">
          Banking services provided by Merrick Bank, Member FDIC.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We're not a bank and we're not a processor. We're the platform layer that makes payment processing accessible, manageable, and affordable for businesses that have better things to do than fight with their payment gateway.
        </p>

        {/* Contact Section */}
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">
          Contact
        </h2>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.label} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-24">{contact.label}:</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {contact.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
