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
  eisen: "object-contain brightness-0",
  elm: "object-cover object-left",
  "fuji-denshi": "object-cover object-left",
  unitta: "object-cover object-right"
};

export function BrandLogo({ name, slug, src = "", className = "", sizes = "160px" }: BrandLogoProps) {
  const logo = src || getBrandLogoPath(slug);
  const isNac = slug === "nac";
  const logoClassName = logoClassNames[slug] ?? "object-contain";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      <div className="relative flex h-16 w-40 items-center justify-center">
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
