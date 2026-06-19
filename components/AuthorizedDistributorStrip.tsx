import Image from "next/image";
import Link from "next/link";
import { withLang, type Language } from "@/lib/i18n";

type AuthorizedDistributorStripProps = {
  lang: Language;
};

const distributors = [
  {
    name: "Tohnichi",
    slug: "tohnichi",
    logo: "/assets/brands/tohnichi/logo.png",
    width: 120,
    height: 73
  },
  {
    name: "Fuji Star",
    slug: "fuji-star",
    logo: "/assets/brands/fuji-star/logo.png",
    width: 154,
    height: 27
  },
  {
    name: "Nippon Unit",
    slug: "nippon-unit-brush",
    logo: "/assets/brands/nippon-unit-brush/logo.gif",
    width: 148,
    height: 40
  }
] as const;

export function AuthorizedDistributorStrip({ lang }: AuthorizedDistributorStripProps) {
  return (
    <section className="border-y border-graphite-200 bg-white" aria-label="Authorized distributors">
      <div className="container-page flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <Link
          href={withLang("/brands", lang)}
          className="focus-ring border-l-2 border-signal-500 pl-3 text-sm font-semibold leading-6 text-graphite-700 transition-colors hover:text-signal-600"
        >
          Authorized distributor dari Tohnichi, NAC, Fuji Star, Nippon Unit.
        </Link>

        <div className="grid grid-cols-2 items-center gap-x-5 gap-y-4 sm:grid-cols-4 md:flex md:gap-7">
          <Link
            href={withLang("/brands/tohnichi", lang)}
            aria-label="Tohnichi"
            className="focus-ring flex h-12 items-center justify-center"
          >
            <Image
              src={distributors[0].logo}
              alt="Tohnichi"
              width={distributors[0].width}
              height={distributors[0].height}
              className="h-12 w-[140px] object-cover object-center"
            />
          </Link>

          <Link
            href={withLang("/brands/nac", lang)}
            aria-label="NAC"
            className="focus-ring flex h-12 items-center justify-center text-graphite-900"
          >
            <span className="font-nac-logo text-[30px] leading-none" aria-hidden="true">
              {"\ue90b"}
            </span>
          </Link>

          {distributors.slice(1).map((distributor) => (
            <Link
              key={distributor.slug}
              href={withLang(`/brands/${distributor.slug}`, lang)}
              aria-label={distributor.name}
              className="focus-ring flex h-12 items-center justify-center"
            >
              <Image
                src={distributor.logo}
                alt={distributor.name}
                width={distributor.width}
                height={distributor.height}
                className="max-h-10 w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
