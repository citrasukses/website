import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { TohnichiPhotoCarousel } from "@/components/TohnichiPhotoCarousel";
import { tohnichiDurabilityPhotos, tohnichiFieldPhotos } from "@/data/tohnichi-field-photos";
import { text, withLang, type Language } from "@/lib/i18n";

type FieldPhoto = (typeof tohnichiFieldPhotos)[number];

function HomeTohnichiTrustSection({ lang }: { lang: Language }) {
  const en = lang === "en";

  return (
    <section id="field-support" aria-labelledby="tohnichi-durability-title field-support-title" className="scroll-mt-24 bg-white py-8 lg:py-10">
      <div className="container-page grid overflow-hidden border border-graphite-200 md:grid-cols-2">
        <div id="tohnichi-durability" className="min-w-0 scroll-mt-24 bg-paper-100 p-5 sm:p-6 lg:p-7">
          <div className="flex items-center justify-end">
            <Link href={withLang("/brands/tohnichi", lang)} className="focus-ring inline-flex min-h-8 shrink-0 items-center gap-1.5 text-xs font-semibold text-industrial-700">
              {en ? "Explore" : "Jelajahi"}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <h2 id="tohnichi-durability-title" className="cse-panel-title mb-5 mt-2 text-graphite-900">
            <span className="block">Torque tools that are</span>
            <span className="block">made to last.</span>
          </h2>
          <TohnichiPhotoCarousel id="durability-carousel" labelledBy="tohnichi-durability-title" photos={tohnichiDurabilityPhotos} lang={lang} />
        </div>

        <div className="min-w-0 border-t border-graphite-200 bg-paper-50 p-5 text-graphite-900 sm:p-6 md:border-l md:border-t-0 lg:p-7">
          <div className="flex items-center justify-end">
            <Link href={withLang("/brands/tohnichi#tohnichi-field", lang)} className="focus-ring inline-flex min-h-8 shrink-0 items-center gap-1.5 text-xs font-semibold text-industrial-700">
              {en ? "All activities" : "Semua kegiatan"}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <h2 id="field-support-title" className="cse-panel-title mb-5 mt-2">
            <span className="block">{en ? "Technical knowledge &" : "Pengetahuan teknis &"}</span>
            <span className="block">{en ? "hands-on experience." : "pengalaman di lapangan."}</span>
          </h2>
          <TohnichiPhotoCarousel id="field-carousel" labelledBy="field-support-title" photos={tohnichiFieldPhotos} lang={lang} />
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ photo, lang, featured = false, supporting = false }: { photo: FieldPhoto; lang: Language; featured?: boolean; supporting?: boolean }) {
  return (
    <figure className="cse-card min-w-0">
      <picture className={`relative block overflow-hidden bg-graphite-100 ${supporting ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[12/5]" : "aspect-[4/3]"}`}>
        <source
          srcSet={`/assets/company/seminars/tohnichi/${photo.slug}-640.webp 640w, /assets/company/seminars/tohnichi/${photo.slug}-1440.webp 1440w`}
          sizes={featured ? "(max-width: 1023px) calc(100vw - 48px), 720px" : "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 45vw, 480px"}
          type="image/webp"
        />
        <Image
          src={`/assets/company/seminars/tohnichi/${photo.slug}-1440.webp`}
          alt={text(photo.alt, lang)}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </picture>
      <figcaption className="px-5 py-4">
        <p className="text-sm font-bold text-graphite-900">{text(photo.title, lang)}</p>
        <p className="mt-1 text-sm leading-6 text-graphite-600">{text(photo.caption, lang)}</p>
      </figcaption>
    </figure>
  );
}

export function TohnichiFieldSection({ lang, variant = "home" }: { lang: Language; variant?: "home" | "brand" }) {
  if (variant === "home") return <HomeTohnichiTrustSection lang={lang} />;

  const en = lang === "en";
  const titleId = "tohnichi-field-title";

  return (
    <section id="tohnichi-field" aria-labelledby={titleId} className="cse-section scroll-mt-24 border-y border-graphite-200 bg-paper-100">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="cse-eyebrow text-signal-600">
              {en ? "CSE in the field · TOHNICHI" : "CSE di lapangan · TOHNICHI"}
            </p>
            <h2 id={titleId} className="cse-heading mt-4 text-graphite-900">
              {en ? "Sharing knowledge. Supporting teams on site." : "Berbagi pengetahuan. Mendukung tim di lapangan."}
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-graphite-600">
              {en
                ? "A closer look at TOHNICHI seminars and technical activities at customer sites, from hands-on tool demonstrations to calibration and measurement."
                : "Dokumentasi seminar dan kegiatan teknis TOHNICHI di lokasi pelanggan, mulai dari praktik penggunaan alat hingga kalibrasi dan pengukuran."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.35fr_1fr]">
          <PhotoCard photo={tohnichiFieldPhotos[0]} lang={lang} featured />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {tohnichiFieldPhotos.slice(1, 3).map((photo) => <PhotoCard key={photo.slug} photo={photo} lang={lang} supporting />)}
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {tohnichiFieldPhotos.slice(3).map((photo) => <PhotoCard key={photo.slug} photo={photo} lang={lang} />)}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-graphite-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-graphite-600">
            {en ? "Discuss your application, tool selection, or torque-control questions with CSE." : "Diskusikan aplikasi, pemilihan alat, atau kebutuhan torque control Anda bersama CSE."}
          </p>
          <CTAButton href={withLang("/contact?brand=tohnichi", lang)} className="shrink-0 self-start sm:self-auto">
            {en ? "Discuss your torque-control needs" : "Diskusikan kebutuhan torque control"}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
