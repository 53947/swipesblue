import type { LucideIcon } from "lucide-react";

interface DeepDiveSectionProps {
  heading: string;
  description: string;
  imagePosition?: "left" | "right";
  icon?: LucideIcon;
  mockupLabel?: string;
  bgColor?: "white" | "gray";
}

export default function DeepDiveSection({ heading, description, imagePosition = "right", icon: Icon, mockupLabel, bgColor = "white" }: DeepDiveSectionProps) {
  const visual = (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-[7px] border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="bg-[#F6F9FC] aspect-[16/10] flex flex-col items-center justify-center p-6">
          {Icon && <Icon className="h-12 w-12 text-[#1844A6]/25 mb-3" />}
          {mockupLabel && (
            <span className="text-xs text-[#1844A6]/40 font-medium text-center">
              {mockupLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const text = (
    <div>
      <h2 className="text-3xl font-bold text-[#09080E] mb-4">
        {heading}
      </h2>
      <p className="text-lg text-[#4B5563] leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <section className={`py-20 md:py-28 ${bgColor === "gray" ? "bg-[#F6F9FC]" : "bg-white"}`}>
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
