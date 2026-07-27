import { CheckCircle2 } from "lucide-react";

type FeatureGridProps = {
  items: string[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 bg-white p-6 transition hover:bg-graphite-50">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-industrial-600" aria-hidden="true" />
          <p className="text-sm leading-6 text-graphite-700">{item}</p>
        </div>
      ))}
    </div>
  );
}
