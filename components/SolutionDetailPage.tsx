import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Settings2 } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import type { SolutionPage } from "@/data/solution-pages";
import { localizedPath, text, type Language, withLang } from "@/lib/i18n";

export function SolutionDetailPage({ solution, lang }: { solution: SolutionPage; lang: Language }) {
  const path = `/solutions/${solution.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: text(solution.title, lang),
      description: text(solution.description, lang),
      url: `https://cse.co.id${localizedPath(path, lang)}`,
      areaServed: { "@type": "Country", name: "Indonesia" },
      provider: {
        "@type": "Organization",
        "@id": "https://cse.co.id/#organization",
        name: "PT Citra Sukses Ekapratama",
        url: "https://cse.co.id"
      },
      serviceType: text(solution.eyebrow, lang)
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: solution.faqs.map((item) => ({
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
        { "@type": "ListItem", position: 2, name: lang === "en" ? "Solutions" : "Solusi", item: `https://cse.co.id${localizedPath("/solutions", lang)}` },
        { "@type": "ListItem", position: 3, name: text(solution.title, lang), item: `https://cse.co.id${localizedPath(path, lang)}` }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/solutions", lang), label: lang === "en" ? "Solutions" : "Solusi" },
          { label: text(solution.title, lang) }
        ]}
      />
      <Hero
        eyebrow={text(solution.eyebrow, lang)}
        title={text(solution.title, lang)}
        description={text(solution.description, lang)}
        primaryHref={withLang(`/contact?solution=${solution.slug}`, lang)}
        primaryLabel={lang === "en" ? "Discuss the requirement" : "Diskusikan kebutuhan"}
        secondaryHref={withLang("/guides", lang)}
        secondaryLabel={lang === "en" ? "Read buyer guides" : "Baca buyer guides"}
        image={solution.image}
        imageLabel={text(solution.imageAlt, lang)}
        imageClassName="opacity-45"
        highlights={solution.highlights.map((item) => text(item, lang))}
      />

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader
            eyebrow={lang === "en" ? "Why this matters" : "Mengapa ini penting"}
            title={text(solution.challengeTitle, lang)}
            description={text(solution.challenge, lang)}
          />
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
            {solution.symptoms.map((item) => (
              <article key={item.title.en} className="bg-graphite-50 p-6">
                <Settings2 className="h-5 w-5 text-signal-600" aria-hidden="true" />
                <h2 className="mt-4 font-bold text-graphite-900">{text(item.title, lang)}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">
              {lang === "en" ? "Working method" : "Metode kerja"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              {lang === "en" ? "A four-stage application review." : "Review aplikasi dalam empat tahap."}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              {lang === "en"
                ? "The sequence keeps product selection tied to the operating problem and required evidence."
                : "Urutan ini menjaga pemilihan produk tetap terkait dengan masalah operasi dan bukti yang dibutuhkan."}
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solution.approach.map((item, index) => (
              <li key={item.title.en} className="border border-white/15 bg-white/5 p-6">
                <span className="text-3xl font-bold text-signal-500">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-5 text-xl font-bold">{text(item.title, lang)}</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">{text(item.description, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "Expected outputs" : "Output yang diharapkan"}</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">{text(solution.deliverablesTitle, lang)}</h2>
            <div className="mt-7 grid gap-3">
              {solution.deliverables.map((item) => (
                <div key={item.en} className="flex gap-3 border border-graphite-200 bg-graphite-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-700" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-graphite-700">{text(item, lang)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-graphite-200 bg-graphite-50 p-7 md:p-8">
            <ClipboardCheck className="h-7 w-7 text-industrial-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold text-graphite-900">
              {lang === "en" ? "Information to send with the first inquiry" : "Informasi untuk inquiry pertama"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-graphite-500">
              {lang === "en" ? "Sending these details early reduces back-and-forth and makes the shortlist more relevant." : "Mengirim data ini sejak awal mengurangi back-and-forth dan membuat shortlist lebih relevan."}
            </p>
            <ol className="mt-6 grid gap-4">
              {solution.inputs.map((item, index) => (
                <li key={item.en} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-industrial-700 text-xs font-bold text-white">{index + 1}</span>
                  <p className="text-sm font-semibold leading-6 text-graphite-700">{text(item, lang)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Related pathways" : "Jalur terkait"}
            title={lang === "en" ? "Continue into products, guides, or adjacent solutions." : "Lanjutkan ke produk, guide, atau solusi terkait."}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {solution.related.map((item) => (
              <Link key={item.href} href={withLang(item.href, lang)} className="focus-ring group border border-graphite-200 bg-white p-6 transition hover:border-industrial-600 hover:shadow-panel">
                <h2 className="text-xl font-bold text-graphite-900">{text(item.title, lang)}</h2>
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

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Questions before starting" : "Pertanyaan sebelum memulai"}</h2>
          </div>
          <FAQAccordion items={solution.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} />
        </div>
      </section>

      <section className="bg-industrial-700 py-14 text-white">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold">
            {lang === "en" ? "Turn the current problem into a technical application brief." : "Ubah masalah saat ini menjadi application brief teknis."}
          </h2>
          <CTAButton href={withLang(`/contact?solution=${solution.slug}`, lang)}>
            {lang === "en" ? "Request an application review" : "Minta review aplikasi"}
          </CTAButton>
        </div>
      </section>
    </>
  );
}
