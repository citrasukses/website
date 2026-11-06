import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2 } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { BrandLogo } from "@/components/BrandLogo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import type { CategoryHub } from "@/data/category-hubs";
import { text, type Language, withLang } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, organizationReference } from "@/lib/seo";
import { absoluteLocalizedUrl } from "@/lib/seo-config";

export function CategoryHubPage({ category, lang }: { category: CategoryHub; lang: Language }) {
  const categoryPath = `/${category.slug}`;
  const selectorHref = withLang("/brands/tohnichi/products#tohnichi-products", lang);
  const heroDescription = text(category.heroDescription ?? category.description, lang);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: text(category.title, lang),
      description: heroDescription,
      url: absoluteLocalizedUrl(categoryPath, lang),
      inLanguage: lang === "en" ? "en-US" : "id-ID",
      provider: organizationReference(),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: category.products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: text(product.title, lang),
          url: absoluteLocalizedUrl(product.href, lang)
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: category.faqs.map((item) => ({
        "@type": "Question",
        name: text(item.question, lang),
        acceptedAnswer: {
          "@type": "Answer",
          text: text(item.answer, lang)
        }
      }))
    },
    buildBreadcrumbJsonLd({ lang, items: [{ name: text(category.title, lang), path: categoryPath }] })
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: text(category.title, lang) }]} />
      <Hero
        eyebrow={text(category.eyebrow, lang)}
        title={text(category.title, lang)}
        description={heroDescription}
        primaryHref={selectorHref}
        primaryLabel={lang === "en" ? "Help me choose a tool" : "Bantu saya pilih alat"}
        secondaryHref="#checklist"
        secondaryLabel={lang === "en" ? "View selection checklist" : "Lihat checklist pemilihan"}
        image={category.image}
        imageLabel={text(category.imageAlt, lang)}
        imageClassName="object-contain object-right opacity-45"
        highlights={category.highlights.map((item) => text(item, lang))}
      />

      <section className="border-b border-graphite-200 bg-white py-8">
        <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <BrandLogo
              name="TOHNICHI"
              slug="tohnichi"
              src="/assets/brands/logos/tohnichi--nobg.png"
              className="h-12 w-28 shrink-0"
              sizes="112px"
            />
            <div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
                <p className="font-bold text-graphite-900">
                  {lang === "en" ? "Authorized TOHNICHI sales & service support in Indonesia" : "Dukungan penjualan & servis TOHNICHI resmi di Indonesia"}
                </p>
              </div>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-graphite-500">
                {lang === "en"
                  ? "CSE helps procurement, production, and quality teams confirm the application, product family, and verification approach before quotation."
                  : "CSE membantu tim procurement, produksi, dan quality mengonfirmasi aplikasi, keluarga produk, dan metode verifikasi sebelum quotation."}
              </p>
            </div>
          </div>
          <Link
            href="https://en.global-tohnichi.com/support/distributors.html"
            className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600"
          >
            {lang === "en" ? "Verify on TOHNICHI" : "Verifikasi di TOHNICHI"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="checklist" className="cse-section scroll-mt-28 bg-graphite-50">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Selection checklist" : "Checklist pemilihan"}
            title={lang === "en" ? "Check these 6 things before choosing." : "Cek 6 hal ini sebelum memilih."}
          />
          <p className="mt-5 max-w-4xl border-l-2 border-industrial-700 pl-4 text-sm font-semibold leading-7 text-graphite-700">
            {text(category.selectionSummary, lang)}
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-2 lg:grid-cols-3">
            {category.criteria.map((item, index) => (
              <article key={item.title.en} className="bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center bg-industrial-700 text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-graphite-900">{text(item.title, lang)}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-6 bg-industrial-700 p-6 text-white lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <h3 className="text-xl font-bold">
                {lang === "en" ? "Not sure which type fits?" : "Belum tahu tipe yang cocok?"}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                {lang === "en"
                  ? "Answer 4 short questions to see suitable TOHNICHI product families. No model name needed."
                  : "Jawab 4 pertanyaan singkat untuk melihat pilihan alat TOHNICHI. Tidak perlu tahu nama model."}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <CTAButton href={selectorHref}>
                {lang === "en" ? "Help me choose a tool" : "Bantu saya pilih alat"}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTAButton>
              <CTAButton href="#product-families" variant="ghost">
                {lang === "en" ? "View model options" : "Lihat pilihan model"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section id="product-families" className="cse-section scroll-mt-28 bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={lang === "en" ? "Relevant product families" : "Keluarga produk terkait"}
              title={lang === "en" ? "Match your needs to a tool type." : "Cocokkan kebutuhan Anda dengan tipe alat."}
              description={lang === "en" ? "Find your use case below, then open the models and specifications." : "Cari kebutuhan yang sesuai di bawah, lalu buka model dan spesifikasinya."}
            />
            <Link
              href={withLang("/brands/tohnichi/products", lang)}
              className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 self-start bg-industrial-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-industrial-800 md:self-auto"
            >
              {lang === "en" ? "View full TOHNICHI catalogue" : "Lihat katalog lengkap TOHNICHI"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <article key={product.href} className="cse-card cse-card-link group">
                <AssetSlot
                  src={product.image}
                  alt={text(product.title, lang)}
                  className="h-52 border-0 border-b border-graphite-200"
                  fit="contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  imageClassName="p-5 group-hover:scale-[1.03]"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-graphite-900">{text(product.title, lang)}</h2>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{text(product.description, lang)}</p>
                  <div className="mt-4 border-l-2 border-signal-500 bg-graphite-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-graphite-500">{lang === "en" ? "Use when" : "Gunakan ketika"}</p>
                    <p className="mt-1 text-sm leading-6 text-graphite-700">{text(product.useFor, lang)}</p>
                  </div>
                  <Link href={withLang(product.href, lang)} className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600">
                    {lang === "en" ? "View models & specifications" : "Lihat model & spesifikasi"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cse-section bg-graphite-900 text-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{lang === "en" ? "Quick comparison" : "Perbandingan cepat"}</p>
            <h2 className="cse-heading mt-4">{text(category.comparison.title, lang)}</h2>
            <p className="mt-4 text-base leading-7 text-white/70">{text(category.comparison.description, lang)}</p>
          </div>
          <div className="mt-8 overflow-x-auto border border-white/15">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-white/10">
                <tr>
                  {category.comparison.headers.map((header) => (
                    <th key={header.en} scope="col" className="border-r border-white/10 px-5 py-4 font-bold last:border-r-0">{text(header, lang)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.comparison.rows.map((row, rowIndex) => (
                  <tr key={`${row[0].en}-${rowIndex}`} className="border-t border-white/10">
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell.en}-${cellIndex}`} className={`border-r border-white/10 px-5 py-4 leading-6 last:border-r-0 ${cellIndex === 0 ? "font-bold text-white" : "text-white/75"}`}>
                        {text(cell, lang)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cse-section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow={lang === "en" ? "Next step" : "Langkah berikutnya"}
            title={lang === "en" ? "Connect the category to your actual process." : "Hubungkan kategori dengan proses aktual Anda."}
            description={lang === "en" ? "Use the related solution and guide pages to prepare a clearer technical request." : "Gunakan halaman solusi dan panduan terkait untuk menyiapkan kebutuhan teknis yang lebih jelas."}
          />
          <div className="grid gap-4">
            {category.related.map((item) => (
              <Link key={item.href} href={withLang(item.href, lang)} className="focus-ring group flex items-start justify-between gap-5 border border-graphite-200 p-5 transition hover:border-industrial-600 hover:bg-graphite-50">
                <span>
                  <span className="font-bold text-graphite-900">{text(item.title, lang)}</span>
                  <span className="mt-1 block text-sm leading-6 text-graphite-500">{text(item.description, lang)}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-industrial-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cse-section bg-graphite-50">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="cse-eyebrow text-signal-600">FAQ</p>
            <h2 className="cse-heading mt-4 text-graphite-900">{lang === "en" ? "Common buyer questions" : "Pertanyaan umum buyer"}</h2>
            <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-graphite-600">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
              <p>{lang === "en" ? "Final selection should always be confirmed against the application and required standard." : "Pemilihan akhir tetap perlu dikonfirmasi terhadap aplikasi dan standar yang digunakan."}</p>
            </div>
          </div>
          <FAQAccordion items={category.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} />
        </div>
      </section>

      <section className="cse-section bg-industrial-700 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{lang === "en" ? "Prepare your RFQ" : "Siapkan RFQ"}</p>
            <h2 className="cse-heading mt-2 max-w-3xl">
              {lang === "en" ? "Send the target, application, tool type, and required quantity." : "Kirim target, aplikasi, jenis tool, dan kuantitas yang dibutuhkan."}
            </h2>
          </div>
          <CTAButton href={withLang(`/contact?topic=${category.slug}`, lang)}>
            {lang === "en" ? "Request technical selection" : "Minta pemilihan teknis"}
          </CTAButton>
        </div>
      </section>
    </>
  );
}
