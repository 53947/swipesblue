// Single source of truth for all tier logic across client and server

export const TIER_NAMES = {
  FREE: "Free",
  GROWTH: "Growth",
  SCALE: "Scale",
  ENTERPRISE: "Enterprise",
} as const;

// Maps old DB values to new canonical names
export const TIER_ALIASES: Record<string, string> = {
  FREE: "Free",
  Free: "Free",
  free: "Free",
  Starter: "Growth",
  starter: "Growth",
  STARTER: "Growth",
  Growth: "Growth",
  growth: "Growth",
  GROWTH: "Growth",
  Pro: "Scale",
  pro: "Scale",
  PRO: "Scale",
  Scale: "Scale",
  scale: "Scale",
  SCALE: "Scale",
  Enterprise: "Enterprise",
  enterprise: "Enterprise",
  ENTERPRISE: "Enterprise",
};

export const TIER_HIERARCHY: Record<string, number> = {
  Free: 0,
  Growth: 1,
  Scale: 2,
  Enterprise: 3,
};

export const TIER_PRODUCT_LIMITS: Record<string, number> = {
  Free: 25,
  Growth: 500,
  Scale: Infinity,
  Enterprise: Infinity,
};

export const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  Free: { bg: "bg-gray-100", text: "text-gray-700" },
  Growth: { bg: "bg-blue-100", text: "text-blue-700" },
  Scale: { bg: "bg-purple-100", text: "text-purple-700" },
  Enterprise: { bg: "bg-amber-100", text: "text-amber-800" },
};

/** Converts any old/new tier value to canonical name */
export function normalizeTier(tier: string): string {
  return TIER_ALIASES[tier] || "Free";
}

/** Returns true if currentTier meets or exceeds requiredTier */
export function meetsMinTier(currentTier: string, requiredTier: string): boolean {
  const current = normalizeTier(currentTier);
  const required = normalizeTier(requiredTier);
  return (TIER_HIERARCHY[current] || 0) >= (TIER_HIERARCHY[required] || 0);
}
