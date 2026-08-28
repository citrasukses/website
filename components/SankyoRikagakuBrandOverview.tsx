import Image from "next/image";
import { Factory, Layers3, ScanSearch } from "lucide-react";
import type { Language } from "@/lib/i18n";

const catalogueFacts = [
  {
    icon: Factory,
    label: { id: "Didirikan di Jepang", en: "Established in Japan" },
    value: "1930",
    detail: {
      id: "Berawal sebagai produsen coated abrasive paper.",
      en: "Founded as a coated abrasive paper manufacturer."
    }
  },
  {
    icon: Layers3,
    label: { id: "Kategori produk utama", en: "Primary product families" },
    value: "6",
    detail: {
      id: "Sheet, disc, belt, roll, non-woven, dan supporting products.",
      en: "Sheet, disc, belt, roll, non-woven, and supporting products."
    }
  },
  {
    icon: ScanSearch,
    label: { id: "Penempatan model katalog", en: "Catalogue model placements" },
    value: "99",
    detail: {
      id: "Model dapat muncul pada lebih dari satu format resmi.",
      en: "Models may appear in more than one official format."
    }
  }
];

export function SankyoRikagakuBrandOverview({ lang }: { lang: Language }) {
  return (
    <>
      <section className="overflow-hidden bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              SANKYO RIKAGAKU CO., LTD. · FUJISTAR
            </p>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-graphite-900 md:text-5xl">
              {lang === "en"
                ? "Polishing technology shaped since 1930."
                : "Teknologi polishing yang terus diasah sejak 1930."}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite-500">
              {lang === "en"
                ? "Sankyo Rikagaku is the Japanese manufacturer behind FUJISTAR abrasives. Its portfolio spans abrasive paper and cloth, precision films, belts, non-woven products, polishing tools, and finishing supplies for automotive, steel, woodworking, electronics, and general industry."
                : "Sankyo Rikagaku adalah produsen Jepang di balik abrasive FUJISTAR. Portofolionya mencakup abrasive paper dan cloth, precision film, belt, non-woven, polishing tools, serta finishing supplies untuk automotive, steel, woodworking, electronics, dan general industry."}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-graphite-500">
              {lang === "en"
                ? "On this CSE catalogue, Sankyo Rikagaku is the primary brand name and FUJISTAR identifies the manufacturer's abrasive product line."
                : "Pada katalog CSE ini, Sankyo Rikagaku digunakan sebagai nama brand utama dan FUJISTAR mengidentifikasi lini produk abrasive dari produsennya."}
            </p>
          </div>

          <div className="grid min-h-[520px] gap-3 sm:grid-cols-2 sm:grid-rows-[260px_220px]">
            <figure className="group relative min-h-72 overflow-hidden bg-graphite-900 sm:row-span-2">
              <Image
                src="/assets/brands/products/fuji-star/car_body_abrasive.webp"
                alt={
                  lang === "en"
                    ? "Automotive body sanding process representing Sankyo Rikagaku FUJISTAR abrasive applications"
                    : "Proses sanding body automotive untuk aplikasi abrasive Sankyo Rikagaku FUJISTAR"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent px-5 pb-5 pt-16 text-sm font-bold text-white">
                {lang === "en" ? "Surface preparation and automotive repair" : "Surface preparation dan automotive repair"}
              </figcaption>
            </figure>

            <figure className="group relative min-h-64 overflow-hidden border border-graphite-200 bg-white sm:min-h-0">
              <Image
                src="/assets/brands/products/fuji-star/catalog/wet-dry-sanding-paper.jpg"
                alt={
                  lang === "en"
                    ? "FUJISTAR water resistant abrasive paper by Sankyo Rikagaku"
                    : "Water resistant abrasive paper FUJISTAR dari Sankyo Rikagaku"
                }
                fill
                sizes="(max-width: 640px) 100vw, 26vw"
                className="object-contain p-5 transition duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-xs font-bold text-graphite-900 shadow-sm">
                Abrasive paper
              </figcaption>
            </figure>

            <figure className="group relative min-h-56 overflow-hidden border border-graphite-200 bg-white sm:min-h-0">
              <Image
                src="/assets/brands/products/fuji-star/catalog/abrasive-cloth-belt-rseries.jpg"
                alt={
                  lang === "en"
                    ? "FUJISTAR cloth belt R Series by Sankyo Rikagaku"
                    : "Cloth Belt R Series FUJISTAR dari Sankyo Rikagaku"
                }
                fill
                sizes="(max-width: 640px) 100vw, 26vw"
                className="object-contain p-5 transition duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-xs font-bold text-graphite-900 shadow-sm">
                Cloth belt R Series
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-10">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
            {catalogueFacts.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.label.en} className="bg-white p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-signal-600">
                        {lang === "en" ? item.label.en : item.label.id}
                      </p>
                      <p className="mt-4 text-3xl font-bold text-graphite-900">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-graphite-500">
                        {lang === "en" ? item.detail.en : item.detail.id}
                      </p>
                    </div>
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
