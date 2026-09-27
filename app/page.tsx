import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Handshake,
  PackageCheck,
  Search,
  Wrench
} from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { AuthorizedDistributorStrip } from "@/components/AuthorizedDistributorStrip";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeaturedCustomerStrip } from "@/components/FeaturedCustomerStrip";
import { HomeBackgroundItems } from "@/components/HomeBackgroundItems";
import { TohnichiTighteningSection } from "@/components/TohnichiTighteningSection";
import { WhatsAppInquiryForm } from "@/components/WhatsAppInquiryForm";
import { SectionHeader } from "@/components/SectionHeader";
import { categoryHubs } from "@/data/category-hubs";
import { stats } from "@/data/customers";
import { homeBackgroundImage, homeBackgroundItems } from "@/data/home-background";
import { company } from "@/data/navigation";
import { staticLanguage, text, withLang } from "@/lib/i18n";
import {
  absoluteLanguageAlternates,
  absoluteLocalizedUrl,
  absoluteUrl,
  ORGANIZATION_ID,
  siteConfig
} from "@/lib/seo-config";

const homepageMetadata = {
  id: {
    title: "Distributor Resmi & Solusi Pengadaan Industri | CSE",
    description:
      "Distributor resmi TOHNICHI, NAC, FUJISTAR, dan NIPPON UNIT serta supplier peralatan dan kebutuhan industri untuk manufaktur di Indonesia."
  },
  en: {
    title: "Industrial Goods Supplier Indonesia | CSE",
    description:
      "CSE helps procurement and engineering teams source industrial products from Japan and Asia, verify technical fit, compare alternatives, and streamline RFQs."
  }
} as const;

type HomepageProductCard = {
  key: string;
  href: string;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  brand?: {
    name: string;
    slug: string;
    src?: string;
  };
  imageBackground?: string;
};

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const { title, description } = homepageMetadata[lang];
  const canonical = absoluteLocalizedUrl("/", lang);

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical,
      languages: absoluteLanguageAlternates("/")
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.legalName,
      images: [
        {
          url: absoluteUrl("/assets/company/og-authorized-distributor.png"),
          width: 1200,
          height: 630,
          alt: "CSE authorized distributor for TOHNICHI, NAC, Fujistar, and Nippon Unit"
        }
      ],
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/assets/company/og-authorized-distributor.png")]
    }
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: company.publicName,
  alternateName: [company.shortName, company.longName],
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/assets/company/cse_logo.png"),
    contentUrl: absoluteUrl("/assets/company/cse_logo.png"),
    width: 396,
    height: 160
  },
  email: `mailto:${company.email}`
};

export default function HomePage() {
  const lang = staticLanguage();
  const localizedOrganizationJsonLd = {
    ...organizationJsonLd,
    description: text(company.positioning, lang)
  };
  const serviceItems = lang === "en"
    ? [
        {
          icon: PackageCheck,
          title: "Industrial Procurement",
          body: "One reliable source for brand sourcing, model requests, and overseas industrial goods."
        },
        {
          icon: Wrench,
          title: "Technical Consultation",
          body: "Support for selecting tools by application, torque range, production process, and quality need."
        },
        {
          icon: Handshake,
          title: "Brand Representation",
          body: "A lean distribution path for overseas principals entering Indonesian industrial sectors."
        }
      ]
    : [
        {
          icon: PackageCheck,
          title: "Pengadaan Barang",
          body: "Satu sumber yang jelas untuk sourcing brand, permintaan model, dan produk industrial luar negeri."
        },
        {
          icon: Wrench,
          title: "Konsultasi Teknis",
          body: "Dukungan pemilihan tools berdasarkan aplikasi, range torsi, proses produksi, dan kebutuhan quality."
        },
        {
          icon: Handshake,
          title: "Representasi Brand",
          body: "Jalur distribusi ramping untuk principal luar negeri yang masuk ke sektor industrial Indonesia."
        }
      ];

  const processItems = lang === "en"
    ? [
        {
          icon: Wrench,
          title: "Check technical fit",
          body: "Review model, specification, application, and production context before sourcing."
        },
        {
          icon: PackageCheck,
          title: "Provide alternatives",
          body: "Offer practical substitute options when brand, model, lead time, or budget needs flexibility."
        },
        {
          icon: ClipboardCheck,
          title: "Speed up RFQ",
          body: "Prepare a clearer request path so procurement can follow up with less back-and-forth."
        }
      ]
    : [
        {
          icon: Wrench,
          title: "Memeriksa kecocokan teknis",
          body: "Review model, spesifikasi, aplikasi, dan konteks produksi sebelum sourcing."
        },
        {
          icon: PackageCheck,
          title: "Menyediakan alternatif",
          body: "Memberi opsi pengganti saat brand, model, lead time, atau budget perlu fleksibilitas."
        },
        {
          icon: ClipboardCheck,
          title: "Mempercepat proses RFQ",
          body: "Membuat jalur request lebih jelas agar procurement bisa follow up lebih cepat."
        }
      ];

  const categoryNames = {
    "torque-wrench": lang === "en" ? "Torque wrenches" : "Kunci torsi TOHNICHI",
    "torque-screwdriver": lang === "en" ? "Torque screwdrivers" : "Obeng torsi TOHNICHI",
    "torque-tester": lang === "en" ? "Torque testers" : "Torque tester TOHNICHI"
  } as const;

  const homepageProductCards: HomepageProductCard[] = [
    ...categoryHubs.map((category) => ({
      key: category.slug,
      href: `/${category.slug}`,
      eyebrow: category.slug,
      title: categoryNames[category.slug],
      image: category.image,
      imageAlt: text(category.imageAlt, lang),
      brand: {
        name: "TOHNICHI",
        slug: "tohnichi",
        src: "/assets/brands/logos/tohnichi--card-highres.png"
      }
    })),
    {
      key: "nac-sockets",
      href: "/brands/nac/products/square-drive-sockets",
      eyebrow: "nac-sockets",
      title: lang === "en" ? "NAC sockets" : "Socket NAC",
      image: "/assets/brands/products/nac/NAC socket.jpg",
      imageAlt: lang === "en" ? "NAC industrial impact sockets" : "Impact socket industrial NAC",
      brand: {
        name: "NAC",
        slug: "nac"
      }
    },
    {
      key: "sankyo-abrasives",
      href: "/brands/fuji-star#abrasive-product-formats",
      eyebrow: "sankyo-abrasives",
      title: lang === "en" ? "SANKYO abrasives" : "Abrasive SANKYO",
      image: "/assets/brands/products/fuji-star/Fujistar - Abrasive-white.png",
      imageAlt: lang === "en" ? "SANKYO Rikagaku FUJISTAR abrasive discs" : "Abrasive disc SANKYO Rikagaku FUJISTAR",
      brand: {
        name: "Sankyo Rikagaku FUJISTAR",
        slug: "fuji-star"
      },
      imageBackground: "#ffffff"
    }
  ];

  const homepageFaqs = lang === "en"
    ? [
        {
          question: "What information should I include in an RFQ?",
          answer: "Share the brand, model, quantity, target specification, application, and required delivery date. A photo, drawing, or current part number can help CSE review the request faster."
        },
        {
          question: "Can CSE help when the exact model is unknown?",
          answer: "Yes. CSE can narrow the options from the application, torque range, fastener, working access, process, and quality requirements."
        },
        {
          question: "Which brands does CSE officially represent?",
          answer: "CSE is an authorized distributor for selected industrial brands including TOHNICHI, NAC, Sankyo Rikagaku / FUJISTAR, Nippon Unit, and FUJI-DENSHI. Other brands may be supplied through general trading and are identified separately."
        },
        {
          question: "Can CSE suggest an alternative brand or model?",
          answer: "Yes. Alternatives are reviewed against the technical requirement, availability, lead time, and budget rather than treated as direct substitutes by name alone."
        },
        {
          question: "Does CSE support calibration and after-sales needs?",
          answer: "Support depends on the product and brand. For TOHNICHI requirements, CSE can help review tool selection, verification, calibration, repair, and related process needs."
        }
      ]
    : [
        {
          question: "Informasi apa yang perlu dicantumkan dalam RFQ?",
          answer: "Kirim brand, model, kuantitas, target spesifikasi, aplikasi, dan kebutuhan waktu pengiriman. Foto, drawing, atau part number saat ini dapat membantu CSE meninjau request lebih cepat."
        },
        {
          question: "Apakah CSE dapat membantu jika model pastinya belum diketahui?",
          answer: "Ya. CSE dapat mempersempit opsi berdasarkan aplikasi, range torsi, fastener, ruang kerja, proses, dan kebutuhan quality."
        },
        {
          question: "Brand apa saja yang diwakili secara resmi oleh CSE?",
          answer: "CSE merupakan distributor resmi untuk barang-barang industri termasuk TOHNICHI, NAC, Sankyo Rikagaku / FUJISTAR, Nippon Unit, dan FUJI-DENSHI. Brand lain dapat disuplai melalui general trading dan ditandai secara terpisah."
        },
        {
          question: "Apakah CSE dapat menyarankan alternatif brand atau model?",
          answer: "Ya. Alternatif ditinjau berdasarkan kebutuhan teknis, ketersediaan, lead time, dan budget—bukan dianggap sebagai pengganti langsung hanya berdasarkan nama produk."
        },
        {
          question: "Apakah CSE mendukung kalibrasi dan kebutuhan after-sales?",
          answer: "Dukungan bergantung pada produk dan brand. Untuk kebutuhan TOHNICHI, CSE dapat membantu review pemilihan tool, verifikasi, kalibrasi, repair, dan kebutuhan proses terkait."
        }
      ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localizedOrganizationJsonLd).replace(/</g, "\\u003c")
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c")
        }}
      />
      <section className="technical-grid relative isolate overflow-hidden bg-white">
        <HomeBackgroundItems items={homeBackgroundItems} singleImage={homeBackgroundImage} />

        <div className="container-page relative z-10 py-14 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="font-bold leading-tight tracking-normal text-graphite-900">
              {lang === "en" ? (
                <>
                  <span className="block text-3xl sm:text-5xl">Industrial Tools, Spare Parts</span>
                  <span className="mt-1 block text-3xl sm:text-5xl">&amp; Consumables</span>
                  <span className="mt-3 block text-lg font-semibold text-graphite-600 sm:text-2xl">
                    for manufacturers in Indonesia
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-3xl sm:text-5xl">Supplier Tools, Spare Parts</span>
                  <span className="mt-1 block text-3xl sm:text-5xl">&amp; Consumables Industri</span>
                  <span className="mt-1 block text-3xl sm:text-5xl">di Indonesia</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-graphite-600 md:text-lg md:leading-8">
              {lang === "en"
                ? "CSE helps procurement and engineering teams source industrial products from Japan and Asia, verify technical fit, compare alternatives, and move RFQs forward."
                : "CSE membantu tim procurement dan engineering mencari produk industri dari Jepang dan Asia, memastikan kecocokan spesifikasi, membandingkan alternatif, dan mempercepat proses RFQ."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={withLang("/contact", lang)}>
                <span className="inline-flex items-center gap-2">
                  {lang === "en" ? "Send RFQ" : "Kirim RFQ"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </CTAButton>
              <CTAButton href={withLang("/brands", lang)} variant="ghost">
                {lang === "en" ? "Find a brand or product" : "Cari brand atau produk"}
              </CTAButton>
            </div>

            <div className="mt-9 grid max-w-3xl grid-cols-3 gap-px overflow-hidden border border-graphite-200 bg-graphite-200 shadow-sm">
              {stats.map((stat) => (
                <div
                  key={stat.value.en}
                  className={`min-w-0 px-3 py-4 sm:px-5 sm:py-5 ${stat.emphasis === "authorized" ? "bg-industrial-800" : "bg-white/95"}`}
                >
                  <p className={`font-bold leading-tight ${stat.emphasis === "authorized" ? "text-sm text-white sm:text-lg" : "text-2xl text-graphite-900 sm:text-3xl"}`}>
                    {text(stat.value, lang)}
                  </p>
                  <p className={`mt-2 text-[9px] font-bold uppercase leading-4 tracking-[0.1em] sm:text-[10px] ${stat.emphasis === "authorized" ? "text-white/70" : "text-graphite-500"}`}>
                    {text(stat.label, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AuthorizedDistributorStrip lang={lang} />

      <section className="bg-graphite-50 py-12 lg:py-14" aria-labelledby="product-finder-title">
        <div className="container-page">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                {lang === "en" ? "Find the right product" : "Temukan produk yang tepat"}
              </p>
              <h2 id="product-finder-title" className="mt-3 text-balance text-3xl font-bold text-graphite-900 md:text-4xl">
                {lang === "en" ? "Start with a brand, model, or application." : "Mulai dari brand, model, atau aplikasi."}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-graphite-600">
                {lang === "en"
                  ? "Search the supply catalog or jump directly to a torque-tool category."
                  : "Cari di katalog supply atau langsung pilih kategori torque tool."}
              </p>
            </div>
            <form action={withLang("/brands", lang)} className="border border-graphite-200 bg-white p-4 shadow-sm" role="search">
              <label htmlFor="homepage-product-search" className="sr-only">
                {lang === "en" ? "Search brand, product, or application" : "Cari brand, produk, atau aplikasi"}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-400" aria-hidden="true" />
                  <input
                    id="homepage-product-search"
                    name="q"
                    type="search"
                    placeholder={lang === "en" ? "e.g. torque wrench, NAC, socket…" : "contoh: torque wrench, NAC, socket…"}
                    className="focus-ring h-12 w-full border border-graphite-300 bg-white pl-12 pr-4 text-sm font-semibold text-graphite-900 placeholder:text-graphite-400"
                  />
                </div>
                <button type="submit" className="focus-ring inline-flex h-12 items-center justify-center gap-2 bg-industrial-700 px-6 text-sm font-bold text-white transition hover:bg-industrial-800">
                  {lang === "en" ? "Search catalog" : "Cari katalog"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-px overflow-hidden border border-graphite-200 bg-graphite-200">
            {homepageProductCards.map((card) => (
              <Link key={card.key} href={withLang(card.href, lang)} className="focus-ring group grid bg-white transition hover:bg-industrial-50">
                <div className="relative h-40">
                  <AssetSlot
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full border-0 border-b border-graphite-200"
                    imageClassName="p-3 group-hover:scale-[1.04]"
                    backgroundColor={card.imageBackground}
                    fit="contain"
                    sizes="(max-width: 767px) 112px, 20vw"
                  />
                </div>
                <div className="relative min-w-0 p-5 pr-14">
                  <div className="min-w-0">
                    {card.brand ? (
                      <BrandLogo
                        name={card.brand.name}
                        slug={card.brand.slug}
                        src={card.brand.src}
                        frame={false}
                        className="mb-5 h-16 w-full max-w-full"
                        imageClassName={card.brand.slug === "nac" ? "text-[29px]" : "p-0"}
                        sizes="224px"
                      />
                    ) : null}
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-signal-600">{card.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-bold text-graphite-900">{card.title}</h3>
                  </div>
                  <ArrowRight className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-industrial-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <SectionHeader
            eyebrow={lang === "en" ? "Why CSE" : "Mengapa CSE"}
            title={lang === "en" ? "Build reliable supply chains." : "Bersama kami membangun rantai pasok yang handal."}
            description={
              lang === "en"
                ? "Purchasing needs a reliable supply path. Engineering needs technical fit, process control, and verification. CSE works across both perspectives."
                : "Purchasing membutuhkan jalur supply yang andal. Engineering membutuhkan kecocokan teknis, kontrol proses, dan verifikasi. CSE bekerja dari kedua perspektif tersebut."
            }
          />
          <div className="grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-white p-5 lg:p-6">
                  <Icon className="h-6 w-6 text-industrial-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-graphite-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite-500">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <TohnichiTighteningSection lang={lang} />

      <FeaturedCustomerStrip lang={lang} />

      <section className="technical-grid border-y border-graphite-200 bg-graphite-50 py-12 lg:py-14" aria-labelledby="sourcing-process-title">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
                {lang === "en" ? "How sourcing works" : "Cara kerja sourcing"}
              </p>
              <h2 id="sourcing-process-title" className="mt-3 text-3xl font-bold text-graphite-900 md:text-4xl">
                {lang === "en" ? "From request to a clearer shortlist." : "Dari request ke shortlist yang lebih jelas."}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-graphite-600">
              {lang === "en"
                ? "CSE reviews the technical context before price and lead-time follow-up."
                : "CSE meninjau konteks teknis sebelum follow-up harga dan lead time."}
            </p>
          </div>
          <ol className="mt-8 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 md:grid-cols-3">
            {processItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="bg-white p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-graphite-200 bg-graphite-50 text-industrial-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.18em] text-signal-500">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-graphite-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite-600">{item.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-14" aria-labelledby="homepage-faq-title">
        <div className="container-page grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">FAQ</p>
            <h2 id="homepage-faq-title" className="mt-3 text-3xl font-bold text-graphite-900 md:text-4xl">
              {lang === "en" ? "Before you send an RFQ." : "Sebelum Anda mengirim RFQ."}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-graphite-600">
              {lang === "en"
                ? "Quick answers about technical review, brand status, alternatives, and support."
                : "Jawaban singkat tentang review teknis, status brand, alternatif, dan dukungan."}
            </p>
          </div>
          <FAQAccordion items={homepageFaqs} />
        </div>
      </section>

      <section className="bg-graphite-900 py-12 text-white lg:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {lang === "en" ? "Messy requests welcome" : "Inquiry belum rapi? Tidak masalah"}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {lang === "en"
                ? "You do not need a perfect specification to start."
                : "Tidak perlu spesifikasi lengkap untuk mulai bertanya."}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              {lang === "en"
                ? "Send a photo, nameplate, drawing, or other technical document. CSE helps find an effective solution for any requirement."
                : "Kirim foto lama, nameplate, drawing, atau dokumen teknis lainnya. CSE bantu mencari solusi yang efektif untuk setiap kebutuhan."}
            </p>
          </div>
          <WhatsAppInquiryForm lang={lang} />
        </div>
      </section>
    </>
  );
}
