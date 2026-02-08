import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import { normalizeTier } from "@shared/tier-constants";

interface TierGateProps {
  requiredTier: string;
  featureName: string;
  featureDescription?: string;
  children: React.ReactNode;
}

export default function TierGate({ requiredTier, featureName, featureDescription, children }: TierGateProps) {
  const { canAccess, tier } = useMerchantAuth();

  if (canAccess(requiredTier)) {
    return <>{children}</>;
  }

  const displayRequired = normalizeTier(requiredTier);
  const displayCurrent = normalizeTier(tier);

  return (
    <div className="relative">
      <div className="pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
        <div className="bg-white border border-gray-200 rounded-[7px] shadow-lg p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {featureName}
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            Requires <span className="font-medium text-[#1844A6]">{displayRequired}</span> tier or higher
          </p>
          {featureDescription && (
            <p className="text-sm text-gray-500 mb-4">{featureDescription}</p>
          )}
          {!featureDescription && <div className="mb-4" />}
          <p className="text-xs text-gray-400 mb-4">
            You are currently on the <span className="font-medium">{displayCurrent}</span> plan
          </p>
          <Link href="/pricing">
            <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px] group">
              Upgrade Now
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
