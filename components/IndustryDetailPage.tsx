import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, Workflow } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import type { Industry } from "@/data/industries";
import type { IndustryCaseStudy } from "@/data/industry-case-studies";
import type { IndustryPageContent } from "@/data/industry-pages";
import { isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { localizedPath, text, type Language, withLang } from "@/lib/i18n";

export function IndustryDetailPage({
  industry,
  caseStudy,
  content,
  lang
}: {
  industry: Industry;
  caseStudy: IndustryCaseStudy;
  content: IndustryPageContent;
  lang: Language;
}) {
  const path = `/industries/${industry.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: text(content.seoTitle, lang),
      description: text(content.seoDescription, lang),
      url: `https://cse.co.id${localizedPath(path, lang)}`,
      inLanguage: lang === "en" ? "en-ID" : "id-ID",
      about: { "@type": "Thing", name: text(industry.title, lang) },
      provider: {
        "@type": "Organization",
        "@id": "https://cse.co.id/#organization",
        name: "PT Citra Sukses Ekapratama",
        url: "https://cse.co.id"
      },
      hasPart: caseStudy.steps.map((step) => ({
        "@type": "CreativeWork",
        name: text(step.phase, lang),
        description: text(step.application, lang),
        about: { "@type": "Brand", name: step.brandName }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CSE", item: "https://cse.co.id" },
        { "@type": "ListItem", position: 2, name: lang === "en" ? "Industries" : "Industri", item: `https://cse.co.id${localizedPath("/industries", lang)}` },
        { "@type": "ListItem", position: 3, name: text(industry.title, lang), item: `https://cse.co.id${localizedPath(path, lang)}` }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/industries", lang), label: lang === "en" ? "Industries" : "Industri" },
          { label: text(industry.title, lang) }
        ]}
      />
      <Hero
        eyebrow={text(content.eyebrow, lang)}
        title={text(content.seoTitle, lang)}
        description={text(content.seoDescription, lang)}
        primaryHref={withLang(`/contact?industry=${industry.slug}`, lang)}
        primaryLabel={lang === "en" ? "Discuss your process" : "Diskusikan proses"}
        secondaryHref={withLang("/solutions", lang)}
        secondaryLabel={lang === "en" ? "Explore solutions" : "Lihat solusi"}
        image={industry.image}
        imageLabel={text(industry.title, lang)}
        highlights={industry.applications.map((item) => text(item, lang))}
      />

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader
            eyebrow={lang === "en" ? "Operating context" : "Konteks operasional"}
            title={text(content.introTitle, lang)}
            description={text(content.intro, lang)}
          />
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
            {content.priorities.map((item) => (
              <article key={item.title.en} className="bg-graphite-50 p-6">
                <CheckCircle2 className="h-5 w-5 text-industrial-700" aria-hidden="true" />
                <h2 className="mt-4 font-bold text-graphite-900">{text(item.title, lang)}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{text(caseStudy.scenario, lang)}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{text(caseStudy.title, lang)}</h2>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              <div className="bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/55">{lang === "en" ? "Challenge" : "Tantangan"}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{text(caseStudy.challenge, lang)}</p>
              </div>
              <div className="bg-industrial-700 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/55">{lang === "en" ? "Connected outcome" : "Hasil terhubung"}</p>
                <p className="mt-2 text-sm leading-6 text-white/85">{text(caseStudy.outcome, lang)}</p>
              </div>
            </div>
          </div>

          <ol className="mt-10 grid gap-4 lg:grid-cols-2">
            {caseStudy.steps.map((step, index) => {
              const isPublic = isBrandPubliclyAvailable(step.brandSlug);
              return (
                <li key={step.brandSlug} className="grid overflow-hidden border border-white/15 bg-white/5 sm:grid-cols-[180px_1fr]">
                  <div className="border-b border-white/15 bg-white p-4 sm:border-b-0 sm:border-r">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-graphite-500">{String(index + 1).padStart(2, "0")}</span>
                      <Workflow className="h-4 w-4 text-signal-600" aria-hidden="true" />
                    </div>
                    <BrandLogo name={step.brandName} slug={step.brandSlug} className="mt-4 h-16 w-full border border-graphite-200" sizes="150px" />
                    <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-graphite-700">{text(step.phase, lang)}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal-500">{lang === "en" ? "Application" : "Aplikasi"}</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">{text(step.application, lang)}</p>
                    <p className="mt-4 font-bold text-white">{text(step.solution, lang)}</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">{text(step.value, lang)}</p>
                    {isPublic ? (
                      <Link href={withLang(`/brands/${step.brandSlug}`, lang)} className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-signal-500">
                        {lang === "en" ? `View ${step.brandName}` : `Lihat ${step.brandName}`}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link href={withLang(`/contact?brand=${step.brandSlug}`, lang)} className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-signal-500">
                        {lang === "en" ? "Ask CSE about this application" : "Tanyakan aplikasi ini ke CSE"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "Prepare the request" : "Siapkan kebutuhan"}</p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">
              {lang === "en" ? "What procurement and engineering should send." : "Data yang perlu dikirim procurement dan engineering."}
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite-500">
              {lang === "en" ? "A clear application package reduces clarification loops and makes principal confirmation more useful." : "Paket aplikasi yang jelas mengurangi clarification loop dan membuat konfirmasi principal lebih berguna."}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
            {content.buyerChecklist.map((item, index) => (
              <div key={item.en} className="flex gap-4 bg-graphite-50 p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-industrial-700 text-xs font-bold text-white">{index + 1}</span>
                <p className="text-sm font-semibold leading-6 text-graphite-700">{text(item, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Relevant pathways" : "Jalur terkait"}
            title={lang === "en" ? "Continue from industry context to a specific solution." : "Lanjutkan dari konteks industri ke solusi yang spesifik."}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.related.map((item) => (
              <Link key={item.href} href={withLang(item.href, lang)} className="focus-ring group border border-graphite-200 bg-white p-6 transition hover:border-industrial-600 hover:shadow-panel">
                <Factory className="h-6 w-6 text-industrial-700" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-bold text-graphite-900">{text(item.title, lang)}</h2>
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
            {lang === "en" ? "Share the process, drawing, target, and current problem." : "Bagikan proses, drawing, target, dan masalah saat ini."}
          </h2>
          <CTAButton href={withLang(`/contact?industry=${industry.slug}`, lang)}>
            {lang === "en" ? "Request an application review" : "Minta review aplikasi"}
          </CTAButton>
        </div>
      </section>
    </>
  );
}
