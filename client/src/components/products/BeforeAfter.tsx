interface BeforeAfterProps {
  title: string;
  before: string[];
  after: string[];
}

export default function BeforeAfter({ title, before, after }: BeforeAfterProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#09080E]">
            {title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before column */}
          <div className="bg-white border border-gray-200 rounded-[7px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-500 font-bold text-sm">✕</span>
              </div>
              <h3 className="text-lg font-semibold text-[#09080E]">What it looks like today</h3>
            </div>
            <ul className="space-y-4">
              {before.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 flex-shrink-0">—</span>
                  <p className="text-[#4B5563] text-sm leading-relaxed italic">"{item}"</p>
                </li>
              ))}
            </ul>
          </div>

          {/* After column */}
          <div className="bg-white border-2 border-[#1844A6]/20 rounded-[7px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#1844A6]/10 flex items-center justify-center">
                <span className="text-[#1844A6] font-bold text-sm">✓</span>
              </div>
              <h3 className="text-lg font-semibold text-[#09080E]">What it looks like with swipesblue</h3>
            </div>
            <ul className="space-y-4">
              {after.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#1844A6] mt-1 flex-shrink-0">—</span>
                  <p className="text-[#4B5563] text-sm leading-relaxed">"{item}"</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
