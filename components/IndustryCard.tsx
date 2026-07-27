"use client";

import { ArrowRight } from "lucide-react";
import type { Industry } from "@/data/industries";
import { text, type Language } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

type IndustryCardProps = {
  industry: Industry;
  lang: Language;
  onSelect?: () => void;
};

export function IndustryCard({ industry, lang, onSelect }: IndustryCardProps) {
  return (
    <article className="group relative grid overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:border-industrial-600 hover:shadow-panel md:grid-cols-[0.85fr_1.15fr]">
      <AssetSlot
        src={industry.image}
        alt={text(industry.title, lang)}
        label={text(industry.title, lang)}
        className="min-h-56 border-0 bg-graphite-100 md:min-h-full md:border-r md:border-graphite-200"
        imageClassName="transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 42vw"
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
        {onSelect ? (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-industrial-700" aria-hidden="true">
            {lang === "en" ? "View brand application diagram" : "Lihat diagram aplikasi brand"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        ) : null}
      </div>
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-industrial-600"
          aria-label={
            lang === "en"
              ? `Open ${text(industry.title, lang)} brand application case study`
              : `Buka studi kasus aplikasi brand untuk ${text(industry.title, lang)}`
          }
        />
      ) : null}
    </article>
  );
}
