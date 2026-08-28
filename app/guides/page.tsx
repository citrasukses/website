import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { buyerGuides } from "@/data/buyer-guides";
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
      <Hero
        eyebrow={lang === "en" ? "Technical buyer guides" : "Technical buyer guides"}
        title={lang === "en" ? "Make a better shortlist before asking for a quotation." : "Buat shortlist yang lebih tepat sebelum meminta quotation."}
        description={lang === "en" ? "Use practical comparisons, checklists, and process questions written for procurement, production, quality, and maintenance teams." : "Gunakan perbandingan, checklist, dan pertanyaan proses yang ditulis untuk tim procurement, produksi, quality, dan maintenance."}
        primaryHref="#all-guides"
        primaryLabel={lang === "en" ? "Browse guides" : "Lihat semua guide"}
        secondaryHref={withLang("/solutions", lang)}
        secondaryLabel={lang === "en" ? "Explore solutions" : "Lihat solusi"}
        image="/assets/company/background-items/tohnichi-dial-torque-gauge.jpg"
        imageLabel="Torque tool selection guides"
        highlights={lang === "en" ? ["Selection", "Verification", "Error proofing"] : ["Pemilihan", "Verification", "Error proofing"]}
      />
      <section id="all-guides" className="scroll-mt-24 bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Guide library" : "Library panduan"}
            title={lang === "en" ? "Guides for choosing the right torque-tool." : "Panduan seputar pemilihan alat torsi yang tepat."}
            description={lang === "en" ? "Each guide answers the question directly, explains the tradeoffs, and ends with an RFQ checklist." : "Setiap guide menjawab pertanyaan secara langsung, menjelaskan tradeoff, dan ditutup dengan checklist RFQ."}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {buyerGuides.map((guide) => (
              <article key={guide.slug} className="group grid overflow-hidden border border-graphite-200 bg-white shadow-sm transition hover:border-industrial-600 hover:shadow-panel sm:grid-cols-[0.62fr_1.38fr]">
                <AssetSlot
                  src={guide.image}
                  alt={text(guide.imageAlt, lang)}
                  className="min-h-52 border-0 border-b border-graphite-200 sm:border-b-0 sm:border-r"
                  fit="contain"
                  sizes="(max-width: 640px) 100vw, 28vw"
                  imageClassName="p-4 group-hover:scale-[1.03]"
                />
                <div className="p-6">
                  <BookOpenCheck className="h-5 w-5 text-signal-600" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl font-bold text-graphite-900">{text(guide.title, lang)}</h2>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">{text(guide.description, lang)}</p>
                  <Link href={withLang(`/guides/${guide.slug}`, lang)} className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600">
                    {lang === "en" ? "Read guide" : "Baca guide"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
