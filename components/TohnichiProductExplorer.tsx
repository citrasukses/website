"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { PackageSearch, RotateCcw, Search, X } from "lucide-react";
import type { CatalogProductGroup } from "@/data/catalog-types";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { UseCaseSection } from "@/components/UseCaseSection";
import { text, type Language, type LocalizedText } from "@/lib/i18n";

type TohnichiProductExplorerProps = {
  groups: CatalogProductGroup[];
  lang: Language;
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function TohnichiProductExplorer({ groups, lang }: TohnichiProductExplorerProps) {
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalize(deferredQuery);

  const indexedProducts = useMemo(
    () =>
      groups.flatMap((group) =>
        group.products.map((product) => ({
          group,
          product,
          searchIndex: normalize(
            [
              group.slug,
              group.title.id,
              group.title.en,
              product.name,
              product.model ?? "",
              product.summary.id,
              product.summary.en,
              ...product.tags.flatMap((tag) => [tag.id, tag.en])
            ].join(" ")
          )
        }))
      ),
    [groups]
  );

  const purposeOptions = useMemo(() => {
    const options = new Map<string, LocalizedText>();

    for (const { product } of indexedProducts) {
      for (const tag of product.tags) {
        const value = normalize(tag.en);
        if (!options.has(value)) {
          options.set(value, tag);
        }
      }
    }

    return Array.from(options, ([value, label]) => ({ value, label })).sort((a, b) =>
      text(a.label, lang).localeCompare(text(b.label, lang))
    );
  }, [indexedProducts, lang]);

  const matches = useMemo(
    () =>
      indexedProducts.filter(({ group, product, searchIndex }) => {
        const matchesCategory = !category || group.slug === category;
        const matchesPurpose = !purpose || product.tags.some((tag) => normalize(tag.en) === purpose);
        const matchesQuery = !normalizedQuery || searchIndex.includes(normalizedQuery);
        return matchesCategory && matchesPurpose && matchesQuery;
      }),
    [category, indexedProducts, normalizedQuery, purpose]
  );

  const hasFilters = Boolean(normalizedQuery || purpose || category);
  const selectedPurpose = purposeOptions.find((option) => option.value === purpose);
  const selectedCategory = groups.find((group) => group.slug === category);

  function clearFilters() {
    setQuery("");
    setPurpose("");
    setCategory("");
  }

  return (
    <section id="tohnichi-products" className="bg-white py-16">
      <div className="container-page">
        <SectionHeader
          eyebrow={lang === "en" ? "Tohnichi product lineups" : "Lini produk Tohnichi"}
          title={
            lang === "en"
              ? "Explore Tohnichi models by process."
              : "Jelajahi model Tohnichi berdasarkan proses."
          }
          description={
            lang === "en"
              ? "Browse every lineup below, or search by model, task, purpose, and product category to find related products."
              : "Jelajahi seluruh lini di bawah, atau cari berdasarkan model, tugas, tujuan, dan kategori produk untuk menemukan produk terkait."
          }
        />

        <div className="mt-8 border border-graphite-200 bg-graphite-50 p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)_minmax(220px,0.75fr)]">
            <div>
              <label htmlFor="tohnichi-search" className="text-xs font-bold uppercase tracking-[0.15em] text-graphite-600">
                {lang === "en" ? "Search product or application" : "Cari produk atau aplikasi"}
              </label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-400" aria-hidden="true" />
                <input
                  id="tohnichi-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={lang === "en" ? "e.g. inspection, calibration, CEM3-G" : "contoh: inspection, kalibrasi, CEM3-G"}
                  className="focus-ring h-12 w-full border border-graphite-300 bg-white pl-12 pr-11 text-sm font-semibold text-graphite-900 placeholder:font-normal placeholder:text-graphite-400"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="focus-ring absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-graphite-400 hover:text-signal-600"
                    aria-label={lang === "en" ? "Clear search" : "Hapus pencarian"}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="tohnichi-purpose" className="text-xs font-bold uppercase tracking-[0.15em] text-graphite-600">
                {lang === "en" ? "Task / purpose" : "Tugas / tujuan"}
              </label>
              <select
                id="tohnichi-purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                className="focus-ring mt-2 h-12 w-full border border-graphite-300 bg-white px-3 text-sm font-semibold text-graphite-800"
              >
                <option value="">{lang === "en" ? "All tasks and purposes" : "Semua tugas dan tujuan"}</option>
                {purposeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {text(option.label, lang)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tohnichi-category" className="text-xs font-bold uppercase tracking-[0.15em] text-graphite-600">
                {lang === "en" ? "Product category" : "Kategori produk"}
              </label>
              <select
                id="tohnichi-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="focus-ring mt-2 h-12 w-full border border-graphite-300 bg-white px-3 text-sm font-semibold text-graphite-800"
              >
                <option value="">{lang === "en" ? "All product lineups" : "Semua lini produk"}</option>
                {groups.map((group) => (
                  <option key={group.slug} value={group.slug}>
                    {text(group.title, lang)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasFilters ? (
            <div className="mt-4 flex flex-col gap-3 border-t border-graphite-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-graphite-600" aria-live="polite">
                <PackageSearch className="h-5 w-5 text-industrial-700" aria-hidden="true" />
                <span>
                  {lang === "en"
                    ? `${matches.length} matching product${matches.length === 1 ? "" : "s"}`
                    : `${matches.length} produk ditemukan`}
                </span>
                {selectedPurpose ? (
                  <span className="border border-industrial-200 bg-white px-2 py-1 text-xs text-industrial-800">
                    {text(selectedPurpose.label, lang)}
                  </span>
                ) : null}
                {selectedCategory ? (
                  <span className="border border-industrial-200 bg-white px-2 py-1 text-xs text-industrial-800">
                    {text(selectedCategory.title, lang)}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring inline-flex items-center gap-2 self-start text-sm font-bold text-signal-600 hover:text-signal-700 sm:self-auto"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {lang === "en" ? "Reset search" : "Reset pencarian"}
              </button>
            </div>
          ) : null}
        </div>

        {hasFilters ? (
          <section className="mt-10 border-l-4 border-industrial-700 bg-graphite-50 p-5 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Search results" : "Hasil pencarian"}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-graphite-900">
              {normalizedQuery
                ? lang === "en"
                  ? `Products related to “${deferredQuery.trim()}”`
                  : `Produk terkait “${deferredQuery.trim()}”`
                : lang === "en"
                  ? "Products matching your filters"
                  : "Produk yang sesuai dengan filter Anda"}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite-500">
              {lang === "en"
                ? "Results may come from several lineups when their application or tags match your search."
                : "Hasil dapat berasal dari beberapa lini ketika aplikasi atau tag produknya sesuai dengan pencarian Anda."}
            </p>

            {matches.length > 0 ? (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map(({ group, product }) => (
                  <ProductCard
                    key={`${group.slug}-${product.slug}`}
                    product={product}
                    brandSlug="tohnichi"
                    lang={lang}
                    eyebrow={text(group.title, lang)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-7 border border-dashed border-graphite-300 bg-white p-8 text-center">
                <PackageSearch className="mx-auto h-8 w-8 text-graphite-400" aria-hidden="true" />
                <h4 className="mt-4 text-lg font-bold text-graphite-900">
                  {lang === "en" ? "No matching product was found." : "Produk yang sesuai belum ditemukan."}
                </h4>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-graphite-500">
                  {lang === "en"
                    ? "Try a broader keyword or remove one of the filters."
                    : "Coba kata kunci yang lebih umum atau hapus salah satu filter."}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="focus-ring mt-5 inline-flex h-10 items-center gap-2 bg-signal-600 px-4 text-sm font-bold text-white hover:bg-signal-700"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {lang === "en" ? "Show all lineups" : "Tampilkan semua lini"}
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="mt-10 border-t border-graphite-200">
            {groups.map((group) => (
              <UseCaseSection key={group.slug} group={group} brandSlug="tohnichi" lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
