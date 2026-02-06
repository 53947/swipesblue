import { CreditCard, Monitor, Globe, Clock, Shield, Zap } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import ProductCTA from "@/components/products/ProductCTA";
import { Check } from "lucide-react";

export default function VirtualTerminalProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Virtual Terminal"
        title="Process payments from any browser"
        subtitle="Accept credit cards, debit cards, and ACH payments without any hardware. Key in transactions from your computer, tablet, or phone — anywhere you have internet."
        primaryCTA={{ label: "Start Processing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={CreditCard}
      />

      <FeatureCards
        heading="Built for flexibility"
        subheading="Everything you need to accept payments without a card reader"
        cards={[
          {
            icon: Monitor,
            title: "Browser-Based",
            description: "No software to install, no hardware to buy. Process payments from any modern web browser on any device.",
          },
          {
            icon: Globe,
            title: "Accept Payments Anywhere",
            description: "Take phone orders, mail orders, or in-person payments. Process cards from wherever your business operates.",
          },
          {
            icon: Clock,
            title: "Real-Time Processing",
            description: "Transactions process in under 100ms. Get instant authorization responses and real-time receipt delivery.",
          },
          {
            icon: Shield,
            title: "PCI-Compliant",
            description: "All card data is encrypted and tokenized automatically. You never store raw card numbers on your systems.",
          },
          {
            icon: Zap,
            title: "Quick-Charge Mode",
            description: "Save customer cards on file for repeat transactions. Charge returning customers in two clicks.",
          },
          {
            icon: CreditCard,
            title: "Multi-Card Support",
            description: "Accept Visa, Mastercard, American Express, Discover, and ACH bank transfers — all from one terminal.",
          },
        ]}
      />

      <DeepDiveSection
        heading="What you can do"
        description="The swipesblue virtual terminal gives your team the tools to handle any payment scenario without specialized hardware."
        bulletPoints={[
          "Key in card-not-present transactions for phone and mail orders",
          "Split payments across multiple cards or payment methods",
          "Issue full or partial refunds directly from the terminal",
          "Attach custom invoice numbers and order references",
          "Email receipts automatically after every transaction",
          "View real-time transaction history with search and filters",
        ]}
        icon={CreditCard}
      />

      {/* What you can do — expanded list */}
      <section className="py-20 md:py-28 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
              Every payment scenario, covered
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              From one-time charges to recurring payments, the virtual terminal handles it all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Process credit and debit card payments",
              "Accept ACH/eCheck bank transfers",
              "Charge saved cards from the Customer Vault",
              "Set up recurring billing schedules",
              "Issue refunds and void transactions",
              "Add tax, tips, and surcharges",
              "Attach notes and custom fields",
              "Send email and SMS receipts",
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
            title: "Log in to your dashboard",
            description: "Access the virtual terminal from any browser. No software downloads or hardware setup required.",
          },
          {
            title: "Enter payment details",
            description: "Key in the card number, expiration, CVV, and amount. Add optional order details or customer info.",
          },
          {
            title: "Process and send receipt",
            description: "Submit the payment for instant authorization. The customer receives an email receipt automatically.",
          },
        ]}
      />

      <ProductCTA
        heading="Ready to start processing?"
        description="Create your account in minutes and start accepting payments from any browser. No hardware required."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
