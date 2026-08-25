import Image from "next/image";
import { getBrandLogoPath } from "@/data/brand-logos";

type BrandLogoProps = {
  name: string;
  slug: string;
  src?: string;
  className?: string;
  sizes?: string;
};

const logoClassNames: Partial<Record<string, string>> = {
  "chubu-giken": "object-contain p-1 brightness-0",
  eisen: "object-contain p-1 brightness-0",
  sinto: "object-contain p-1"
};

export function BrandLogo({ name, slug, src = "", className = "", sizes = "160px" }: BrandLogoProps) {
  const logo = src || getBrandLogoPath(slug);
  const isNac = slug === "nac";
  const logoClassName = logoClassNames[slug] ?? "object-contain p-2";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      <div className="relative flex h-full w-full items-center justify-center">
        {isNac ? (
          <span
            className="font-nac-logo block whitespace-nowrap text-center text-[30px] leading-none text-graphite-900"
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
            className={logoClassName}
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
