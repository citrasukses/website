import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandProductExplorer } from "@/components/BrandProductExplorer";
import { Hero } from "@/components/Hero";
import { seedCatalog } from "@/data/catalog-seed";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";
import { staticLanguage, text, withLang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const catalogueBrandSlugs = ["tohnichi"];

export const dynamicParams = false;

export function generateStaticParams() {
  return seedCatalog
    .filter((brand) => catalogueBrandSlugs.includes(brand.slug) && brand.published)
    .map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);
  if (!brand || !catalogueBrandSlugs.includes(slug)) return {};

  const title = lang === "en" ? "Complete TOHNICHI Product Catalogue Indonesia" : "Katalog Produk TOHNICHI Indonesia Lengkap";
  const description =
    lang === "en"
      ? "Search the complete TOHNICHI catalogue available through CSE by product family, model, task, and application."
      : "Cari katalog lengkap TOHNICHI melalui CSE berdasarkan keluarga produk, model, tugas, dan aplikasi.";

  const metadata = buildPageMetadata({
    path: `/brands/${slug}/products`,
    title,
    description,
    lang,
    image: brand.heroImage,
    imageAlt: "Katalog produk TOHNICHI Indonesia"
  });

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true
      }
    }
  };
}

export default async function BrandCataloguePage({ params }: PageProps) {
  const { slug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);
  if (!brand || !catalogueBrandSlugs.includes(slug)) notFound();

  const cataloguePath = `/brands/${brand.slug}/products`;
  const title = lang === "en" ? "Complete TOHNICHI Product Catalogue" : "Katalog Produk TOHNICHI Lengkap";
  const description =
    lang === "en"
      ? "Browse torque screwdrivers, torque wrenches, testers, measuring equipment, tightening-assurance systems, and accessories."
      : "Jelajahi torque screwdriver, torque wrench, tester, measuring equipment, tightening-assurance system, dan accessories.";
  const products = brand.productGroups.flatMap((group) => group.products);
  const jsonLd = buildCollectionJsonLd({
    path: cataloguePath,
    title,
    description,
    lang,
    items: products.map((product) => ({
      name: `TOHNICHI ${product.name}`,
      path: `/brands/${brand.slug}/products/${product.slug}`
    }))
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands", lang), label: lang === "en" ? "Brands" : "Brand" },
          { href: withLang(`/brands/${brand.slug}`, lang), label: brand.name },
          { label: lang === "en" ? "Complete catalogue" : "Katalog lengkap" }
        ]}
      />
      <Hero
        eyebrow={lang === "en" ? "TOHNICHI product catalogue / Indonesia" : "Katalog produk TOHNICHI / Indonesia"}
        title={title}
        description={description}
        primaryHref={withLang(`/contact?brand=${brand.slug}`, lang)}
        primaryLabel={lang === "en" ? "Request model selection" : "Minta bantuan pemilihan model"}
        secondaryHref={withLang(`/brands/${brand.slug}`, lang)}
        secondaryLabel={lang === "en" ? "About CSE & TOHNICHI" : "Tentang CSE & TOHNICHI"}
        image={brand.heroImage}
        imageLabel={`${brand.name} ${text(brand.category, lang)}`}
        imageClassName="object-[50%_28%]"
        highlights={[
          lang === "en" ? `${brand.productGroups.length} product families` : `${brand.productGroups.length} keluarga produk`,
          lang === "en" ? `${products.length} product series` : `${products.length} seri produk`,
          lang === "en" ? "Search by task and application" : "Cari berdasarkan tugas dan aplikasi"
        ]}
      />
      <BrandProductExplorer groups={brand.productGroups} lang={lang} brandSlug={brand.slug} brandName={brand.name} />
    </>
  );
}
