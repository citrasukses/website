import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { categoryHubs } from "@/data/category-hubs";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  return buildPageMetadata({
    path: "/products",
    title: lang === "en" ? "Industrial Torque Tool Categories" : "Kategori Industrial Torque Tools",
    description: lang === "en" ? "Compare industrial torque wrenches, torque screwdrivers, and torque testers with application-led selection guidance." : "Bandingkan torque wrench, torque screwdriver, dan torque tester industrial dengan panduan pemilihan berbasis aplikasi.",
    lang,
    image: "/assets/company/background-items/tohnichi-click-torque-wrench.jpg",
    imageAlt: "TOHNICHI industrial torque tools"
  });
}

export default function ProductsPage() {
  const lang = staticLanguage();
  const title = lang === "en" ? "Industrial Torque Tool Categories" : "Kategori Industrial Torque Tools";
  const description = lang === "en"
    ? "Compare industrial torque wrenches, torque screwdrivers, and torque testers with application-led selection guidance."
    : "Bandingkan torque wrench, torque screwdriver, dan torque tester industrial dengan panduan pemilihan berbasis aplikasi.";
  const jsonLd = buildCollectionJsonLd({
    path: "/products",
    title,
    description,
    lang,
    items: categoryHubs.map((category) => ({ name: text(category.title, lang), path: `/${category.slug}` }))
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Product categories" : "Kategori produk" }]} />
      <Hero
        eyebrow={lang === "en" ? "Product categories" : "Kategori produk"}
        title={lang === "en" ? "Choose the torque-tool category from the work being done." : "Pilih kategori torque tool dari pekerjaan yang dilakukan."}
        description={lang === "en" ? "Start with fastener type, torque range, tightening or inspection purpose, and the process evidence required." : "Mulai dari jenis fastener, range torque, tujuan tightening atau inspection, dan bukti proses yang dibutuhkan."}
        primaryHref={withLang("/contact?topic=torque-tools", lang)}
        primaryLabel={lang === "en" ? "Discuss the application" : "Diskusikan aplikasi"}
        secondaryHref={withLang("/brands/tohnichi", lang)}
        secondaryLabel={lang === "en" ? "Full TOHNICHI catalogue" : "Katalog lengkap TOHNICHI"}
        image="/assets/company/background-items/tohnichi-click-torque-wrench.jpg"
        imageLabel="TOHNICHI torque-tool categories"
        highlights={lang === "en" ? ["Tightening", "Inspection", "Calibration"] : ["Tightening", "Inspection", "Calibration"]}
      />
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Three commercial hubs" : "Tiga category hub"}
            title={lang === "en" ? "From a broad search to a model shortlist." : "Dari pencarian umum ke shortlist model."}
            description={lang === "en" ? "Each category page explains use cases, selection criteria, representative models, tradeoffs, and the next technical questions." : "Setiap category page menjelaskan use case, selection criteria, model representatif, tradeoff, dan pertanyaan teknis berikutnya."}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {categoryHubs.map((category) => (
              <article key={category.slug} className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition hover:border-industrial-600 hover:shadow-panel">
                <AssetSlot src={category.image} alt={text(category.imageAlt, lang)} className="h-60 border-0 border-b border-graphite-200" fit="contain" sizes="(max-width: 1024px) 100vw, 33vw" imageClassName="p-5 group-hover:scale-[1.03]" />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{category.slug}</p>
                  <h2 className="mt-3 text-2xl font-bold text-graphite-900">{text(category.title, lang)}</h2>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">{text(category.description, lang)}</p>
                  <Link href={withLang(`/${category.slug}`, lang)} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600">
                    {lang === "en" ? "Open category hub" : "Buka category hub"}
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
