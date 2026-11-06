"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Language } from "@/lib/i18n";

export function TohnichiProductVideo({ lang }: { lang: Language }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const playLabel = lang === "en" ? "Play TOHNICHI product video" : "Putar video produk TOHNICHI";

  async function startVideo() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();
    } catch {
      // Keep the play overlay available if the browser cannot start playback.
    }
  }

  return (
    <div className="relative aspect-video bg-graphite-900">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/assets/brands/products/tohnichi/tohnichi-ql-cl-720p.mp4"
        poster="/assets/brands/products/tohnichi/tohnichi-ql-cl-video-poster.jpg"
        preload="none"
        playsInline
        controls
        onPlay={() => setHasStarted(true)}
        aria-label={lang === "en" ? "TOHNICHI QL and CL torque wrench product video" : "Video produk torque wrench TOHNICHI QL dan CL"}
      >
        {lang === "en"
          ? "Your browser does not support embedded video."
          : "Browser Anda tidak mendukung video tersemat."}
      </video>

      {!hasStarted ? (
        <button
          type="button"
          onClick={startVideo}
          className="focus-ring group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/10 text-white transition-colors hover:bg-black/25"
          aria-label={playLabel}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-signal-600/95 shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105 md:h-24 md:w-24">
            <Play className="ml-1 h-9 w-9 fill-current md:h-11 md:w-11" aria-hidden="true" />
          </span>
          <span className="bg-black/75 px-4 py-2 text-sm font-bold shadow-lg">
            {lang === "en" ? "Play video" : "Putar video"}
          </span>
        </button>
      ) : null}
    </div>
  );
}
