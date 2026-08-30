import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ExternalLink, PackageCheck, RadioTower } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandPageProgress } from "@/components/BrandPageProgress";
import { BrandProductExplorer } from "@/components/BrandProductExplorer";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandReferenceGallery } from "@/components/BrandReferenceGallery";
import { CTAButton } from "@/components/CTAButton";
import { Hero } from "@/components/Hero";
import { NacBrandOverview } from "@/components/NacBrandOverview";
import { SankyoRikagakuBrandOverview } from "@/components/SankyoRikagakuBrandOverview";
import { SectionHeader } from "@/components/SectionHeader";
import { TohnichiBrandLanding } from "@/components/TohnichiBrandLanding";
import { TohnichiProductPromotionCarousel } from "@/components/TohnichiProductPromotionCarousel";
import { UseCaseSection } from "@/components/UseCaseSection";
import { seedCatalog } from "@/data/catalog-seed";
import { canViewBrandDraft, isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildPageMetadata, organizationReference } from "@/lib/seo";
import { absoluteLocalizedUrl, absoluteUrl } from "@/lib/seo-config";
import { getBrandIndexability } from "@/lib/seo-indexability";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const TOHNICHI_PAGE_PATH = "/brands/tohnichi";
const TOHNICHI_OFFICIAL_URL = "https://en.global-tohnichi.com/";
const TOHNICHI_DISTRIBUTOR_URL = "https://en.global-tohnichi.com/support/distributors.html";
const TOHNICHI_SUPPORT_URL = "https://en.global-tohnichi.com/support/";
const TOHNICHI_SEO_TITLE = {
  id: "Distributor Resmi TOHNICHI Indonesia | Sales, Service & Calibration",
  en: "Official TOHNICHI Distributor Indonesia | Sales, Service & Calibration"
};
const TOHNICHI_SEO_DESCRIPTION = {
  id: "PT Citra Sukses Ekapratama adalah distributor resmi, agen penjualan dan servis TOHNICHI di Indonesia.",
  en: "PT Citra Sukses Ekapratama is an official TOHNICHI distributor, sales and service agent in Indonesia."
};
export function generateStaticParams() {
  return seedCatalog.filter((brand) => brand.published).map((brand) => ({ slug: brand.slug }));
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
  const isNac = brand.slug === "nac";
  const isSankyoRikagaku = brand.slug === "fuji-star";
  const brandPath = `/brands/${brand.slug}`;
  const title = isTohnichi
    ? TOHNICHI_SEO_TITLE[lang]
    : isNac
      ? lang === "en"
        ? "NAC / Nagahori Industry Indonesia | Sockets & Quick Couplings"
        : "NAC / Nagahori Industry Indonesia | Socket & Quick Coupling"
    : isSankyoRikagaku
      ? lang === "en"
        ? "SANKYO Rikagaku (FUJISTAR) Indonesia | Abrasives"
        : "SANKYO Rikagaku (FUJISTAR) Indonesia | Abrasive"
      : brand.name;
  const description = isTohnichi
    ? TOHNICHI_SEO_DESCRIPTION[lang]
    : isNac
      ? lang === "en"
        ? "NAC is the industrial socket, bit, and quick-coupling brand of Nagahori Industry Co., Ltd. CSE supports model and custom-product selection in Indonesia."
        : "NAC adalah brand industrial socket, bit, dan quick coupling dari Nagahori Industry Co., Ltd. CSE mendukung pemilihan model dan produk custom di Indonesia."
      : text(brand.summary, lang);
  return buildPageMetadata({
    path: brandPath,
    title,
    description,
    lang,
    image: brand.heroImage,
    imageAlt: `${brand.name} products in Indonesia`,
    indexability: getBrandIndexability({
      published: brand.published,
      publiclyAvailable: isBrandPubliclyAvailable(brand.slug)
    })
  });
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
  const hasProductExplorer = isNac || isSankyoRikagaku;
  const tohnichiJsonLd = isTohnichi
    ? [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TOHNICHI_SEO_TITLE[lang],
          headline:
            lang === "en"
              ? "Official TOHNICHI Distributor Indonesia"
              : "Distributor Resmi TOHNICHI Indonesia",
          description: TOHNICHI_SEO_DESCRIPTION[lang],
          url: absoluteLocalizedUrl(TOHNICHI_PAGE_PATH, lang),
          inLanguage: lang === "en" ? "en-US" : "id-ID",
          citation: [TOHNICHI_DISTRIBUTOR_URL, TOHNICHI_SUPPORT_URL],
          about: {
            "@type": "Brand",
            name: "TOHNICHI",
            url: TOHNICHI_OFFICIAL_URL,
            logo: absoluteUrl("/assets/brands/logos/tohnichi--nobg.png")
          },
          provider: {
            ...organizationReference(),
            email: "cse@citra-sukses.com",
            areaServed: {
              "@type": "Country",
              name: "Indonesia"
            },
            subjectOf: [
              {
                "@type": "WebPage",
                name: "TOHNICHI's Network of Sales and Service Agents",
                url: TOHNICHI_DISTRIBUTOR_URL
              },
              {
                "@type": "WebPage",
                name: "TOHNICHI Overseas Calibration and Repair Licensees",
                url: TOHNICHI_SUPPORT_URL
              }
            ]
          },
          mainEntity: {
            "@type": "ItemList",
            name: lang === "en" ? "TOHNICHI product categories in Indonesia" : "Kategori produk TOHNICHI di Indonesia",
            numberOfItems: 4,
            itemListElement: [
              { name: "TOHNICHI Torque Wrench", path: "/torque-wrench" },
              { name: "TOHNICHI Torque Screwdriver", path: "/torque-screwdriver" },
              { name: "TOHNICHI Torque Tester", path: "/torque-tester" },
              {
                name: lang === "en" ? "Complete TOHNICHI Catalogue" : "Katalog Lengkap TOHNICHI",
                path: "/brands/tohnichi/products"
              }
            ].map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: absoluteLocalizedUrl(item.path, lang)
              }))
          }
        },
        buildBreadcrumbJsonLd({
          lang,
          items: [
            { name: lang === "en" ? "Brands" : "Brand", path: "/brands" },
            { name: "TOHNICHI", path: TOHNICHI_PAGE_PATH }
          ]
        })
      ]
    : null;
  const sankyoRikagakuJsonLd = isSankyoRikagaku
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Sankyo Rikagaku Co., Ltd.",
          alternateName: ["SANKYO", "Sankyo Chemical", "FUJISTAR", "Fuji Star"],
          foundingDate: "1930",
          url: "https://en.fujistar.com/",
          logo: absoluteUrl("/assets/brands/logos/fuji-star.png"),
          description: brand.summary.id,
          areaServed: { "@type": "Country", name: "Indonesia" },
          provider: organizationReference()
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
              url: absoluteLocalizedUrl(`/brands/${brand.slug}/products/${product.slug}`, lang)
            }))
        }
      ]
    : null;
  const nacJsonLd = isNac
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NAGAHORI INDUSTRY CO., LTD.",
          alternateName: ["NAC", "Nagahori", "Nagahori Industry"],
          url: "https://nac-corp.co.jp/en/",
          description:
            lang === "en"
              ? "NAC is the industrial socket, bit, and quick-coupling brand of Nagahori Industry Co., Ltd., available through CSE in Indonesia."
              : "NAC adalah brand industrial socket, bit, dan quick coupling dari Nagahori Industry Co., Ltd. yang tersedia melalui CSE di Indonesia.",
          areaServed: { "@type": "Country", name: "Indonesia" },
          provider: organizationReference()
        },
        buildBreadcrumbJsonLd({
          lang,
          items: [
            { name: lang === "en" ? "Brands" : "Brand", path: "/brands" },
            { name: "NAC / Nagahori Industry", path: "/brands/nac" }
          ]
        })
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
      {nacJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nacJsonLd) }} />
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
              ? "Official TOHNICHI distributor / Indonesia"
              : "Distributor resmi TOHNICHI / Indonesia"
            : isNac
              ? "NAC · NAGAHORI INDUSTRY CO., LTD. / Japan"
            : isSankyoRikagaku
              ? "SANKYO RIKAGAKU · FUJISTAR / Japan"
            : `${brand.name}${brand.country ? ` / ${brand.country}` : ""}`
        }
        title={
          isTohnichi
            ? lang === "en"
              ? "Official TOHNICHI Distributor Indonesia"
              : "Distributor Resmi TOHNICHI Indonesia"
            : isNac
              ? "NAC / Nagahori Industry Indonesia"
            : isSankyoRikagaku
              ? "SANKYO Rikagaku (FUJISTAR) Indonesia"
            : text(brand.category, lang)
        }
        description={
          isTohnichi
            ? TOHNICHI_SEO_DESCRIPTION[lang]
            : isNac
              ? lang === "en"
                ? "NAC is the industrial socket, bit, and quick-coupling brand of Nagahori Industry Co., Ltd. CSE supports model and custom-product selection in Indonesia."
                : "NAC adalah brand industrial socket, bit, dan quick coupling dari Nagahori Industry Co., Ltd. CSE mendukung pemilihan model dan produk custom di Indonesia."
              : text(brand.description, lang)
        }
        primaryHref={withLang(`/contact?brand=${brand.slug}`, lang)}
        primaryLabel={lang === "en" ? "Request this brand" : "Minta brand ini"}
        secondaryHref={withLang(isTohnichi ? "/brands/tohnichi/products" : "/brands", lang)}
        secondaryLabel={
          isTohnichi
            ? lang === "en"
              ? "Complete catalogue"
              : "Katalog lengkap"
            : lang === "en"
              ? "All brands"
              : "Semua brand"
        }
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

      {(isNac || isSankyoRikagaku) && brand.officialWebsite ? (
        <div className="border-b border-graphite-200 bg-white">
          <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-graphite-600">
              {lang === "en" ? `Manufacturer information and full catalogue: ${brand.name}` : `Informasi manufacturer dan katalog lengkap: ${brand.name}`}
            </p>
            <a
              href={brand.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 hover:text-industrial-900"
            >
              {lang === "en" ? "Visit official website" : "Kunjungi website resmi"}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}

      {isTohnichi ? (
        <>
          <section className="bg-white py-16">
            <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                  TOHNICHI Mfg. Co., Ltd.
                </p>
                <h2 className="text-balance text-2xl font-bold tracking-normal text-graphite-900 md:text-4xl">
                  {lang === "en" ? "Precision technology from Japan since 1949." : "Teknologi presisi dari Jepang sejak tahun 1949."}
                </h2>
                <p className="mt-4 text-base leading-7 text-graphite-500">
                  {lang === "en"
                    ? "CSE is listed by TOHNICHI as a sales and service agent and as an overseas calibration and repair licensee in Indonesia."
                    : "CSE tercantum oleh TOHNICHI sebagai agen penjualan dan servis serta licensee kalibrasi dan perbaikan di Indonesia."}
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
                  &quot;TOHNICHI QL+ CL+ Torque Wrench&quot; Watch in TOHNICHI&apos;s Official Youtube
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
          <TohnichiBrandLanding lang={lang} />
        </>
      ) : isNac ? (
        <NacBrandOverview lang={lang} />
      ) : isSankyoRikagaku ? (
        <SankyoRikagakuBrandOverview lang={lang} />
      ) : (
        <section className="bg-white py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="border border-graphite-200 bg-graphite-50 p-6">
              {brand.referenceImages && brand.referenceImages.length > 0 ? (
                <BrandReferenceGallery images={brand.referenceImages} brandName={brand.name} lang={lang} />
              ) : null}
              <BrandLogo
                name={brand.name}
                slug={brand.slug}
                src={brand.logo}
                className={`${brand.referenceImages?.length ? "mt-4" : ""} h-32 w-full border border-graphite-200 bg-white`}
                sizes="240px"
              />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">
                {lang === "en" ? "Brand origin" : "Asal brand"}
              </p>
              <p className="mt-2 font-bold text-graphite-900">
                {brand.country || (lang === "en" ? "Origin not confirmed" : "Asal belum dikonfirmasi")}
              </p>
              {brand.officialWebsite ? (
                <a
                  href={brand.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 bg-industrial-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-industrial-800"
                >
                  {lang === "en" ? "Visit official website" : "Kunjungi website resmi"}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div>
              <SectionHeader
                eyebrow={lang === "en" ? "Brand introduction" : "Pengenalan brand"}
                title={
                  brand.researchStatus === "unresolved"
                    ? lang === "en"
                      ? `${brand.name} identification status.`
                      : `Status identifikasi ${brand.name}.`
                    : lang === "en"
                      ? `What ${brand.name} sells and where it is used.`
                      : `Produk ${brand.name} dan kegunaannya.`
                }
                description={text(brand.summary, lang)}
              />
              <p className="mt-6 max-w-3xl text-base leading-7 text-graphite-600">
                {text(brand.description, lang)}
              </p>
              {brand.researchStatus === "unresolved" ? (
                <div className="mt-8 flex gap-3 border border-signal-300 bg-signal-50 p-5 text-sm leading-6 text-graphite-700">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-600" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-graphite-900">
                      {lang === "en" ? "Exact brand identity not confirmed" : "Identitas brand belum dikonfirmasi"}
                    </p>
                    <p className="mt-1">{brand.researchNote ? text(brand.researchNote, lang) : text(brand.description, lang)}</p>
                  </div>
                </div>
              ) : brand.popularProducts && brand.popularProducts.length > 0 ? (
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-signal-600" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-graphite-900">
                      {lang === "en" ? "Popular product lines" : "Lini produk populer"}
                    </h2>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {brand.popularProducts.map((product) => (
                      <div key={text(product, lang)} className="border border-graphite-200 bg-graphite-50 px-4 py-3 text-sm font-semibold text-graphite-700">
                        {text(product, lang)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {isTohnichi ? null : hasProductExplorer ? (
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
