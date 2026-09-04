import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileCheck2 } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getGuideEditorial, getGuideTagLabel, type BuyerGuide } from "@/data/buyer-guides";
import { text, type Language, withLang } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, organizationReference } from "@/lib/seo";
import { absoluteLocalizedUrl, absoluteUrl } from "@/lib/seo-config";

function withoutLeadingNumber(value: string) {
  return value.replace(/^\d+\.\s*/, "");
}

export function BuyerGuidePage({ guide, lang }: { guide: BuyerGuide; lang: Language }) {
  const path = `/guides/${guide.slug}`;
  const editorial = getGuideEditorial(guide.slug);
  const topicLabels = guide.topics.map((topic) => text(getGuideTagLabel("topics", topic), lang));
  const sectionLinks = [
    ...guide.sections.map((section, index) => ({
      href: `#section-${index + 1}`,
      label: withoutLeadingNumber(text(section.title, lang))
    })),
    ...(guide.comparison ? [{ href: "#comparison", label: lang === "en" ? "Quick comparison" : "Perbandingan cepat" }] : []),
    { href: "#checklist", label: lang === "en" ? "Information to prepare" : "Data yang perlu disiapkan" },
    { href: "#questions", label: lang === "en" ? "Common questions" : "Pertanyaan umum" }
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: text(guide.title, lang),
      description: text(guide.description, lang),
      image: absoluteUrl(guide.image),
      inLanguage: lang === "en" ? "en-US" : "id-ID",
      mainEntityOfPage: absoluteLocalizedUrl(path, lang),
      author: organizationReference(),
      publisher: organizationReference(),
      timeRequired: `PT${editorial.readingMinutes}M`,
      articleSection: topicLabels
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
    buildBreadcrumbJsonLd({
      lang,
      items: [
        { name: lang === "en" ? "Guides" : "Panduan", path: "/guides" },
        { name: text(guide.title, lang), path }
      ]
    })
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

      <main>
        <header className="border-y border-graphite-200 bg-[#f3f1ec]">
          <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-center lg:py-16">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.14em]">
                <span className="text-signal-600">{text(editorial.format, lang)}</span>
                <span className="h-px w-7 bg-graphite-200" aria-hidden="true" />
                <span className="text-graphite-500">TOHNICHI</span>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight text-graphite-900 md:text-5xl lg:text-[3.5rem]">
                {text(guide.title, lang)}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-graphite-500 md:text-lg">
                {text(guide.description, lang)}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-graphite-200 pt-5 text-sm text-graphite-500">
                <span className="font-bold text-graphite-900">
                  {lang === "en" ? "CSE Technical Desk" : "Tim Teknis CSE"}
                </span>
                <span>{text(editorial.audience, lang)}</span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-industrial-700" aria-hidden="true" />
                  {editorial.readingMinutes} {lang === "en" ? "min read" : "menit baca"}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {topicLabels.map((topic) => (
                  <span key={topic} className="border border-graphite-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-graphite-700">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-5">
              <div className="absolute -left-2 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-signal-500 lg:block" aria-hidden="true" />
              <AssetSlot
                src={guide.image}
                alt={text(guide.imageAlt, lang)}
                className="aspect-[4/3] border border-graphite-200 bg-white"
                fit="contain"
                imageClassName="p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 36vw"
              />
              <p className="mt-3 text-xs leading-5 text-graphite-500">{text(guide.imageAlt, lang)}</p>
            </div>
          </div>
        </header>

        <article className="bg-white py-14 md:py-20">
          <div className="container-page grid justify-center gap-10 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="border-b border-graphite-200 pb-3 text-xs font-black uppercase tracking-[0.18em] text-graphite-900">
                {lang === "en" ? "In this guide" : "Isi panduan"}
              </p>
              <nav aria-label={lang === "en" ? "Guide contents" : "Daftar isi panduan"}>
                <ol className="divide-y divide-graphite-200">
                  {sectionLinks.map((item, index) => (
                    <li key={item.href}>
                      <a href={item.href} className="focus-ring group flex gap-3 py-3 text-sm leading-5 text-graphite-500 transition hover:text-industrial-700">
                        <span className="font-mono text-[11px] font-bold text-graphite-500 group-hover:text-signal-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <section className="border-y border-graphite-200 py-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
                  {lang === "en" ? "CSE starting recommendation" : "Rekomendasi awal CSE"}
                </p>
                <p className="mt-4 text-xl font-semibold leading-8 text-graphite-900 md:text-2xl md:leading-9">
                  {text(guide.answer, lang)}
                </p>
              </section>

              <div className="mt-14 space-y-16">
                {guide.sections.map((section, index) => (
                  <section key={section.title.en} id={`section-${index + 1}`} className="scroll-mt-28">
                    <div className="flex items-start gap-4">
                      <span className="mt-1 font-mono text-sm font-bold text-signal-600">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h2 className="text-2xl font-black leading-tight tracking-tight text-graphite-900 md:text-3xl">
                          {withoutLeadingNumber(text(section.title, lang))}
                        </h2>
                        <p className="mt-5 text-[1.05rem] leading-8 text-graphite-500">{text(section.body, lang)}</p>
                      </div>
                    </div>
                    {section.bullets?.length ? (
                      <ul className="ml-0 mt-7 border-y border-graphite-200 sm:ml-10">
                        {section.bullets.map((item) => (
                          <li key={item.en} className="flex gap-3 border-b border-graphite-200 py-4 text-sm font-semibold leading-6 text-graphite-700 last:border-b-0">
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
                <section id="comparison" className="mt-16 scroll-mt-28">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
                    {lang === "en" ? "Decision reference" : "Referensi keputusan"}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-graphite-900">
                    {lang === "en" ? "Quick comparison" : "Perbandingan cepat"}
                  </h2>
                  <div className="mt-6 overflow-x-auto border-y border-graphite-200">
                    <table className="min-w-[680px] w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b-2 border-graphite-900 text-graphite-900">
                          {guide.comparison.headers.map((header) => (
                            <th key={header.en} scope="col" className="px-4 py-4 font-black first:pl-0 last:pr-0">{text(header, lang)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {guide.comparison.rows.map((row, rowIndex) => (
                          <tr key={`${row[0].en}-${rowIndex}`} className="border-t border-graphite-200">
                            {row.map((cell, cellIndex) => (
                              <td key={`${cell.en}-${cellIndex}`} className={`px-4 py-4 leading-6 first:pl-0 last:pr-0 ${cellIndex === 0 ? "font-bold text-graphite-900" : "text-graphite-500"}`}>
                                {text(cell, lang)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              <section id="checklist" className="mt-16 scroll-mt-28 border-y border-graphite-200 bg-[#f3f1ec] px-6 py-8 md:px-8">
                <FileCheck2 className="h-7 w-7 text-industrial-700" aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-black tracking-tight text-graphite-900">
                  {lang === "en" ? "Information worth preparing" : "Data yang sebaiknya disiapkan"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite-500">
                  {lang === "en"
                    ? "Bring these details into the first discussion. They help narrow the model and reveal application risks early."
                    : "Bawa data ini saat diskusi pertama. Informasi tersebut membantu mempersempit pilihan model dan menemukan risiko aplikasi lebih awal."}
                </p>
                <ol className="mt-7 grid gap-x-8 sm:grid-cols-2">
                  {guide.checklist.map((item, index) => (
                    <li key={item.en} className="flex gap-3 border-t border-graphite-200 py-4">
                      <span className="font-mono text-xs font-black text-signal-600">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-sm font-semibold leading-6 text-graphite-800">{text(item, lang)}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </article>

        <section id="questions" className="scroll-mt-28 border-y border-graphite-200 bg-graphite-50 py-16">
          <div className="container-page grid justify-center gap-8 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-graphite-900">
                {lang === "en" ? "Questions that usually follow" : "Pertanyaan yang biasanya muncul"}
              </h2>
            </div>
            <FAQAccordion items={guide.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-page max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Continue the research" : "Lanjutkan pencarian"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-graphite-900">
              {lang === "en" ? "Related technical pages" : "Halaman teknis terkait"}
            </h2>
            <div className="mt-8 border-y border-graphite-200">
              {guide.related.map((item, index) => (
                <Link
                  key={item.href}
                  href={withLang(item.href, lang)}
                  className="focus-ring group grid gap-3 border-b border-graphite-200 py-6 last:border-b-0 sm:grid-cols-[42px_0.8fr_1.2fr_auto] sm:items-center"
                >
                  <span className="font-mono text-xs font-bold text-graphite-500">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-black text-graphite-900 group-hover:text-industrial-700">{text(item.title, lang)}</h3>
                  <p className="text-sm leading-6 text-graphite-500">{text(item.description, lang)}</p>
                  <ArrowRight className="h-5 w-5 text-signal-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-industrial-700 py-14 text-white">
          <div className="container-page flex max-w-5xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-tight">{text(editorial.cta.title, lang)}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">{text(editorial.cta.description, lang)}</p>
            </div>
            <CTAButton href={withLang(editorial.cta.href, lang)}>{text(editorial.cta.label, lang)}</CTAButton>
          </div>
        </section>
      </main>
    </>
  );
}
