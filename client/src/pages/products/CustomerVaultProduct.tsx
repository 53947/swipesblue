import { Users, Lock, CreditCard, RefreshCw, Shield, Zap } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";
import FeatureCards from "@/components/products/FeatureCards";
import DeepDiveSection from "@/components/products/DeepDiveSection";
import HowItWorks from "@/components/products/HowItWorks";
import CodeBlock from "@/components/products/CodeBlock";
import ProductCTA from "@/components/products/ProductCTA";

export default function CustomerVaultProduct() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        badge="Customer Vault"
        title="Securely store payment methods"
        subtitle="Save customer cards and bank accounts for faster repeat purchases. Tokenized storage keeps you PCI-compliant while enabling one-click payments."
        primaryCTA={{ label: "Start Storing", href: "/register" }}
        secondaryCTA={{ label: "View API Docs", href: "/developers" }}
        icon={Users}
      />

      <FeatureCards
        heading="Secure, tokenized storage"
        subheading="Store payment methods safely and charge them whenever you need to"
        cards={[
          {
            icon: Lock,
            title: "Tokenized Security",
            description: "Card numbers are replaced with secure tokens. You never store or see raw card data on your systems.",
          },
          {
            icon: CreditCard,
            title: "Multiple Payment Methods",
            description: "Store credit cards, debit cards, and ACH bank accounts. Customers can have multiple methods on file.",
          },
          {
            icon: Zap,
            title: "One-Click Payments",
            description: "Charge saved payment methods instantly from the virtual terminal, API, or recurring billing engine.",
          },
          {
            icon: RefreshCw,
            title: "Automatic Card Updates",
            description: "Expired or reissued cards update automatically through card network account updater services.",
          },
          {
            icon: Shield,
            title: "PCI DSS Compliant",
            description: "All vault data is encrypted at rest and in transit. Meets PCI DSS Level 1 requirements out of the box.",
          },
          {
            icon: Users,
            title: "Customer Profiles",
            description: "Attach payment methods to customer records. View transaction history, notes, and billing details in one place.",
          },
        ]}
      />

      <DeepDiveSection
        heading="The foundation for repeat revenue"
        description="The Customer Vault powers one-click checkout, recurring billing, and saved payment preferences. It's the backbone of a frictionless payment experience."
        bulletPoints={[
          "Store unlimited payment methods per customer",
          "Set default payment methods for each customer",
          "Link vault records to recurring billing plans",
          "Search and filter customers by name, email, or card type",
          "Cross-platform sync with triadblue ecosystem via triadblueId",
        ]}
        icon={Users}
      />

      <CodeBlock
        heading="Manage vault records via API"
        description="Create customer profiles and store payment methods programmatically. Use tokens to charge customers without handling card data."
        code={`curl -X POST https://api.swipesblue.com/v1/vault/customers \\
  -H "Authorization: Bearer sb_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "paymentMethod": {
      "type": "card",
      "cardNumber": "4111111111111111",
      "expMonth": "12",
      "expYear": "2028",
      "cvv": "123"
    },
    "metadata": {
      "source": "checkout",
      "plan": "pro"
    }
  }'`}
      />

      <HowItWorks
        heading="How it works"
        steps={[
          {
            title: "Customer enters card details",
            description: "During checkout or via the dashboard, the customer provides their payment information.",
          },
          {
            title: "Card is tokenized and stored",
            description: "The card data is encrypted and replaced with a secure token. You store the token, not the card.",
          },
          {
            title: "Charge anytime with the token",
            description: "Use the token to process future payments instantly — no need to re-enter card details.",
          },
        ]}
      />

      <ProductCTA
        heading="Start building your customer vault"
        description="Securely store payment methods and enable faster, frictionless payments for your customers."
        primaryCTA={{ label: "Get Started Free", href: "/register" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
