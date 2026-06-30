import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, RadioTower } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { UseCaseSection } from "@/components/UseCaseSection";
import { seedCatalog } from "@/data/catalog-seed";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { staticLanguage, text, withLang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seedCatalog.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getCatalogBrandBySlug(slug);

  if (!brand) {
    return {};
  }

  return {
    title: brand.name,
    description: brand.summary.en
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lang = staticLanguage();
  const brand = await getCatalogBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const hasProducts = brand.productGroups.length > 0;
  const isTohnichi = brand.slug === "tohnichi";

  return (
    <>
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands", lang), label: lang === "en" ? "Brands" : "Brand" },
          { label: brand.name }
        ]}
      />
      <Hero
        eyebrow={`${brand.name} / ${brand.country}`}
        title={text(brand.category, lang)}
        description={text(brand.description, lang)}
        primaryHref={withLang(`/contact?brand=${brand.slug}`, lang)}
        primaryLabel={lang === "en" ? "Request this brand" : "Minta brand ini"}
        secondaryHref={withLang("/brands", lang)}
        secondaryLabel={lang === "en" ? "All brands" : "Semua brand"}
        image={brand.heroImage}
        imageLabel={`${brand.name} products`}
        imageClassName={isTohnichi ? "object-[55%_50%]" : ""}
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
                    ? "Tohnichi torque tools support tightening, inspection, calibration, and error proofing across production lines that need repeatable quality."
                    : "Torque tools Tohnichi mendukung pengencangan, inspeksi, kalibrasi, dan error proofing untuk lini produksi yang membutuhkan kualitas berulang."}
                </p>
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
              </div>
            </div>
          </section>

          <section className="bg-graphite-900 py-16 text-white">
            <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Safety first
                </p>
                <h2 className="text-balance text-2xl font-bold tracking-normal md:text-5xl">
                  {lang === "en"
                    ? "Avoid under-tightening and over-tightening."
                    : "Utamakan safety. Hindari baut yang kurang kencang atau terlalu kencang."}
                </h2>
              </div>
              <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
                {[
                  lang === "en" ? "Assembly assurance" : "Assurance perakitan",
                  lang === "en" ? "Torque inspection" : "Inspeksi torsi",
                  lang === "en" ? "Miss-tightening prevention" : "Pencegahan miss-tightening"
                ].map((item) => (
                  <div key={item} className="bg-graphite-900/80 p-5">
                    <AlertTriangle className="h-5 w-5 text-signal-500" aria-hidden="true" />
                    <p className="mt-4 text-sm font-semibold leading-6 text-white/85">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-graphite-50 py-16">
            <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                  {lang === "en" ? "Torque wrench" : "Kunci torsi"}
                </p>
                <h2 className="text-balance text-2xl font-bold text-graphite-900 md:text-4xl">
                  {lang === "en" ? "Tighten bolts with precision and repeatability." : "Kencangkan baut dengan mudah, presisi, dan konsisten."}
                </h2>
                <p className="mt-4 text-base leading-7 text-graphite-500">
                  {lang === "en"
                    ? "CSE helps match torque tools to production, inspection, small torque, calibration, and poka-yoke requirements."
                    : "CSE membantu mencocokkan torque tools untuk produksi, inspeksi, torsi kecil, kalibrasi, dan kebutuhan poka-yoke."}
                </p>
              </div>
              <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
                {[
                  { name: "QL+", image: "/assets/brands/products/tohnichi/QL5N+.png" },
                  { name: "CL+", image: "/assets/brands/products/tohnichi/CL2NX6D+.png" },
                  { name: "Interchangeable Head", image: "/assets/brands/products/tohnichi/SB-FH2.jpg" }
                ].map((item) => (
                  <div key={item.name} className="bg-white p-4">
                    <AssetSlot
                      src={item.image}
                      alt={item.name}
                      label={item.name}
                      className="h-40 border-0 bg-graphite-50"
                      imageClassName="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 18vw"
                    />
                    <p className="mt-4 text-sm font-bold text-graphite-900">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
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

      <section className="bg-industrial-800 py-16 text-white">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {isTohnichi ? "Tightening assurance" : brand.name}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold">
              {isTohnichi
                ? lang === "en"
                  ? "How do you prevent miss-tightening in your process?"
                  : "Bagaimana cara menghindari miss-tightening di proses Anda?"
                : lang === "en"
                  ? "Need help choosing the correct model?"
                  : "Butuh bantuan memilih model yang tepat?"}
            </h2>
            {isTohnichi ? (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/75">
                <CheckCircle2 className="h-4 w-4 text-white" aria-hidden="true" />
                {lang === "en"
                  ? "Consult CSE about building and implementing a tightening assurance system."
                  : "Konsultasikan cara membangun dan mengimplementasi tightening assurance system."}
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
