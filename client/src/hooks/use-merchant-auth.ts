import { useQuery } from "@tanstack/react-query";

interface MerchantSession {
  authenticated: boolean;
  merchantId: string | null;
  email: string | null;
  name: string | null;
  businessName: string | null;
  tier: string | null;
}

const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0,
  Starter: 1,
  Pro: 2,
  Enterprise: 3,
};

export function useMerchantAuth() {
  const { data, isLoading } = useQuery<MerchantSession>({
    queryKey: ["/api/auth/check"],
    queryFn: async () => {
      const res = await fetch("/api/auth/check");
      if (!res.ok) throw new Error("Failed to check auth");
      return res.json();
    },
  });

  const tier = data?.tier || "FREE";
  const isAuthenticated = data?.authenticated ?? false;

  function canAccess(requiredTier: string): boolean {
    return (TIER_HIERARCHY[tier] || 0) >= (TIER_HIERARCHY[requiredTier] || 0);
  }

  return {
    tier,
    email: data?.email || null,
    businessName: data?.businessName || null,
    merchantId: data?.merchantId || null,
    isAuthenticated,
    isLoading,
    canAccess,
  };
}
