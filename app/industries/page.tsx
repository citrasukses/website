import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { industries } from "@/data/industries";
import { industryPages } from "@/data/industry-pages";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const title = lang === "en" ? "Industries" : "Industri";
  const description =
    lang === "en"
      ? "Explore how CSE supports automotive, heavy-equipment, and general-manufacturing processes with application-led industrial supply in Indonesia."
      : "Jelajahi dukungan CSE untuk proses otomotif, alat berat, dan manufaktur umum melalui industrial supply berbasis aplikasi di Indonesia.";

  return buildPageMetadata({
    path: "/industries",
    title,
    description,
    lang,
    image: "/assets/industries/automotive.jpg",
    imageAlt: lang === "en" ? "Industrial production workflow" : "Workflow produksi industrial"
  });
}

export default function IndustriesPage() {
  const lang = staticLanguage();
  const title = lang === "en" ? "Industries" : "Industri";
  const description = lang === "en"
    ? "Explore how CSE supports automotive, heavy-equipment, and general-manufacturing processes with application-led industrial supply in Indonesia."
    : "Jelajahi dukungan CSE untuk proses otomotif, alat berat, dan manufaktur umum melalui industrial supply berbasis aplikasi di Indonesia.";
  const jsonLd = buildCollectionJsonLd({
    path: "/industries",
    title,
    description,
    lang,
    items: industryPages.map((page) => ({
      name: text(industries.find((item) => item.slug === page.industrySlug)!.title, lang),
      path: `/industries/${page.industrySlug}`
    }))
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Industries" : "Industri" }]} />
      <Hero
        eyebrow={lang === "en" ? "Industries" : "Industri"}
        title={lang === "en" ? "Industrial supply organized around the production process." : "Industrial supply yang disusun berdasarkan proses produksi."}
        description={description}
        primaryHref="#industry-pages"
        primaryLabel={lang === "en" ? "Explore industries" : "Lihat industri"}
        secondaryHref={withLang("/contact?topic=industry", lang)}
        secondaryLabel={lang === "en" ? "Discuss an application" : "Diskusikan aplikasi"}
        image="/assets/industries/automotive.jpg"
        imageLabel={lang === "en" ? "Automotive production process" : "Proses produksi otomotif"}
        highlights={lang === "en" ? ["Production", "Quality", "Maintenance"] : ["Produksi", "Quality", "Maintenance"]}
      />
      <section id="industry-pages" className="scroll-mt-24 bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Production environments" : "Lingkungan produksi"}
            title={lang === "en" ? "Connect each process stage to a practical supply path." : "Hubungkan setiap tahap proses ke jalur supply yang praktis."}
            description={
              lang === "en"
                ? "Explore real process pages that connect machining, finishing, fastening, torque control, inspection, maintenance, and sourcing."
                : "Lihat halaman proses yang menghubungkan machining, finishing, fastening, torque control, inspection, maintenance, dan sourcing."
            }
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industryPages.map((page) => {
              const industry = industries.find((item) => item.slug === page.industrySlug)!;
              return (
                <article key={industry.slug} className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition hover:border-industrial-600 hover:shadow-panel">
                  <AssetSlot
                    src={industry.image}
                    alt={text(industry.title, lang)}
                    className="h-56 border-0 border-b border-graphite-200"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    imageClassName="group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{industry.slug}</p>
                    <h2 className="mt-2 text-2xl font-bold text-graphite-900">{text(industry.title, lang)}</h2>
                    <p className="mt-3 text-sm leading-6 text-graphite-500">{text(page.seoDescription, lang)}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {industry.applications.map((application) => (
                        <span key={application.en} className="border border-graphite-200 bg-graphite-50 px-3 py-1.5 text-xs font-semibold text-graphite-600">
                          {text(application, lang)}
                        </span>
                      ))}
                    </div>
                    <Link href={withLang(`/industries/${industry.slug}`, lang)} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600">
                      {lang === "en" ? "Explore the production workflow" : "Lihat workflow produksi"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold">
            {lang === "en" ? "Share your application and required specification." : "Bagikan aplikasi dan spesifikasi yang dibutuhkan."}
          </h2>
          <CTAButton href={withLang("/contact", lang)}>{lang === "en" ? "Request consultation" : "Minta konsultasi"}</CTAButton>
        </div>
      </section>
    </>
  );
}
