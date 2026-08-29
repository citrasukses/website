import type { Metadata } from "next";
import { BrandsSearchCatalog } from "@/components/BrandsSearchCatalog";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { IndustryCaseStudyExplorer } from "@/components/IndustryCaseStudyExplorer";
import { SectionHeader } from "@/components/SectionHeader";
// import { SupplyMap } from "@/components/SupplyMap";
import { toSearchableBrandCard } from "@/data/brand-search";
import { industries } from "@/data/industries";
// import { supplyCountries } from "@/data/supply-map";
import { getCatalogBrands } from "@/lib/catalog";
import { staticLanguage, withLang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const title = lang === "en" ? "Industrial Brands" : "Brand Industrial";
  const description =
    lang === "en"
      ? "Industrial brands represented and supplied by CSE for Indonesian buyers."
      : "Brand industrial yang diwakili dan dipasok CSE untuk buyer Indonesia.";

  return buildPageMetadata({
    path: "/brands",
    title,
    description,
    lang
  });
}

export default async function BrandsPage() {
  const lang = staticLanguage();
  const catalog = await getCatalogBrands({ includeUnpublished: true });
  const confirmationBrands = catalog.filter((brand) => brand.researchStatus === "unresolved");
  const confirmedCatalog = catalog.filter((brand) => brand.researchStatus !== "unresolved");
  const representedBrands = confirmedCatalog
    .filter((brand) => brand.brandType === "represented")
    .sort((a, b) => {
      const priority = (slug: string) => (slug === "tohnichi" ? 0 : slug === "nac" ? 1 : 2);
      return priority(a.slug) - priority(b.slug);
    })
    .map(toSearchableBrandCard);
  const tradingBrands = confirmedCatalog.filter((brand) => brand.brandType === "general-trading");

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Brands" : "Brand" }]} />
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Brand portfolio" : "Portofolio brand"}
            title={lang === "en" ? "Industrial brands for factory, assembly, and maintenance needs." : "Brand industrial untuk kebutuhan pabrik, assembly, dan maintenance."}
            headingLevel="h1"
            description={
              lang === "en"
                ? "Explore authorized representative brands and general trading supply options by brand, product type, application, and industrial use case."
                : "Jelajahi brand authorized representative dan opsi general trading berdasarkan brand, tipe produk, aplikasi, dan kebutuhan industrial."
            }
          />
          <BrandsSearchCatalog
            representedBrands={representedBrands}
            tradingBrands={tradingBrands}
            tradingBrandCount={tradingBrands.length}
            confirmationBrands={confirmationBrands}
            lang={lang}
          />
        </div>
      </section>
      <section className="technical-grid bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Brand application case studies" : "Studi kasus aplikasi brand"}
            title={
              lang === "en"
                ? "See how brands work together across industrial applications."
                : "Lihat bagaimana brand bekerja bersama dalam aplikasi industri."
            }
            description={
              lang === "en"
                ? "Choose an industry to explore an interactive workflow showing each brand's role, solution, and operational value."
                : "Pilih industri untuk menjelajahi workflow interaktif yang menunjukkan peran, solusi, dan nilai operasional setiap brand."
            }
          />
          <IndustryCaseStudyExplorer
            industries={industries.filter((industry) => industry.slug !== "oil-gas")}
            lang={lang}
          />
        </div>
      </section>
      {/* Supply map temporarily hidden.
      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Supply map" : "Peta supply"}
            title={lang === "en" ? "Brand origins by country." : "Asal brand berdasarkan negara."}
            description={
              lang === "en"
                ? "Current brand origins are grouped from the confirmed brand catalog."
                : "Asal brand saat ini dikelompokkan dari katalog brand yang telah dikonfirmasi."
            }
          />
          <SupplyMap countries={supplyCountries} lang={lang} />
        </div>
      </section>
      */}
      <section className="bg-white py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-graphite-900">
              {lang === "en" ? "Cannot find the brand you need?" : "Tidak menemukan brand yang dibutuhkan?"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite-500">
              {lang === "en"
                ? "Send the brand, model, and application details. CSE can review sourcing options."
                : "Kirim brand, model, dan detail aplikasi. CSE dapat membantu review opsi pengadaan."}
            </p>
          </div>
          <CTAButton href={withLang("/contact", lang)}>{lang === "en" ? "Send RFQ" : "Kirim RFQ"}</CTAButton>
        </div>
      </section>
    </>
  );
}
