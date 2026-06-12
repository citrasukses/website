import type { Metadata } from "next";
import { BrandsSearchCatalog } from "@/components/BrandsSearchCatalog";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeader } from "@/components/SectionHeader";
import { SupplyMap } from "@/components/SupplyMap";
import { toSearchableBrandCard } from "@/data/brand-search";
import { brands } from "@/data/brands";
import { supplyCountries } from "@/data/supply-map";
import { tradingBrandCount, tradingBrands } from "@/data/trading-brands";
import { resolveLanguage, type SearchParams, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Brands",
  description: "Industrial brands represented and supplied by CSE for Indonesian buyers."
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function BrandsPage({ searchParams }: PageProps) {
  const lang = resolveLanguage(await searchParams);
  const representedBrands = brands.map(toSearchableBrandCard);

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Brands" : "Brand" }]} />
      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Brand portfolio" : "Portofolio brand"}
            title={lang === "en" ? "Industrial brands for factory, assembly, and maintenance needs." : "Brand industrial untuk kebutuhan pabrik, assembly, dan maintenance."}
            description={
              lang === "en"
                ? "Explore authorized representative brands and general trading supply options by brand, product type, application, and industrial use case."
                : "Jelajahi brand authorized representative dan opsi general trading berdasarkan brand, tipe produk, aplikasi, dan kebutuhan industrial."
            }
          />
          <BrandsSearchCatalog
            representedBrands={representedBrands}
            tradingBrands={tradingBrands}
            tradingBrandCount={tradingBrandCount}
            lang={lang}
          />
        </div>
      </section>
      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Supply map" : "Peta supply"}
            title={lang === "en" ? "Brand origins by country." : "Asal brand berdasarkan negara."}
            description={
              lang === "en"
                ? "Current brand origins are grouped from the brand catalog, with not-yet-published brands included as inquiry items."
                : "Asal brand saat ini dikelompokkan dari katalog brand, dengan brand yang belum dipublikasikan ditampilkan sebagai item inquiry."
            }
          />
          <SupplyMap countries={supplyCountries} lang={lang} />
        </div>
      </section>
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
