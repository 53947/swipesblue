import { normalizeTier, TIER_COLORS } from "@shared/tier-constants";

interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

export default function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  const canonical = normalizeTier(tier);
  const colors = TIER_COLORS[canonical] || TIER_COLORS.Free;

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-[7px] ${colors.bg} ${colors.text} ${sizeClasses[size]}`}
    >
      {canonical}
    </span>
  );
}
