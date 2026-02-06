import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface ProductCTAProps {
  heading: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function ProductCTA({ heading, description, primaryCTA, secondaryCTA }: ProductCTAProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F6F9FC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-6">
          {heading}
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
    </section>
  );
}
