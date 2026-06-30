import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, Handshake, PackageCheck, Wrench } from "lucide-react";
import { AuthorizedDistributorStrip } from "@/components/AuthorizedDistributorStrip";
import { BrandCard } from "@/components/BrandCard";
import { CTAButton } from "@/components/CTAButton";
import { CustomerLogoCloud } from "@/components/CustomerLogoCloud";
import { ExpertiseShowcase } from "@/components/ExpertiseShowcase";
import { HomeBackgroundItems } from "@/components/HomeBackgroundItems";
import { IndustryCaseStudyExplorer } from "@/components/IndustryCaseStudyExplorer";
import { RFQForm } from "@/components/InquiryForms";
import { NewsSection } from "@/components/NewsSection";
import { SectionHeader } from "@/components/SectionHeader";
import { stats } from "@/data/customers";
import { expertiseAreas } from "@/data/expertise";
import { homeBackgroundImage, homeBackgroundItems } from "@/data/home-background";
import { company } from "@/data/navigation";
import { industries } from "@/data/industries";
import { getCatalogBrands } from "@/lib/catalog";
import { staticLanguage, text, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Industrial Goods Supplier Indonesia",
  description:
    "PT Citra Sukses Ekapratama, Indonesia's industrial sourcing partner. CSE helps procurement and engineering teams find industrial products from Japan and Asia, check technical fit, provide alternatives, and speed up the RFQ process."
};

export default async function HomePage() {
  const lang = staticLanguage();
  const catalogBrands = await getCatalogBrands();
  const brands = catalogBrands.filter((brand) => brand.brandType === "represented");

  const serviceItems = lang === "en"
    ? [
        {
          icon: PackageCheck,
          title: "Industrial Procurement",
          body: "One reliable source for brand sourcing, model requests, and overseas industrial goods."
        },
        {
          icon: Wrench,
          title: "Technical Consultation",
          body: "Support for selecting tools by application, torque range, production process, and quality need."
        },
        {
          icon: Handshake,
          title: "Brand Representation",
          body: "A lean distribution path for overseas principals entering Indonesian industrial sectors."
        }
      ]
    : [
        {
          icon: PackageCheck,
          title: "Pengadaan Barang",
          body: "Satu sumber yang jelas untuk sourcing brand, permintaan model, dan produk industrial luar negeri."
        },
        {
          icon: Wrench,
          title: "Konsultasi Teknis",
          body: "Dukungan pemilihan tools berdasarkan aplikasi, range torsi, proses produksi, dan kebutuhan quality."
        },
        {
          icon: Handshake,
          title: "Representasi Brand",
          body: "Jalur distribusi ramping untuk principal luar negeri yang masuk ke sektor industrial Indonesia."
        }
      ];

  const processItems = lang === "en"
    ? [
        {
          icon: Wrench,
          title: "Check technical fit",
          body: "Review model, specification, application, and production context before sourcing."
        },
        {
          icon: PackageCheck,
          title: "Provide alternatives",
          body: "Offer practical substitute options when brand, model, lead time, or budget needs flexibility."
        },
        {
          icon: ClipboardCheck,
          title: "Speed up RFQ",
          body: "Prepare a clearer request path so procurement can follow up with less back-and-forth."
        }
      ]
    : [
        {
          icon: Wrench,
          title: "Memeriksa kecocokan teknis",
          body: "Review model, spesifikasi, aplikasi, dan konteks produksi sebelum sourcing."
        },
        {
          icon: PackageCheck,
          title: "Menyediakan alternatif",
          body: "Memberi opsi pengganti saat brand, model, lead time, atau budget perlu fleksibilitas."
        },
        {
          icon: ClipboardCheck,
          title: "Mempercepat proses RFQ",
          body: "Membuat jalur request lebih jelas agar procurement bisa follow up lebih cepat."
        }
      ];

  const southeastAsiaCountryCodes = new Set(["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"]);
  const japanBrands = brands.filter((brand) => brand.countryCode === "JP");
  const southeastAsiaBrands = brands.filter((brand) => southeastAsiaCountryCodes.has(brand.countryCode));

  return (
    <>
      <section className="technical-grid relative isolate overflow-hidden bg-white">
        <HomeBackgroundItems items={homeBackgroundItems} singleImage={homeBackgroundImage} />

        <div className="container-page relative z-10 py-16 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div className="max-w-5xl">
              <h1 className="max-w-full text-balance text-2xl font-bold leading-tight tracking-normal text-graphite-900 sm:text-4xl md:text-6xl">
                {lang === "en"
                  ? "Industrial tools, spare parts, and consumables for factories in Indonesia."
                  : "Industrial tools, spare parts dan consumables untuk pabrik di Indonesia."}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-graphite-600 md:text-lg md:leading-8">
                {lang === "en"
                  ? "CSE helps procurement and engineering teams find industrial products from Japan and Asia, check technical fit, provide alternatives, and speed up the RFQ process."
                  : "CSE membantu procurement dan engineering mencari produk industri dari Jepang dan Asia, memeriksa kecocokan teknis, menyediakan alternatif, dan mempercepat proses RFQ."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href={withLang("/contact", lang)}>
                  <span className="inline-flex items-center gap-2">
                    {lang === "en" ? "Request quotation" : "Minta penawaran"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </CTAButton>
                <CTAButton href={withLang("/brands", lang)} variant="ghost">
                  {lang === "en" ? "View brand portfolio" : "Lihat portofolio brand"}
                </CTAButton>
              </div>
            </div>

            <div className="min-w-0 border border-graphite-200 bg-white shadow-panel">
              <div className="border-b border-graphite-200 bg-graphite-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/20">
                    <ClipboardCheck className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    {lang === "en" ? "CSE sourcing process" : "Proses sourcing CSE"}
                  </p>
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-normal">
                  {lang === "en"
                    ? "From technical review to clearer RFQ follow-up."
                    : "Dari review teknis sampai RFQ yang lebih jelas."}
                </h2>
              </div>
              <div className="grid gap-px bg-graphite-200">
                {processItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 bg-white p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-graphite-200 bg-graphite-50 text-industrial-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-graphite-900">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-graphite-600">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-graphite-200 bg-graphite-50 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">
                  {lang === "en" ? "Procurement and engineering support" : "Dukungan procurement dan engineering"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid min-w-0 gap-px overflow-hidden border border-graphite-200 bg-graphite-200 shadow-panel sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-white p-6">
                <p className="text-4xl font-bold text-graphite-900">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-graphite-500">
                  {text(stat.label, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuthorizedDistributorStrip lang={lang} />

      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Customers" : "Pelanggan"}
            title={lang === "en" ? "Trusted by industrial customers across Indonesia." : "Dipercaya pelanggan industrial di Indonesia."}
            description={
              lang === "en"
                ? "CSE works with manufacturing and industrial teams that require reliable sourcing and clear technical communication."
                : "CSE bekerja dengan tim manufaktur dan industrial yang membutuhkan sourcing andal dan komunikasi teknis yang jelas."
            }
          />
          <div className="mt-8">
            <CustomerLogoCloud />
          </div>
          <p className="mt-4 border-t border-graphite-200 pt-4 text-xs leading-5 text-graphite-500">
            {lang === "en"
              ? "Logos are displayed as customer/supply-history references. All trademarks belong to their respective owners."
              : "Logo ditampilkan sebagai referensi pelanggan/riwayat suplai. Seluruh merek dagang adalah milik masing-masing pemiliknya."}
          </p>
        </div>
      </section>

      <ExpertiseShowcase areas={expertiseAreas} lang={lang} />

      <section className="bg-signal-500 py-16 text-white">
        <div className="container-page">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 border-l-2 border-white pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                {lang === "en" ? "Authorized brand portfolio" : "Portofolio brand resmi"}
              </p>
              <h2 className="max-w-5xl text-balance text-3xl font-bold tracking-normal md:text-4xl">
                {lang === "en"
                  ? "Technical industrial brands from Japan and Southeast Asia."
                  : "Brand industrial dari Jepang dan Asia Tenggara."}
              </h2>
            </div>
            <CTAButton href={withLang("/brands", lang)} variant="ghost">
              <span className="inline-flex items-center gap-2">
                {lang === "en" ? "Explore brands" : "Eksplor merek lainnya"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </CTAButton>
          </div>

          <div className="mt-10">
            <div className="flex flex-col gap-2 border-y border-white/20 py-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  {lang === "en" ? "Brands from Japan" : "Brand dari Jepang"}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-normal">
                  {lang === "en" ? "Japanese manufacturing quality." : "Kualitas manufaktur Jepang."}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/75">
                {lang === "en"
                  ? "Established brands for precision assembly, tooling, abrasives, and factory supply needs."
                  : "Brand terpercaya untuk precision assembly, tooling, abrasive, dan kebutuhan supply pabrik."}
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {japanBrands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} lang={lang} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-2 border-y border-white/20 py-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  {lang === "en" ? "Brands from Southeast Asia" : "Brand dari Asia Tenggara"}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-normal">
                  {lang === "en" ? "Regional alternatives with practical lead times." : "Alternatif regional dengan lead time praktis."}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/75">
                {lang === "en"
                  ? "Cost-effective technical products from regional manufacturing partners in Thailand and Vietnam."
                  : "Produk teknis cost-effective dari mitra manufaktur regional di Thailand dan Vietnam."}
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {southeastAsiaBrands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsSection lang={lang} />

      <section className="dot-matrix bg-white py-8">
        <div className="container-page flex flex-col gap-6 px-6 py-2 md:flex-row md:items-center md:justify-between">
          <p className="max-w-4xl text-2xl font-semibold leading-9 text-graphite-900 md:text-xl md:leading-10">
            {lang === "en"
              ? (<>Struggling to find the right industrial spare part, tooling, or consumable?<br /> CSE helps from RFQ to sourcing.</>)
              : (<>Sulit mencari spare part, tooling, atau consumable industri yang tepat?<br /> CSE bantu RFQ sampai sourcing.</>)}
          </p>
          <CTAButton href={withLang("/contact", lang)} variant="secondary" className="shrink-0">
            <span className="inline-flex items-center gap-2">
              {lang === "en" ? "Start RFQ" : "Mulai RFQ"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </CTAButton>
        </div>
      </section>

      <section className="technical-grid bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Industries" : "Industri"}
            title={lang === "en" ? "Built around factory and maintenance use cases." : "Dibangun untuk kebutuhan produksi dan maintenance."}
            description={
              lang === "en"
                ? "CSE serves industrial buyers that need credible products, practical model selection, and responsive supply support."
                : "CSE melayani buyer industrial yang membutuhkan produk kredibel, pemilihan model yang praktis, dan dukungan supply yang responsif."
            }
          />
          <IndustryCaseStudyExplorer
            industries={industries.filter((industry) => industry.slug !== "oil-gas")}
            lang={lang}
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow={lang === "en" ? "Supply chain support" : "Dukungan rantai pasok"}
            title={lang === "en" ? "Building a reliable industrial supply chain with practical support." : "Bersama kami membangun rantai pasok yang handal."}
            description={text(company.positioning, lang)}
          />
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-white p-6">
                  <Icon className="h-6 w-6 text-industrial-700" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold text-graphite-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {lang === "en" ? "Consult with CSE" : "Konsultasi dengan CSE"}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {lang === "en"
                ? "Need a specific brand, model, or technical recommendation?"
                : "Butuh brand, model, atau rekomendasi teknis tertentu?"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              {lang === "en"
                ? "Send the brand, model, quantity, and application details so CSE can review the request with the right technical context."
                : "Kirim brand, model, kuantitas, dan detail aplikasi agar CSE dapat meninjau kebutuhan dengan konteks teknis yang tepat."}
            </p>
          </div>
          <RFQForm lang={lang} brands={catalogBrands.map(({ slug, name }) => ({ slug, name }))} />
        </div>
      </section>
    </>
  );
}
