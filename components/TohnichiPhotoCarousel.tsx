"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { TohnichiFieldPhoto } from "@/data/tohnichi-field-photos";
import { text, type Language } from "@/lib/i18n";

type PhotoCarouselProps = {
  id: string;
  labelledBy: string;
  photos: TohnichiFieldPhoto[];
  lang: Language;
  theme?: "light" | "dark";
};

export function TohnichiPhotoCarousel({ id, labelledBy, photos, lang, theme = "light" }: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dark = theme === "dark";
  const en = lang === "en";
  const activePhoto = photos[activeIndex];
  const autoRotationPaused = rotationPaused || hovered || focused || reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (autoRotationPaused || photos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoRotationPaused, photos.length]);

  function move(direction: number) {
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      move(deltaX < 0 ? 1 : -1);
    }
  }

  return (
    <div
      role="region"
      aria-roledescription={en ? "carousel" : "karusel"}
      aria-labelledby={labelledBy}
      aria-describedby={`${id}-instructions`}
      className={`cse-photo-carousel min-w-0 rounded-brand outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${dark ? "focus-visible:ring-white/75 focus-visible:ring-offset-graphite-900" : "focus-visible:ring-industrial-700 focus-visible:ring-offset-paper-100"}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <p id={`${id}-instructions`} className="sr-only">
        {en ? "Use the left and right arrow keys, swipe, or use the photo controls below." : "Gunakan tombol panah kiri dan kanan, geser, atau gunakan kontrol foto di bawah."}
      </p>
      <figure>
        <div
          id={`${id}-photos`}
          className={`relative aspect-[16/9] touch-pan-y overflow-hidden rounded-brand sm:aspect-[2/1] lg:aspect-[12/5] ${dark ? "bg-graphite-800" : "bg-graphite-200"}`}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            pointerStart.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          onDragStart={(event) => event.preventDefault()}
        >
          {photos.map((photo, index) => (
            <div key={photo.slug} aria-hidden={index !== activeIndex} className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <picture className="block h-full">
                <source
                  srcSet={`/assets/company/seminars/tohnichi/${photo.slug}-640.webp 640w, /assets/company/seminars/tohnichi/${photo.slug}-1440.webp 1440w`}
                  sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 767px) calc(100vw - 96px), (max-width: 1279px) 44vw, 542px"
                  type="image/webp"
                />
                <Image
                  src={`/assets/company/seminars/tohnichi/${photo.slug}-1440.webp`}
                  alt={text(photo.alt, lang)}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </picture>
            </div>
          ))}
        </div>
        <figcaption className="min-h-20 pt-3" aria-live={autoRotationPaused ? "polite" : "off"} aria-atomic="true">
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-graphite-900"}`}>{text(activePhoto.title, lang)}</p>
          <p className={`mt-1 text-xs leading-5 ${dark ? "text-white/65" : "text-graphite-700"}`}>{text(activePhoto.caption, lang)}</p>
        </figcaption>
      </figure>
      <div className={`flex flex-wrap items-center justify-between gap-3 border-t pt-2 ${dark ? "border-white/15" : "border-graphite-200"}`}>
        <div className="flex min-w-0 items-center gap-3">
          <span className={`text-xs tabular-nums ${dark ? "text-white/60" : "text-graphite-700"}`} aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <div className="cse-carousel-indicators items-center">
            {photos.map((photo, index) => (
              <button
                key={photo.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${en ? "Show photo" : "Tampilkan foto"}: ${text(photo.title, lang)}`}
                aria-pressed={activeIndex === index}
                aria-controls={`${id}-photos`}
                className={`flex h-11 w-6 items-center justify-center rounded-brand outline-none focus-visible:ring-2 ${dark ? "focus-visible:ring-white/75" : "focus-visible:ring-industrial-700"}`}
              >
                <span aria-hidden="true" className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${activeIndex === index ? "w-5 bg-signal-500" : dark ? "w-1.5 bg-white/30" : "w-1.5 bg-graphite-500/40"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setRotationPaused((current) => !current)}
            aria-label={rotationPaused ? en ? "Resume automatic photo rotation" : "Lanjutkan rotasi foto otomatis" : en ? "Pause automatic photo rotation" : "Jeda rotasi foto otomatis"}
            aria-pressed={rotationPaused}
            aria-controls={`${id}-photos`}
            className={`cse-control outline-none focus-visible:ring-2 ${dark ? "border-white/20 text-white hover:border-white/70 hover:bg-white/10 focus-visible:ring-white/75" : "border-graphite-200 text-graphite-900 hover:border-industrial-700 hover:bg-white/60 focus-visible:ring-industrial-700"}`}
          >
            {rotationPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
          {([-1, 1] as const).map((direction) => {
            const Icon = direction === -1 ? ChevronLeft : ChevronRight;
            return (
              <button
                key={direction}
                type="button"
                onClick={() => move(direction)}
                aria-label={direction === -1 ? en ? "Previous photo" : "Foto sebelumnya" : en ? "Next photo" : "Foto berikutnya"}
                aria-controls={`${id}-photos`}
                className={`cse-control outline-none focus-visible:ring-2 ${dark ? "border-white/20 text-white hover:border-white/70 hover:bg-white/10 focus-visible:ring-white/75" : "border-graphite-200 text-graphite-900 hover:border-industrial-700 hover:bg-white/60 focus-visible:ring-industrial-700"}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
