import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Layers3, ShieldCheck } from "lucide-react";
import type { SankyoRikagakuFamilyDetail, SankyoRikagakuModel } from "@/data/sankyo-rikagaku-product-details";
import { text, type Language, withLang } from "@/lib/i18n";

const typeTranslations: Record<string, string> = {
  "Abrasive Cloth": "Abrasive Cloth",
  Buffing: "Buffing",
  "Cloth belt": "Cloth Belt",
  "Cloths and rags": "Cloth & Rag",
  "Coating Material": "Coating Material",
  Compounds: "Compound",
  "Dry Abrasive Paper": "Dry Abrasive Paper",
  Film: "Film",
  Films: "Film",
  Kenmaron: "Kenmaron",
  "Magic Type": "Hook-and-loop / Magic Type",
  "Non-woven Fabric Products Sheet products": "Non-woven Sheet",
  "Pads & Hand Sharpening Products": "Pad & Hand Sanding",
  "Pads for sanders": "Sander Pad",
  "Paper belt": "Paper Belt",
  Polisher: "Polisher",
  "PS Type": "Pressure-sensitive / PS Type",
  Sanders: "Sander",
  "Tape & Curing Products": "Tape & Masking",
  "Waterproof Abrasive Paper": "Waterproof Abrasive Paper"
};

function modelType(model: SankyoRikagakuModel, lang: Language) {
  if (!model.type) {
    return lang === "en" ? "Catalogue product" : "Produk katalog";
  }

  if (lang === "en") {
    return model.type;
  }

  return typeTranslations[model.type] ?? model.type;
}

function groupModels(models: SankyoRikagakuModel[], lang: Language) {
  const groups = new Map<string, SankyoRikagakuModel[]>();

  for (const model of models) {
    const key = modelType(model, lang);
    groups.set(key, [...(groups.get(key) ?? []), model]);
  }

  return Array.from(groups, ([label, items]) => ({ label, items }));
}

export function SankyoRikagakuFamilyDetails({
  productName,
  detail,
  lang
}: {
  productName: string;
  detail: SankyoRikagakuFamilyDetail;
  lang: Language;
}) {
  const modelGroups = groupModels(detail.models, lang);

  return (
    <section className="bg-graphite-50 py-14">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Official product-family catalogue" : "Katalog resmi keluarga produk"}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-graphite-900">
              {lang === "en"
                ? `${detail.models.length} ${productName} models and options`
                : `${detail.models.length} model dan pilihan ${productName}`}
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-sm leading-6 text-graphite-500">
              {lang === "en"
                ? "The lineups below follow Sankyo Rikagaku's current FUJISTAR family assignments. A model can appear in more than one family when it is supplied in several product formats."
                : "Lini di bawah mengikuti pengelompokan FUJISTAR terbaru dari Sankyo Rikagaku. Satu model dapat muncul pada lebih dari satu keluarga ketika tersedia dalam beberapa format produk."}
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {modelGroups.map((group) => (
            <section key={group.label}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-graphite-300 pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-signal-600">
                    {lang === "en" ? "Product type" : "Tipe produk"}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-graphite-900">{group.label}</h3>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-graphite-500">
                  <Layers3 className="h-4 w-4 text-industrial-700" aria-hidden="true" />
                  {group.items.length} {lang === "en" ? (group.items.length === 1 ? "option" : "options") : "pilihan"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((model) => (
                  <article
                    id={model.slug}
                    key={model.slug}
                    className="scroll-mt-24 flex flex-col overflow-hidden border border-graphite-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] border-b border-graphite-200 bg-white">
                      <Image
                        src={model.image}
                        alt={`${model.name} Sankyo Rikagaku FUJISTAR`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-5"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-signal-600">
                        {modelType(model, lang)}
                      </p>
                      <h4 className="mt-2 text-base font-bold leading-6 text-graphite-900">{model.name}</h4>
                      {model.applications.length ? (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {model.applications.slice(0, 3).map((application) => (
                            <span
                              key={application}
                              className="border border-graphite-200 bg-graphite-50 px-2 py-1 text-[10px] font-semibold leading-4 text-graphite-600"
                            >
                              {application}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                        <Link
                          href={withLang(`/contact?brand=fuji-star&product=${encodeURIComponent(model.name)}`, lang)}
                          className="text-xs font-bold text-industrial-700 hover:text-signal-600"
                        >
                          {lang === "en" ? "Request this model" : "Minta model ini"}
                        </Link>
                        <a
                          href={model.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-graphite-500 hover:text-industrial-700"
                        >
                          {lang === "en" ? "Official reference" : "Referensi resmi"}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-signal-600" aria-hidden="true" />
            <h3 className="text-xl font-bold text-graphite-900">
              {lang === "en" ? "Information to confirm before selection" : "Informasi yang perlu dikonfirmasi"}
            </h3>
          </div>
          <div className="mt-5 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2 lg:grid-cols-4">
            {detail.selectionChecklist.map((item) => (
              <article key={item.label.en} className="bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-signal-600">
                  {text(item.label, lang)}
                </p>
                <p className="mt-3 text-sm leading-6 text-graphite-600">{text(item.value, lang)}</p>
              </article>
            ))}
          </div>
        </div>

        <article className="mt-8 border border-industrial-200 bg-white p-5 md:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-industrial-700" aria-hidden="true" />
            <h3 className="text-base font-bold text-graphite-900">
              {lang === "en" ? "Selection and catalogue notes" : "Catatan pemilihan dan katalog"}
            </h3>
          </div>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-graphite-600 md:grid-cols-2">
            {detail.notes.map((note) => (
              <li key={note.en} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-signal-500" aria-hidden="true" />
                <span>{text(note, lang)}</span>
              </li>
            ))}
          </ul>
        </article>

        <p className="mt-4 text-xs leading-5 text-graphite-500">
          {lang === "en"
            ? "Manufacturer lineups, specifications, packaging, and availability may change. Confirm the final product code, grit, dimensions, backing, attachment, and delivery status with CSE before ordering."
            : "Lini produsen, spesifikasi, kemasan, dan ketersediaan dapat berubah. Konfirmasikan kode produk akhir, grit, dimensi, backing, attachment, dan status pengiriman dengan CSE sebelum memesan."}
        </p>
      </div>
    </section>
  );
}
