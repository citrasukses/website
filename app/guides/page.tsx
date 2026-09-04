import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import {
  buyerGuides,
  getGuideEditorial,
  getGuideTagLabel
} from "@/data/buyer-guides";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  return buildPageMetadata({
    path: "/guides",
    title: lang === "en" ? "Torque Tool Buyer Guides" : "Buyer Guide Torque Tools",
    description: lang === "en" ? "Practical CSE guides for selecting torque wrenches, screwdrivers, testers, calibration methods, and poka-yoke systems." : "Panduan praktis CSE untuk memilih torque wrench, screwdriver, tester, metode calibration, dan sistem poka-yoke.",
    lang,
    image: "/assets/company/background-items/tohnichi-dial-torque-gauge.jpg",
    imageAlt: "CSE torque tool buyer guides"
  });
}

export default function GuidesPage() {
  const lang = staticLanguage();
  const title = lang === "en" ? "Torque Tool Buyer Guides" : "Buyer Guide Torque Tools";
  const description = lang === "en"
    ? "Practical CSE guides for selecting torque wrenches, screwdrivers, testers, calibration methods, and poka-yoke systems."
    : "Panduan praktis CSE untuk memilih torque wrench, screwdriver, tester, metode calibration, dan sistem poka-yoke.";
  const [featuredGuide, ...guideList] = buyerGuides;
  const featuredEditorial = getGuideEditorial(featuredGuide.slug);
  const jsonLd = buildCollectionJsonLd({
    path: "/guides",
    title,
    description,
    lang,
    items: buyerGuides.map((guide) => ({ name: text(guide.title, lang), path: `/guides/${guide.slug}` }))
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Guides" : "Panduan" }]} />

      <main>
        <header className="border-y border-graphite-200 bg-[#f3f1ec] py-12 md:py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-signal-600">
                {lang === "en" ? "CSE technical library" : "Perpustakaan teknis CSE"}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-graphite-900 md:text-6xl">
                {lang === "en"
                  ? "Technical guidance for better purchasing decisions."
                  : "Panduan teknis untuk keputusan pembelian yang lebih yakin."}
              </h1>
            </div>
            <div className="border-l-2 border-industrial-700 pl-6">
              <p className="text-sm leading-7 text-graphite-500">
                {lang === "en"
                  ? "Start with the application—not the catalogue. These notes help production, quality, maintenance, and procurement teams identify the information that actually changes a tool recommendation."
                  : "Mulai dari aplikasinya, bukan dari katalog. Catatan ini membantu tim produksi, quality, maintenance, dan procurement menemukan data yang benar-benar mengubah rekomendasi tool."}
              </p>
              <div className="mt-5 flex items-baseline gap-3 border-t border-graphite-200 pt-4">
                <span className="font-mono text-3xl font-black text-industrial-700">{String(buyerGuides.length).padStart(2, "0")}</span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">
                  {lang === "en" ? "published guides" : "panduan tersedia"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-white py-14 md:py-20">
          <div className="container-page">
            <div className="flex items-end justify-between gap-6 border-b border-graphite-200 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
                  {lang === "en" ? "Field guide" : "Panduan lapangan"}
                </p>
                <h2 className="mt-2 text-2xl font-black text-graphite-900 md:text-3xl">
                  {lang === "en" ? "Start with a worked technical setup" : "Mulai dari setup teknis yang lengkap"}
                </h2>
              </div>
              <span className="hidden font-mono text-xs font-bold text-graphite-500 sm:block">FEATURE 01</span>
            </div>

            <article className="mt-8 grid overflow-hidden bg-graphite-900 text-white lg:grid-cols-[0.9fr_1.1fr]">
              <AssetSlot
                src={featuredGuide.image}
                alt={text(featuredGuide.imageAlt, lang)}
                className="min-h-72 border-0 border-b border-white/10 lg:min-h-[430px] lg:border-b-0 lg:border-r"
                fit="contain"
                imageClassName="p-8"
                sizes="(max-width: 1024px) 100vw, 44vw"
                priority
              />
              <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                    <span className="text-signal-500">{text(featuredEditorial.format, lang)}</span>
                    <span aria-hidden="true">/</span>
                    <span>{featuredEditorial.readingMinutes} {lang === "en" ? "min read" : "menit baca"}</span>
                  </div>
                  <h3 className="mt-6 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
                    {text(featuredGuide.title, lang)}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                    {text(featuredGuide.description, lang)}
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
                  <div className="inline-flex rounded-md border border-white/20 bg-white px-3 py-2.5 shadow-sm">
                    <Image
                      src="/assets/brands/logos/tohnichi--alternate.png"
                      alt="TOHNICHI logo"
                      width={144}
                      height={56}
                      className="h-10 w-32 object-contain object-left"
                    />
                  </div>
                  <Link href={withLang(`/guides/${featuredGuide.slug}`, lang)} className="focus-ring group inline-flex items-center gap-3 text-sm font-bold">
                    {lang === "en" ? "Open field guide" : "Buka panduan lapangan"}
                    <ArrowRight className="h-5 w-5 text-signal-500 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            <div className="mt-16 flex items-end justify-between gap-6 border-b-2 border-graphite-900 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
                  {lang === "en" ? "Selection notes & explainers" : "Catatan pemilihan & penjelasan"}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-graphite-900">
                  {lang === "en" ? "Browse the technical library" : "Jelajahi perpustakaan teknis"}
                </h2>
              </div>
              <span className="hidden text-sm text-graphite-500 sm:block">
                {guideList.length} {lang === "en" ? "articles" : "artikel"}
              </span>
            </div>

            <div>
              {guideList.map((guide, index) => {
                const editorial = getGuideEditorial(guide.slug);
                const topics = guide.topics.map((topic) => text(getGuideTagLabel("topics", topic), lang));

                return (
                  <article key={guide.slug} className="group border-b border-graphite-200">
                    <Link
                      href={withLang(`/guides/${guide.slug}`, lang)}
                      className="focus-ring grid gap-5 py-7 sm:grid-cols-[48px_minmax(0,1fr)_150px] sm:items-center md:py-9 lg:grid-cols-[64px_minmax(0,1fr)_220px] lg:gap-8"
                    >
                      <span className="self-start font-mono text-sm font-bold text-graphite-500 sm:pt-1">
                        {String(index + 2).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.12em]">
                          <span className="text-signal-600">{text(editorial.format, lang)}</span>
                          <span className="text-graphite-500">{topics.join(" · ")}</span>
                        </div>
                        <h3 className="mt-3 max-w-3xl text-2xl font-black leading-tight tracking-tight text-graphite-900 transition group-hover:text-industrial-700 md:text-3xl">
                          {text(guide.title, lang)}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-graphite-500">{text(guide.description, lang)}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-graphite-500">
                          <span>{text(editorial.audience, lang)}</span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                            {editorial.readingMinutes} {lang === "en" ? "min" : "menit"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-bold text-industrial-700">
                            {lang === "en" ? "Read guide" : "Baca panduan"}
                            <ArrowRight className="h-4 w-4 text-signal-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <AssetSlot
                        src={guide.image}
                        alt={text(guide.imageAlt, lang)}
                        className="aspect-[4/3] border border-graphite-200 bg-graphite-50"
                        fit="contain"
                        imageClassName="p-4 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 220px"
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-graphite-200 bg-[#f3f1ec] py-14">
          <div className="container-page flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-graphite-900">
                {lang === "en" ? "Cannot find the application you are working on?" : "Belum menemukan aplikasi yang sedang Anda kerjakan?"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite-500">
                {lang === "en" ? "Send the target, tool or fastener photo, and the process condition. The CSE technical team can help identify the next question." : "Kirim target, foto tool atau fastener, dan kondisi prosesnya. Tim teknis CSE dapat membantu menentukan pertanyaan berikutnya."}
              </p>
            </div>
            <CTAButton href={withLang("/contact?topic=technical-guide", lang)}>
              {lang === "en" ? "Ask the technical team" : "Tanya tim teknis"}
            </CTAButton>
          </div>
        </section>
      </main>
    </>
  );
}
