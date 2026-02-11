import { Link } from "wouter";
import { Lock, Check, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { meetsMinTier } from "@shared/tier-constants";

interface FeatureMarketingPageProps {
  featureName: string;
  headline: string;
  description: string;
  benefits: string[];
  requiredTier: string;
  currentTier: string;
  price?: string;
  ctaText: string;
  ctaLink: string;
  isOwned?: boolean;
  isIncluded?: boolean;
  renewalDate?: string;
  children?: React.ReactNode;
}

export default function FeatureMarketingPage({
  featureName,
  headline,
  description,
  benefits,
  requiredTier,
  currentTier,
  price,
  ctaText,
  ctaLink,
  isOwned,
  isIncluded,
  renewalDate,
  children,
}: FeatureMarketingPageProps) {
  // State: OWNED — show active banner + working UI
  if (isOwned && children) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{featureName}</h1>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 text-xs no-default-hover-elevate">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              ACTIVE
            </Badge>
            {renewalDate && (
              <span className="text-sm text-gray-500">Renews: {renewalDate}</span>
            )}
          </div>
        </div>
        {children}
      </div>
    );
  }

  // State: INCLUDED — show included banner + working UI
  if (isIncluded && children) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{featureName}</h1>
          <Badge className="bg-blue-100 text-blue-700 text-xs no-default-hover-elevate">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            INCLUDED
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-6">Included with your {currentTier} plan.</p>
        {children}
      </div>
    );
  }

  // Determine if merchant can purchase (correct tier) or needs to upgrade first
  const isEligible = meetsMinTier(currentTier, requiredTier);

  // State: NOT ELIGIBLE — wrong tier, needs upgrade first
  if (!isEligible) {
    return (
      <div className="p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-5 w-5 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">{featureName}</h1>
        </div>

        <p className="text-lg text-gray-700 mb-6">{headline}</p>
        <p className="text-gray-600 mb-8">{description}</p>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            What you get
          </h3>
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-[#1844A6] mt-0.5 shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {price && (
          <p className="text-lg font-semibold text-gray-900 mb-2">{price}</p>
        )}
        <p className="text-sm text-gray-500 mb-2">
          Requires {requiredTier} plan or above.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You're on {currentTier}. Upgrade to {requiredTier} first.
        </p>

        <Link href={ctaLink}>
          <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px] group">
            {ctaText}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    );
  }

  // State: ELIGIBLE — correct tier, can purchase
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{featureName}</h1>

      <p className="text-lg text-gray-700 mb-6">{headline}</p>
      <p className="text-gray-600 mb-8">{description}</p>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          What you get
        </h3>
        <ul className="space-y-3">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#1844A6] mt-0.5 shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {price && (
        <p className="text-lg font-semibold text-gray-900 mb-6">{price}</p>
      )}

      <Link href={ctaLink}>
        <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px] group">
          {ctaText}
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}
