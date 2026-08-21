import { ChevronDown } from "lucide-react";
import type { CatalogProductGroup } from "@/data/catalog-types";
import { ProductCard } from "@/components/ProductCard";
import { text, type Language } from "@/lib/i18n";

const TOHNICHI_PREVIEW_LIMIT = 6;
const TORQUE_SCREWDRIVER_PREVIEW_SLUGS = [
  "rtd",
  "stc2-g-stc2-g-bt",
  "ftd-s",
  "mtd",
  "rtdz",
  "amld-bmld2"
];

export function UseCaseSection({ group, brandSlug, lang }: { group: CatalogProductGroup; brandSlug: string; lang: Language }) {
  const isTohnichi = brandSlug === "tohnichi";
  const orderedProducts =
    isTohnichi && group.slug === "torque-screwdrivers"
      ? [
          ...TORQUE_SCREWDRIVER_PREVIEW_SLUGS.flatMap((slug) => {
            const product = group.products.find((candidate) => candidate.slug === slug);
            return product ? [product] : [];
          }),
          ...group.products.filter((product) => !TORQUE_SCREWDRIVER_PREVIEW_SLUGS.includes(product.slug))
        ]
      : group.products;
  const canExpand = isTohnichi && orderedProducts.length > TOHNICHI_PREVIEW_LIMIT;
  const visibleProducts = canExpand ? orderedProducts.slice(0, TOHNICHI_PREVIEW_LIMIT) : orderedProducts;
  const remainingProducts = canExpand ? orderedProducts.slice(TOHNICHI_PREVIEW_LIMIT) : [];
  const productListId = `${group.slug}-product-list`;

  return (
    <section id={group.slug} className="border-t border-graphite-200 py-10 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{group.slug}</p>
          <h3 className="mt-3 text-2xl font-bold text-graphite-900">{text(group.title, lang)}</h3>
          <p className="mt-3 text-sm leading-6 text-graphite-500">{text(group.description, lang)}</p>
        </div>
        <div>
          <div id={productListId} className="grid gap-4 sm:grid-cols-2">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} brandSlug={brandSlug} lang={lang} />
            ))}
          </div>
          {canExpand ? (
            <details className="group mt-5 border border-industrial-700 bg-white">
              <summary className="focus-ring flex min-h-12 cursor-pointer list-none items-center justify-center gap-2 px-5 text-sm font-bold text-industrial-700 transition hover:bg-industrial-700 hover:text-white">
                {lang === "en"
                  ? `View all ${orderedProducts.length} product families`
                  : `Lihat semua ${orderedProducts.length} keluarga produk`}
                <ChevronDown
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="grid gap-4 border-t border-industrial-200 p-4 sm:grid-cols-2">
                {remainingProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} brandSlug={brandSlug} lang={lang} />
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}
