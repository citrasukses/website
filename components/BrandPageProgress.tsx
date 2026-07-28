import { Construction } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { type Language, withLang } from "@/lib/i18n";

type BrandPageProgressProps = {
  brandName: string;
  lang: Language;
};

export function BrandPageProgress({ brandName, lang }: BrandPageProgressProps) {
  return (
    <>
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands", lang), label: lang === "en" ? "Brands" : "Brand" },
          { label: brandName }
        ]}
      />
      <section aria-labelledby="brand-progress-title" className="technical-grid bg-graphite-50 py-20 md:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl border border-graphite-200 bg-white p-8 text-center shadow-panel md:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center border border-signal-200 bg-signal-50 text-signal-600">
              <Construction className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              On progress
            </p>
            <h1 id="brand-progress-title" className="mt-3 text-balance text-3xl font-bold text-graphite-900 md:text-5xl">
              {lang === "en"
                ? `${brandName} page is being prepared.`
                : `Halaman ${brandName} sedang disiapkan.`}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-graphite-600">
              {lang === "en"
                ? "This page is not publicly available yet. Contact CSE if you need product information or a quotation."
                : "Halaman ini belum tersedia untuk publik. Hubungi CSE jika Anda membutuhkan informasi produk atau penawaran."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton href={withLang("/contact", lang)}>
                {lang === "en" ? "Contact CSE" : "Hubungi CSE"}
              </CTAButton>
              <CTAButton href={withLang("/brands", lang)} variant="ghost">
                {lang === "en" ? "Back to brands" : "Kembali ke brand"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
