import type { Industry } from "@/data/industries";
import { text, type Language } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

export function IndustryCard({ industry, lang }: { industry: Industry; lang: Language }) {
  return (
    <article className="group grid overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:border-industrial-600 hover:shadow-panel md:grid-cols-[0.85fr_1.15fr]">
      <AssetSlot
        src={industry.image}
        alt={text(industry.title, lang)}
        label={text(industry.title, lang)}
        className="min-h-56 border-0 bg-graphite-100 md:min-h-full md:border-r md:border-graphite-200"
        imageClassName="transition duration-500 group-hover:scale-105"
      />
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{industry.slug}</p>
        <h3 className="mt-2 text-2xl font-bold text-graphite-900">{text(industry.title, lang)}</h3>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(industry.description, lang)}</p>
        <div className="mt-5 grid gap-2">
          {industry.applications.map((application) => (
            <p key={text(application, lang)} className="border-l-2 border-industrial-600 bg-graphite-50 px-3 py-2 text-sm font-semibold text-graphite-700">
              {text(application, lang)}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
