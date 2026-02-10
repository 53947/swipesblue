import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Layers, Shield, Zap, ShoppingCart, BarChart3, Code } from "lucide-react";
import { normalizeTier } from "@shared/tier-constants";
import type { AddOnProduct } from "@shared/schema";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Network: Layers,
  ShieldCheck: Shield,
  Zap,
  ShoppingCart,
  BarChart3,
  Code2: Code,
};

interface EnhancementCardProps {
  addOn: AddOnProduct;
  isSubscribed?: boolean;
}

export default function EnhancementCard({ addOn, isSubscribed = false }: EnhancementCardProps) {
  const IconComponent = iconMap[addOn.icon || ""] || Layers;
  const price = parseFloat(addOn.annualPrice || "0");

  return (
    <Card className="flex flex-col border border-gray-200 rounded-[7px]">
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 bg-gray-100 rounded-full shrink-0">
            <IconComponent className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{addOn.name}</h3>
            <p className="text-lg font-bold text-[#1844A6] mt-1">
              ${price.toFixed(2)}<span className="text-xs font-normal text-gray-500">/yr</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
          {addOn.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {addOn.requiredTier && (
            <Badge className="text-xs bg-amber-100 text-amber-800 no-default-hover-elevate">
              {normalizeTier(addOn.requiredTier)}+ required
            </Badge>
          )}
          {isSubscribed && (
            <Badge className="text-xs bg-green-600 text-white no-default-hover-elevate">
              Active
            </Badge>
          )}
        </div>

        {isSubscribed ? (
          <Link href={`/products/${addOn.slug}`}>
            <Button
              variant="outline"
              className="w-full rounded-[7px] border-gray-300 text-gray-500"
            >
              Manage
            </Button>
          </Link>
        ) : (
          <Link href={`/products/${addOn.slug}`}>
            <Button
              className="w-full bg-[#1844A6] text-white rounded-[7px] group"
            >
              <span className="flex items-center justify-center">
                Subscribe
                <span className="inline-flex w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </span>
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
