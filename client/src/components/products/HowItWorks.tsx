interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  heading: string;
  steps: Step[];
}

export default function HowItWorks({ heading, steps }: HowItWorksProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#09080E] mb-4">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="w-12 h-12 bg-[#1844A6] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-[#09080E] mb-3">
                {step.title}
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
