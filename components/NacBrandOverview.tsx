import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Droplets, Gauge, ScanLine, Wrench } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { withLang } from "@/lib/i18n";

const selectionFlow = [
  {
    icon: Wrench,
    label: { id: "Tool", en: "Tool" },
    value: { id: "Square drive atau shank", en: "Square drive or shank" }
  },
  {
    icon: ScanLine,
    label: { id: "Fastener", en: "Fastener" },
    value: { id: "Hex, PH, slotted, TORX, custom", en: "Hex, PH, slotted, TORX, custom" }
  },
  {
    icon: Droplets,
    label: { id: "Fluida", en: "Fluid" },
    value: { id: "Air, water, oil, vacuum", en: "Air, water, oil, vacuum" }
  },
  {
    icon: Gauge,
    label: { id: "Pressure", en: "Pressure" },
    value: { id: "Low, medium, atau high", en: "Low, medium, or high" }
  }
];

const catalogueFacts = [
  {
    label: { id: "Keluarga pada website", en: "Website catalogue families" },
    value: "28",
    detail: { id: "12 fastener-tool dan 16 quick-coupling families", en: "12 fastener-tool and 16 quick-coupling families" }
  },
  {
    label: { id: "Quick-coupling families", en: "Quick-coupling families" },
    value: "16",
    detail: { id: "Low, medium, high pressure, vacuum, dan custom", en: "Low, medium, high pressure, vacuum, and custom" }
  },
  {
    label: { id: "High-pressure working range", en: "High-pressure working range" },
    value: "20.5 MPa",
    detail: { id: "CHP dan stainless CSH series", en: "CHP and stainless CSH series" }
  }
];

export function NacBrandOverview({ lang }: { lang: Language }) {
  return (
    <>
      <section className="overflow-hidden bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              Fastener Tools 8 · Quick Couplings 9
            </p>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-graphite-900 md:text-5xl">
              {lang === "en"
                ? "One specialist for the connection—at the fastener and in the fluid line."
                : "Satu spesialis untuk koneksi—pada fastener maupun fluid line."}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite-500">
              {lang === "en"
                ? "NAC combines quality sockets and industrial bits with a complete quick-coupling range. CSE can help translate a fastener, drawing, mating sample, fluid, pressure, and connection requirement into the correct standard or custom-made solution—even when the quantity is small."
                : "NAC menggabungkan socket berkualitas dan industrial bits dengan rangkaian quick coupling yang lengkap. CSE membantu menerjemahkan fastener, drawing, mating sample, fluida, pressure, dan kebutuhan koneksi menjadi solusi standard atau custom-made yang tepat—bahkan untuk jumlah kecil."}
            </p>

            <div className="mt-8 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
              {selectionFlow.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label.en} className="bg-graphite-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-industrial-800 text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-signal-600">
                          {lang === "en" ? item.label.en : item.label.id}
                        </p>
                        <p className="mt-1 text-sm font-bold text-graphite-900">
                          {lang === "en" ? item.value.en : item.value.id}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid min-h-[520px] gap-3 sm:grid-cols-2 sm:grid-rows-[260px_220px]">
            <figure className="group relative min-h-64 overflow-hidden bg-graphite-900 sm:row-span-2">
              <Image
                src="/assets/brands/products/nac/catalog-special-parts.png"
                alt={
                  lang === "en"
                    ? "NAC special sockets, driver bits, and custom fastening tools"
                    : "Socket, driver bit, dan custom fastening tools NAC"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite-900 via-graphite-900/80 to-transparent px-5 pb-5 pt-14 text-sm font-bold text-white">
                {lang === "en"
                  ? "Special and low-volume custom sockets"
                  : "Special dan custom socket volume rendah"}
              </figcaption>
            </figure>

            <figure className="group relative min-h-64 overflow-hidden border border-graphite-200 bg-white sm:min-h-0">
              <Image
                src="/assets/brands/products/nac/couplings/catalog-coupling-cns-type.png"
                alt={
                  lang === "en"
                    ? "NAC CNS non-drip safety quick coupling catalogue"
                    : "Katalog quick coupling NAC CNS non-drip safety"
                }
                fill
                sizes="(max-width: 640px) 100vw, 26vw"
                className="object-contain p-3 transition duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute bottom-3 left-3 bg-graphite-900/95 px-3 py-2 text-xs font-bold text-white shadow-sm">
                CNS · Non-drip Safety
              </figcaption>
            </figure>

            <figure className="group relative min-h-48 overflow-hidden border border-graphite-200 bg-white sm:min-h-0">
              <Image
                src="/assets/brands/products/nac/couplings/catalog-coupling-cch-type.png"
                alt={
                  lang === "en"
                    ? "NAC CCH coil tube with quick couplings"
                    : "NAC CCH coil tube dengan quick coupling"
                }
                fill
                sizes="(max-width: 640px) 100vw, 26vw"
                className="object-contain p-3 transition duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-xs font-bold text-graphite-900 shadow-sm">
                CCH · Coil tube
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-10">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
            {catalogueFacts.map((item) => (
              <article key={item.label.en} className="bg-white p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-signal-600">
                      {lang === "en" ? item.label.en : item.label.id}
                    </p>
                    <p className="mt-4 text-xl font-bold text-graphite-900">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-graphite-500">
                      {lang === "en" ? item.detail.en : item.detail.id}
                    </p>
                  </div>
                  <Box className="mt-1 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-graphite-900 py-16 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">
              CNS · Non-drip Safety
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight md:text-4xl">
              {lang === "en"
                ? "See the difference at disconnection."
                : "Lihat perbedaannya saat disconnection."}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              {lang === "en"
                ? "NAC's CNS twin-valve sealing method reduces liquid drip by approximately 99.8% versus SPE under catalogue test conditions. Less released fluid means a cleaner work area, lower slip risk, and less material loss."
                : "Metode sealing twin-valve NAC CNS mengurangi tetesan cairan sekitar 99,8% dibanding SPE pada kondisi uji katalog. Fluida yang jauh lebih sedikit membantu menjaga area kerja tetap bersih, mengurangi slip risk, dan mengurangi material loss."}
            </p>
            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15">
              <div className="bg-graphite-800 p-4">
                <p className="text-2xl font-bold text-white">≈99.8%</p>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  {lang === "en" ? "less drip vs SPE" : "lebih sedikit vs SPE"}
                </p>
              </div>
              <div className="bg-graphite-800 p-4">
                <p className="text-2xl font-bold text-white">0.008 mL</p>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  {lang === "en" ? "catalogue value, CNS02" : "nilai katalog, CNS02"}
                </p>
              </div>
            </div>
            <Link
              href={withLang("/brands/nac/products/cns-type", lang)}
              className="focus-ring mt-7 inline-flex min-h-11 items-center gap-2 border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:border-signal-500 hover:text-white"
            >
              {lang === "en" ? "Explore CNS models" : "Lihat model CNS"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <figure className="overflow-hidden border border-white/15 bg-black shadow-2xl">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/FeE6v_wylO8?rel=0"
                title={
                  lang === "en"
                    ? "NAC CNS non-drip quick coupling demonstration"
                    : "Demonstrasi quick coupling NAC CNS non-drip"
                }
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="border-t border-white/15 bg-graphite-800 px-4 py-3 text-xs leading-5 text-white/65">
              {lang === "en"
                ? "Demonstration supplied by NAC. Performance varies with fluid, pressure, viscosity, size, and operating conditions."
                : "Demonstrasi dari NAC. Performance dapat berbeda menurut fluida, pressure, viscosity, size, dan kondisi operasi."}
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
