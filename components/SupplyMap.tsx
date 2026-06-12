"use client";

import Link from "next/link";
import { ArrowUpRight, Factory, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { SupplyMapCountry } from "@/data/supply-map";
import { text, type Language, withLang } from "@/lib/i18n";

function brandCountLabel(count: number, lang: Language) {
  if (lang === "en") {
    return `${count} supplied brand${count === 1 ? "" : "s"}`;
  }

  return `${count} brand disuplai`;
}

function brandHref(brand: { name: string; slug?: string }, lang: Language) {
  if (brand.slug) {
    return withLang(`/brands/${brand.slug}`, lang);
  }

  return withLang(`/contact?brand=${encodeURIComponent(brand.name)}`, lang);
}

export function SupplyMap({ countries, lang }: { countries: SupplyMapCountry[]; lang: Language }) {
  const [activeCode, setActiveCode] = useState(countries[0]?.code ?? "");
  const activeCountry = useMemo(
    () => countries.find((country) => country.code === activeCode) ?? countries[0],
    [activeCode, countries]
  );

  if (!activeCountry) {
    return null;
  }

  return (
    <div className="mt-10 grid overflow-hidden border border-graphite-200 bg-white shadow-panel lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0 bg-graphite-50 p-3 sm:p-5">
        <div className="relative mx-auto aspect-[760/480] w-full max-w-[860px] overflow-hidden bg-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/maps/apac-base-map.svg')" }}
          />
          <svg
            viewBox="0 0 760 480"
            role="img"
            aria-labelledby="supply-map-title supply-map-description"
            className="absolute inset-0 h-full w-full"
          >
            <title id="supply-map-title">
              {lang === "en" ? "CSE supplied brand origins" : "Asal brand yang disuplai CSE"}
            </title>
            <desc id="supply-map-description">
              {lang === "en"
                ? "Map of countries connected to supplied brands."
                : "Peta negara yang terhubung dengan brand yang disuplai."}
            </desc>
            <g>
              {countries.map((country) => {
                const isActive = country.code === activeCountry.code;
                const countryName = text(country.name, lang);

                return (
                  <g key={country.code}>
                    <path
                      d={country.mapPath}
                      role="button"
                      tabIndex={0}
                      aria-label={`${countryName}: ${brandCountLabel(country.brands.length, lang)}`}
                      onPointerEnter={() => setActiveCode(country.code)}
                      onFocus={() => setActiveCode(country.code)}
                      onClick={() => setActiveCode(country.code)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveCode(country.code);
                        }
                      }}
                      className={`cursor-pointer stroke-white outline-none transition duration-200 focus-visible:stroke-graphite-900 ${
                        isActive ? "fill-signal-500" : "fill-industrial-600 hover:fill-signal-500"
                      }`}
                      strokeWidth={isActive ? 4 : 3}
                    />
                    <circle
                      cx={country.marker.x}
                      cy={country.marker.y}
                      r={isActive ? 7 : 5}
                      className={`pointer-events-none stroke-white transition ${isActive ? "fill-graphite-900" : "fill-signal-500"}`}
                      strokeWidth="3"
                    />
                    <text
                      x={country.label.x}
                      y={country.label.y}
                      className={`pointer-events-none fill-graphite-700 text-[13px] font-bold ${isActive ? "fill-graphite-900" : ""}`}
                    >
                      {countryName}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <aside className="min-w-0 border-t border-graphite-200 bg-white p-6 lg:border-l lg:border-t-0 lg:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-graphite-200 bg-graphite-50">
            <MapPin className="h-5 w-5 text-signal-600" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">
              {lang === "en" ? "Supply origin" : "Asal supply"}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-graphite-900">{text(activeCountry.name, lang)}</h3>
          </div>
        </div>

        <p className="mt-6 text-sm font-semibold text-industrial-700">
          {brandCountLabel(activeCountry.brands.length, lang)}
        </p>
        <div className="mt-4 divide-y divide-graphite-200 border-y border-graphite-200">
          {activeCountry.brands.map((brand) => (
            <Link
              key={`${activeCountry.code}-${brand.name}`}
              href={brandHref(brand, lang)}
              className="group flex min-h-14 items-center justify-between gap-3 py-3 text-sm font-semibold text-graphite-900 transition hover:text-industrial-700"
            >
              <span className="inline-flex items-center gap-2">
                <Factory className="h-4 w-4 text-graphite-400 transition group-hover:text-industrial-700" aria-hidden="true" />
                {brand.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-graphite-500 transition group-hover:text-industrial-700">
                {brand.slug ? (lang === "en" ? "View" : "Lihat") : "RFQ"}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {countries.map((country) => {
            const isActive = country.code === activeCountry.code;

            return (
              <button
                key={country.code}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCode(country.code)}
                onMouseEnter={() => setActiveCode(country.code)}
                className={`focus-ring flex min-h-11 items-center justify-between border px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "border-industrial-700 bg-industrial-700 text-white"
                    : "border-graphite-200 bg-white text-graphite-700 hover:border-industrial-600 hover:text-industrial-700"
                }`}
              >
                <span>{text(country.name, lang)}</span>
                <span>{country.brands.length}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
