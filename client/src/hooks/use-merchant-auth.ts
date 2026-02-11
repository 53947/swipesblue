import { useQuery } from "@tanstack/react-query";
import { TIER_HIERARCHY, normalizeTier, meetsMinTier } from "@shared/tier-constants";

interface MerchantSession {
  authenticated: boolean;
  merchantId: string | null;
  email: string | null;
  name: string | null;
  businessName: string | null;
  tier: string | null;
  signupPath: string | null;
}

export function useMerchantAuth() {
  const { data, isLoading } = useQuery<MerchantSession>({
    queryKey: ["/api/auth/check"],
    queryFn: async () => {
      const res = await fetch("/api/auth/check");
      if (!res.ok) throw new Error("Failed to check auth");
      return res.json();
    },
  });

  const { data: addons } = useQuery<string[]>({
    queryKey: ["/api/merchant/addon-subscriptions"],
    queryFn: async () => {
      const res = await fetch("/api/merchant/addon-subscriptions");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: data?.authenticated === true,
  });

  const tier = normalizeTier(data?.tier || "Free");
  const isAuthenticated = data?.authenticated ?? false;

  function canAccess(requiredTier: string): boolean {
    return meetsMinTier(tier, requiredTier);
  }

  function hasAddon(slug: string): boolean {
    return (addons || []).includes(slug);
  }

  return {
    tier,
    email: data?.email || null,
    businessName: data?.businessName || null,
    merchantId: data?.merchantId || null,
    signupPath: data?.signupPath || null,
    isAuthenticated,
    isLoading,
    canAccess,
    addons: addons || [],
    hasAddon,
  };
}
