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
  mockupLabel?: string;
}

export default function ProductHero({ badge, title, subtitle, primaryCTA, secondaryCTA, icon: Icon, mockupLabel }: ProductHeroProps) {
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
            <div className="w-full max-w-lg rounded-[7px] border border-gray-200 shadow-lg overflow-hidden">
              {/* Browser frame */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white rounded-[7px] px-3 py-1 text-xs text-gray-400 border border-gray-200">
                    app.swipesblue.com
                  </div>
                </div>
              </div>
              {/* Mockup content area */}
              <div className="bg-[#F6F9FC] aspect-[4/3] flex flex-col items-center justify-center p-8">
                {Icon && <Icon className="h-16 w-16 text-[#1844A6]/25 mb-4" />}
                {mockupLabel && (
                  <span className="text-sm text-[#1844A6]/40 font-medium text-center">
                    {mockupLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
