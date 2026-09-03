import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RFQForm } from "@/components/InquiryForms";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackedEmailLink } from "@/components/TrackedEmailLink";
import { company } from "@/data/navigation";
import { getCatalogBrands } from "@/lib/catalog";
import { staticLanguage, withLang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const title = lang === "en" ? "Contact / RFQ" : "Kontak / RFQ";
  const description =
    lang === "en"
      ? "Send an RFQ, product consultation request, or email inquiry to CSE."
      : "Kirim RFQ, permintaan konsultasi produk, atau inquiry melalui email kepada CSE.";

  return buildPageMetadata({
    path: "/contact",
    title,
    description,
    lang
  });
}

export default async function ContactPage() {
  const lang = staticLanguage();
  const brands = await getCatalogBrands();

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Contact / RFQ" : "Kontak / RFQ" }]} />
      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="RFQ"
              title={lang === "en" ? "Send a product inquiry or consultation request." : "Kirim inquiry produk atau permintaan konsultasi."}
              headingLevel="h1"
              description={
                lang === "en"
                  ? "Share the brand, product model, quantity, and application details so CSE can respond with the right context."
                  : "Bagikan brand, model produk, kuantitas, dan detail aplikasi agar CSE dapat merespons dengan konteks yang tepat."
              }
            />
            <div className="mt-8 border border-graphite-200 bg-graphite-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">Email</p>
              <TrackedEmailLink
                href={`mailto:${company.email}`}
                lang={lang}
                context="contact-page"
                className="mt-3 inline-flex items-center gap-2 text-base font-bold text-industrial-700"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {company.email}
              </TrackedEmailLink>
              <p className="mt-4 text-sm leading-6 text-graphite-500">
                {lang === "en"
                  ? "For faster review, include the brand, model, quantity, and application context."
                  : "Agar lebih cepat ditinjau, sertakan brand, model, kuantitas, dan konteks aplikasi."}
              </p>
            </div>
          </div>
          <RFQForm
            lang={lang}
            brands={brands.map(({ slug, name }) => ({ slug, name }))}
          />
        </div>
      </section>
    </>
  );
}
