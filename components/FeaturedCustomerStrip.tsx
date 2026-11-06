import Image from "next/image";
import { getHomepageCustomerLogos } from "@/lib/customerAssets";
import type { Language } from "@/lib/i18n";

export function FeaturedCustomerStrip({ lang }: { lang: Language }) {
  const customers = getHomepageCustomerLogos();

  if (customers.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="featured-customers-heading" className="border-b border-graphite-200 bg-white py-6 lg:py-7">
      <h2 id="featured-customers-heading" className="sr-only">
        {lang === "en" ? "Selected customer references" : "Referensi pelanggan pilihan"}
      </h2>

      <div
        className="customer-logo-marquee focus-ring border-y border-graphite-200 bg-graphite-100"
        role="region"
        aria-label={lang === "en" ? "Customer logo carousel" : "Carousel logo pelanggan"}
        tabIndex={0}
      >
        <div className="customer-logo-marquee-track">
          <ul className="customer-logo-marquee-list" role="list">
            {customers.map((customer) => (
              <li key={customer.logo} className="flex h-20 w-40 shrink-0 items-center justify-center border-r border-graphite-200 bg-white px-5 py-4 sm:w-48">
                <div
                  className="flex h-11 w-full items-center justify-center"
                  style={customer.logoScale ? { transform: `scale(${customer.logoScale})` } : undefined}
                >
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    width={180}
                    height={64}
                    sizes="(max-width: 639px) 120px, 150px"
                    className="h-full w-full object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>

          <ul className="customer-logo-marquee-list customer-logo-marquee-copy" aria-hidden="true">
            {customers.map((customer) => (
              <li key={`duplicate-${customer.logo}`} className="flex h-20 w-40 shrink-0 items-center justify-center border-r border-graphite-200 bg-white px-5 py-4 sm:w-48">
                <div
                  className="flex h-11 w-full items-center justify-center"
                  style={customer.logoScale ? { transform: `scale(${customer.logoScale})` } : undefined}
                >
                  <Image
                    src={customer.logo}
                    alt=""
                    width={180}
                    height={64}
                    sizes="(max-width: 639px) 120px, 150px"
                    className="h-full w-full object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page">
        <p className="mt-3 text-center text-[11px] leading-5 text-graphite-500">
          Logo ditampilkan sebagai referensi pelanggan/riwayat suplai. Seluruh merek dagang adalah milik masing-masing pemiliknya.
        </p>
      </div>
    </section>
  );
}
