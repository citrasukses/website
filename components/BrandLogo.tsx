import Image from "next/image";
import { getBrandLogoPath } from "@/data/brand-logos";

type BrandLogoProps = {
  name: string;
  slug: string;
  src?: string;
  className?: string;
  sizes?: string;
};

export function BrandLogo({ name, slug, src = "", className = "", sizes = "160px" }: BrandLogoProps) {
  const logo = src || getBrandLogoPath(slug);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      <div className="relative flex h-14 w-40 max-w-[calc(100%-1.5rem)] items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            sizes={sizes}
            className="object-contain"
          />
        ) : (
          <span
            className="text-center text-sm font-black uppercase leading-tight tracking-[0.08em] text-graphite-700"
            aria-label={`${name} logo placeholder`}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
}
