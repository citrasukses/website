import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/data/brands";
import { text, type Language, withLang } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

export type BrandCardBrand = Pick<Brand, "slug" | "name" | "country" | "category" | "heroImage" | "summary">;

export function BrandCard({ brand, lang }: { brand: BrandCardBrand; lang: Language }) {
  return (
    <Link
      href={withLang(`/brands/${brand.slug}`, lang)}
      className="group grid overflow-hidden border border-graphite-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel"
    >
      <AssetSlot
        src={brand.heroImage}
        alt={`${brand.name} products`}
        label={brand.name}
        className="h-44 border-0 border-b border-graphite-200 bg-graphite-50"
        imageClassName="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{brand.country}</p>
            <h3 className="mt-2 text-2xl font-bold text-graphite-900">{brand.name}</h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-graphite-200 bg-graphite-50 transition group-hover:border-industrial-600 group-hover:bg-industrial-700">
            <ArrowUpRight className="h-4 w-4 text-graphite-500 transition group-hover:text-white" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 break-words text-sm font-semibold text-industrial-700">{text(brand.category, lang)}</p>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(brand.summary, lang)}</p>
      </div>
    </Link>
  );
}
