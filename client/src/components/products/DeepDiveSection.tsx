import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DeepDiveSectionProps {
  heading: string;
  description: string;
  bulletPoints: string[];
  imagePosition?: "left" | "right";
  icon?: LucideIcon;
}

export default function DeepDiveSection({ heading, description, bulletPoints, imagePosition = "right", icon: Icon }: DeepDiveSectionProps) {
  const visual = (
    <div className="flex items-center justify-center">
      <div className="w-full aspect-video bg-[#F6F9FC] rounded-[7px] border border-gray-200 flex items-center justify-center">
        {Icon && <Icon className="h-16 w-16 text-[#1844A6]/30" />}
      </div>
    </div>
  );

  const text = (
    <div>
      <h2 className="text-3xl font-bold text-[#09080E] mb-4">
        {heading}
      </h2>
      <p className="text-lg text-[#4B5563] mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3">
        {bulletPoints.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-[#1844A6] flex-shrink-0 mt-0.5" />
            <span className="text-[#4B5563]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {imagePosition === "left" ? (
            <>
              {visual}
              {text}
            </>
          ) : (
            <>
              {text}
              {visual}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
