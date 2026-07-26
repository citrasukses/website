"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { Language, LocalizedText } from "@/lib/i18n";
import { text } from "@/lib/i18n";

type TorqueWrenchSlide = {
  src: string;
  name: string;
  description: LocalizedText;
  imageClassName?: string;
};

const torqueWrenches: TorqueWrenchSlide[] = [
  {
    src: "/assets/company/background-items/tohnichi-digital-torque-wrench.png",
    name: "CES Series",
    description: {
      id: "Digital torque wrench untuk kontrol dan pencatatan data.",
      en: "Digital torque wrench for control and data capture."
    }
  },
  {
    src: "/assets/brands/products/tohnichi/QL100N4.jpg",
    name: "QL100N4",
    description: {
      id: "Click type torque wrench untuk tightening produksi.",
      en: "Click-type torque wrench for production tightening."
    },
    imageClassName: "mix-blend-multiply"
  },
  {
    src: "/assets/brands/products/tohnichi/CL100NX15D.jpg",
    name: "CL100NX15D",
    description: {
      id: "Torque wrench dengan interchangeable head untuk akses yang fleksibel.",
      en: "Interchangeable-head torque wrench for flexible access."
    },
    imageClassName: "mix-blend-multiply"
  },
  {
    src: "/assets/brands/products/tohnichi/CSPFDD100N3x15D-AD.jpg",
    name: "CSPFDD-AD",
    description: {
      id: "Torque wrench dengan data capture untuk bukti tightening.",
      en: "Torque wrench with data capture for tightening evidence."
    },
    imageClassName: "mix-blend-multiply"
  }
];

export function TohnichiTorqueCarousel({ lang }: { lang: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWrench = torqueWrenches[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + torqueWrenches.length) % torqueWrenches.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % torqueWrenches.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
    <div
      className="tohnichi-instrument-surface relative min-h-[280px] overflow-hidden px-5 py-7 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-industrial-700 sm:min-h-[330px] sm:px-8 sm:py-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={lang === "en" ? "Tohnichi torque wrench range" : "Rangkaian torque wrench Tohnichi"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-start justify-between gap-5" aria-live="polite">
        <div>
          <p className="text-lg font-bold tracking-tight text-graphite-900 sm:text-xl">
            {activeWrench.name}
          </p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-graphite-500 sm:text-sm">
            {text(activeWrench.description, lang)}
          </p>
        </div>
        <span className="shrink-0 border border-industrial-700/20 bg-white/75 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-industrial-700">
          {lang === "en" ? "Torque wrench" : "Torque wrench"}
        </span>
      </div>

      <div className="relative mx-auto mt-7 h-28 w-[88%] sm:mt-9 sm:h-36">
        <Image
          key={activeWrench.src}
          src={activeWrench.src}
          alt={`${activeWrench.name} Tohnichi`}
          fill
          sizes="(min-width: 1024px) 620px, 90vw"
          className={`object-contain drop-shadow-[0_18px_24px_rgba(21,26,34,0.18)] ${activeWrench.imageClassName ?? ""}`}
        />
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 sm:inset-x-8 sm:bottom-7">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
            aria-label={lang === "en" ? "Previous torque wrench" : "Torque wrench sebelumnya"}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
            aria-label={lang === "en" ? "Next torque wrench" : "Torque wrench berikutnya"}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-1.5" aria-label={lang === "en" ? "Choose torque wrench" : "Pilih torque wrench"}>
          {torqueWrenches.map((wrench, index) => (
            <button
              key={wrench.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group flex h-10 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
              aria-label={`${lang === "en" ? "Show" : "Tampilkan"} ${wrench.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span
                className={`h-1.5 transition-all ${
                  index === activeIndex
                    ? "w-6 bg-industrial-700"
                    : "w-3 bg-graphite-500/30 group-hover:bg-graphite-500/60"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-graphite-500">
            {lang === "en" ? "Process result" : "Hasil proses"}
          </p>
          <p className="mt-1 text-xs font-bold text-graphite-900">
            {lang === "en" ? "Measured · Counted · Verified" : "Terukur · Terhitung · Terverifikasi"}
          </p>
        </div>
      </div>
    </div>
  );
}
