import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { withLang, type Language } from "@/lib/i18n";

type AuthorizedDistributorStripProps = {
  lang: Language;
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
    name: "Fuji Star",
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

export function AuthorizedDistributorStrip({ lang }: AuthorizedDistributorStripProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-signal-600 bg-signal-500 text-white"
      aria-label={lang === "en" ? "Authorized distributors" : "Distributor resmi"}
    >
      <div className="blueprint-dark pointer-events-none absolute inset-0 -z-10 opacity-[0.08]" aria-hidden="true" />

      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-white/80">
              <span className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5">
                <BadgeCheck className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.22em]">
                {lang === "en" ? "Official brand partnerships" : "Kemitraan brand resmi"}
              </p>
            </div>

            <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
              {lang === "en"
                ? "Authorized distributor for trusted industrial brands."
                : "Distributor resmi untuk brand industrial terpercaya."}
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-lg text-base leading-7 text-white/80 md:text-lg md:leading-8">
              {lang === "en"
                ? "Direct brand access, dependable product support, and clearer technical coordination for industrial buyers in Indonesia."
                : "Akses brand langsung, dukungan produk yang andal, dan koordinasi teknis yang lebih jelas untuk buyer industrial di Indonesia."}
            </p>

            <Link
              href={withLang("/brands", lang)}
              className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 border-b border-white/50 text-sm font-bold text-white transition-colors hover:border-white"
            >
              {lang === "en" ? "Explore our brand portfolio" : "Lihat portofolio brand kami"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/25 bg-white/25 shadow-2xl lg:mt-12 lg:grid-cols-4">
          <Link
            href={withLang("/brands/tohnichi", lang)}
            aria-label="Tohnichi"
            className="focus-ring group flex min-h-36 items-center justify-center overflow-hidden bg-white p-5 transition-colors hover:bg-graphite-50 sm:min-h-44 lg:min-h-52"
          >
            <Image
              src={distributors[0].logo}
              alt="Tohnichi"
              width={distributors[0].width}
              height={distributors[0].height}
              className="h-auto w-full max-w-[230px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <Link
            href={withLang("/brands/nac", lang)}
            aria-label="NAC"
            className="focus-ring group flex min-h-36 items-center justify-center overflow-hidden bg-white p-4 text-graphite-900 transition-colors hover:bg-graphite-50 sm:min-h-44 lg:min-h-52"
          >
            <span
              className="font-nac-logo block w-full max-w-full whitespace-nowrap text-center text-[22px] leading-none transition-transform duration-300 group-hover:scale-105 sm:text-[38px] lg:text-[46px]"
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
              className="focus-ring group flex min-h-36 items-center justify-center overflow-hidden bg-white p-5 transition-colors hover:bg-graphite-50 sm:min-h-44 lg:min-h-52"
            >
              <Image
                src={distributor.logo}
                alt={distributor.name}
                width={distributor.width}
                height={distributor.height}
                className="max-h-24 w-full max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
