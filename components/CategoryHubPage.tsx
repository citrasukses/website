import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2 } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import type { CategoryHub } from "@/data/category-hubs";
import { localizedPath, text, type Language, withLang } from "@/lib/i18n";

export function CategoryHubPage({ category, lang }: { category: CategoryHub; lang: Language }) {
  const categoryPath = `/${category.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: text(category.title, lang),
      description: text(category.description, lang),
      url: `https://cse.co.id${localizedPath(categoryPath, lang)}`,
      inLanguage: lang === "en" ? "en-ID" : "id-ID",
      provider: {
        "@type": "Organization",
        "@id": "https://cse.co.id/#organization",
        name: "PT Citra Sukses Ekapratama",
        url: "https://cse.co.id"
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: category.products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: text(product.title, lang),
          url: `https://cse.co.id${localizedPath(product.href, lang)}`
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CSE", item: "https://cse.co.id" },
        {
          "@type": "ListItem",
          position: 2,
          name: text(category.title, lang),
          item: `https://cse.co.id${localizedPath(categoryPath, lang)}`
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: text(category.title, lang) }]} />
      <Hero
        eyebrow={text(category.eyebrow, lang)}
        title={text(category.title, lang)}
        description={text(category.description, lang)}
        primaryHref={withLang(`/contact?topic=${category.slug}`, lang)}
        primaryLabel={lang === "en" ? "Discuss your application" : "Diskusikan aplikasi"}
        secondaryHref={withLang("/brands/tohnichi", lang)}
        secondaryLabel={lang === "en" ? "View TOHNICHI page" : "Lihat halaman TOHNICHI"}
        image={category.image}
        imageLabel={text(category.imageAlt, lang)}
        imageClassName="object-contain object-right opacity-45"
        highlights={category.highlights.map((item) => text(item, lang))}
      />

      <section className="border-b border-graphite-200 bg-white py-8">
        <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-industrial-700" aria-hidden="true" />
            <div>
              <p className="font-bold text-graphite-900">
                {lang === "en" ? "Authorized TOHNICHI sales & service support in Indonesia" : "Dukungan penjualan & servis TOHNICHI resmi di Indonesia"}
              </p>
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

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow={lang === "en" ? "Selection context" : "Konteks pemilihan"}
            title={text(category.introTitle, lang)}
            description={text(category.intro, lang)}
          />
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-3">
            {category.useCases.map((item) => (
              <article key={item.title.en} className="bg-graphite-50 p-6">
                <p className="text-sm font-bold text-graphite-900">{text(item.title, lang)}</p>
                <p className="mt-3 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Selection checklist" : "Checklist pemilihan"}
            title={lang === "en" ? "Details to confirm before choosing a model." : "Hal-hal yang perlu dikonfirmasi sebelum memilih model."}
            description={lang === "en" ? "These inputs help CSE narrow the catalogue to a practical shortlist." : "Informasi ini membantu CSE mempersempit katalog menjadi shortlist yang praktis."}
          />
          <div className="mt-9 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-2 lg:grid-cols-3">
            {category.criteria.map((item, index) => (
              <article key={item.title.en} className="bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center bg-industrial-700 text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-bold text-graphite-900">{text(item.title, lang)}</h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Relevant product families" : "Keluarga produk terkait"}
            title={lang === "en" ? "Start with the process, then confirm the exact model." : "Mulai dari proses, lalu konfirmasikan model yang tepat."}
            description={lang === "en" ? "Each link opens the detailed TOHNICHI family page with models and specifications." : "Setiap link membuka halaman keluarga TOHNICHI dengan model dan spesifikasi."}
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <article key={product.href} className="group overflow-hidden border border-graphite-200 bg-white shadow-sm transition hover:border-industrial-600 hover:shadow-panel">
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

      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{lang === "en" ? "Quick comparison" : "Perbandingan cepat"}</p>
            <h2 className="mt-3 text-3xl font-bold">{text(category.comparison.title, lang)}</h2>
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

      <section className="bg-white py-16">
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

      <section className="bg-graphite-50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Common buyer questions" : "Pertanyaan umum buyer"}</h2>
            <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-graphite-600">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
              <p>{lang === "en" ? "Final selection should always be confirmed against the application and required standard." : "Pemilihan akhir tetap perlu dikonfirmasi terhadap aplikasi dan standar yang digunakan."}</p>
            </div>
          </div>
          <FAQAccordion items={category.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} />
        </div>
      </section>

      <section className="bg-industrial-700 py-14 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{lang === "en" ? "Prepare your RFQ" : "Siapkan RFQ"}</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold">
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
