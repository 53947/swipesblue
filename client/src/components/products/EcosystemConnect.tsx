import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ConnectedProduct {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
}

interface EcosystemConnectProps {
  title?: string;
  subtitle?: string;
  products: ConnectedProduct[];
}

export default function EcosystemConnect({
  title = "Part of the bigger picture",
  subtitle = "Every tool in swipesblue works together. No integrations to configure. No data silos.",
  products,
}: EcosystemConnectProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className={`grid grid-cols-1 gap-6 ${products.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Link key={product.name} href={product.href}>
                <div className="bg-white border border-gray-200 rounded-[7px] p-6 hover:border-[#1844A6]/30 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                  <div className="w-10 h-10 bg-[#1844A6]/10 rounded-[7px] flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#1844A6]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#09080E] mb-2">{product.name}</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed flex-1">{product.description}</p>
                  <span className="text-[#1844A6] font-medium text-sm mt-4 inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
