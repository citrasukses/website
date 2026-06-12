type FAQ = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="divide-y divide-graphite-200 border-y border-graphite-200 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="cursor-pointer list-none text-base font-semibold text-graphite-900">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-xl text-industrial-700 group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-graphite-500">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
