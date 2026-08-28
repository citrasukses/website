import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Factory, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { seedCatalog } from "@/data/catalog-seed";
import type { Language } from "@/lib/i18n";
import { withLang } from "@/lib/i18n";

const categories = [
  {
    href: "/torque-wrench",
    title: { id: "Torque Wrench", en: "Torque Wrenches" },
    description: {
      id: "Click, preset, indicating, digital, dan wireless untuk assembly, maintenance, serta inspection.",
      en: "Click, preset, indicating, digital, and wireless tools for assembly, maintenance, and inspection."
    },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg"
  },
  {
    href: "/torque-screwdriver",
    title: { id: "Torque Screwdriver", en: "Torque Screwdrivers" },
    description: {
      id: "Adjustable, preset, rotary-slip, dan digital untuk screw tightening bertorsi kecil.",
      en: "Adjustable, preset, rotary-slip, and digital tools for low-torque screw tightening."
    },
    image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd.png"
  },
  {
    href: "/torque-tester",
    title: { id: "Torque Tester & Calibration", en: "Torque Testers & Calibration" },
    description: {
      id: "Tester, checker, calibrator, dan data management untuk menjaga kondisi torque tool.",
      en: "Testers, checkers, calibrators, and data management for maintaining torque-tool condition."
    },
    image: "/assets/brands/products/tohnichi/catalog/tester-checker/dote4-dote4-g.png"
  }
] as const;

const tohnichiGroups = seedCatalog.find((brand) => brand.slug === "tohnichi")?.productGroups ?? [];
const catalogueProducts = tohnichiGroups.flatMap((group) =>
  group.products.map((product) => ({ group, product }))
);
const featuredProductSlugs = [
  "ql-qle2",
  "fd-fdd",
  "qsp-qsp-mh",
  "cem3-cem3-g",
  "rtd",
  "stc2-g-stc2-g-bt",
  "st3-g-st3-g-bt",
  "ac3",
  "dote4-dote4-g",
  "tcc2-tcc2-g"
] as const;
const keyModels = featuredProductSlugs.flatMap((productSlug) => {
  const item = catalogueProducts.find(({ product }) => product.slug === productSlug);
  return item
    ? [
        {
          href: `/brands/tohnichi/products/${item.product.slug}`,
          name: item.product.name,
          use: item.group.title,
          image: item.product.image
        }
      ]
    : [];
});

const solutionLinks = [
  {
    href: "/solutions/torque-control",
    icon: Gauge,
    title: { id: "Torque Control", en: "Torque Control" },
    description: { id: "Tool, metode, verification, dan data sebagai satu sistem.", en: "Tools, methods, verification, and data as one system." }
  },
  {
    href: "/solutions/poka-yoke-tightening",
    icon: ShieldCheck,
    title: { id: "Poka-Yoke Tightening", en: "Poka-Yoke Tightening" },
    description: { id: "Cegah missed tightening, wrong sequence, dan proses terlewat.", en: "Prevent missed tightening, wrong sequences, and skipped work." }
  },
  {
    href: "/solutions/torque-calibration-verification",
    icon: Wrench,
    title: { id: "Calibration & Verification", en: "Calibration & Verification" },
    description: { id: "Bangun periodic check dan traceability kondisi tool.", en: "Build periodic checks and tool-condition traceability." }
  }
] as const;

const applicationLinks = [
  { href: "/industries/automotive", label: { id: "Otomotif", en: "Automotive" } },
  { href: "/industries/heavy-equipment", label: { id: "Alat berat", en: "Heavy equipment" } },
  { href: "/industries/general-industry", label: { id: "General manufacturing", en: "General manufacturing" } }
] as const;

const guideLinks = [
  { href: "/guides/cara-memilih-torque-wrench", label: { id: "Cara memilih torque wrench", en: "How to choose a torque wrench" } },
  { href: "/guides/mencegah-missed-tightening", label: { id: "Cara mencegah missed tightening", en: "How to prevent missed tightening" } },
  { href: "/guides/mengapa-torque-wrench-perlu-dikalibrasi", label: { id: "Mengapa torque wrench perlu dikalibrasi?", en: "Why do torque wrenches need calibration?" } }
] as const;

function local<T extends { id: string; en: string }>(value: T, lang: Language) {
  return value[lang];
}

export function TohnichiBrandLanding({ lang }: { lang: Language }) {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              {lang === "en" ? "Choose by product category" : "Pilih berdasarkan kategori produk"}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold text-graphite-900 md:text-5xl">
              {lang === "en" ? "Start with the work, range, and required control." : "Mulai dari pekerjaan, range, dan tingkat kontrol."}
            </h2>
            <p className="mt-5 text-base leading-7 text-graphite-500">
              {lang === "en"
                ? "CSE helps Indonesian factories select TOHNICHI tools around the joint, operator workflow, verification plan, and traceability requirement."
                : "CSE membantu pabrik di Indonesia memilih TOHNICHI berdasarkan joint, alur kerja operator, verification plan, dan kebutuhan traceability."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={withLang(category.href, lang)}
                className="group border border-graphite-200 bg-graphite-50 transition hover:-translate-y-1 hover:border-industrial-400 hover:shadow-panel"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-white">
                  <Image
                    src={category.image}
                    alt={`TOHNICHI ${local(category.title, lang)}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-5 transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border-t border-graphite-200 p-6">
                  <h3 className="text-xl font-bold text-graphite-900">{local(category.title, lang)}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">{local(category.description, lang)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700">
                    {lang === "en" ? "Explore category" : "Lihat kategori"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                {lang === "en" ? "Core TOHNICHI catalogue" : "Katalog inti TOHNICHI"}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-graphite-900 md:text-4xl">
                {lang === "en"
                  ? "25 fully detailed families for the first selection phase."
                  : "25 family dengan detail lengkap untuk tahap awal pemilihan."}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-graphite-500">
                {lang === "en"
                  ? "Each priority page includes official-source model and specification data for tightening, inspection, calibration, or small-torque measurement."
                  : "Setiap halaman prioritas memuat data model dan spesifikasi dari sumber resmi untuk tightening, inspection, kalibrasi, atau pengukuran torsi kecil."}
              </p>
            </div>
            <Link
              href={withLang("/brands/tohnichi/products", lang)}
              className="focus-ring inline-flex items-center gap-2 self-start font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 md:self-auto"
            >
              {lang === "en" ? "Browse the complete catalogue" : "Buka katalog lengkap"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2 lg:grid-cols-5">
            {keyModels.map((model) => (
              <Link key={model.href} href={withLang(model.href, lang)} className="group flex items-center gap-4 bg-white p-4 hover:bg-industrial-50">
                <span className="relative h-20 w-24 shrink-0 bg-white">
                  <Image src={model.image} alt={`TOHNICHI ${model.name}`} fill sizes="96px" className="object-contain p-1" />
                </span>
                <span>
                  <span className="block font-bold text-graphite-900 group-hover:text-industrial-800">{model.name}</span>
                  <span className="mt-1 block text-xs leading-5 text-graphite-500">{local(model.use, lang)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              {lang === "en" ? "Sales, service & calibration" : "Sales, service & calibration"}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-graphite-900 md:text-4xl">
              {lang === "en" ? "Support beyond the torque-tool model." : "Dukungan lebih dari sekadar model torque tool."}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {solutionLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={withLang(item.href, lang)} className="group border border-graphite-200 p-5 hover:border-industrial-400 hover:bg-graphite-50">
                    <Icon className="h-6 w-6 text-signal-600" aria-hidden="true" />
                    <h3 className="mt-4 font-bold text-graphite-900">{local(item.title, lang)}</h3>
                    <p className="mt-2 text-sm leading-6 text-graphite-500">{local(item.description, lang)}</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-industrial-700 transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border border-graphite-200 bg-graphite-50 p-6">
              <div className="flex items-center gap-3">
                <Factory className="h-6 w-6 text-signal-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-graphite-900">{lang === "en" ? "Industrial applications" : "Aplikasi industri"}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {applicationLinks.map((item) => (
                  <Link key={item.href} href={withLang(item.href, lang)} className="border border-graphite-300 bg-white px-3 py-2 text-sm font-bold text-graphite-700 hover:border-industrial-500 hover:text-industrial-800">
                    {local(item.label, lang)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-graphite-200 bg-graphite-50 p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-signal-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-graphite-900">{lang === "en" ? "Technical guides" : "Panduan teknis"}</h3>
              </div>
              <ul className="mt-4 divide-y divide-graphite-200">
                {guideLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={withLang(item.href, lang)} className="group flex items-center justify-between gap-3 py-3 text-sm font-bold text-graphite-700 hover:text-industrial-800">
                      {local(item.label, lang)}
                      <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
