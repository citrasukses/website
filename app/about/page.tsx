import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { StatsSection } from "@/components/StatsSection";
import { company } from "@/data/navigation";
import { resolveLanguage, text, type SearchParams, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description: "About PT Citra Sukses Ekapratama and CSE's industrial supply focus in Indonesia."
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function AboutPage({ searchParams }: PageProps) {
  const lang = resolveLanguage(await searchParams);

  const capabilities = lang === "en"
    ? [
        "Industrial goods sourcing from Japan and overseas manufacturers",
        "Technical product selection support for factory applications",
        "Automotive and industrial supply chain experience",
        "Lean distribution support for represented brands",
        "RFQ handling for model, quantity, and application-specific needs",
        "Clear inquiry paths for buyer requests and overseas principal discussions"
      ]
    : [
        "Pengadaan produk industrial dari Jepang dan manufacturer luar negeri",
        "Dukungan pemilihan produk teknis sesuai aplikasi pabrik",
        "Pengalaman di rantai pasok otomotif dan industrial",
        "Dukungan distribusi yang ramping untuk brand principal",
        "Penanganan RFQ berdasarkan model, kuantitas, dan kebutuhan aplikasi",
        "Jalur inquiry yang jelas untuk buyer dan diskusi principal luar negeri"
      ];

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "About" : "Tentang" }]} />
      <Hero
        eyebrow="PT Citra Sukses Ekapratama"
        title={lang === "en" ? "A practical industrial supply partner for Indonesian factories." : "Partner supply industrial yang praktis untuk pabrik Indonesia."}
        description={text(company.positioning, lang)}
        primaryHref={withLang("/contact", lang)}
        primaryLabel={lang === "en" ? "Contact CSE" : "Hubungi CSE"}
        secondaryHref={withLang("/partners", lang)}
        secondaryLabel={lang === "en" ? "For overseas brands" : "Untuk brand luar negeri"}
        image="/assets/industries/automotive.jpg"
        imageLabel="Indonesian automotive production"
        highlights={[
          lang === "en" ? "Industrial sourcing" : "Sourcing industrial",
          lang === "en" ? "Technical product support" : "Dukungan produk teknis",
          lang === "en" ? "B2B inquiry handling" : "Penanganan inquiry B2B"
        ]}
      />
      <StatsSection lang={lang} />
      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow={lang === "en" ? "How CSE works" : "Cara kerja CSE"}
            title={lang === "en" ? "Focused on credible supply, technical fit, and responsive inquiry handling." : "Fokus pada supply kredibel, kecocokan teknis, dan respons inquiry."}
            description={
              lang === "en"
                ? "CSE helps facilitate access to credible, hard-to-reach, and technically suitable industrial products for factories."
                : "CSE membantu mempermudah akses ke produk industri yang kredibel, sulit dijangkau, dan cocok dengan kebutuhan pabrik."
            }
          />
          <FeatureGrid items={capabilities} />
        </div>
      </section>
      <section className="bg-graphite-50 py-16">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">Next step</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">
              {lang === "en" ? "Send a product request or consultation brief." : "Kirim kebutuhan produk atau konsultasi teknis."}
            </h2>
          </div>
          <CTAButton href={withLang("/contact", lang)}>{lang === "en" ? "Open RFQ form" : "Buka form RFQ"}</CTAButton>
        </div>
      </section>
    </>
  );
}
