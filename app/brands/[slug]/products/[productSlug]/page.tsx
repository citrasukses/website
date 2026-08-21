import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, RadioTower } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandPageProgress } from "@/components/BrandPageProgress";
import { CTAButton } from "@/components/CTAButton";
import { NacFamilyDetails } from "@/components/NacFamilyDetails";
import { NacSocketSelectionGuide } from "@/components/NacSocketSelectionGuide";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { SankyoRikagakuFamilyDetails } from "@/components/SankyoRikagakuFamilyDetails";
import { SectionHeader } from "@/components/SectionHeader";
import { TohnichiModelTable } from "@/components/TohnichiModelTable";
import { TohnichiSpecificationTables } from "@/components/TohnichiSpecificationTables";
import { seedCatalog } from "@/data/catalog-seed";
import { nacCouplingProductDetails } from "@/data/nac-coupling-product-details";
import { nacProductDetails } from "@/data/nac-product-details";
import { sankyoRikagakuProductDetails } from "@/data/sankyo-rikagaku-product-details";
import { tohnichiProductDetails } from "@/data/tohnichi-product-details";
import { canViewBrandDraft, isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { languageAlternates, localizedPath, staticLanguage, text, withLang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export function generateStaticParams() {
  return seedCatalog.filter((brand) => brand.published).flatMap((brand) =>
    brand.productGroups.flatMap((group) => group.products.map((product) => ({ slug: brand.slug, productSlug: product.slug })))
  );
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);
  const product = brand?.productGroups.flatMap((group) => group.products).find((candidate) => candidate.slug === productSlug);
  if (!product || !brand) {
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

  const productPath = `/brands/${brand.slug}/products/${product.slug}`;
  const canonical = localizedPath(productPath, lang);
  const tohnichiDetail = brand.slug === "tohnichi" ? tohnichiProductDetails[product.slug] : undefined;
  const nacDetail =
    brand.slug === "nac" ? nacProductDetails[product.slug] ?? nacCouplingProductDetails[product.slug] : undefined;
  const sankyoRikagakuDetail =
    brand.slug === "fuji-star" ? sankyoRikagakuProductDetails[product.slug] : undefined;
  const description =
    text(
      tohnichiDetail?.seoDescription ??
        sankyoRikagakuDetail?.seoDescription ??
        nacDetail?.overview ??
        product.summary,
      lang
    );
  const seoTitle =
    brand.slug === "tohnichi"
      ? lang === "en"
        ? `${product.name} Tohnichi - Models & Specifications`
        : `${product.name} Tohnichi - Model & Spesifikasi`
      : brand.slug === "nac"
        ? lang === "en"
          ? `${product.name} NAC Indonesia - Models & Catalogue`
          : `${product.name} NAC Indonesia - Model & Katalog`
        : brand.slug === "fuji-star"
          ? lang === "en"
            ? `${product.name} Sankyo Rikagaku Indonesia - FUJISTAR Catalogue`
            : `${product.name} Sankyo Rikagaku Indonesia - Katalog FUJISTAR`
        : `${product.name} | ${brand.name}`;
  const nacKeywords =
    brand.slug === "nac"
      ? Array.from(
          new Set([
            `${product.name} NAC`,
            `${product.name} Indonesia`,
            "NAC fastener tools",
            ...product.tags.flatMap((tag) => [tag.id, tag.en])
          ])
        )
      : undefined;

  return {
    title: seoTitle,
    description,
    keywords: tohnichiDetail?.seoKeywords ?? sankyoRikagakuDetail?.seoKeywords ?? nacKeywords,
    alternates: {
      canonical,
      languages: languageAlternates(productPath)
    },
    openGraph: {
      title: `${product.name} ${brand.name} Indonesia | CSE`,
      description,
      url: canonical,
      type: "website",
      images: product.image ? [{ url: product.image, alt: `${brand.name} ${product.name}` }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} ${brand.name} Indonesia | CSE`,
      description,
      images: product.image ? [product.image] : undefined
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);
  if (!brand) notFound();
  const group = brand.productGroups.find((candidate) => candidate.products.some((product) => product.slug === productSlug));
  const product = group?.products.find((candidate) => candidate.slug === productSlug);
  if (!product || !group) notFound();

  if (!canViewBrandDraft(brand.slug)) {
    return <BrandPageProgress brandName={brand.name} lang={lang} />;
  }

  const tohnichiDetail = brand.slug === "tohnichi" ? tohnichiProductDetails[product.slug] : undefined;
  const nacDetail =
    brand.slug === "nac" ? nacProductDetails[product.slug] ?? nacCouplingProductDetails[product.slug] : undefined;
  const sankyoRikagakuDetail =
    brand.slug === "fuji-star" ? sankyoRikagakuProductDetails[product.slug] : undefined;
  const isNacCoupling = Boolean(nacDetail && "kind" in nacDetail && nacDetail.kind === "coupling");
  const familyDetail = tohnichiDetail ?? nacDetail ?? sankyoRikagakuDetail;
  const images = Array.from(
    new Set((familyDetail?.images ?? [product.image, ...product.images]).filter(Boolean))
  );
  const rfqPath = withLang(`/contact?brand=${encodeURIComponent(brand.slug)}&product=${encodeURIComponent(product.model || product.name)}`, lang);
  const relatedProducts = group.products.filter((candidate) => candidate.slug !== product.slug).slice(0, 3);
  const otherGroups = brand.productGroups.filter((candidate) => candidate.slug !== group.slug);
  const brandGroupHref = (groupSlug: string) =>
    withLang(`/brands/${brand.slug}#${groupSlug}`, lang);
  const selectionGuidance =
    brand.slug === "nac"
      ? isNacCoupling
        ? [
            {
              title: lang === "en" ? "Confirm fluid and conditions" : "Konfirmasikan fluida dan kondisi",
              body:
                lang === "en"
                  ? "Specify the fluid, concentration, temperature range, cleanliness, and chemical compatibility before choosing body and seal materials."
                  : "Tentukan fluida, konsentrasi, rentang temperatur, cleanliness, dan chemical compatibility sebelum memilih body serta seal."
            },
            {
              title: lang === "en" ? "Size pressure and flow" : "Tentukan pressure dan flow",
              body:
                lang === "en"
                  ? "Provide working and peak pressure, required flow, pressure-loss limit, connection size, and whether either side must shut off at disconnection."
                  : "Sertakan working dan peak pressure, flow, batas pressure loss, ukuran koneksi, serta apakah salah satu atau kedua sisi harus menutup saat disconnected."
            },
            {
              title: lang === "en" ? "Check operation and safety" : "Periksa operasi dan safety",
              body:
                lang === "en"
                  ? "Confirm connection frequency, residual pressure, hose movement, lock requirement, drip limit, environment, and maintenance access."
                  : "Konfirmasikan frekuensi connection, residual pressure, hose movement, kebutuhan lock, drip limit, environment, dan maintenance access."
            }
          ]
        : [
          {
            title: lang === "en" ? "Define the tool interface" : "Tentukan interface tool",
            body:
              lang === "en"
                ? "Confirm the square drive or bit shank, holder geometry, and ball-groove position before selecting the working end."
                : "Konfirmasikan square drive atau bit shank, geometry holder, dan posisi ball groove sebelum memilih working end."
          },
          {
            title: lang === "en" ? "Match the fastener and access" : "Cocokkan fastener dan akses",
            body:
              lang === "en"
                ? "Identify the hex, Phillips, slotted, TORX, or custom profile together with its size, recess depth, and outside clearance."
                : "Identifikasi profil hex, Phillips, slotted, TORX, atau custom bersama ukuran, kedalaman recess, dan outside clearance."
          },
          {
            title: lang === "en" ? "Confirm the production setup" : "Konfirmasikan setup produksi",
            body:
              lang === "en"
                ? "Specify working length, magnetic retention, angular access, and whether the operation is manual, powered, or automatic."
                : "Tentukan working length, magnetic retention, akses bersudut, serta apakah prosesnya manual, powered, atau automatic."
          }
        ]
      : brand.slug === "fuji-star"
        ? [
            {
              title: lang === "en" ? "Start with the workpiece" : "Mulai dari workpiece",
              body:
                lang === "en"
                  ? "Identify the material, coating, contour, defect, and surface condition before choosing an abrasive family."
                  : "Identifikasi material, coating, contour, defect, dan kondisi permukaan sebelum memilih keluarga abrasive."
            },
            {
              title: lang === "en" ? "Define the cut and finish" : "Tentukan cut dan finish",
              body:
                lang === "en"
                  ? "Set the required removal rate, target scratch or gloss, abrasive grain, and grit progression."
                  : "Tentukan removal rate, target scratch atau gloss, abrasive grain, dan grit progression yang dibutuhkan."
            },
            {
              title: lang === "en" ? "Match the format and process" : "Cocokkan format dan proses",
              body:
                lang === "en"
                  ? "Confirm sheet, disc, belt, roll, or non-woven form together with backing, attachment, machine, speed, and dust extraction."
                  : "Konfirmasikan bentuk sheet, disc, belt, roll, atau non-woven bersama backing, attachment, mesin, speed, dan dust extraction."
            }
          ]
      : [
          {
            title: lang === "en" ? "Define the application" : "Tentukan aplikasi",
            body:
              lang === "en"
                ? "Share the task, working conditions, target range, and how often the tool will be used."
                : "Sampaikan pekerjaan, kondisi penggunaan, range target, dan frekuensi pemakaian."
          },
          {
            title: lang === "en" ? "Match the configuration" : "Sesuaikan konfigurasi",
            body:
              lang === "en"
                ? "Confirm the required head, operation method, data capture, and quality-control needs."
                : "Konfirmasikan kebutuhan head, metode operasi, pencatatan data, dan quality control."
          },
          {
            title: lang === "en" ? "Verify before ordering" : "Verifikasi sebelum memesan",
            body:
              lang === "en"
                ? "CSE will help confirm the final model, specification, and availability for the application."
                : "CSE membantu mengonfirmasi model, spesifikasi, dan ketersediaan untuk aplikasi tersebut."
          }
        ];
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": sankyoRikagakuDetail ? "ProductGroup" : "Product",
    name: `${brand.name} ${product.name}`,
    description: text(tohnichiDetail?.seoDescription ?? familyDetail?.overview ?? product.summary, lang),
    image: images.map((image) => `https://cse.co.id${image}`),
    url: `https://cse.co.id${localizedPath(`/brands/${brand.slug}/products/${product.slug}`, lang)}`,
    brand: {
      "@type": "Brand",
      name: brand.name
    },
    category: text(group.title, lang),
    hasVariant: sankyoRikagakuDetail?.models.map((model) => ({
      "@type": "Product",
      name: `${brand.name} FUJISTAR ${model.name}`,
      image: `https://cse.co.id${model.image}`,
      url: `https://cse.co.id${localizedPath(`/brands/${brand.slug}/products/${product.slug}#${model.slug}`, lang)}`,
      brand: {
        "@type": "Brand",
        name: "FUJISTAR"
      }
    })),
    additionalProperty: tohnichiDetail?.accuracy
      ? [
          {
            "@type": "PropertyValue",
            name: lang === "en" ? "Accuracy" : "Akurasi",
            value: tohnichiDetail.accuracy
          }
        ]
      : nacDetail
        ? [
            {
              "@type": "PropertyValue",
              name: lang === "en" ? "Catalogue reference" : "Referensi katalog",
              value: nacDetail.catalogueReference
            }
          ]
      : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands", lang), label: lang === "en" ? "Brands" : "Brand" },
          { href: withLang(`/brands/${brand.slug}`, lang), label: brand.name },
          { label: product.name }
        ]}
      />
      <section className="bg-white py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <ProductGallery images={images} productName={product.name} />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{brand.name} / {text(group.title, lang)}</p>
            <h1 className="mt-3 text-balance text-4xl font-bold text-graphite-900 md:text-5xl">{product.name}</h1>
            {product.model ? <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-industrial-700">Model {product.model}</p> : null}
            <p className="mt-6 text-base leading-7 text-graphite-600">
              {text(familyDetail?.overview ?? product.summary, lang)}
            </p>
            {familyDetail?.features.length ? (
              <ul className="mt-5 space-y-3 text-sm leading-6 text-graphite-600">
                {familyDetail.features.map((feature) => (
                  <li key={feature.en} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal-500" aria-hidden="true" />
                    <span>{text(feature, lang)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {product.tags.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => <span key={`${tag.id}-${tag.en}`} className="border border-graphite-200 bg-graphite-50 px-3 py-1.5 text-xs font-semibold text-graphite-600">{text(tag, lang)}</span>)}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={rfqPath}><span className="inline-flex items-center gap-2"><RadioTower className="h-4 w-4" />{lang === "en" ? "Request quotation" : "Minta penawaran"}</span></CTAButton>
              <CTAButton href={withLang(`/brands/${brand.slug}`, lang)} variant="ghost">{lang === "en" ? `All ${brand.name} products` : `Semua produk ${brand.name}`}</CTAButton>
            </div>
          </div>
        </div>
      </section>
      {brand.slug === "nac" && product.slug === "square-drive-sockets" ? (
        <NacSocketSelectionGuide lang={lang} />
      ) : null}
      {tohnichiDetail?.models.length ? (
        <TohnichiModelTable productName={product.name} detail={tohnichiDetail} lang={lang} />
      ) : tohnichiDetail ? (
        <TohnichiSpecificationTables productName={product.name} detail={tohnichiDetail} lang={lang} />
      ) : nacDetail ? (
        <NacFamilyDetails productName={product.name} detail={nacDetail} lang={lang} />
      ) : sankyoRikagakuDetail ? (
        <SankyoRikagakuFamilyDetails productName={product.name} detail={sankyoRikagakuDetail} lang={lang} />
      ) : (
        <section className="bg-graphite-50 py-14">
          <div className="container-page grid gap-8 lg:grid-cols-[0.55fr_1fr]">
            <div>
              <FileText className="h-6 w-6 text-signal-600" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-graphite-900">{lang === "en" ? "Product specifications" : "Spesifikasi produk"}</h2>
              <p className="mt-3 text-sm leading-6 text-graphite-500">{lang === "en" ? "Confirm the final specification and availability with CSE before ordering." : "Konfirmasi spesifikasi akhir dan ketersediaan dengan CSE sebelum memesan."}</p>
            </div>
            <div className="border border-graphite-200 bg-white">
              {product.specifications.length ? product.specifications.map((specification, index) => (
                <div key={index} className="grid grid-cols-[0.45fr_0.55fr] gap-4 border-b border-graphite-200 px-5 py-4 last:border-b-0">
                  <dt className="text-sm font-bold text-graphite-700">{text(specification.label, lang)}</dt>
                  <dd className="text-sm text-graphite-600">{text(specification.value, lang)}</dd>
                </div>
              )) : (
                <p className="p-6 text-sm leading-6 text-graphite-500">{lang === "en" ? "Specifications have not been published yet. Include the target model and required parameters in the RFQ." : "Spesifikasi belum dipublikasikan. Sertakan model target dan parameter yang dibutuhkan dalam RFQ."}</p>
              )}
            </div>
          </div>
        </section>
      )}
      <section className="bg-white py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Product selection guidance" : "Panduan pemilihan produk"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">
              {lang === "en"
                ? `Where ${product.name} fits`
                : `Kesesuaian ${product.name} untuk aplikasi Anda`}
            </h2>
            <p className="mt-4 text-sm leading-6 text-graphite-500">
              {text(group.description, lang)}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-3">
            {selectionGuidance.map((item) => (
              <div key={item.title} className="bg-white p-5">
                <h3 className="text-base font-bold text-graphite-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {relatedProducts.length ? (
        <section className="bg-graphite-50 py-14">
          <div className="container-page">
            <SectionHeader
              eyebrow={text(group.title, lang)}
              title={lang === "en" ? `Related ${brand.name} products` : `Produk ${brand.name} terkait`}
              description={
                lang === "en"
                  ? `Compare other products in the ${text(group.title, lang)} lineup before selecting a model.`
                  : `Bandingkan produk lain dalam lini ${text(group.title, lang)} sebelum menentukan model.`
              }
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.slug}
                  product={relatedProduct}
                  brandSlug={brand.slug}
                  lang={lang}
                  eyebrow={text(group.title, lang)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="border-t border-graphite-200 bg-white py-12">
        <div className="container-page">
          <div className="grid gap-6 border border-graphite-200 p-6 md:grid-cols-[0.72fr_1.28fr] md:items-start md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
                {lang === "en" ? `${brand.name} product lineups` : `Lini produk ${brand.name}`}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-graphite-900">
                {lang === "en" ? "Continue exploring by application." : "Lanjutkan berdasarkan aplikasi."}
              </h2>
            </div>
            <nav aria-label={lang === "en" ? `${brand.name} product lineups` : `Lini produk ${brand.name}`} className="grid gap-3 sm:grid-cols-2">
              <Link
                href={brandGroupHref(group.slug)}
                className="focus-ring border border-industrial-300 bg-industrial-50 px-4 py-3 text-sm font-bold text-industrial-800 hover:border-industrial-600"
              >
                {lang === "en" ? `All ${text(group.title, lang)} products` : `Semua produk ${text(group.title, lang)}`}
              </Link>
              {otherGroups.map((otherGroup) => (
                <Link
                  key={otherGroup.slug}
                  href={brandGroupHref(otherGroup.slug)}
                  className="focus-ring border border-graphite-200 px-4 py-3 text-sm font-bold text-graphite-700 hover:border-industrial-600 hover:text-industrial-800"
                >
                  {text(otherGroup.title, lang)} ({otherGroup.products.length})
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
