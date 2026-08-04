"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import type { Language, LocalizedText } from "@/lib/i18n";
import { text } from "@/lib/i18n";

type TorqueToolSlide = {
  src: string;
  name: string;
  category: LocalizedText;
  description: LocalizedText;
  href: string;
  hasOpaqueCanvas?: boolean;
  imageClassName?: string;
};

const torqueTools: TorqueToolSlide[] = [
  {
    src: "/assets/brands/products/tohnichi/CES-G Background Removed.png",
    name: "CES Series",
    href: "/brands/tohnichi/products/ces-ces-g",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Digital torque wrench untuk kontrol dan pencatatan data.",
      en: "Digital torque wrench for control and data capture."
    }
  },
  {
    src: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd.png",
    name: "RTD Series",
    href: "/brands/tohnichi/products/rtd",
    category: {
      id: "Obeng torsi",
      en: "Torque screwdriver"
    },
    description: {
      id: "Obeng torsi adjustable dengan mekanisme rotary-slip untuk mencegah over-tightening.",
      en: "Adjustable rotary-slip torque screwdriver designed to prevent over-tightening."
    },
    hasOpaqueCanvas: true,
    imageClassName: "mix-blend-darken"
  },
  {
    src: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/stc2-g-stc2-g-bt.jpg",
    name: "STC2-G Series",
    href: "/brands/tohnichi/products/stc2-g-stc2-g-bt",
    category: {
      id: "Obeng torsi digital",
      en: "Digital torque screwdriver"
    },
    description: {
      id: "Obeng torsi digital untuk tightening presisi, inspeksi, dan pencatatan hasil.",
      en: "Digital torque screwdriver for precision tightening, inspection, and result capture."
    },
    hasOpaqueCanvas: true,
    imageClassName: "mix-blend-darken"
  },
  {
    src: "/assets/brands/products/tohnichi/QL5N+.png",
    name: "QL+ Series",
    href: "/brands/tohnichi/products/ql",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Click type torque wrench untuk tightening produksi.",
      en: "Click-type torque wrench for production tightening."
    }
  },
  {
    src: "/assets/brands/products/tohnichi/CL2NX6D+.png",
    name: "CL+ Series",
    href: "/brands/tohnichi/products/cl",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Torque wrench dengan interchangeable head untuk akses yang fleksibel.",
      en: "Interchangeable-head torque wrench for flexible access."
    }
  },
  {
    src: "/assets/brands/products/tohnichi/tohnichi_cem100bta.png",
    name: "CEM3-BTA Series",
    href: "/brands/tohnichi/products/cem3-g-bta",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Digital torque wrench untuk pengukuran, pencatatan, dan transfer data.",
      en: "Digital torque wrench for measurement, recording, and data transfer."
    },
    hasOpaqueCanvas: true,
    imageClassName: "mix-blend-darken"
  },
  {
    src: "/assets/brands/products/tohnichi/CSPFDD100N3x15D-AD.jpg",
    name: "CSPFDD-AD",
    href: "/brands/tohnichi/products/fdd-ad",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Torque wrench dengan data capture untuk bukti tightening.",
      en: "Torque wrench with data capture for tightening evidence."
    },
    hasOpaqueCanvas: true,
    imageClassName: "mix-blend-darken"
  },
  {
    src: "/assets/brands/products/tohnichi/tohnichi_DB100N-s.png",
    name: "DB / CDB Series",
    href: "/brands/tohnichi/products/db-dbe-dbr",
    category: {
      id: "Torque wrench",
      en: "Torque wrench"
    },
    description: {
      id: "Dial indicating torque wrench untuk inspeksi dan quality control.",
      en: "Dial-indicating torque wrench for inspection and quality control."
    },
    hasOpaqueCanvas: true,
    imageClassName: "mix-blend-darken"
  }
];

export function TohnichiTorqueCarousel({ lang }: { lang: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const activeTool = torqueTools[activeIndex];
  const isAutoRotationPaused = rotationPaused || isInteracting;

  useEffect(() => {
    if (
      isAutoRotationPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % torqueTools.length);
    }, 5500);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoRotationPaused]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + torqueTools.length) % torqueTools.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % torqueTools.length);
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
      className="tohnichi-instrument-surface relative overflow-hidden px-5 py-7 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-industrial-700 sm:px-8 sm:py-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={lang === "en" ? "Tohnichi torque tool range" : "Rangkaian torque tool Tohnichi"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsInteracting(false);
        }
      }}
    >
      <div
        className="flex items-start justify-between gap-5"
        aria-live={isAutoRotationPaused ? "polite" : "off"}
      >
        <div>
          <p className="text-lg font-bold tracking-tight text-graphite-900 sm:text-xl">
            {activeTool.name}
          </p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-graphite-500 sm:text-sm">
            {text(activeTool.description, lang)}
          </p>
          <Link
            href={`${activeTool.href}${lang === "en" ? "?lang=en" : ""}`}
            className="mt-2 inline-flex text-xs font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 hover:text-signal-600"
          >
            {lang === "en"
              ? `View ${activeTool.name} details`
              : `Lihat detail ${activeTool.name}`}
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="border border-industrial-700/20 bg-white/75 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-industrial-700">
            {text(activeTool.category, lang)}
          </span>
          <button
            type="button"
            onClick={() => setRotationPaused((current) => !current)}
            className="flex h-8 w-8 items-center justify-center border border-industrial-700/20 bg-white/75 text-industrial-700 transition-colors hover:border-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
            aria-label={
              rotationPaused
                ? lang === "en"
                  ? "Resume automatic torque tool rotation"
                  : "Lanjutkan rotasi torque tool otomatis"
                : lang === "en"
                  ? "Pause automatic torque tool rotation"
                  : "Jeda rotasi torque tool otomatis"
            }
            aria-pressed={rotationPaused}
          >
            {rotationPaused ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="relative mx-auto mt-7 h-28 w-[88%] sm:mt-9 sm:h-36">
        <Image
          key={activeTool.src}
          src={activeTool.src}
          alt={`${activeTool.name} Tohnichi`}
          fill
          sizes="(min-width: 1024px) 620px, 90vw"
          className={`object-contain ${
            activeTool.hasOpaqueCanvas
              ? ""
              : "drop-shadow-[0_18px_24px_rgba(21,26,34,0.18)]"
          } ${activeTool.imageClassName ?? ""}`}
        />
      </div>

      <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:mt-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
            aria-label={lang === "en" ? "Previous torque tool" : "Torque tool sebelumnya"}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
            aria-label={lang === "en" ? "Next torque tool" : "Torque tool berikutnya"}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex items-center justify-self-end gap-1 sm:justify-self-center sm:gap-1.5"
          aria-label={lang === "en" ? "Choose torque tool" : "Pilih torque tool"}
        >
          {torqueTools.map((tool, index) => (
            <button
              key={tool.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group flex h-10 w-5 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700 sm:w-6"
              aria-label={`${lang === "en" ? "Show" : "Tampilkan"} ${tool.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span
                className={`h-1.5 transition-all ${
                  index === activeIndex
                    ? "w-5 bg-industrial-700 sm:w-6"
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
