import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { PartnerInquiryForm } from "@/components/InquiryForms";
import { SectionHeader } from "@/components/SectionHeader";
import { brands } from "@/data/brands";
import { company } from "@/data/navigation";
import { staticLanguage, text, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "For Partners",
  description: "For overseas industrial brands interested in Indonesian distribution with CSE."
};

export default function PartnersPage() {
  const lang = staticLanguage();

  const points = lang === "en"
    ? [
        "Access to industrial buyers in Indonesia's automotive and manufacturing sectors",
        "Practical distribution model for technical products",
        "Support for inquiries, model selection, and customer communication",
        "Brand communication and product localization for Indonesian buyers",
        "Lean go-to-market approach for overseas principals"
      ]
    : [
        "Akses ke buyer industrial di sektor otomotif dan manufaktur Indonesia",
        "Model distribusi praktis untuk produk teknis",
        "Dukungan inquiry, pemilihan model, dan komunikasi customer",
        "Komunikasi brand dan lokalisasi produk untuk buyer Indonesia",
        "Pendekatan go-to-market yang ramping untuk principal luar negeri"
      ];

  return (
    <>
      <Breadcrumb homeHref={withLang("/", lang)} items={[{ label: lang === "en" ? "For Partners" : "Untuk Partner" }]} />
      <Hero
        eyebrow={lang === "en" ? "For overseas principals" : "Untuk principal luar negeri"}
        title={lang === "en" ? "Enter Indonesia with a focused industrial distribution partner." : "Masuk ke Indonesia bersama partner distribusi industrial yang fokus."}
        description={text(company.partnerPositioning, lang)}
        primaryHref="#partner-inquiry"
        primaryLabel={lang === "en" ? "Start partnership inquiry" : "Mulai inquiry partnership"}
        secondaryHref={withLang("/brands", lang)}
        secondaryLabel={lang === "en" ? "Brands represented" : "Brand yang diwakili"}
        image="/assets/industries/heavy_equipment.png"
        imageLabel="Industrial distribution partner"
        highlights={[
          lang === "en" ? "Indonesia market access" : "Akses pasar Indonesia",
          lang === "en" ? "Technical product distribution" : "Distribusi produk teknis",
          lang === "en" ? "Lean partner model" : "Model partner ramping"
        ]}
      />
      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow={lang === "en" ? "Distribution fit" : "Kesesuaian distribusi"}
            title={lang === "en" ? "Designed for technical products that need real buyer access." : "Dirancang untuk produk teknis yang membutuhkan akses buyer nyata."}
            description={
              lang === "en"
                ? "CSE is positioned for overseas industrial manufacturers that need practical market entry, not a broad consumer-style channel."
                : "CSE diposisikan untuk manufacturer industrial luar negeri yang membutuhkan market entry praktis, bukan channel consumer yang luas."
            }
          />
          <FeatureGrid items={points} />
        </div>
      </section>
      <section className="bg-graphite-50 py-16">
        <div className="container-page">
          <SectionHeader
            eyebrow={lang === "en" ? "Represented brands" : "Brand yang diwakili"}
            title={lang === "en" ? "A focused portfolio for technical industrial categories." : "Portofolio fokus untuk kategori industrial teknis."}
            description={brands.map((brand) => brand.name).join(" / ")}
          />
        </div>
      </section>
      <section id="partner-inquiry" className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow={lang === "en" ? "Partner inquiry" : "Inquiry partner"}
            title={lang === "en" ? "Tell CSE about your product category and Indonesia goals." : "Ceritakan kategori produk dan target Indonesia Anda."}
            description={
              lang === "en"
                ? "This form is separate from buyer RFQs so overseas principals can send the right context."
                : "Form ini dipisahkan dari RFQ buyer agar principal luar negeri dapat mengirim konteks yang tepat."
            }
          />
          <PartnerInquiryForm lang={lang} />
        </div>
      </section>
    </>
  );
}
