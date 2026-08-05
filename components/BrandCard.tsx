import Link from "next/link";
import { ArrowUpRight, Construction } from "lucide-react";
import type { Brand } from "@/data/brands";
import { text, type Language, withLang } from "@/lib/i18n";
import { canViewBrandDraft, isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { AssetSlot } from "@/components/AssetSlot";
import { BrandLogo } from "@/components/BrandLogo";

export type BrandCardBrand = Pick<Brand, "slug" | "name" | "country" | "category" | "logo" | "heroImage" | "summary">;

const brandCardVisuals: Partial<
  Record<string, { image: string; imageClassName: string }>
> = {
  tohnichi: {
    image: "/assets/brands/products/tohnichi/tohnichi_torque-wrench.jpg",
    imageClassName: "object-[50%_34%]"
  },
  nac: {
    image: "/assets/brands/products/nac/bg_bnr01_pc.jpg",
    imageClassName: "object-center"
  }
};

export function BrandCard({ brand, lang }: { brand: BrandCardBrand; lang: Language }) {
  const cardVisual = brandCardVisuals[brand.slug];
  const isPublic = isBrandPubliclyAvailable(brand.slug);
  const canOpen = canViewBrandDraft(brand.slug);
  const displayName = brand.slug === "tohnichi" ? "Tohnichi Indonesia" : brand.name;

  const content = (
    <>
      <div className="relative">
        <AssetSlot
          src={cardVisual?.image ?? brand.heroImage}
          alt={`${brand.name} products`}
          label={brand.name}
          className="h-44 border-0 border-b border-graphite-200 bg-graphite-50"
          imageClassName={`${cardVisual?.imageClassName ?? "object-center"} group-hover:scale-105`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {!isPublic ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-2 border border-signal-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-signal-600 shadow-sm">
            <Construction className="h-3.5 w-3.5" aria-hidden="true" />
            On progress
          </span>
        ) : null}
        <BrandLogo
          name={brand.name}
          slug={brand.slug}
          src={brand.logo}
          className="absolute bottom-4 left-4 h-20 w-48 border border-graphite-200 shadow-sm"
          sizes="160px"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{brand.country}</p>
            <h3 className="mt-2 text-2xl font-bold text-graphite-900">{displayName}</h3>
          </div>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
              canOpen
                ? "border-graphite-200 bg-graphite-50 transition group-hover:border-industrial-600 group-hover:bg-industrial-700"
                : "border-signal-200 bg-signal-50"
            }`}
          >
            {canOpen ? (
              <ArrowUpRight className="h-4 w-4 text-graphite-500 transition group-hover:text-white" aria-hidden="true" />
            ) : (
              <Construction className="h-4 w-4 text-signal-600" aria-hidden="true" />
            )}
          </span>
        </div>
        <p className="mt-4 break-words text-sm font-semibold text-industrial-700">{text(brand.category, lang)}</p>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(brand.summary, lang)}</p>
        {!isPublic ? (
          <p className="mt-5 border-t border-graphite-200 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-signal-600">
            {lang === "en" ? "Brand page on progress" : "Halaman brand on progress"}
          </p>
        ) : null}
      </div>
    </>
  );

  if (!canOpen) {
    return (
      <article
        aria-label={`${brand.name}: on progress`}
        className="grid overflow-hidden border border-graphite-200 bg-white"
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      href={withLang(`/brands/${brand.slug}`, lang)}
      className="group grid overflow-hidden border border-graphite-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel"
    >
      {content}
    </Link>
  );
}
