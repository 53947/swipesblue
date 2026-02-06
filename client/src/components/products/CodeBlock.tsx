interface CodeBlockProps {
  heading: string;
  description: string;
  code: string;
  language?: string;
}

export default function CodeBlock({ heading, description, code }: CodeBlockProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#09080E] mb-4">
              {heading}
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed">
              {description}
            </p>
          </div>
          <div className="bg-[#1a1a2e] rounded-[7px] p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-gray-100">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
