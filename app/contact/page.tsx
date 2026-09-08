import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackedEmailLink } from "@/components/TrackedEmailLink";
import { WhatsAppInquiryForm } from "@/components/WhatsAppInquiryForm";
import { company } from "@/data/navigation";
import { staticLanguage, withLang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const title = lang === "en" ? "Contact CSE" : "Hubungi CSE";
  const description =
    lang === "en"
      ? "Contact CSE directly on WhatsApp for product requirements and technical consultation."
      : "Hubungi CSE langsung melalui WhatsApp untuk kebutuhan produk dan konsultasi teknis.";

  return buildPageMetadata({
    path: "/contact",
    title,
    description,
    lang
  });
}

export default function ContactPage() {
  const lang = staticLanguage();

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "Contact CSE" : "Hubungi CSE" }]} />
      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Pertanyaan Teknis & Kebutuhan Produk"
              title={lang === "en" ? "Discuss your product requirement directly with CSE." : "Diskusikan kebutuhan produk Anda langsung dengan CSE."}
              headingLevel="h1"
              description={
                lang === "en"
                  ? "WhatsApp is the fastest way to ask about a model, check technical fit, or start a sourcing discussion."
                  : "Kontak kami melalui WhatsApp untuk pertanyaan sederhana dan email untuk pertanyaan yang lebih kompleks. "
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
          <WhatsAppInquiryForm lang={lang} />
        </div>
      </section>
    </>
  );
}
