import { stats } from "@/data/customers";
import { text, type Language } from "@/lib/i18n";

export function StatsSection({ lang }: { lang: Language }) {
  return (
    <section className="border-y border-graphite-200 bg-white">
      <div className="container-page grid gap-px bg-graphite-200 py-px md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.value} className="relative overflow-hidden bg-white px-6 py-8">
            <div className="absolute left-0 top-0 h-full w-1 bg-industrial-700" />
            <p className="text-4xl font-bold text-graphite-900">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-graphite-500">
              {text(stat.label, lang)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
