import { Link } from "wouter";
import { Shield, Lock, AlertTriangle, Eye, ArrowRight } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "PCI DSS Level 1",
    description:
      "swipesblue is built on NMI's PCI DSS Level 1 certified infrastructure — the highest level of payment security certification. Your customers' card data never touches your servers.",
  },
  {
    icon: Lock,
    title: "Encryption",
    description:
      "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). API keys are hashed and never stored in plain text.",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Prevention",
    description:
      "Built-in fraud detection with customizable rules, velocity checks, and real-time scoring. Available on all tiers.",
    link: "/products/fraud",
    linkText: "Learn about fraud prevention",
  },
  {
    icon: Eye,
    title: "Data Privacy",
    description:
      "We comply with applicable data protection regulations. See our Privacy Policy for details.",
    link: "/privacy",
    linkText: "Read our Privacy Policy",
  },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security & Compliance</h1>
          <p className="text-lg text-gray-600">
            How swipesblue protects your business and your customers.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="border border-gray-200 rounded-[7px] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-[7px] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#1844A6]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.description}</p>
                    {section.link && (
                      <Link href={section.link}>
                        <span className="text-sm font-medium text-[#1844A6] inline-flex items-center mt-3">
                          {section.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom links */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/terms" className="text-[#1844A6] font-medium hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[#1844A6] font-medium hover:underline">
              Privacy Policy
            </Link>
            <Link href="/acceptable-use" className="text-[#1844A6] font-medium hover:underline">
              Acceptable Use Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
