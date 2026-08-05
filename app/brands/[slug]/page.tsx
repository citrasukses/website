import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, RadioTower } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandPageProgress } from "@/components/BrandPageProgress";
import { BrandProductExplorer } from "@/components/BrandProductExplorer";
import { CTAButton } from "@/components/CTAButton";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { NacBrandOverview } from "@/components/NacBrandOverview";
import { SankyoRikagakuBrandOverview } from "@/components/SankyoRikagakuBrandOverview";
import { SectionHeader } from "@/components/SectionHeader";
import { TohnichiProductPromotionCarousel } from "@/components/TohnichiProductPromotionCarousel";
import { UseCaseSection } from "@/components/UseCaseSection";
import { seedCatalog } from "@/data/catalog-seed";
import { canViewBrandDraft, isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { staticLanguage, text, withLang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const TOHNICHI_PAGE_PATH = "/brands/tohnichi";
const TOHNICHI_OFFICIAL_URL = "https://en.global-tohnichi.com/";
const TOHNICHI_DISTRIBUTOR_URL = "https://en.global-tohnichi.com/support/distributors.html";
const TOHNICHI_SUPPORT_URL = "https://en.global-tohnichi.com/support/";
const TOHNICHI_SEO_TITLE = "Tohnichi Indonesia - Torque Wrench & Torque Tools";
const TOHNICHI_SEO_DESCRIPTION = {
  id: "PT Citra Sukses Ekapratama adalah agen penjualan dan servis Tohnichi di Indonesia untuk torque wrench, torque screwdriver, tester, kalibrasi, dan sistem tightening.",
  en: "PT Citra Sukses Ekapratama is a Tohnichi sales and service agent in Indonesia for torque wrenches, torque screwdrivers, testers, calibration, and tightening systems."
};
const TOHNICHI_SEO_KEYWORDS = [
  "Tohnichi",
  "Tohnichi Indonesia",
  "distributor Tohnichi Indonesia",
  "torque wrench Tohnichi",
  "kunci torsi Tohnichi",
  "torque screwdriver Tohnichi",
  "torque tester Tohnichi",
  "kalibrasi Tohnichi",
  "PT Citra Sukses Ekapratama"
];

function staticExportPath(path: string, lang: "id" | "en") {
  return lang === "en" ? `/en${path}` : path;
}

export function generateStaticParams() {
  return seedCatalog.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);

  if (!brand) {
    return {};
  }

  if (!isBrandPubliclyAvailable(brand.slug)) {
    return {
      title: `${brand.name} | On progress`,
      description: `${brand.name} product information is being prepared by CSE.`,
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const isTohnichi = brand.slug === "tohnichi";
  const isSankyoRikagaku = brand.slug === "fuji-star";
  const brandPath = `/brands/${brand.slug}`;
  const canonicalPath = isTohnichi && lang === "en" ? `/en${brandPath}` : brandPath;
  const title = isTohnichi
    ? TOHNICHI_SEO_TITLE
    : isSankyoRikagaku
      ? "Sankyo Rikagaku (FUJISTAR) Indonesia - Katalog Abrasive"
      : brand.name;
  const description = isTohnichi ? TOHNICHI_SEO_DESCRIPTION[lang] : brand.summary.id;
  const keywords = isTohnichi
    ? TOHNICHI_SEO_KEYWORDS
    : isSankyoRikagaku
    ? [
        "Sankyo Rikagaku Indonesia",
        "FUJISTAR Indonesia",
        "Fuji Star abrasive",
        "abrasive paper Indonesia",
        "abrasive disc",
        "abrasive belt",
        "non-woven abrasive",
        "polishing tools"
      ]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: isTohnichi
        ? {
            "id-ID": TOHNICHI_PAGE_PATH,
            en: `/en${TOHNICHI_PAGE_PATH}`,
            "x-default": TOHNICHI_PAGE_PATH
          }
        : undefined
    },
    openGraph: {
      title: isTohnichi ? `${TOHNICHI_SEO_TITLE} | CSE` : `${brand.name} Indonesia | CSE`,
      description,
      url: canonicalPath,
      locale: lang === "en" ? "en_US" : "id_ID",
      images: brand.heroImage ? [{ url: brand.heroImage, alt: `${brand.name} products in Indonesia` }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: isTohnichi ? `${TOHNICHI_SEO_TITLE} | CSE` : `${brand.name} Indonesia | CSE`,
      description,
      images: brand.heroImage ? [brand.heroImage] : undefined
    }
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  if (!canViewBrandDraft(brand.slug)) {
    return <BrandPageProgress brandName={brand.name} lang={lang} />;
  }

  const hasProducts = brand.productGroups.length > 0;
  const isTohnichi = brand.slug === "tohnichi";
  const isNac = brand.slug === "nac";
  const isSankyoRikagaku = brand.slug === "fuji-star";
  const hasProductExplorer = isTohnichi || isNac || isSankyoRikagaku;
  const localizedTohnichiPagePath = staticExportPath(TOHNICHI_PAGE_PATH, lang);
  const tohnichiJsonLd = isTohnichi
    ? [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TOHNICHI_SEO_TITLE,
          headline:
            lang === "en"
              ? "Tohnichi Indonesia: Torque Wrenches & Torque Tools"
              : "Tohnichi Indonesia: Torque Wrench & Torque Tools",
          description: TOHNICHI_SEO_DESCRIPTION[lang],
          url: `https://cse.co.id${localizedTohnichiPagePath}`,
          inLanguage: lang === "en" ? "en-ID" : "id-ID",
          citation: [TOHNICHI_DISTRIBUTOR_URL, TOHNICHI_SUPPORT_URL],
          about: {
            "@type": "Brand",
            name: "Tohnichi",
            url: TOHNICHI_OFFICIAL_URL,
            logo: "https://cse.co.id/assets/brands/logos/tohnichi--nobg.png"
          },
          provider: {
            "@type": "Organization",
            "@id": "https://cse.co.id/#organization",
            name: "PT Citra Sukses Ekapratama",
            url: "https://cse.co.id",
            email: "cse@citra-sukses.com",
            areaServed: {
              "@type": "Country",
              name: "Indonesia"
            },
            subjectOf: [
              {
                "@type": "WebPage",
                name: "Tohnichi's Network of Sales and Service Agents",
                url: TOHNICHI_DISTRIBUTOR_URL
              },
              {
                "@type": "WebPage",
                name: "Tohnichi Overseas Calibration and Repair Licensees",
                url: TOHNICHI_SUPPORT_URL
              }
            ]
          },
          mainEntity: {
            "@type": "ItemList",
            name: lang === "en" ? "Tohnichi product families in Indonesia" : "Keluarga produk Tohnichi Indonesia",
            numberOfItems: brand.productGroups.flatMap((group) => group.products).length,
            itemListElement: brand.productGroups
              .flatMap((group) => group.products)
              .map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: product.name,
                url: `https://cse.co.id${staticExportPath(
                  `/brands/${brand.slug}/products/${product.slug}`,
                  lang
                )}`
              }))
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "CSE",
              item: "https://cse.co.id"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: lang === "en" ? "Brands" : "Brand",
              item: `https://cse.co.id${staticExportPath("/brands", lang)}`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Tohnichi Indonesia",
              item: `https://cse.co.id${localizedTohnichiPagePath}`
            }
          ]
        }
      ]
    : null;
  const sankyoRikagakuJsonLd = isSankyoRikagaku
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Sankyo Rikagaku Co., Ltd.",
          alternateName: ["FUJISTAR", "Fuji Star"],
          foundingDate: "1930",
          url: "https://en.fujistar.com/",
          logo: "https://cse.co.id/assets/brands/logos/fuji-star.png",
          description: brand.summary.id
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Katalog produk Sankyo Rikagaku FUJISTAR Indonesia",
          itemListElement: brand.productGroups
            .flatMap((group) => group.products)
            .map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: `https://cse.co.id/brands/${brand.slug}/products/${product.slug}`
            }))
        }
      ]
    : null;

  return (
    <>
      {tohnichiJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tohnichiJsonLd) }}
        />
      ) : null}
      {sankyoRikagakuJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sankyoRikagakuJsonLd) }}
        />
      ) : null}
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands", lang), label: lang === "en" ? "Brands" : "Brand" },
          { label: brand.name }
        ]}
      />
      <Hero
        eyebrow={
          isTohnichi
            ? lang === "en"
              ? "Tohnichi sales & service agent / Indonesia"
              : "Agen penjualan & servis Tohnichi / Indonesia"
            : `${brand.name} / ${brand.country}`
        }
        title={
          isTohnichi
            ? lang === "en"
              ? "Tohnichi Indonesia: Torque Wrenches & Torque Tools"
              : "Tohnichi Indonesia: Torque Wrench & Torque Tools"
            : text(brand.category, lang)
        }
        description={isTohnichi ? TOHNICHI_SEO_DESCRIPTION[lang] : text(brand.description, lang)}
        primaryHref={withLang(`/contact?brand=${brand.slug}`, lang)}
        primaryLabel={lang === "en" ? "Request this brand" : "Minta brand ini"}
        secondaryHref={withLang("/brands", lang)}
        secondaryLabel={lang === "en" ? "All brands" : "Semua brand"}
        image={brand.heroImage}
        imageLabel={`${brand.name} products`}
        imageClassName={
          isTohnichi
            ? "object-[50%_28%]"
            : isNac
              ? "object-center"
              : isSankyoRikagaku
                ? "object-[58%_50%]"
                : ""
        }
        highlights={brand.strengths.slice(0, 3).map((item) => text(item, lang))}
      />

      {isTohnichi ? (
        <>
          <section className="bg-white py-16">
            <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                  Tohnichi Mfg. Co., Ltd.
                </p>
                <h2 className="text-balance text-2xl font-bold tracking-normal text-graphite-900 md:text-4xl">
                  {lang === "en" ? "Precision technology from Japan since 1949." : "Teknologi presisi dari Jepang sejak tahun 1949."}
                </h2>
                <p className="mt-4 text-base leading-7 text-graphite-500">
                  {lang === "en"
                    ? "CSE is listed by Tohnichi as a sales and service agent and as an overseas calibration and repair licensee in Indonesia."
                    : "CSE tercantum oleh Tohnichi sebagai agen penjualan dan servis serta licensee kalibrasi dan perbaikan di Indonesia."}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  <a
                    href={TOHNICHI_DISTRIBUTOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex text-sm font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 transition hover:text-industrial-900"
                  >
                    {lang === "en" ? "Verify sales & service agent" : "Verifikasi agen penjualan & servis"}
                  </a>
                  <a
                    href={TOHNICHI_SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex text-sm font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 transition hover:text-industrial-900"
                  >
                    {lang === "en"
                      ? "Verify calibration & repair licensee"
                      : "Verifikasi licensee kalibrasi & perbaikan"}
                  </a>
                </div>
                <div className="mt-7 border-t border-graphite-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
                    {lang === "en" ? "Torque wrench" : "Kunci torsi"}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-graphite-900 md:text-2xl">
                    {lang === "en"
                      ? "Tighten bolts with precision and repeatability."
                      : "Kencangkan baut dengan mudah, presisi, dan konsisten."}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-500">
                    {lang === "en"
                      ? "CSE helps match torque tools to production, inspection, small torque, calibration, and poka-yoke requirements."
                      : "CSE membantu mencocokkan torque tools untuk produksi, inspeksi, torsi kecil, kalibrasi, dan kebutuhan poka-yoke."}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden border border-graphite-200 bg-graphite-900 shadow-panel">
                <video
                  className="aspect-video w-full object-cover"
                  src="/assets/brands/products/tohnichi/Torque Wrench QL CL video english version_1080.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
                <a
                  href="https://www.youtube.com/watch?v=vtZKwdSp5Ow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring block border-t border-white/15 bg-graphite-900 px-5 py-4 text-sm font-bold leading-6 text-white underline decoration-white/30 underline-offset-4 transition hover:bg-industrial-800 hover:decoration-white"
                >
                  &quot;Tohnichi QL+ CL+ Torque Wrench&quot; Watch in Tohnichi&apos;s Official Youtube
                </a>
              </div>
            </div>
          </section>

          <section className="bg-graphite-900 text-white">
            <div className="container-page py-14 lg:py-16">
              <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.62fr)_minmax(0,1.38fr)] lg:items-start">
                <section
                  className="border border-white/15 bg-white/[0.025] p-6 sm:p-7"
                  aria-labelledby="tohnichi-safety-title"
                >
                  <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    Safety first
                  </p>
                  <h2
                    id="tohnichi-safety-title"
                    className="mt-4 text-balance text-2xl font-bold leading-tight tracking-normal sm:text-3xl"
                  >
                    {lang === "en"
                      ? "Avoid under-tightening and over-tightening."
                      : "Utamakan safety. Hindari baut yang kurang kencang atau terlalu kencang."}
                  </h2>
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {lang === "en"
                        ? "Stages to tightening assurance"
                        : "Tahapan menuju tightening assurance"}
                    </p>
                    <ol className="mt-5">
                      {[
                        {
                          number: "01",
                          title: lang === "en" ? "Define the standard" : "Tentukan standar",
                          body:
                            lang === "en"
                              ? "Set the torque value, tolerance, and work method."
                              : "Tetapkan nilai torsi, toleransi, dan metode kerja."
                        },
                        {
                          number: "02",
                          title: lang === "en" ? "Control tightening" : "Kendalikan tightening",
                          body:
                            lang === "en"
                              ? "Use the correct torque tool and prevent missed work."
                              : "Gunakan torque tool yang tepat dan cegah proses terlewat."
                        },
                        {
                          number: "03",
                          title: lang === "en" ? "Verify the result" : "Verifikasi hasil",
                          body:
                            lang === "en"
                              ? "Inspect, record, and trace each tightening result."
                              : "Periksa, rekam, dan telusuri setiap hasil tightening."
                        }
                      ].map((stage) => (
                        <li
                          key={stage.number}
                          className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-6"
                        >
                          <span
                            className="absolute bottom-0 left-[1.22rem] top-10 w-px bg-white/15"
                            aria-hidden="true"
                          />
                          <span className="relative z-10 flex h-10 w-10 items-center justify-center border border-signal-500/45 bg-graphite-900 font-mono text-xs font-black text-signal-500">
                            {stage.number}
                          </span>
                          <div className="pt-0.5">
                            <p className="text-sm font-bold leading-5 text-white">{stage.title}</p>
                            <p className="mt-1 text-xs leading-5 text-white/55">{stage.body}</p>
                          </div>
                        </li>
                      ))}
                      <li className="grid grid-cols-[2.5rem_1fr] gap-3">
                        <span className="relative z-10 flex h-10 w-10 items-center justify-center bg-[#f4c91d] text-graphite-900">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="border border-[#f4c91d]/40 bg-[#f4c91d]/10 px-4 py-3">
                          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#f4c91d]">
                            {lang === "en" ? "Controlled outcome" : "Hasil terkendali"}
                          </p>
                          <p className="mt-1 text-sm font-bold leading-5 text-white">
                            Tightening Assurance System
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </section>

                <div className="min-w-0">
                  <TohnichiProductPromotionCarousel lang={lang} />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : isNac ? (
        <NacBrandOverview lang={lang} />
      ) : isSankyoRikagaku ? (
        <SankyoRikagakuBrandOverview lang={lang} />
      ) : (
        <section className="bg-white py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeader
              eyebrow={lang === "en" ? "Brand support" : "Dukungan brand"}
              title={lang === "en" ? "What CSE can help with." : "Hal yang bisa dibantu CSE."}
              description={text(brand.summary, lang)}
            />
            <FeatureGrid items={brand.strengths.map((item) => text(item, lang))} />
          </div>
        </section>
      )}

      {hasProductExplorer ? (
        <BrandProductExplorer
          groups={brand.productGroups}
          lang={lang}
          brandSlug={brand.slug}
          brandName={brand.name}
        />
      ) : (
        <section className="bg-white py-16">
          <div className="container-page">
            <SectionHeader
              eyebrow={lang === "en" ? "Product lines" : "Lini Produk"}
              title={hasProducts ? (lang === "en" ? `${brand.name} by process and use case` : `${brand.name} berdasarkan proses dan kebutuhan`) : (lang === "en" ? "Discuss this brand with CSE" : "Diskusikan brand ini dengan CSE")}
              description={
                hasProducts
                  ? lang === "en"
                    ? "Contact CSE for the complete product line, model selection, and availability."
                    : "Hubungi CSE untuk melihat full product line, pemilihan model, dan ketersediaan."
                  : lang === "en"
                    ? "Send the product category, model target, and application details for sourcing review."
                    : "Kirim kategori produk, target model, dan detail aplikasi untuk review sourcing."
              }
            />
            <div className="mt-10 border-t border-graphite-200">
              {hasProducts ? (
                brand.productGroups.map((group) => (
                  <UseCaseSection key={group.slug} group={group} brandSlug={brand.slug} lang={lang} />
                ))
              ) : (
                <div className="border border-dashed border-graphite-300 bg-white p-8 text-sm leading-6 text-graphite-500">
                  {lang === "en"
                    ? "Product categories and models for this brand are being prepared. Send an RFQ with the required model or specification."
                    : "Kategori dan model produk untuk brand ini sedang disiapkan. Kirim RFQ dengan model atau spesifikasi yang dibutuhkan."}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-industrial-800 py-16 text-white">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {isTohnichi
                ? "Tightening assurance"
                : isNac
                  ? "Fastener selection"
                  : isSankyoRikagaku
                    ? "Abrasive selection"
                    : brand.name}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold">
              {isTohnichi
                ? lang === "en"
                  ? "How do you prevent miss-tightening in your process?"
                  : "Bagaimana cara menghindari miss-tightening di proses Anda?"
                : isNac
                  ? lang === "en"
                    ? "Which drive, fastener profile, and working length does your process need?"
                    : "Drive, profil fastener, dan panjang kerja apa yang dibutuhkan proses Anda?"
                  : isSankyoRikagaku
                    ? lang === "en"
                      ? "Which workpiece, grit sequence, backing, and product form does your finish require?"
                      : "Material, grit sequence, backing, dan bentuk produk apa yang dibutuhkan finish Anda?"
                : lang === "en"
                  ? "Need help choosing the correct model?"
                  : "Butuh bantuan memilih model yang tepat?"}
            </h2>
            {isTohnichi || isSankyoRikagaku ? (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/75">
                <CheckCircle2 className="h-4 w-4 text-white" aria-hidden="true" />
                {isTohnichi
                  ? lang === "en"
                    ? "Consult CSE about building and implementing a tightening assurance system."
                    : "Konsultasikan cara membangun dan mengimplementasi tightening assurance system."
                  : lang === "en"
                    ? "Share a sample, current abrasive code, finish target, and machine details for a selection review."
                    : "Kirim sample, kode abrasive saat ini, target finish, dan detail mesin untuk review pemilihan."}
              </p>
            ) : null}
          </div>
          <CTAButton href={withLang(`/contact?brand=${brand.slug}`, lang)}>
            <span className="inline-flex items-center gap-2">
              {lang === "en" ? "Send product inquiry" : "Kirim inquiry produk"}
              <RadioTower className="h-4 w-4" aria-hidden="true" />
            </span>
          </CTAButton>
        </div>
      </section>
    </>
  );
}
