"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { text, withLang, type Language, type LocalizedText } from "@/lib/i18n";

type TohnichiPromotionSlide = {
  id: string;
  name: string;
  image: string;
  href: string;
  category: LocalizedText;
  headline: LocalizedText;
  description: LocalizedText;
};

export const tohnichiPromotionSlides: TohnichiPromotionSlide[] = [
  {
    id: "ql-plus",
    name: "QL+",
    image: "/assets/brands/products/tohnichi/QL5N+.png",
    href: "/brands/tohnichi/products/ql",
    category: {
      id: "Adjustable ratchet-head torque wrench",
      en: "Adjustable ratchet-head torque wrench"
    },
    headline: {
      id: "Kontrol torsi rendah dengan skala yang mudah dibaca.",
      en: "Low-range torque control with a clear, readable scale."
    },
    description: {
      id: "QL+ memadukan kepala ratchet, pengaturan torsi yang praktis, dan bentuk ringkas untuk pekerjaan tightening di ruang terbatas.",
      en: "QL+ combines a ratchet head, practical torque adjustment, and a compact form for tightening work in restricted spaces."
    }
  },
  {
    id: "cl-plus",
    name: "CL+",
    image: "/assets/brands/products/tohnichi/CL2NX6D+.png",
    href: "/brands/tohnichi/products/cl",
    category: {
      id: "Interchangeable-head torque wrench",
      en: "Interchangeable-head torque wrench"
    },
    headline: {
      id: "Fleksibilitas head untuk menyesuaikan akses kerja.",
      en: "Interchangeable-head flexibility for different working access."
    },
    description: {
      id: "CL+ menggunakan koneksi interchangeable head agar bentuk head dapat disesuaikan dengan fastener, posisi, dan ruang kerja.",
      en: "CL+ uses an interchangeable-head connection so the head style can match the fastener, position, and available working space."
    }
  }
];

export function TohnichiProductPromotionCarousel({ lang }: { lang: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = tohnichiPromotionSlides[activeIndex];
  const hasMultipleSlides = tohnichiPromotionSlides.length > 1;

  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + tohnichiPromotionSlides.length) % tohnichiPromotionSlides.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % tohnichiPromotionSlides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!hasMultipleSlides) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <section
      className="min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
      aria-labelledby="tohnichi-product-promotion-title"
      aria-roledescription="carousel"
      role="region"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            {lang === "en" ? "New product" : "Produk terbaru"}
          </p>
          <h2
            id="tohnichi-product-promotion-title"
            className="mt-4 max-w-3xl text-balance text-2xl font-bold text-white md:text-4xl"
          >
            {lang === "en"
              ? "Meet the QL+ and CL+ torque wrench series."
              : "Kenali torque wrench seri QL+ dan CL+."}
          </h2>
        </div>

        {hasMultipleSlides ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              className="focus-ring flex h-11 w-11 items-center justify-center border border-white/25 bg-white/5 text-white transition-colors hover:border-white hover:bg-white hover:text-graphite-900"
              aria-label={lang === "en" ? "Previous promoted product" : "Produk promosi sebelumnya"}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="focus-ring flex h-11 w-11 items-center justify-center border border-white/25 bg-white/5 text-white transition-colors hover:border-white hover:bg-white hover:text-graphite-900"
              aria-label={lang === "en" ? "Next promoted product" : "Produk promosi berikutnya"}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        className="mt-8 overflow-hidden border border-white/15 bg-white"
        role="group"
        aria-live="polite"
        aria-label={`${activeSlide.name}, ${activeIndex + 1} / ${tohnichiPromotionSlides.length}`}
      >
        <article key={activeSlide.id} className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-64 overflow-hidden border-b border-graphite-200 bg-white sm:min-h-80 lg:border-b-0 lg:border-r">
            <Image
              src={activeSlide.image}
              alt={`${activeSlide.name} ${text(activeSlide.category, lang)}`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-7 sm:p-10"
            />
            <span className="absolute left-5 top-5 border border-graphite-200 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-signal-600 backdrop-blur-sm">
              {lang === "en" ? "New product" : "Produk baru"}
            </span>
          </div>

          <div className="flex min-h-80 flex-col bg-[#f4c91d] p-6 text-graphite-900 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-700">
              {text(activeSlide.category, lang)}
            </p>
            <h3 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
              {activeSlide.name}
            </h3>
            <p className="mt-5 text-xl font-bold leading-snug">
              {text(activeSlide.headline, lang)}
            </p>
            <p className="mt-4 text-sm leading-6 text-graphite-700">
              {text(activeSlide.description, lang)}
            </p>
            <Link
              href={withLang(activeSlide.href, lang)}
              className="focus-ring mt-8 inline-flex w-fit items-center gap-2 border-b border-graphite-900 pb-1 text-sm font-black text-graphite-900 transition-opacity hover:opacity-65 lg:mt-auto"
            >
              {lang === "en"
                ? `View ${activeSlide.name} details`
                : `Lihat detail ${activeSlide.name}`}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>

      {hasMultipleSlides ? (
        <div
          className="mt-3 grid gap-2 sm:grid-cols-2"
          aria-label={lang === "en" ? "Promoted TOHNICHI products" : "Produk promosi TOHNICHI"}
        >
          {tohnichiPromotionSlides.map((slide, index) => {
            const active = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                className={`focus-ring flex min-h-14 items-center border px-4 text-left transition-colors ${
                  active
                    ? "border-[#f4c91d] bg-[#f4c91d] text-graphite-900"
                    : "border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
                }`}
              >
                <span className="text-base font-bold">{slide.name}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
