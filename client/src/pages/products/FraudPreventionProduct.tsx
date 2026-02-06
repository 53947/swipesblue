import { Shield, Lock, Activity, Eye, Zap, AlertTriangle } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import ProductCTA from "@/components/products/ProductCTA";
import { Check } from "lucide-react";

export default function FraudPreventionProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Fraud Prevention"
        title="Stop fraud before it costs you"
        subtitle="Real-time fraud detection with customizable rules, velocity checks, and machine learning scoring. Protect your revenue without blocking good customers."
        primaryCTA={{ label: "Get Protected", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={Shield}
      />

      <FeatureCards
        heading="Multi-layered protection"
        subheading="Combine automated detection with custom rules to block fraud while approving legitimate transactions"
        cards={[
          {
            icon: Zap,
            title: "Real-Time Scoring",
            description: "Every transaction is scored for fraud risk in real time. High-risk transactions are flagged or blocked automatically.",
          },
          {
            icon: Activity,
            title: "Velocity Checks",
            description: "Detect rapid-fire transaction attempts from the same card, IP address, or device fingerprint.",
          },
          {
            icon: Eye,
            title: "Custom Rules Engine",
            description: "Create your own fraud rules based on amount thresholds, geographic restrictions, card types, and more.",
          },
          {
            icon: Lock,
            title: "AVS & CVV Verification",
            description: "Automatically verify billing addresses and CVV codes. Decline mismatches before they become chargebacks.",
          },
          {
            icon: AlertTriangle,
            title: "Chargeback Alerts",
            description: "Get notified immediately when a dispute is filed. Respond faster to protect your merchant account.",
          },
          {
            icon: Shield,
            title: "3D Secure Support",
            description: "Shift liability for fraudulent transactions with 3D Secure authentication. Support for 3DS2 on all major card networks.",
          },
        ]}
      />

      <DeepDiveSection
        heading="Protect your business, not just your transactions"
        description="Fraud prevention isn't just about blocking bad transactions — it's about maintaining a healthy merchant account, reducing chargebacks, and keeping your processing rates low."
        bulletPoints={[
          "Reduce chargebacks by up to 80% with proactive detection",
          "Maintain low dispute ratios to protect your merchant account",
          "Block known fraudulent BINs and card ranges",
          "Geographic restrictions to limit transactions by country",
          "Device fingerprinting to identify repeat offenders",
        ]}
        icon={Shield}
      />

      {/* Capabilities list */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
              Comprehensive fraud tools
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Layer multiple detection methods for maximum protection with minimal false positives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Real-time transaction risk scoring",
              "AVS (Address Verification Service)",
              "CVV/CVC verification",
              "Velocity and frequency limits",
              "IP geolocation and blocking",
              "BIN-level card validation",
              "3D Secure 2.0 authentication",
              "Custom rule builder with AND/OR logic",
              "Transaction amount thresholds",
              "Duplicate transaction detection",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-3">
                <Check className="h-5 w-5 text-[#1844A6] flex-shrink-0 mt-0.5" />
                <span className="text-[#4B5563]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Configure your rules",
            description: "Set up fraud rules, thresholds, and geographic restrictions from the dashboard. Start with our recommended defaults.",
          },
          {
            title: "Transactions are screened",
            description: "Every payment is checked against your rules and scored for risk in real time, adding less than 50ms to processing.",
          },
          {
            title: "Take action automatically",
            description: "High-risk transactions are declined, flagged for review, or approved based on your configured actions.",
          },
        ]}
      />

      <ProductCTA
        heading="Protect your revenue"
        description="Set up fraud prevention in minutes. Start blocking fraudulent transactions while approving legitimate customers."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
