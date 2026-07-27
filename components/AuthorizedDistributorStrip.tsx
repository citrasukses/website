import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { withLang, type Language } from "@/lib/i18n";

type AuthorizedDistributorStripProps = {
  lang: Language;
  className?: string;
};

const distributors = [
  {
    name: "Tohnichi",
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
  }
] as const;

export function AuthorizedDistributorStrip({ lang, className = "" }: AuthorizedDistributorStripProps) {
  return (
    <aside
      className={`relative isolate overflow-hidden border border-signal-600 bg-signal-500 text-white shadow-panel ${className}`}
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

        <div className="grid grid-cols-2 gap-px border-t border-white/25 bg-white/25 lg:grid-cols-4 lg:border-l lg:border-t-0">
          <Link
            href={withLang("/brands/tohnichi", lang)}
            aria-label="Tohnichi"
            className="focus-ring group flex min-h-24 items-center justify-center overflow-hidden bg-white p-4 transition-colors hover:bg-graphite-50 lg:min-h-40"
          >
            <div className="relative h-16 w-full max-w-[170px] overflow-hidden">
              <Image
                src={distributors[0].logo}
                alt="Tohnichi"
                fill
                sizes="170px"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <Link
            href={withLang("/brands/nac", lang)}
            aria-label="NAC"
            className="focus-ring group flex min-h-24 items-center justify-center overflow-hidden bg-white p-4 text-graphite-900 transition-colors hover:bg-graphite-50 lg:min-h-40"
          >
            <span
              className="font-nac-logo block w-full max-w-full whitespace-nowrap text-center text-[20px] leading-none transition-transform duration-300 group-hover:scale-105 sm:text-[27px] lg:text-[30px]"
              aria-hidden="true"
            >
              {"\ue90b"}
            </span>
          </Link>

          {distributors.slice(1).map((distributor) => (
            <Link
              key={distributor.slug}
              href={withLang(`/brands/${distributor.slug}`, lang)}
              aria-label={distributor.name}
              className="focus-ring group flex min-h-24 items-center justify-center overflow-hidden bg-white p-4 transition-colors hover:bg-graphite-50 lg:min-h-40"
            >
              <Image
                src={distributor.logo}
                alt={distributor.name}
                width={distributor.width}
                height={distributor.height}
                className="max-h-14 w-full max-w-[165px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
