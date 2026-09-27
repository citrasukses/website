import Image from "next/image";
import { getBrandLogoPath } from "@/data/brand-logos";

type BrandLogoProps = {
  name: string;
  slug: string;
  src?: string;
  className?: string;
  frame?: boolean;
  imageClassName?: string;
  sizes?: string;
};

const logoClassNames: Partial<Record<string, string>> = {
  "chubu-giken": "object-contain p-1 brightness-0",
  eisen: "object-contain p-1 brightness-0",
  "fuji-star": "object-contain p-1.5",
  tohnichi: "object-contain p-1",
  sinto: "object-contain p-1"
};

export function BrandLogo({
  name,
  slug,
  src = "",
  className = "",
  frame = true,
  imageClassName = "",
  sizes = "160px"
}: BrandLogoProps) {
  const logo = src || getBrandLogoPath(slug);
  const isNac = slug === "nac";
  const logoClassName = logoClassNames[slug] ?? "object-contain p-2";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${frame ? "bg-white" : "bg-transparent"} ${className}`}>
      <div className="relative flex h-full w-full items-center justify-center">
        {isNac ? (
          <span
            className={`font-nac-logo block max-w-full whitespace-nowrap text-center text-[22px] leading-none text-graphite-900 ${imageClassName}`}
            aria-label={`${name} logo`}
          >
            {"\ue90b"}
          </span>
        ) : logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            sizes={sizes}
            className={`${logoClassName} ${imageClassName}`}
          />
        ) : (
          <span
            className="line-clamp-2 text-center text-sm font-black uppercase leading-tight tracking-[0.08em] text-graphite-700"
            aria-label={`${name} logo placeholder`}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
}
