"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AssetSlotProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
};

export function AssetSlot({ src, alt, label, className = "", imageClassName = "" }: AssetSlotProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <div className={`relative overflow-hidden border border-graphite-200 bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`object-cover transition duration-500 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        } ${imageClassName}`}
      />
      {status !== "loaded" ? (
        <div className="asset-slot absolute inset-0 flex min-h-[160px] w-full items-center justify-center p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
            {label ?? alt}
          </span>
        </div>
      ) : null}
    </div>
  );
}
