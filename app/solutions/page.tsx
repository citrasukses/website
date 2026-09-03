import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Settings2 } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { solutionPages } from "@/data/solution-pages";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  return buildPageMetadata({
    path: "/solutions",
    title: lang === "en" ? "Industrial Solutions & Technical Support" : "Solusi Industrial & Technical Support",
    description: lang === "en"
      ? "Application-led support for torque control, poka-yoke tightening, calibration and verification, and industrial sourcing in Indonesia."
      : "Dukungan berbasis aplikasi untuk torque control, poka-yoke tightening, calibration dan verification, serta industrial sourcing di Indonesia.",
    lang,
    image: "/assets/company/hero-background-curated-v2.webp",
    imageAlt: "CSE industrial application support"
  });
}

export default function SolutionsPage() {
  const lang = staticLanguage();
  const title = lang === "en" ? "Industrial Solutions & Technical Support" : "Solusi Industrial & Technical Support";
  const description = lang === "en"
    ? "Application-led support for torque control, poka-yoke tightening, calibration and verification, and industrial sourcing in Indonesia."
    : "Dukungan berbasis aplikasi untuk torque control, poka-yoke tightening, calibration dan verification, serta industrial sourcing di Indonesia.";
  const jsonLd = buildCollectionJsonLd({
    path: "/solutions",
    title,
    description,
    lang,
    items: solutionPages.map((solution) => ({ name: text(solution.title, lang), path: `/solutions/${solution.slug}` }))
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Solutions" : "Solusi" }]} />
      <Hero
        eyebrow={lang === "en" ? "Industrial solutions" : "Solusi industrial"}
        title={lang === "en" ? "Select the right solution for your application" : "Pilih solusi yang tepat untuk kebutuhan Anda"}
        description={lang === "en"
          ? "CSE helps select the right industrial tools for your application."
          : "CSE membantu pemilihan tools industri atau jasa yang tepat sesuai dengan kebutuhan."}
        primaryHref={withLang("/contact?topic=solution", lang)}
        primaryLabel={lang === "en" ? "Discuss an application" : "Diskusikan aplikasi"}
        secondaryHref={withLang("/guides", lang)}
        secondaryLabel={lang === "en" ? "Read buyer guides" : "Baca buyer guides"}
        image="/assets/company/hero-background-curated-v2.webp"
        imageLabel="CSE industrial solutions"
        highlights={lang === "en" ? ["Application review", "Product selection", "Verification planning"] : ["Review aplikasi", "Pemilihan produk", "Rencana verification"]}
      />
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Solution pathways" : "Jalur solusi"}
            title={lang === "en" ? "Challenges in manufacturing and procurement." : "Tantangan manufaktur dan pengadaan yang sering terjadi."}
            description={lang === "en" ? "How to choose the right tools, maintain consistency, and manage procurement." : "Bagaimana memilih alat yang tepat, menjaga konsistensi alat, sampai dengan pengadaannya."}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {solutionPages.map((solution) => (
              <article key={solution.slug} className="group grid overflow-hidden border border-graphite-200 bg-white shadow-sm transition hover:border-industrial-600 hover:shadow-panel sm:grid-cols-[0.7fr_1.3fr]">
                <AssetSlot
                  src={solution.image}
                  alt={text(solution.imageAlt, lang)}
                  className="min-h-52 border-0 border-b border-graphite-200 sm:border-b-0 sm:border-r"
                  fit={solution.slug === "industrial-sourcing" ? "cover" : "contain"}
                  sizes="(max-width: 640px) 100vw, 30vw"
                  imageClassName={solution.slug === "industrial-sourcing" ? "group-hover:scale-105" : "p-5 group-hover:scale-[1.03]"}
                />
                <div className="p-6">
                  <Settings2 className="h-5 w-5 text-signal-600" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl font-bold text-graphite-900">{text(solution.title, lang)}</h2>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">{text(solution.description, lang)}</p>
                  <Link href={withLang(`/solutions/${solution.slug}`, lang)} className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600">
                    {lang === "en" ? "Explore this solution" : "Lihat solusi ini"}
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
