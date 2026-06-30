"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Headphones,
  ListChecks,
  PackageSearch,
  Settings2,
  ShieldCheck,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import type { ExpertiseArea, ExpertiseIcon } from "@/data/expertise";
import { text, withLang, type Language } from "@/lib/i18n";

type ExpertiseShowcaseProps = {
  areas: ExpertiseArea[];
  lang: Language;
};

const stageIcons: Record<ExpertiseIcon, LucideIcon> = {
  application: Crosshair,
  selection: Settings2,
  control: ListChecks,
  verification: BadgeCheck,
  sourcing: PackageSearch,
  maintenance: Wrench,
  quality: ShieldCheck,
  support: Headphones
};

function getVisualGridClassName(imageCount: number) {
  return imageCount === 1 ? "grid-cols-1" : "grid-cols-2";
}

export function ExpertiseShowcase({ areas, lang }: ExpertiseShowcaseProps) {
  const visibleAreas = areas.filter((area) => area.enabled !== false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visibleAreas.length < 2 || isPaused || !isInView) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % visibleAreas.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [activeIndex, isInView, isPaused, visibleAreas.length]);

  if (visibleAreas.length === 0) {
    return null;
  }

  const area = visibleAreas[activeIndex % visibleAreas.length];

  function showPreviousArea() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + visibleAreas.length) % visibleAreas.length);
  }

  function showNextArea() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % visibleAreas.length);
  }

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="technical-grid border-b border-graphite-200 py-16"
      aria-label={lang === "en" ? "Industry expertise carousel" : "Carousel keahlian industri"}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-5 border-b border-graphite-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              {lang === "en" ? "Technical expertise" : "Keahlian teknis"}
            </p>
            <p className="mt-2 text-sm font-semibold text-graphite-500" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(visibleAreas.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showPreviousArea}
              className="focus-ring flex h-12 w-12 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition hover:border-industrial-600 hover:bg-industrial-700 hover:text-white"
              aria-label={lang === "en" ? "Previous expertise" : "Keahlian sebelumnya"}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNextArea}
              className="focus-ring flex h-12 w-12 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition hover:border-industrial-600 hover:bg-industrial-700 hover:text-white"
              aria-label={lang === "en" ? "Next expertise" : "Keahlian berikutnya"}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <article
          id={`expertise-${area.id}`}
          key={area.id}
          className="expertise-slide-enter grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          aria-label={`${text(area.eyebrow, lang)} — ${activeIndex + 1} / ${visibleAreas.length}`}
          aria-roledescription="slide"
        >
          <div>
              <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-industrial-700">
                {text(area.eyebrow, lang)}
              </p>
              <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold tracking-normal text-graphite-900 md:text-4xl">
                {text(area.title, lang)}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-graphite-600">
                {text(area.description, lang)}
              </p>

              <div className="mt-8 flex flex-wrap gap-2" aria-label={lang === "en" ? "Capabilities" : "Kapabilitas"}>
                {area.capabilities.map((capability) => (
                  <span
                    key={capability.id}
                    className="border border-graphite-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-graphite-700"
                  >
                    {text(capability.label, lang)}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href={withLang(area.primaryCta.href, lang)}>
                  <span className="inline-flex items-center gap-2">
                    {text(area.primaryCta.label, lang)}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </CTAButton>
                {area.secondaryCta ? (
                  <CTAButton href={withLang(area.secondaryCta.href, lang)} variant="ghost">
                    {text(area.secondaryCta.label, lang)}
                  </CTAButton>
                ) : null}
              </div>
          </div>

          <div>
              <div className="relative overflow-hidden border border-industrial-800 bg-industrial-800 p-6 text-white shadow-panel sm:p-8">
                <div className="blueprint-dark pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <p className="max-w-sm text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                      {text(area.visual.label, lang)}
                    </p>
                    {area.visual.badge ? (
                      <span className="shrink-0 border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.14em]">
                        {text(area.visual.badge, lang)}
                      </span>
                    ) : null}
                  </div>

                  <div className={`relative my-9 grid h-56 overflow-hidden ${getVisualGridClassName(area.visual.images.length)}`}>
                    {area.visual.motif === "torque-arc" ? (
                      <svg
                        viewBox="0 0 320 180"
                        className="absolute left-1/2 top-1/2 h-52 w-80 max-w-full -translate-x-1/2 -translate-y-1/2 text-signal-500"
                        aria-hidden="true"
                      >
                        <path d="M45 142 A125 125 0 0 1 275 142" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 8" />
                        <path d="M263 119 L278 143 L250 146" fill="none" stroke="currentColor" strokeWidth="3" />
                        <circle cx="45" cy="142" r="6" fill="currentColor" />
                      </svg>
                    ) : null}
                    {area.visual.images.slice(0, 4).map((visualImage) => (
                      <div key={visualImage.id} className="relative z-10 min-h-0 border border-white/10">
                        <Image
                          src={visualImage.src}
                          alt={text(visualImage.alt, lang)}
                          fill
                          sizes={area.visual.images.length === 1 ? "(min-width: 1024px) 520px, 90vw" : "(min-width: 1024px) 260px, 45vw"}
                          className={`${visualImage.fit === "cover" ? "object-cover" : "object-contain"} drop-shadow-[0_16px_20px_rgba(0,0,0,0.35)]`}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="border-t border-white/20 pt-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    {text(area.visual.sequence, lang)}
                  </p>
                </div>
              </div>

              <ol className="grid gap-px border-x border-b border-graphite-200 bg-graphite-200 sm:grid-cols-2">
                {area.stages.map((stage, stageIndex) => {
                  const Icon = stageIcons[stage.icon];

                  return (
                    <li key={stage.id} className="bg-white p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-graphite-200 bg-graphite-50 text-industrial-700">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-signal-500">
                          {String(stageIndex + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-graphite-900">{text(stage.title, lang)}</h3>
                      <p className="mt-2 text-sm leading-6 text-graphite-500">{text(stage.description, lang)}</p>
                    </li>
                  );
                })}
              </ol>
          </div>
        </article>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label={lang === "en" ? "Choose expertise slide" : "Pilih slide keahlian"}>
          {visibleAreas.map((expertiseArea, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={expertiseArea.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`focus-ring h-2.5 transition-all ${isActive ? "w-10 bg-signal-500" : "w-5 bg-graphite-200 hover:bg-industrial-600"}`}
                aria-label={`${lang === "en" ? "Show" : "Tampilkan"} ${text(expertiseArea.eyebrow, lang)}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
