import { db } from "./db";
import { addonSubscriptions, addOnProducts } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export async function getAddonSubscriptionSlugs(merchantId: string): Promise<string[]> {
  const results = await db
    .select({ slug: addOnProducts.slug })
    .from(addonSubscriptions)
    .innerJoin(addOnProducts, eq(addonSubscriptions.addonId, addOnProducts.id))
    .where(and(
      eq(addonSubscriptions.merchantId, merchantId),
      eq(addonSubscriptions.status, "active")
    ));
  return results.map(r => r.slug);
}
