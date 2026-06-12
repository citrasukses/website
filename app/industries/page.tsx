import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { IndustryCard } from "@/components/IndustryCard";
import { SectionHeader } from "@/components/SectionHeader";
import { industries } from "@/data/industries";
import { resolveLanguage, type SearchParams, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industries served by CSE, including automotive, heavy equipment, oil and gas, and general industry."
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function IndustriesPage({ searchParams }: PageProps) {
  const lang = resolveLanguage(await searchParams);

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Industries" : "Industri" }]} />
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Industries" : "Industri"}
            title={lang === "en" ? "Supply support for demanding industrial environments." : "Dukungan supply untuk lingkungan industrial yang menuntut."}
            description={
              lang === "en"
                ? "CSE's website is organized around how buyers search: brand, application, and industry context."
                : "Website CSE disusun mengikuti cara buyer mencari: brand, aplikasi, dan konteks industri."
            }
          />
          <div className="mt-10 grid gap-5">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} lang={lang} />
            ))}
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
