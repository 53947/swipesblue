import type { LucideIcon } from "lucide-react";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCardsProps {
  heading: string;
  subheading?: string;
  cards: FeatureCard[];
  columns?: 3 | 4;
}

export default function FeatureCards({ heading, subheading, cards, columns = 3 }: FeatureCardsProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>
        <div className={`grid grid-cols-1 gap-6 ${columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200 rounded-[7px] p-8 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-[#1844A6]/10 rounded-[7px] flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-[#1844A6]" />
                </div>
                <h3 className="text-lg font-semibold text-[#09080E] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
