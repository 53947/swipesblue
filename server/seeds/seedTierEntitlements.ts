import { db } from "../db";
import { tierEntitlements } from "@shared/schema";
import { and, eq } from "drizzle-orm";

interface EntitlementRow {
  tierName: string;
  featureKey: string;
  featureValue: unknown;
  limit: number | null;
}

const entitlementMatrix: EntitlementRow[] = [
  // === Free Tier ===
  { tierName: "Free", featureKey: "products", featureValue: true, limit: 25 },
  { tierName: "Free", featureKey: "users", featureValue: true, limit: 1 },
  { tierName: "Free", featureKey: "online_checkout", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "virtual_terminal", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "payment_links", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "invoicing", featureValue: "Basic", limit: null },
  { tierName: "Free", featureKey: "recurring_billing", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "customer_vault", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "shopping_cart", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "abandoned_cart", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "discount_codes", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "brand_studio", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "basic_branding", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "basic_fraud_detection", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "advanced_fraud_rules", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "dispute_management", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "analytics", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "reporting", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "data_export", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "api_access", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "webhooks", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "sandbox", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "email_support", featureValue: true, limit: null },
  { tierName: "Free", featureKey: "priority_support", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "dedicated_am", featureValue: false, limit: null },
  { tierName: "Free", featureKey: "sla", featureValue: false, limit: null },

  // === Growth Tier ===
  { tierName: "Growth", featureKey: "products", featureValue: true, limit: 500 },
  { tierName: "Growth", featureKey: "users", featureValue: true, limit: 3 },
  { tierName: "Growth", featureKey: "online_checkout", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "virtual_terminal", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "payment_links", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "invoicing", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "recurring_billing", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "customer_vault", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "shopping_cart", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "abandoned_cart", featureValue: "Basic", limit: null },
  { tierName: "Growth", featureKey: "discount_codes", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "brand_studio", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "basic_branding", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "basic_fraud_detection", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "advanced_fraud_rules", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "dispute_management", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "analytics", featureValue: "Basic", limit: null },
  { tierName: "Growth", featureKey: "reporting", featureValue: "Basic", limit: null },
  { tierName: "Growth", featureKey: "data_export", featureValue: "CSV", limit: null },
  { tierName: "Growth", featureKey: "api_access", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "webhooks", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "sandbox", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "email_support", featureValue: true, limit: null },
  { tierName: "Growth", featureKey: "priority_support", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "dedicated_am", featureValue: false, limit: null },
  { tierName: "Growth", featureKey: "sla", featureValue: false, limit: null },

  // === Scale Tier ===
  { tierName: "Scale", featureKey: "products", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "users", featureValue: true, limit: 10 },
  { tierName: "Scale", featureKey: "online_checkout", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "virtual_terminal", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "payment_links", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "invoicing", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "recurring_billing", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "customer_vault", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "shopping_cart", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "abandoned_cart", featureValue: "Advanced", limit: null },
  { tierName: "Scale", featureKey: "discount_codes", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "brand_studio", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "basic_branding", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "basic_fraud_detection", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "advanced_fraud_rules", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "dispute_management", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "analytics", featureValue: "Advanced", limit: null },
  { tierName: "Scale", featureKey: "reporting", featureValue: "Advanced", limit: null },
  { tierName: "Scale", featureKey: "data_export", featureValue: "CSV, PDF", limit: null },
  { tierName: "Scale", featureKey: "api_access", featureValue: false, limit: null },
  { tierName: "Scale", featureKey: "webhooks", featureValue: false, limit: null },
  { tierName: "Scale", featureKey: "sandbox", featureValue: false, limit: null },
  { tierName: "Scale", featureKey: "email_support", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "priority_support", featureValue: true, limit: null },
  { tierName: "Scale", featureKey: "dedicated_am", featureValue: false, limit: null },
  { tierName: "Scale", featureKey: "sla", featureValue: false, limit: null },

  // === Enterprise Tier ===
  { tierName: "Enterprise", featureKey: "products", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "users", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "online_checkout", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "virtual_terminal", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "payment_links", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "invoicing", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "recurring_billing", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "customer_vault", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "shopping_cart", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "abandoned_cart", featureValue: "Advanced", limit: null },
  { tierName: "Enterprise", featureKey: "discount_codes", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "brand_studio", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "basic_branding", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "basic_fraud_detection", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "advanced_fraud_rules", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "dispute_management", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "analytics", featureValue: "Advanced", limit: null },
  { tierName: "Enterprise", featureKey: "reporting", featureValue: "Custom", limit: null },
  { tierName: "Enterprise", featureKey: "data_export", featureValue: "CSV, PDF, XLSX", limit: null },
  { tierName: "Enterprise", featureKey: "api_access", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "webhooks", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "sandbox", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "email_support", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "priority_support", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "dedicated_am", featureValue: true, limit: null },
  { tierName: "Enterprise", featureKey: "sla", featureValue: true, limit: null },
];

export async function seedTierEntitlements() {
  console.log("Seeding tier entitlements...");

  for (const row of entitlementMatrix) {
    try {
      const existing = await db
        .select()
        .from(tierEntitlements)
        .where(and(
          eq(tierEntitlements.tierName, row.tierName),
          eq(tierEntitlements.featureKey, row.featureKey)
        ));

      if (existing.length > 0) {
        await db
          .update(tierEntitlements)
          .set({
            featureValue: row.featureValue,
            limit: row.limit,
            isActive: true,
            updatedAt: new Date(),
          })
          .where(eq(tierEntitlements.id, existing[0].id));
      } else {
        await db.insert(tierEntitlements).values({
          tierName: row.tierName,
          featureKey: row.featureKey,
          featureValue: row.featureValue,
          limit: row.limit,
          isActive: true,
        });
      }
    } catch (error) {
      console.error(`  Failed: ${row.tierName}/${row.featureKey}`, error);
    }
  }

  console.log(`  Seeded ${entitlementMatrix.length} entitlements`);
  console.log("Tier entitlement seeding complete!");
}

seedTierEntitlements()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
