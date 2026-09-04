import Link from "next/link";
import { ArrowUpRight, Bluetooth, Database, ShieldCheck, Wifi } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog-types";
import { text, type Language, withLang } from "@/lib/i18n";
import { AssetSlot } from "@/components/AssetSlot";

export function ProductCard({
  product,
  brandSlug,
  lang,
  eyebrow,
  reason
}: {
  product: CatalogProduct;
  brandSlug: string;
  lang: Language;
  eyebrow?: string;
  reason?: string;
}) {
  const href = withLang(`/brands/${brandSlug}/products/${product.slug}`, lang);
  const isSankyoRikagaku = brandSlug === "fuji-star";
  const tagKeys = new Set(product.tags.map((tag) => tag.en.toLowerCase()));
  const englishDescription = text(product.summary, "en");
  const hasBluetooth = /bluetooth|(?:^|[-/\s])bt(?:a|s|d)?(?:$|[-/\s])/i.test(`${product.name} ${englishDescription}`);
  const hasWireless = tagKeys.has("wireless");
  const hasData = tagKeys.has("data management");
  const hasProofing = tagKeys.has("error proofing") || tagKeys.has("pokayoke");
  const regularTags = product.tags.filter(
    (tag) => !["wireless", "data management", "error proofing", "pokayoke"].includes(tag.en.toLowerCase())
  );
  const smartCapabilities = [
    hasBluetooth
      ? {
          key: "bluetooth",
          label: "Bluetooth",
          icon: Bluetooth,
          className: "border-sky-200 bg-sky-50 text-sky-800"
        }
      : hasWireless
        ? {
            key: "wireless",
            label: lang === "en" ? "Wireless" : "Nirkabel",
            icon: Wifi,
            className: "border-sky-200 bg-sky-50 text-sky-800"
          }
        : null,
    hasProofing
      ? {
          key: "proofing",
          label: lang === "en" ? "Poka-yoke" : "Anti salah / poka-yoke",
          icon: ShieldCheck,
          className: "border-amber-200 bg-amber-50 text-amber-900"
        }
      : null,
    hasData
      ? {
          key: "data",
          label: lang === "en" ? "Data transfer / logging" : "Kirim / rekam data",
          icon: Database,
          className: "border-emerald-200 bg-emerald-50 text-emerald-800"
        }
      : null
  ].filter((capability): capability is NonNullable<typeof capability> => capability !== null);

  return (
    <article className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel">
      <Link href={href}>
        <AssetSlot
          src={product.image || product.images[0] || ""}
          alt={product.name}
          label={product.name}
          className="h-48 border-0 border-b border-graphite-200 bg-graphite-50"
          imageClassName="p-5 transition duration-500 group-hover:scale-[1.03]"
          fit="contain"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="p-5">
        {reason ? (
          <p className="mb-4 border-l-2 border-industrial-600 bg-industrial-50 px-3 py-2 text-xs font-bold leading-5 text-industrial-800">
            <span className="block text-[10px] uppercase tracking-[0.14em] text-industrial-600">
              {lang === "en" ? "Why it matches" : "Mengapa cocok"}
            </span>
            {reason}
          </p>
        ) : null}
        {eyebrow ? (
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-signal-600">{eyebrow}</p>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-graphite-900"><Link href={href}>{product.name}</Link></h4>
            {product.model ? <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-graphite-500">{product.model}</p> : null}
          </div>
          <Link
            href={href}
            aria-label={lang === "en" ? `View ${product.name}` : `Lihat ${product.name}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-graphite-200 text-industrial-700"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-graphite-500">{text(product.summary, lang)}</p>
        {smartCapabilities.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label={lang === "en" ? "Smart capabilities" : "Fitur pintar"}>
            {smartCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <span
                  key={capability.key}
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold ${capability.className}`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {capability.label}
                </span>
              );
            })}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {regularTags.map((tag, index) => (
            <span key={`${tag.en}-${index}`} className="border border-graphite-200 bg-graphite-50 px-2.5 py-1 text-xs font-semibold text-graphite-600">
              {text(tag, lang)}
            </span>
          ))}
        </div>
        <Link href={href} className="mt-5 inline-flex text-sm font-bold text-industrial-700 hover:text-signal-600">
          {isSankyoRikagaku
            ? lang === "en"
              ? `${product.name} models and options`
              : `Model dan pilihan ${product.name}`
            : lang === "en"
              ? `${product.name} details and specifications`
              : `Detail dan spesifikasi ${product.name}`}
        </Link>
      </div>
    </article>
  );
}
