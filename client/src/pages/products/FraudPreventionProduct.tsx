import { Shield, TrafficCone, Globe, ClipboardList, CreditCard, Monitor, BarChart3 } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import BeforeAfter from "@/components/products/BeforeAfter";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import EcosystemConnect from "@/components/products/EcosystemConnect";
import ProductCTA from "@/components/products/ProductCTA";

export default function FraudPreventionProduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: THE REALITY */}
      <ProductHero
        badge="Security"
        title="Protect your revenue without turning away good customers."
        subtitle="Chargebacks cost you twice — you lose the sale AND pay a fee. But overly aggressive fraud blocking means you're declining legitimate customers who would have paid you. swipesblue's fraud prevention gives you real-time controls that stop the bad transactions while letting the good ones through. Configure your rules, and every payment is automatically screened."
        primaryCTA={{ label: "Get Protected", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={Shield}
        mockupLabel="Fraud Rules Dashboard"
      />

      {/* SECTION 2: THE BEFORE & AFTER */}
      <BeforeAfter
        title="Fraud protection that actually makes sense"
        before={[
          "You get a chargeback notification. You've already shipped the product. The money is gone AND you owe a $15 fee.",
          "You turned on 'strict' fraud settings. Now legitimate customers are getting declined and calling you, frustrated.",
          "Someone ran 50 small charges against your gateway in one hour. You didn't notice until the statement.",
        ]}
        after={[
          "AVS and CVV verification catch mismatched billing info before the charge goes through.",
          "You set the rules that match YOUR business. Strict for high-risk products, relaxed for trusted customers.",
          "Velocity controls flag when the same card is used too many times in an hour. Card testing stopped cold.",
        ]}
      />

      {/* SECTION 3: WHAT YOU GET */}
      <FeatureCards
        heading="What you get"
        columns={4}
        cards={[
          {
            icon: Shield,
            title: "AVS + CVV Verification",
            description: "Automatically verify billing address and card security code on every transaction. Mismatches are flagged or declined based on your rules.",
          },
          {
            icon: TrafficCone,
            title: "Velocity Controls",
            description: "Set limits on how many transactions a card, IP address, or customer can run per hour. Stop card testing attacks before they start.",
          },
          {
            icon: Globe,
            title: "Geographic Controls",
            description: "Block transactions from high-risk countries or regions. Or whitelist only the countries your customers come from.",
          },
          {
            icon: ClipboardList,
            title: "Blacklists & Whitelists",
            description: "Block known bad actors by card number, email, or IP. Whitelist trusted customers so they're never flagged.",
          },
        ]}
      />

      {/* SECTION 4: SEE IT IN ACTION */}
      <DeepDiveSection
        heading="Your rules, your business"
        description="Every business has different risk tolerance. A high-end retailer needs strict AVS matching. A food truck accepting QR payments doesn't. You configure the rules that make sense for how you sell."
        imagePosition="left"
        icon={Shield}
        mockupLabel="Custom Rule Configuration"
      />

      <DeepDiveSection
        heading="Real-time screening, zero manual review"
        description="Every transaction runs through your rules automatically. Good transactions process normally. Suspicious ones are declined or flagged for your review. You set it once and the system handles the rest."
        imagePosition="right"
        icon={TrafficCone}
        mockupLabel="Transaction Screening — Live View"
        bgColor="gray"
      />

      {/* SECTION 5: HOW IT CONNECTS */}
      <EcosystemConnect
        products={[
          {
            icon: CreditCard,
            name: "Checkout",
            description: "Fraud rules run on every checkout transaction automatically. Customers don't notice. Bad actors get stopped.",
            href: "/products/checkout",
          },
          {
            icon: Monitor,
            name: "Virtual Terminal",
            description: "Phone orders are screened too. AVS verification works even when you're keying in the card manually.",
            href: "/products/terminal",
          },
          {
            icon: BarChart3,
            name: "Reporting",
            description: "See fraud attempts, decline rates, and chargeback trends. Know where your vulnerabilities are.",
            href: "/products/fraud",
          },
        ]}
      />

      {/* SECTION 7: CTA */}
      <ProductCTA
        heading="Protect your business. Keep your customers."
        description="Start free. Scale as you grow. No contracts."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
