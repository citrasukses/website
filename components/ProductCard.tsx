import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog-types";
import { text, type Language } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

export function ProductCard({ product, brandSlug, lang }: { product: CatalogProduct; brandSlug: string; lang: Language }) {
  const href = `/brands/${brandSlug}/products/${product.slug}${lang === "en" ? "?lang=en" : ""}`;
  return (
    <article className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel">
      <Link href={href}>
        <AssetSlot
          src={product.image || product.images[0] || ""}
          alt={product.name}
          label={product.name}
          className="h-48 border-0 border-b border-graphite-200 bg-graphite-50"
          imageClassName="object-contain p-6 transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-graphite-900"><Link href={href}>{product.name}</Link></h4>
            {product.model ? <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-graphite-500">{product.model}</p> : null}
          </div>
          <Link href={href} aria-label={`View ${product.name}`} className="flex h-9 w-9 shrink-0 items-center justify-center border border-graphite-200 text-industrial-700"><ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(product.summary, lang)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={text(tag, lang)} className="border border-graphite-200 bg-graphite-50 px-2.5 py-1 text-xs font-semibold text-graphite-600">
              {text(tag, lang)}
            </span>
          ))}
        </div>
        <Link href={href} className="mt-5 inline-flex text-sm font-bold text-industrial-700 hover:text-signal-600">
          {lang === "en" ? "Details and specifications" : "Detail dan spesifikasi"}
        </Link>
      </div>
    </article>
  );
}
