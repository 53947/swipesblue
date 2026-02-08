import { db } from "../db";
import { addOnProducts } from "@shared/schema";
import { notInArray } from "drizzle-orm";

const officialSlugs = [
  "customer-portal",
  "advanced-analytics",
  "checkout-optimizer",
  "premium-api",
  "shopping-cart-pro",
  "security-suite",
  "multi-gateway",
];

const addOns = [
  {
    name: "Customer Portal Access",
    slug: "customer-portal",
    description: "Self-service portal for your customers to view orders, download invoices, and manage payment methods.",
    annualPrice: "179.99",
    features: [
      "Unlimited order history",
      "Download invoices as PDF",
      "Manage saved payment methods",
      "Subscription management",
      "Support ticket submission",
      "Order tracking"
    ],
    requiredTier: null,
    category: "integration",
    icon: "Users",
    isActive: true,
    displayOrder: 1,
  },
  {
    name: "Advanced Analytics Dashboard",
    slug: "advanced-analytics",
    description: "Deep insights with revenue breakdowns, customer analytics, cohort analysis, and exportable reports.",
    annualPrice: "199.99",
    features: [
      "Revenue breakdown by product, category, time",
      "Customer analytics (LTV, AOV, frequency)",
      "Cohort analysis",
      "Funnel visualization",
      "Exportable reports (CSV, PDF)",
      "Scheduled email reports",
      "Custom date ranges"
    ],
    requiredTier: null,
    category: "analytics",
    icon: "BarChart3",
    isActive: true,
    displayOrder: 2,
  },
  {
    name: "Checkout Optimizer",
    slug: "checkout-optimizer",
    description: "Boost conversion with one-click checkout, express payments, address autocomplete, and A/B testing.",
    annualPrice: "249.99",
    features: [
      "One-click checkout",
      "Express checkout (Apple Pay, Google Pay)",
      "Address autocomplete",
      "Smart form validation",
      "A/B testing",
      "Conversion analytics funnel"
    ],
    requiredTier: null,
    category: "marketing",
    icon: "Zap",
    isActive: true,
    displayOrder: 3,
  },
  {
    name: "Premium API Access",
    slug: "premium-api",
    description: "Full REST API access with webhooks, SDK libraries, sandbox environment, and developer support.",
    annualPrice: "299.99",
    features: [
      "Full REST API",
      "Webhooks with retry logic",
      "API keys (test/live)",
      "Sandbox environment",
      "SDK libraries",
      "Full documentation",
      "Developer support"
    ],
    requiredTier: null,
    category: "integration",
    icon: "Code2",
    isActive: true,
    displayOrder: 4,
  },
  {
    name: "Shopping Cart Pro",
    slug: "shopping-cart-pro",
    description: "Enhanced cart with save for later, shareable links, cross-sell suggestions, and inventory reservation.",
    annualPrice: "349.99",
    features: [
      "Save cart for later",
      "Cart sharing (shareable link)",
      "Cross-sell/upsell suggestions",
      "Cart notes (gift messages)",
      "Multi-currency display",
      "Inventory reservation (countdown timer)"
    ],
    requiredTier: null,
    category: "marketing",
    icon: "ShoppingCart",
    isActive: true,
    displayOrder: 5,
  },
  {
    name: "Transaction Security Suite",
    slug: "security-suite",
    description: "Advanced fraud prevention with velocity checks, geolocation blocking, device fingerprinting, and chargeback alerts.",
    annualPrice: "399.99",
    features: [
      "Velocity checks",
      "Geolocation blocking",
      "Device fingerprinting",
      "3D Secure 2.0",
      "Real-time fraud scoring (0-100)",
      "Manual review queue",
      "Chargeback alerts (Verifi, Ethoca)"
    ],
    requiredTier: null,
    category: "security",
    icon: "ShieldCheck",
    isActive: true,
    displayOrder: 6,
  },
  {
    name: "Multi-Gateway Support",
    slug: "multi-gateway",
    description: "Connect multiple payment processors, route transactions by rules, and get failover protection.",
    annualPrice: "449.99",
    features: [
      "Connect up to 3 gateways",
      "Smart transaction routing",
      "Route by card type, amount, geography",
      "Auto-failover if primary fails",
      "Failover logs and analytics"
    ],
    requiredTier: "Scale",
    category: "integration",
    icon: "Network",
    isActive: true,
    displayOrder: 7,
  },
];

export async function seedAddOns() {
  console.log("Seeding add-on products...");

  console.log("Removing legacy add-ons...");
  const deleted = await db.delete(addOnProducts)
    .where(notInArray(addOnProducts.slug, officialSlugs))
    .returning();
  if (deleted.length > 0) {
    console.log(`  Removed ${deleted.length} legacy add-on(s)`);
  }

  for (const addOn of addOns) {
    try {
      await db.insert(addOnProducts).values({
        ...addOn,
        features: addOn.features,
      }).onConflictDoUpdate({
        target: addOnProducts.slug,
        set: {
          name: addOn.name,
          description: addOn.description,
          annualPrice: addOn.annualPrice,
          features: addOn.features,
          requiredTier: addOn.requiredTier,
          category: addOn.category,
          icon: addOn.icon,
          isActive: addOn.isActive,
          displayOrder: addOn.displayOrder,
          updatedAt: new Date(),
        },
      });
      console.log(`  ✓ ${addOn.name}`);
    } catch (error) {
      console.error(`  ✗ Failed to seed ${addOn.name}:`, error);
    }
  }

  console.log("Add-on seeding complete!");
}

seedAddOns()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
