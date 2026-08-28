import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileCheck2 } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import type { BuyerGuide } from "@/data/buyer-guides";
import { localizedPath, text, type Language, withLang } from "@/lib/i18n";

export function BuyerGuidePage({ guide, lang }: { guide: BuyerGuide; lang: Language }) {
  const path = `/guides/${guide.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: text(guide.title, lang),
      description: text(guide.description, lang),
      image: `https://cse.co.id${guide.image}`,
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      inLanguage: lang === "en" ? "en-ID" : "id-ID",
      mainEntityOfPage: `https://cse.co.id${localizedPath(path, lang)}`,
      author: { "@type": "Organization", "@id": "https://cse.co.id/#organization", name: "PT Citra Sukses Ekapratama" },
      publisher: { "@type": "Organization", "@id": "https://cse.co.id/#organization", name: "PT Citra Sukses Ekapratama" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((item) => ({
        "@type": "Question",
        name: text(item.question, lang),
        acceptedAnswer: { "@type": "Answer", text: text(item.answer, lang) }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CSE", item: "https://cse.co.id" },
        { "@type": "ListItem", position: 2, name: lang === "en" ? "Guides" : "Panduan", item: `https://cse.co.id${localizedPath("/guides", lang)}` },
        { "@type": "ListItem", position: 3, name: text(guide.title, lang), item: `https://cse.co.id${localizedPath(path, lang)}` }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/guides", lang), label: lang === "en" ? "Guides" : "Panduan" },
          { label: text(guide.title, lang) }
        ]}
      />
      <Hero
        eyebrow={text(guide.eyebrow, lang)}
        title={text(guide.title, lang)}
        description={text(guide.description, lang)}
        primaryHref="#checklist"
        primaryLabel={lang === "en" ? "Jump to checklist" : "Lihat checklist"}
        secondaryHref={withLang("/contact?topic=technical-guide", lang)}
        secondaryLabel={lang === "en" ? "Ask CSE" : "Tanya CSE"}
        image={guide.image}
        imageLabel={text(guide.imageAlt, lang)}
        imageClassName="object-contain object-right opacity-40"
        highlights={lang === "en" ? ["Practical selection", "Process context", "RFQ checklist"] : ["Pemilihan praktis", "Konteks proses", "Checklist RFQ"]}
      />

      <article className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="border-l-4 border-signal-500 bg-graphite-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{lang === "en" ? "Short answer" : "Jawaban singkat"}</p>
              <p className="mt-4 text-base font-semibold leading-7 text-graphite-900">{text(guide.answer, lang)}</p>
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-graphite-500">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              {lang === "en" ? "Practical technical guide · CSE Indonesia" : "Panduan teknis praktis · CSE Indonesia"}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="space-y-12">
              {guide.sections.map((section) => (
                <section key={section.title.en}>
                  <h2 className="text-2xl font-bold leading-tight text-graphite-900 md:text-3xl">{text(section.title, lang)}</h2>
                  <p className="mt-4 text-base leading-8 text-graphite-600">{text(section.body, lang)}</p>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item.en} className="flex gap-3 border border-graphite-200 bg-graphite-50 p-4 text-sm font-semibold leading-6 text-graphite-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
                          {text(item, lang)}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {guide.comparison ? (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-graphite-900">{lang === "en" ? "Quick comparison" : "Perbandingan cepat"}</h2>
                <div className="mt-5 overflow-x-auto border border-graphite-200">
                  <table className="min-w-[680px] w-full border-collapse text-left text-sm">
                    <thead className="bg-graphite-900 text-white">
                      <tr>
                        {guide.comparison.headers.map((header) => (
                          <th key={header.en} scope="col" className="border-r border-white/15 px-5 py-4 font-bold last:border-r-0">{text(header, lang)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.comparison.rows.map((row, rowIndex) => (
                        <tr key={`${row[0].en}-${rowIndex}`} className="border-t border-graphite-200 odd:bg-white even:bg-graphite-50">
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell.en}-${cellIndex}`} className={`border-r border-graphite-200 px-5 py-4 leading-6 last:border-r-0 ${cellIndex === 0 ? "font-bold text-graphite-900" : "text-graphite-600"}`}>{text(cell, lang)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <section id="checklist" className="mt-12 scroll-mt-28 border border-industrial-700 bg-industrial-700 p-7 text-white md:p-9">
              <FileCheck2 className="h-7 w-7 text-white" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-bold">{lang === "en" ? "Buyer / RFQ checklist" : "Checklist buyer / RFQ"}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                {lang === "en" ? "Prepare these details before requesting a model recommendation or quotation." : "Siapkan data ini sebelum meminta rekomendasi model atau quotation."}
              </p>
              <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                {guide.checklist.map((item, index) => (
                  <li key={item.en} className="flex gap-3 border border-white/15 bg-white/5 p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-white text-xs font-bold text-industrial-700">{index + 1}</span>
                    <p className="text-sm font-semibold leading-6">{text(item, lang)}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>

      <section className="bg-graphite-50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Common follow-up questions" : "Pertanyaan lanjutan"}</h2>
          </div>
          <FAQAccordion items={guide.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <h2 className="text-3xl font-bold text-graphite-900">{lang === "en" ? "Related pages" : "Halaman terkait"}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {guide.related.map((item) => (
              <Link key={item.href} href={withLang(item.href, lang)} className="focus-ring group border border-graphite-200 p-6 transition hover:border-industrial-600 hover:bg-graphite-50">
                <h3 className="text-xl font-bold text-graphite-900">{text(item.title, lang)}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite-500">{text(item.description, lang)}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700">
                  {lang === "en" ? "Open page" : "Buka halaman"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-industrial-700 py-14 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold">
            {lang === "en" ? "Have the target and application but not the model?" : "Sudah punya target dan aplikasi, tetapi belum tahu modelnya?"}
          </h2>
          <CTAButton href={withLang("/contact?topic=technical-guide", lang)}>
            {lang === "en" ? "Ask CSE for a shortlist" : "Minta shortlist dari CSE"}
          </CTAButton>
        </div>
      </section>
    </>
  );
}
