import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, Search } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandProductExplorer } from "@/components/BrandProductExplorer";
import { seedCatalog } from "@/data/catalog-seed";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { buildCollectionJsonLd, buildPageMetadata } from "@/lib/seo";
import { staticLanguage, withLang } from "@/lib/i18n";
import { getBrandCatalogueIndexability } from "@/lib/seo-indexability";

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
    imageAlt: "Katalog produk TOHNICHI Indonesia",
    indexability: getBrandCatalogueIndexability()
  });
  return metadata;
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
      <section className="tohnichi-catalog-backdrop overflow-hidden border-b border-graphite-900 py-7 text-white md:py-8">
        <div className="container-page grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="inline-flex border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              {lang === "en" ? "TOHNICHI product catalogue / Indonesia" : "Katalog produk TOHNICHI / Indonesia"}
            </p>
            <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-[1.08] md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="#tohnichi-products"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-signal-600 px-5 text-sm font-bold text-white hover:bg-signal-500"
              >
                {lang === "en" ? "Help me choose" : "Bantu saya memilih"}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#tohnichi-catalog-search"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 bg-white/5 px-5 text-sm font-bold text-white hover:bg-white hover:text-graphite-900"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {lang === "en" ? "I know the model" : "Saya tahu modelnya"}
              </Link>
          </div>
        </div>
      </section>
      <BrandProductExplorer groups={brand.productGroups} lang={lang} brandSlug={brand.slug} brandName={brand.name} />
    </>
  );
}
