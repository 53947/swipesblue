import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface ProductHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  icon?: LucideIcon;
}

export default function ProductHero({ badge, title, subtitle, primaryCTA, secondaryCTA, icon: Icon }: ProductHeroProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#1844A6]/10 text-[#1844A6] font-medium px-3 py-1 rounded-[7px] mb-6">
              {badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#09080E] leading-tight">
              {title}
            </h1>
            <p className="text-lg text-[#4B5563] mt-4 max-w-lg leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <Link href={primaryCTA.href}>
                <Button size="lg" className="bg-[#1844A6] text-white rounded-[7px] px-6 py-3">
                  {primaryCTA.label}
                </Button>
              </Link>
              {secondaryCTA && (
                <Link href={secondaryCTA.href}>
                  <Button size="lg" variant="outline" className="border-2 border-[#064A6C] text-[#064A6C] rounded-[7px] px-6 py-3">
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-square bg-[#F6F9FC] rounded-[7px] border border-gray-200 flex items-center justify-center">
              {Icon && <Icon className="h-24 w-24 text-[#1844A6]/30" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
