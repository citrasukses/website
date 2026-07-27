import type { CatalogProductGroup } from "@/data/catalog-types";
import { ProductCard } from "@/components/ProductCard";
import { text, type Language } from "@/lib/i18n";

export function UseCaseSection({ group, brandSlug, lang }: { group: CatalogProductGroup; brandSlug: string; lang: Language }) {
  return (
    <section id={group.slug} className="border-t border-graphite-200 py-10 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{group.slug}</p>
          <h3 className="mt-3 text-2xl font-bold text-graphite-900">{text(group.title, lang)}</h3>
          <p className="mt-3 text-sm leading-6 text-graphite-500">{text(group.description, lang)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {group.products.map((product) => (
            <ProductCard key={product.slug} product={product} brandSlug={brandSlug} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
