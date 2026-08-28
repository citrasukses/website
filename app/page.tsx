import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, Handshake, PackageCheck, Wrench } from "lucide-react";
import { AuthorizedDistributorStrip } from "@/components/AuthorizedDistributorStrip";
import { BrandCard } from "@/components/BrandCard";
import { CTAButton } from "@/components/CTAButton";
import { CustomerLogoCloud } from "@/components/CustomerLogoCloud";
import { HomeBackgroundItems } from "@/components/HomeBackgroundItems";
import { IndustryCaseStudyExplorer } from "@/components/IndustryCaseStudyExplorer";
import { RFQForm } from "@/components/InquiryForms";
import { NewsSection } from "@/components/NewsSection";
import { SectionHeader } from "@/components/SectionHeader";
import { TohnichiTighteningSection } from "@/components/TohnichiTighteningSection";
import { stats } from "@/data/customers";
import { homeBackgroundImage, homeBackgroundItems } from "@/data/home-background";
import { company } from "@/data/navigation";
import { industries } from "@/data/industries";
import { getCatalogBrands } from "@/lib/catalog";
import { languageAlternates, localizedPath, staticLanguage, text, withLang } from "@/lib/i18n";

const homepageMetadata = {
  id: {
    title: "Distributor Resmi & Solusi Pengadaan Industri | CSE",
    description:
      "Distributor resmi TOHNICHI, NAC, FUJISTAR, dan NIPPON UNIT serta pengadaan brand general. Supplier peralatan dan kebutuhan industri untuk manufaktur di Indonesia."
  },
  en: {
    title: "Industrial Goods Supplier Indonesia | CSE",
    description:
      "PT Citra Sukses Ekapratama, Indonesia's industrial sourcing partner. CSE helps procurement and engineering teams find industrial products from Japan and Asia, check technical fit, provide alternatives, and speed up the RFQ process."
  }
} as const;

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const { title, description } = homepageMetadata[lang];

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: localizedPath("/", lang),
      languages: languageAlternates("/")
    },
    openGraph: {
      title,
      description,
      url: localizedPath("/", lang),
      siteName: "PT Citra Sukses Ekapratama",
      images: [
        {
          url: "/assets/company/og-authorized-distributor.png",
          width: 1200,
          height: 630,
          alt: "CSE authorized distributor for TOHNICHI, NAC, Fujistar, and Nippon Unit"
        }
      ],
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/company/og-authorized-distributor.png"]
    }
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cse.co.id/#organization",
  name: company.publicName,
  alternateName: [company.shortName, company.longName],
  url: "https://cse.co.id/",
  logo: {
    "@type": "ImageObject",
    url: "https://cse.co.id/assets/company/cse_logo.png",
    contentUrl: "https://cse.co.id/assets/company/cse_logo.png",
    width: 396,
    height: 160
  },
  email: `mailto:${company.email}`,
  description: company.positioning.en
};

export default async function HomePage() {
  const lang = staticLanguage();
  const [catalogBrands, fullCatalog] = await Promise.all([
    getCatalogBrands(),
    getCatalogBrands({ includeUnpublished: true })
  ]);
  const brands = fullCatalog
    .filter((brand) => brand.brandType === "represented")
    .sort((a, b) => {
      const priority = (slug: string) => (slug === "tohnichi" ? 0 : slug === "nac" ? 1 : 2);
      return priority(a.slug) - priority(b.slug);
    });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c")
        }}
      />
      <section className="technical-grid relative isolate overflow-hidden bg-white">
        <HomeBackgroundItems items={homeBackgroundItems} singleImage={homeBackgroundImage} />

        <div className="container-page relative z-10 py-16 lg:py-12">
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center lg:gap-y-10">
            <div className="order-1 max-w-5xl">
              <h1 className="max-w-full font-bold leading-tight tracking-normal text-graphite-900">
                <span className="block text-2xl sm:text-4xl md:text-5xl">Industrial Tools</span>
                <span className="mt-1 block text-2xl sm:text-4xl md:text-5xl">
                  Spare Parts &amp; Consumables
                </span>
                <span className="mt-3 block text-base font-semibold leading-snug text-graphite-600 sm:text-xl md:text-2xl">
                  {lang === "en"
                    ? "for manufacturers in Indonesia"
                    : "untuk industri manufaktur di Indonesia"}
                </span>
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

              <div className="mt-8 grid min-w-0 grid-cols-3 gap-px overflow-hidden border border-graphite-200 bg-graphite-200 shadow-sm">
                {stats.map((stat) => (
                  <div key={stat.value} className="min-w-0 bg-white/95 px-3 py-4 sm:px-4 sm:py-5">
                    <p className="text-2xl font-bold leading-none text-graphite-900 sm:text-3xl">{stat.value}</p>
                    <p className="mt-2 text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-graphite-500 sm:text-[10px] sm:tracking-[0.12em]">
                      {text(stat.label, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <AuthorizedDistributorStrip lang={lang} className="order-2 lg:order-4 lg:col-span-2" />

            <div className="order-4 min-w-0 border border-graphite-200 bg-white shadow-panel lg:order-2">
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
        </div>
      </section>

      <TohnichiTighteningSection lang={lang} />

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
                <BrandCard
                  key={brand.slug}
                  brand={brand}
                  lang={lang}
                  accessible={brand.slug === "tohnichi" || brand.slug === "nac"}
                />
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
                <BrandCard key={brand.slug} brand={brand} lang={lang} accessible={false} />
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
