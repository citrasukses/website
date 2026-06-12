import type { Product } from "@/data/brands";
import { text, type Language } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

export function ProductCard({ product, lang }: { product: Product; lang: Language }) {
  return (
    <article className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel">
      <AssetSlot
        src={product.image}
        alt={product.name}
        label={product.name}
        className="h-48 border-0 border-b border-graphite-200 bg-graphite-50"
        imageClassName="object-contain p-6 transition duration-500 group-hover:scale-105"
      />
      <div className="p-5">
        <h4 className="text-lg font-bold text-graphite-900">{product.name}</h4>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(product.summary, lang)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={text(tag, lang)} className="border border-graphite-200 bg-graphite-50 px-2.5 py-1 text-xs font-semibold text-graphite-600">
              {text(tag, lang)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
