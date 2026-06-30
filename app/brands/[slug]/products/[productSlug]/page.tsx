import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, RadioTower } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { ProductGallery } from "@/components/ProductGallery";
import { seedCatalog } from "@/data/catalog-seed";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { staticLanguage, text, withLang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export function generateStaticParams() {
  return seedCatalog.flatMap((brand) =>
    brand.productGroups.flatMap((group) => group.products.map((product) => ({ slug: brand.slug, productSlug: product.slug })))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const brand = await getCatalogBrandBySlug(slug);
  const product = brand?.productGroups.flatMap((group) => group.products).find((candidate) => candidate.slug === productSlug);
  return product ? { title: `${product.name} | ${brand?.name}`, description: product.summary.en } : {};
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);
  if (!brand) notFound();
  const group = brand.productGroups.find((candidate) => candidate.products.some((product) => product.slug === productSlug));
  const product = group?.products.find((candidate) => candidate.slug === productSlug);
  if (!product || !group) notFound();

  const images = [product.image, ...product.images];
  const rfqPath = withLang(`/contact?brand=${encodeURIComponent(brand.slug)}&product=${encodeURIComponent(product.model || product.name)}`, lang);

  return (
    <>
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
            <p className="mt-6 text-base leading-7 text-graphite-600">{text(product.summary, lang)}</p>
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
    </>
  );
}
