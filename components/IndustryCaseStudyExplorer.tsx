"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { IndustryCard } from "@/components/IndustryCard";
import type { Industry } from "@/data/industries";
import { industryCaseStudies } from "@/data/industry-case-studies";
import { text, type Language, withLang } from "@/lib/i18n";

type IndustryCaseStudyExplorerProps = {
  industries: Industry[];
  lang: Language;
};

export function IndustryCaseStudyExplorer({ industries, lang }: IndustryCaseStudyExplorerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndustrySlug, setActiveIndustrySlug] = useState<string | null>(null);
  const [activeBrandSlug, setActiveBrandSlug] = useState<string | null>(null);
  const activeCaseStudy = industryCaseStudies.find((item) => item.industrySlug === activeIndustrySlug) ?? null;
  const activeStep = activeCaseStudy?.steps.find((step) => step.brandSlug === activeBrandSlug) ?? activeCaseStudy?.steps[0];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (activeCaseStudy && dialog && !dialog.open) {
      dialog.showModal();
    }

    if (!activeCaseStudy && dialog?.open) {
      dialog.close();
    }
  }, [activeCaseStudy]);

  function openCaseStudy(industrySlug: string) {
    const caseStudy = industryCaseStudies.find((item) => item.industrySlug === industrySlug);

    if (!caseStudy) return;

    setActiveBrandSlug(caseStudy.steps[0].brandSlug);
    setActiveIndustrySlug(industrySlug);
  }

  function closeCaseStudy() {
    setActiveIndustrySlug(null);
    setActiveBrandSlug(null);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeCaseStudy();
  }

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.slug}
            industry={industry}
            lang={lang}
            onSelect={() => openCaseStudy(industry.slug)}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="case-study-title"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(1240px,calc(100%-2rem))] max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-graphite-900/80 backdrop:backdrop-blur-sm"
        onCancel={closeCaseStudy}
        onClick={handleBackdropClick}
        onClose={() => {
          setActiveIndustrySlug(null);
          setActiveBrandSlug(null);
        }}
      >
        {activeCaseStudy && activeStep ? (
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white shadow-2xl">
            <header className="sticky top-0 z-30 flex items-center justify-between gap-5 border-b border-white/10 bg-graphite-900 px-5 py-4 text-white sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5">
                  <Factory className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                    {lang === "en" ? "Interactive application case study" : "Studi kasus aplikasi interaktif"}
                  </p>
                  <p className="truncate text-sm font-semibold text-white/90">{text(activeCaseStudy.scenario, lang)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCaseStudy}
                className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition hover:bg-white/10"
                aria-label={lang === "en" ? "Close case study" : "Tutup studi kasus"}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="p-5 sm:p-7 lg:p-9">
              <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
                    {lang === "en" ? "The operating context" : "Konteks operasional"}
                  </p>
                  <h2 id="case-study-title" className="mt-3 text-3xl font-bold leading-tight text-graphite-900">
                    {text(activeCaseStudy.title, lang)}
                  </h2>
                </div>
                <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
                  <div className="bg-graphite-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">
                      {lang === "en" ? "Challenge" : "Tantangan"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-graphite-700">{text(activeCaseStudy.challenge, lang)}</p>
                  </div>
                  <div className="bg-industrial-700 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                      {lang === "en" ? "Connected outcome" : "Hasil terhubung"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/90">{text(activeCaseStudy.outcome, lang)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-y border-graphite-200 py-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-700">
                      {lang === "en" ? "Six-brand workflow" : "Workflow enam brand"}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-graphite-900">
                      {lang === "en" ? "Select a brand to inspect its role." : "Pilih brand untuk melihat perannya."}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-graphite-500">
                    {lang === "en" ? "Flow runs left to right" : "Alur berjalan dari kiri ke kanan"}
                  </p>
                </div>

                <div className="overflow-x-auto pb-3">
                  <ol className="grid min-w-[980px] grid-cols-6 gap-4" aria-label={lang === "en" ? "Brand application workflow" : "Workflow aplikasi brand"}>
                    {activeCaseStudy.steps.map((step, index) => {
                      const isActive = step.brandSlug === activeStep.brandSlug;

                      return (
                        <li key={step.brandSlug} className="relative">
                          <button
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActiveBrandSlug(step.brandSlug)}
                            className={`focus-ring group flex h-full min-h-44 w-full flex-col border p-3 text-left transition ${
                              isActive
                                ? "border-signal-500 bg-signal-500 text-white shadow-panel"
                                : "border-graphite-200 bg-white text-graphite-900 hover:border-industrial-600 hover:bg-graphite-50"
                            }`}
                          >
                            <span className={`text-xs font-bold ${isActive ? "text-white/70" : "text-graphite-500"}`}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <BrandLogo
                              name={step.brandName}
                              slug={step.brandSlug}
                              className="mt-3 h-14 w-full border border-graphite-200"
                              sizes="140px"
                            />
                            <span className={`mt-3 text-xs font-bold uppercase leading-5 tracking-[0.1em] ${isActive ? "text-white" : "text-graphite-700"}`}>
                              {text(step.phase, lang)}
                            </span>
                          </button>
                          {index < activeCaseStudy.steps.length - 1 ? (
                            <span className="pointer-events-none absolute -right-3 top-20 z-20 flex h-6 w-6 items-center justify-center bg-white text-signal-500" aria-hidden="true">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              <section className="mt-6 grid overflow-hidden border border-graphite-200 bg-white shadow-panel lg:grid-cols-[0.55fr_1.45fr]" aria-live="polite">
                <div className="flex min-h-48 flex-col justify-between bg-graphite-900 p-6 text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                      {lang === "en" ? "Selected brand" : "Brand terpilih"}
                    </p>
                    <BrandLogo
                      name={activeStep.brandName}
                      slug={activeStep.brandSlug}
                      className="mt-4 h-24 w-full border border-white/15"
                      sizes="240px"
                    />
                  </div>
                  <p className="mt-5 text-lg font-bold">{text(activeStep.phase, lang)}</p>
                </div>
                <div className="grid gap-px bg-graphite-200 sm:grid-cols-3">
                  <div className="bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal-600">
                      {lang === "en" ? "Application" : "Aplikasi"}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-graphite-700">{text(activeStep.application, lang)}</p>
                  </div>
                  <div className="bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-industrial-700">
                      {lang === "en" ? "Brand solution" : "Solusi brand"}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-graphite-900">{text(activeStep.solution, lang)}</p>
                  </div>
                  <div className="bg-white p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-industrial-700">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {lang === "en" ? "Operational value" : "Nilai operasional"}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-graphite-700">{text(activeStep.value, lang)}</p>
                  </div>
                </div>
              </section>

              <footer className="mt-7 flex flex-col gap-3 border-t border-graphite-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-xs leading-5 text-graphite-500">
                  {lang === "en"
                    ? "This diagram is an application example. Final product selection depends on the process, material, dimensions, and technical specification."
                    : "Diagram ini adalah contoh aplikasi. Pemilihan produk akhir bergantung pada proses, material, dimensi, dan spesifikasi teknis."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={withLang(`/brands/${activeStep.brandSlug}`, lang)}
                    className="focus-ring inline-flex items-center gap-2 border border-graphite-200 px-4 py-3 text-sm font-bold text-graphite-800 transition hover:border-industrial-600 hover:text-industrial-700"
                  >
                    {lang === "en" ? `View ${activeStep.brandName}` : `Lihat ${activeStep.brandName}`}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={withLang("/contact", lang)}
                    className="focus-ring inline-flex items-center gap-2 bg-signal-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-signal-600"
                  >
                    {lang === "en" ? "Discuss this application" : "Diskusikan aplikasi ini"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
