"use client";

import Link from "next/link";
import { ArrowUpRight, PackageSearch, Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { BrandCard } from "@/components/BrandCard";
import { BrandLogo } from "@/components/BrandLogo";
import type { SearchableBrandCard } from "@/data/brand-search";
import type { CatalogBrand } from "@/data/catalog-types";
import { text, type Language, withLang } from "@/lib/i18n";

type BrandsSearchCatalogProps = {
  representedBrands: SearchableBrandCard[];
  tradingBrands: CatalogBrand[];
  tradingBrandCount: number;
  lang: Language;
};

type IndexedTradingBrand = {
  brand: CatalogBrand;
  searchIndex: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tradingBrandSearchIndex(brand: CatalogBrand) {
  return normalize(
    [
      brand.name,
      brand.country,
      text(brand.category, "id"),
      text(brand.category, "en"),
      ...(brand.searchTerms ?? [])
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function matchesSearch(searchIndex: string, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true;
  }

  if (searchIndex.includes(normalizedQuery)) {
    return true;
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  return tokens.length > 0 && tokens.every((token) => searchIndex.includes(token));
}

function TradingBrandCard({ brand, lang }: { brand: CatalogBrand; lang: Language }) {
  const href = withLang(`/brands/${brand.slug}`, lang);

  return (
    <Link
      href={href}
      className="group flex min-h-[260px] flex-col border border-dashed border-graphite-300 bg-white transition duration-300 hover:-translate-y-1 hover:border-signal-500 hover:bg-signal-50/50 hover:shadow-panel"
    >
      <BrandLogo
        name={brand.name}
        slug={brand.slug}
        src={brand.logo}
        className="h-24 w-full border-b border-dashed border-graphite-200 bg-graphite-50"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-graphite-500">
                {lang === "en" ? "General trading" : "General trading"}
              </p>
              <h3 className="mt-2 text-xl font-bold text-graphite-900">{brand.name}</h3>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-dashed border-graphite-300 bg-white transition group-hover:border-signal-500 group-hover:bg-signal-600">
              <ArrowUpRight className="h-4 w-4 text-graphite-500 transition group-hover:text-white" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-industrial-700">{text(brand.category, lang)}</p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-dashed border-graphite-200 pt-4 text-xs font-semibold text-graphite-500">
          <span>{brand.country || (lang === "en" ? "Multiple origins" : "Berbagai negara")}</span>
          <span>{lang === "en" ? "RFQ supply" : "Supply RFQ"}</span>
        </div>
      </div>
    </Link>
  );
}

export function BrandsSearchCatalog({ representedBrands, tradingBrands, tradingBrandCount, lang }: BrandsSearchCatalogProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalize(deferredQuery);

  const indexedTradingBrands = useMemo<IndexedTradingBrand[]>(
    () =>
      tradingBrands
        .map((brand) => ({ brand, searchIndex: tradingBrandSearchIndex(brand) }))
        .sort((a, b) => (a.brand.popularityRank ?? Number.MAX_SAFE_INTEGER) - (b.brand.popularityRank ?? Number.MAX_SAFE_INTEGER) || a.brand.name.localeCompare(b.brand.name)),
    [tradingBrands]
  );

  const representedMatches = useMemo(
    () => representedBrands.filter((item) => matchesSearch(item.searchIndex, normalizedQuery)).map((item) => item.brand),
    [representedBrands, normalizedQuery]
  );

  const tradingMatches = useMemo(
    () => indexedTradingBrands.filter((item) => matchesSearch(item.searchIndex, normalizedQuery)).map((item) => item.brand),
    [indexedTradingBrands, normalizedQuery]
  );

  const matchCount = representedMatches.length + tradingMatches.length;
  const hasQuery = normalizedQuery.length > 0;

  return (
    <div className="mt-10">
      <div className="border border-graphite-200 bg-graphite-50 p-4 md:p-5">
        <label htmlFor="brand-search" className="sr-only">
          {lang === "en" ? "Search brands" : "Cari brand"}
        </label>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-400" aria-hidden="true" />
            <input
              id="brand-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                lang === "en"
                  ? "Search brand, product, or application"
                  : "Cari brand, produk, atau aplikasi"
              }
              className="focus-ring h-12 w-full border border-graphite-300 bg-white pl-12 pr-12 text-sm font-semibold text-graphite-900 placeholder:text-graphite-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="focus-ring absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-graphite-200 bg-white text-graphite-500 hover:border-signal-500 hover:text-signal-600"
                aria-label={lang === "en" ? "Clear search" : "Hapus pencarian"}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-graphite-600 md:min-w-[190px] md:justify-end">
            <PackageSearch className="h-5 w-5 text-industrial-700" aria-hidden="true" />
            <span>
              {hasQuery
                ? lang === "en"
                  ? `${matchCount} match${matchCount === 1 ? "" : "es"}`
                  : `${matchCount} hasil`
                : lang === "en"
                  ? `${representedBrands.length + tradingBrandCount}+ supply options`
                  : `${representedBrands.length + tradingBrandCount}+ opsi supply`}
            </span>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Authorized representatives" : "Authorized representative"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-graphite-900">
              {lang === "en" ? "Represented brand cards" : "Brand resmi yang diwakili"}
            </h2>
          </div>
          <p className="text-sm font-semibold text-graphite-500">
            {representedMatches.length} / {representedBrands.length}
          </p>
        </div>
        {representedMatches.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {representedMatches.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="mt-5 border border-graphite-200 bg-white p-6 text-sm font-semibold text-graphite-500">
            {lang === "en" ? "No represented brands match this search." : "Tidak ada brand resmi yang cocok dengan pencarian ini."}
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="grid gap-5 border border-graphite-200 bg-white p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-700">
              {lang === "en" ? "General trading supply" : "Supply general trading"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-graphite-900">
              {lang === "en" ? `${tradingBrandCount}+ additional brands on request.` : `${tradingBrandCount}+ brand tambahan berdasarkan request.`}
            </h2>
            <p className="mt-3 text-sm leading-6 text-graphite-500">
              {lang === "en"
                ? "These are sourcing and trading items, separate from brands where CSE is an authorized representative. Available brand logos are shown directly on each card."
                : "Ini adalah item sourcing dan trading, terpisah dari brand di mana CSE menjadi authorized representative. Logo brand yang tersedia ditampilkan langsung pada setiap kartu."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-graphite-700 sm:grid-cols-4 md:grid-cols-2">
            {["Socket", "Cutting tools", "Pneumatic", "Measuring"].map((item) => (
              <span key={item} className="border border-dashed border-graphite-300 bg-graphite-50 px-3 py-2 text-center">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Brand directory" : "Direktori brand"}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-graphite-900">
              {lang === "en" ? "General trading brand matches" : "Brand general trading yang cocok"}
            </h3>
          </div>
          <p className="text-sm font-semibold text-graphite-500">
            {tradingMatches.length} / {tradingBrands.length}
          </p>
        </div>

        {tradingMatches.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tradingMatches.map((brand) => (
              <TradingBrandCard key={brand.slug} brand={brand} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="mt-5 border border-graphite-200 bg-white p-6 text-sm font-semibold text-graphite-500">
            {lang === "en"
              ? "No general trading cards match this search. Send an RFQ if the brand is not published yet."
              : "Tidak ada kartu general trading yang cocok. Kirim RFQ jika brand belum dipublikasikan."}
          </div>
        )}
      </section>
    </div>
  );
}
