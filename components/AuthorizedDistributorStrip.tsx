import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";
import { withLang, type Language } from "@/lib/i18n";

type AuthorizedDistributorStripProps = {
  lang: Language;
  className?: string;
};

const distributors = [
  {
    name: "TOHNICHI",
    slug: "tohnichi",
    logo: "/assets/brands/logos/tohnichi--alternate.png",
    width: 166,
    height: 104
  },
  {
    name: "Sankyo Rikagaku",
    slug: "fuji-star",
    logo: "/assets/brands/logos/fuji-star.png",
    width: 581,
    height: 102
  },
  {
    name: "Nippon Unit",
    slug: "nippon-unit-brush",
    logo: "/assets/brands/logos/nippon-unit-brush.gif",
    width: 270,
    height: 73
  },
  {
    name: "FUJI-DENSHI",
    slug: "fuji-denshi",
    logo: "/assets/brands/logos/fuji-denshi.svg",
    width: 794,
    height: 93
  },
  {
    name: "SMBC",
    slug: "smbc",
    logo: "/assets/brands/logos/smbc.png",
    width: 500,
    height: 500
  },
  {
    name: "Viet Nhat Special Tools",
    slug: "viet-nhat",
    logo: "/assets/brands/logos/viet-nhat.svg",
    width: 415,
    height: 113
  }
] as const;

type DistributorTileProps = {
  slug: string;
  name: string;
  lang: Language;
  className?: string;
  children: ReactNode;
};

function DistributorTile({ slug, name, lang, className = "", children }: DistributorTileProps) {
  const canOpen = slug === "tohnichi" || slug === "nac";
  const tileClassName = `relative flex min-h-24 items-center justify-center overflow-hidden bg-white p-5 lg:min-h-32 ${className} ${
    canOpen ? "focus-ring group transition-colors hover:bg-graphite-50" : ""
  }`;

  if (!canOpen) {
    return (
      <div aria-label={name} className={tileClassName}>
        {children}
      </div>
    );
  }

  return (
    <Link href={withLang(`/brands/${slug}`, lang)} aria-label={name} className={tileClassName}>
      {children}
    </Link>
  );
}

export function AuthorizedDistributorStrip({ lang, className = "" }: AuthorizedDistributorStripProps) {
  return (
    <aside
      className={`relative isolate overflow-hidden bg-signal-500 text-white shadow-panel ${className}`}
      aria-label={lang === "en" ? "Authorized distributors" : "Distributor resmi"}
    >
      <div className="blueprint-dark pointer-events-none absolute inset-0 -z-10 opacity-[0.08]" aria-hidden="true" />

      <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 lg:px-8">
          <div className="flex items-center gap-3 text-white/80">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 bg-white/5">
              <BadgeCheck className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.22em]">
              {lang === "en" ? "Official brand partnerships" : "Kemitraan brand resmi"}
            </p>
          </div>

          <h2 className="mt-4 text-balance text-xl font-bold leading-snug tracking-normal sm:text-2xl">
            {lang === "en"
              ? "Authorized distributor for trusted industrial brands."
              : "Distributor resmi untuk brand industrial terpercaya."}
          </h2>

          <Link
            href={withLang("/brands", lang)}
            className="focus-ring mt-4 inline-flex min-h-10 w-fit items-center gap-2 border-b border-white/50 text-sm font-bold text-white transition-colors hover:border-white"
          >
            {lang === "en" ? "View brands" : "Lihat brand"}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 border-t border-white/20 bg-white lg:grid-cols-7 lg:border-l lg:border-t-0">
          <DistributorTile
            slug="tohnichi"
            name="TOHNICHI"
            lang={lang}
            className="border-b border-graphite-200 after:absolute after:inset-y-5 after:right-0 after:w-0.5 after:bg-signal-500/70 after:content-[''] lg:border-b-0"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <div className="relative h-14 w-full max-w-[150px] overflow-hidden">
                <Image
                  src={distributors[0].logo}
                  alt="TOHNICHI"
                  fill
                  sizes="150px"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </DistributorTile>

          <DistributorTile
            slug="nac"
            name="NAC"
            lang={lang}
            className="border-b border-graphite-200 text-graphite-900 [container-type:inline-size] lg:border-b-0 lg:after:absolute lg:after:inset-y-5 lg:after:right-0 lg:after:w-0.5 lg:after:bg-signal-500/70 lg:after:content-['']"
          >
            <span
              className="nac-strip-logo font-nac-logo block whitespace-nowrap text-center leading-none transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              {"\ue90b"}
            </span>
          </DistributorTile>

          {distributors.slice(1).map((distributor) => (
            <DistributorTile
              key={distributor.slug}
              slug={distributor.slug}
              name={distributor.name}
              lang={lang}
              className={
                distributor.slug !== "viet-nhat"
                  ? "after:absolute after:inset-y-5 after:right-0 after:w-0.5 after:bg-signal-500/70 after:content-['']"
                  : ""
              }
            >
              {distributor.slug === "fuji-denshi" ? (
                <div className="relative h-16 w-16 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={distributor.logo}
                    alt={distributor.name}
                    fill
                    sizes="64px"
                    className="object-cover object-left"
                  />
                </div>
              ) : (
                <Image
                  src={distributor.logo}
                  alt={distributor.name}
                  width={distributor.width}
                  height={distributor.height}
                  className="max-h-11 w-full max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </DistributorTile>
          ))}
        </div>
      </div>
    </aside>
  );
}
