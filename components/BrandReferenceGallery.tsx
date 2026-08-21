import Image from "next/image";
import { ExternalLink, Images } from "lucide-react";
import type { BrandReferenceImage } from "@/data/general-brand-reference-images";
import type { Language } from "@/lib/i18n";

type BrandReferenceGalleryProps = {
  images: BrandReferenceImage[];
  brandName: string;
  lang: Language;
};

export function BrandReferenceGallery({ images, brandName, lang }: BrandReferenceGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div>
      <div className={`grid gap-3 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {images.slice(0, 2).map((image) => (
          <figure key={image.src} className="overflow-hidden border border-graphite-200 bg-white">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-white to-graphite-50">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </div>
            <figcaption className="border-t border-dashed border-graphite-200 px-3 py-2.5">
              <a
                href={image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold text-industrial-700 underline decoration-industrial-300 underline-offset-4 hover:text-industrial-900"
              >
                {lang === "en" ? "View image source" : "Lihat sumber gambar"}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-3 flex gap-2 border border-dashed border-graphite-300 bg-white p-3 text-[11px] leading-5 text-graphite-500">
        <Images className="mt-0.5 h-4 w-4 shrink-0 text-graphite-400" aria-hidden="true" />
        <p>
          {lang === "en"
            ? `Reference imagery for ${brandName} only. Images and trademarks remain the property of their respective owners; CSE does not claim ownership.`
            : `Gambar ${brandName} hanya untuk referensi. Hak cipta gambar dan merek dagang tetap milik pemilik masing-masing; CSE tidak mengklaim kepemilikan.`}
        </p>
      </div>
    </div>
  );
}
