import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleGauge,
  MousePointerClick,
  RefreshCw,
  RotateCw,
  Settings2,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { staticLanguage, withLang } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();

  return buildPageMetadata({
    path: "/tohnichi-torsi-tepat",
    title: lang === "en" ? "Consistent Tightening with TOHNICHI QL & RTD" : "Pengencangan Konsisten dengan TOHNICHI QL & RTD",
    description:
      lang === "en"
        ? "Move beyond tightening by feel. Discover TOHNICHI QL torque wrenches and RTD torque screwdrivers for consistent production work."
        : "Jangan hanya mengandalkan feeling saat mengencangkan baut dan sekrup. Kenali TOHNICHI QL dan RTD untuk hasil produksi yang konsisten.",
    lang,
    image: "/assets/brands/products/tohnichi/QL100N4.jpg",
    imageAlt: "TOHNICHI QL adjustable torque wrench"
  });
}

export default function TohnichiTorsiTepatPage() {
  const lang = staticLanguage();
  const contactHref = withLang("/contact?brand=tohnichi&product=QL%20%2F%20RTD", lang);

  return (
    <>
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#f3f1ec]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(24,61,97,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(24,61,97,0.055)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-industrial-700 lg:block" />

      <div className="container-page grid min-h-[calc(100svh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-3 border border-graphite-200 bg-white/80 px-3 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 bg-signal-500" />
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-graphite-700">
              TOHNICHI Torque Control · QL + RTD
            </span>
          </div>

          <h1 className="mt-7 text-balance text-[clamp(3rem,7vw,5.6rem)] font-black leading-[0.92] tracking-[-0.055em] text-graphite-900">
            {lang === "en" ? (
              <>Tight is not always <span className="text-signal-500">right.</span></>
            ) : (
              <>Baut kencang belum tentu <span className="text-signal-500">tepat.</span></>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-graphite-700 md:text-xl">
            {lang === "en"
              ? "Still tightening by feel? Use TOHNICHI to make every tightening cycle more consistent."
              : "Masih mengandalkan feeling? Gunakan TOHNICHI agar setiap proses pengencangan lebih konsisten."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={contactHref}
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-signal-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-signal-600"
            >
              {lang === "en" ? "Discuss your application" : "Konsultasikan aplikasi Anda"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#pilih-tool"
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 border border-graphite-500 bg-white/70 px-6 py-4 text-sm font-bold text-graphite-800 transition hover:border-industrial-600 hover:bg-white"
            >
              {lang === "en" ? "Find the right tool" : "Pilih tool yang tepat"}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-graphite-700">
            {[
              lang === "en" ? "Clear torque target" : "Target torsi jelas",
              lang === "en" ? "Repeatable operation" : "Proses berulang",
              lang === "en" ? "Local technical support" : "Dukungan teknis lokal"
            ].map((label) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center bg-industrial-700 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 py-5 lg:-mx-5 lg:py-8">
          <div className="h-[19rem] overflow-hidden border border-graphite-200 bg-white shadow-panel lg:mr-6">
            <div className="flex items-center justify-between border-b border-graphite-200 px-4 py-3">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-graphite-500">01 · Bolt tightening</span>
              <span className="inline-flex items-center gap-2 bg-[#eef4f8] px-2 py-1 text-xs font-bold text-industrial-800">
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> CLICK
              </span>
            </div>
            <div className="relative h-[calc(100%-2.75rem)] overflow-hidden">
              <div className="absolute left-4 top-4 z-10">
                <p className="text-3xl font-black tracking-[-0.04em] text-graphite-900">QL</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">Torque wrench</p>
              </div>
              <Image
                src="/assets/brands/products/tohnichi/QL5N+.png"
                alt="TOHNICHI QL adjustable torque wrench"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="rotate-[-7deg] object-contain p-8 pt-20"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 border border-signal-500 bg-white px-3 py-2 text-xs font-bold text-signal-600">
                <span className="h-2 w-2 rounded-full bg-signal-500" />
                SET TORQUE REACHED
              </div>
            </div>
          </div>

          <div className="h-[21rem] overflow-hidden border border-graphite-800 bg-graphite-900 shadow-[0_24px_55px_rgba(21,26,34,0.28)] lg:ml-6">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 text-white">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-graphite-200">02 · Screw tightening</span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-2 py-1 text-xs font-bold">
                <RotateCw className="h-3.5 w-3.5 text-signal-500" aria-hidden="true" /> ROTARY SLIP
              </span>
            </div>
            <div className="relative h-[calc(100%-2.75rem)] overflow-hidden">
              <div className="absolute left-4 top-4 z-10 text-white">
                <p className="text-3xl font-black tracking-[-0.04em]">RTD</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-200">Torque screwdriver</p>
              </div>
              <div className="absolute inset-x-8 bottom-4 top-20 bg-white" />
              <Image
                src="/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd.png"
                alt="TOHNICHI RTD rotary-slip torque screwdriver"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="object-contain p-10 pt-24"
              />
              <div className="absolute bottom-4 left-4 border border-white/20 bg-graphite-900 px-3 py-2 text-xs font-bold text-white">
                {lang === "en" ? "HELPS LIMIT OVER-TORQUE" : "MEMBANTU MEMBATASI OVER-TORQUE"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-600">
            {lang === "en" ? "Consistency is visible" : "Konsistensi itu terlihat"}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-graphite-900 md:text-6xl">
            {lang === "en" ? "The issue is not strength. It is variation." : "Masalahnya bukan tenaga. Tapi variasi."}
          </h2>
        </div>

        <div className="mt-12 grid overflow-hidden border border-graphite-200 lg:grid-cols-2">
          <div className="bg-graphite-50 p-6 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">
                  {lang === "en" ? "Tightening by feel" : "Mengandalkan feeling"}
                </p>
                <p className="mt-2 text-2xl font-black text-graphite-900">{lang === "en" ? "Results vary" : "Hasil bervariasi"}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center border border-graphite-200 bg-white text-graphite-500">
                <Wrench className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="relative mt-9 h-56 border-b border-l border-graphite-200" aria-label={lang === "en" ? "Illustration of inconsistent tightening results" : "Ilustrasi hasil pengencangan yang tidak konsisten"}>
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-signal-500" />
              <span className="absolute right-0 top-[calc(50%-1.8rem)] bg-graphite-50 px-2 text-[0.65rem] font-bold uppercase tracking-wider text-signal-600">Target</span>
              {[12, 28, 44, 60, 76, 92].map((left) => (
                <span key={`guide-${left}`} className="absolute bottom-0 top-0 w-px bg-graphite-200/55" style={{ left: `${left}%` }} aria-hidden="true" />
              ))}
              {[24, 68, 37, 78, 30, 64].map((top, index) => (
                <span
                  key={index}
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-signal-500 shadow-[0_0_0_5px_rgba(191,47,47,0.12)]"
                  style={{ left: `${[12, 28, 44, 60, 76, 92][index]}%`, top: `${top}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[0.65rem] font-bold uppercase tracking-[0.16em] text-graphite-500">
              <span>{lang === "en" ? "Cycle 01" : "Siklus 01"}</span>
              <span>{lang === "en" ? "Cycle 06" : "Siklus 06"}</span>
            </div>
          </div>

          <div className="bg-industrial-700 p-6 text-white md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">TOHNICHI Torque Control</p>
                <p className="mt-2 text-2xl font-black">{lang === "en" ? "A repeatable target" : "Target yang berulang"}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 text-white">
                <CircleGauge className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="relative mt-9 h-56 border-b border-l border-white/25" aria-label={lang === "en" ? "Illustration of consistent tightening results" : "Ilustrasi hasil pengencangan yang konsisten"}>
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/75" />
              <span className="absolute right-0 top-[calc(50%-1.8rem)] bg-industrial-700 px-2 text-[0.65rem] font-bold uppercase tracking-wider text-white">Target</span>
              {[12, 28, 44, 60, 76, 92].map((left) => (
                <span key={`guide-${left}`} className="absolute bottom-0 top-0 w-px bg-white/10" style={{ left: `${left}%` }} aria-hidden="true" />
              ))}
              {[47, 52, 49, 51, 48, 53].map((top, index) => (
                <span
                  key={index}
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-signal-500 shadow-[0_0_0_5px_rgba(255,255,255,0.14)]"
                  style={{ left: `${[12, 28, 44, 60, 76, 92][index]}%`, top: `${top}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/65">
              <span>{lang === "en" ? "Cycle 01" : "Siklus 01"}</span>
              <span>{lang === "en" ? "Cycle 06" : "Siklus 06"}</span>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-graphite-500">
          {lang === "en"
            ? "Concept illustration: the tool gives the operator a clear mechanical signal when the preset torque is reached."
            : "Ilustrasi konsep: tool memberikan sinyal mekanis yang jelas saat torsi yang disetel tercapai."}
        </p>
      </div>
    </section>

    <section id="pilih-tool" className="scroll-mt-24 bg-graphite-900 py-20 text-white md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-500">
              {lang === "en" ? "Two jobs. Two proven mechanisms." : "Dua pekerjaan. Dua mekanisme teruji."}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
              {lang === "en" ? "What are you tightening?" : "Apa yang Anda kencangkan?"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-graphite-200">
            {lang === "en"
              ? "Start with the fastener and application. CSE can help confirm the torque range and model."
              : "Mulai dari fastener dan aplikasinya. CSE membantu memastikan torque range dan model yang sesuai."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="group overflow-hidden border border-white/15 bg-white text-graphite-900">
            <div className="grid min-h-[25rem] md:grid-cols-[0.72fr_1.28fr]">
              <div className="flex flex-col justify-between border-b border-graphite-200 bg-[#f3f1ec] p-6 md:border-b-0 md:border-r">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">01 · Bolt / Nut</p>
                  <h3 className="mt-4 text-6xl font-black tracking-[-0.06em]">QL</h3>
                  <p className="mt-1 font-bold text-graphite-500">Adjustable torque wrench</p>
                </div>
                <div className="mt-8 space-y-3 text-sm font-bold">
                  <span className="flex items-center gap-3"><Settings2 className="h-5 w-5 text-industrial-700" aria-hidden="true" /> {lang === "en" ? "Set target torque" : "Atur target torsi"}</span>
                  <span className="flex items-center gap-3"><MousePointerClick className="h-5 w-5 text-signal-600" aria-hidden="true" /> {lang === "en" ? "Stop at the click" : "Berhenti saat klik"}</span>
                </div>
              </div>
              <div className="relative min-h-80 bg-white">
                <Image
                  src="/assets/brands/products/tohnichi/QL100N4.jpg"
                  alt="TOHNICHI QL adjustable torque wrench"
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="rotate-[-10deg] object-contain p-7"
                />
                <span className="absolute right-5 top-5 bg-industrial-700 px-3 py-2 text-xs font-black tracking-[0.16em] text-white">CLICK!</span>
              </div>
            </div>
            <div className="grid border-t border-graphite-200 sm:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-3 divide-x divide-graphite-200">
                {[lang === "en" ? "Set" : "Atur", lang === "en" ? "Tighten" : "Kencangkan", "Click"].map((step, index) => (
                  <div key={step} className="p-4 text-center">
                    <span className="block text-[0.65rem] font-bold text-signal-600">0{index + 1}</span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wider">{step}</span>
                  </div>
                ))}
              </div>
              <Link href={withLang("/brands/tohnichi/products/ql-qle2", lang)} className="focus-ring inline-flex items-center justify-center gap-2 bg-graphite-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-industrial-700">
                {lang === "en" ? "View QL" : "Lihat QL"}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          <article className="group overflow-hidden border border-white/15 bg-industrial-700 text-white">
            <div className="grid min-h-[25rem] md:grid-cols-[0.72fr_1.28fr]">
              <div className="flex flex-col justify-between border-b border-white/15 p-6 md:border-b-0 md:border-r">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-500">02 · Screw</p>
                  <h3 className="mt-4 text-6xl font-black tracking-[-0.06em]">RTD</h3>
                  <p className="mt-1 font-bold text-white/65">Rotary-slip torque screwdriver</p>
                </div>
                <div className="mt-8 space-y-3 text-sm font-bold">
                  <span className="flex items-center gap-3"><Settings2 className="h-5 w-5 text-white" aria-hidden="true" /> {lang === "en" ? "Set target torque" : "Atur target torsi"}</span>
                  <span className="flex items-center gap-3"><RotateCw className="h-5 w-5 text-signal-500" aria-hidden="true" /> {lang === "en" ? "Slip at the target" : "Slip saat target tercapai"}</span>
                </div>
              </div>
              <div className="relative min-h-80 bg-white">
                <Image
                  src="/assets/brands/products/tohnichi/RTD120CN.jpg"
                  alt="TOHNICHI RTD rotary-slip torque screwdriver"
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="object-contain p-8"
                />
                <span className="absolute right-5 top-5 bg-signal-500 px-3 py-2 text-xs font-black tracking-[0.16em] text-white">SLIP</span>
              </div>
            </div>
            <div className="grid border-t border-white/15 sm:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-3 divide-x divide-white/15">
                {[lang === "en" ? "Set" : "Atur", lang === "en" ? "Tighten" : "Kencangkan", "Slip"].map((step, index) => (
                  <div key={step} className="p-4 text-center">
                    <span className="block text-[0.65rem] font-bold text-signal-500">0{index + 1}</span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wider">{step}</span>
                  </div>
                ))}
              </div>
              <Link href={withLang("/brands/tohnichi/products/rtd", lang)} className="focus-ring inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-bold text-industrial-800 transition hover:bg-graphite-100">
                {lang === "en" ? "View RTD" : "Lihat RTD"}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="bg-[#f3f1ec] py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-600">
              {lang === "en" ? "From tool to process" : "Dari tool ke proses"}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-graphite-900 md:text-6xl">
              {lang === "en" ? "Make consistency easier to repeat." : "Buat konsistensi lebih mudah diulang."}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-graphite-500">
              {lang === "en"
                ? "A clear torque target gives operators a shared reference for production and maintenance work."
                : "Target torsi yang jelas memberi operator acuan yang sama untuk pekerjaan produksi maupun maintenance."}
            </p>
          </div>

          <div className="grid gap-px border border-graphite-200 bg-graphite-200 sm:grid-cols-2">
            {[
              { icon: CircleGauge, number: "01", title: lang === "en" ? "Clear target" : "Target jelas", copy: lang === "en" ? "Set the torque for the joint—not by guesswork." : "Atur torsi sesuai joint, bukan berdasarkan perkiraan." },
              { icon: RefreshCw, number: "02", title: lang === "en" ? "Repeatable work" : "Proses berulang", copy: lang === "en" ? "Give every operator the same mechanical signal." : "Berikan setiap operator sinyal mekanis yang sama." },
              { icon: ShieldCheck, number: "03", title: lang === "en" ? "Controlled tightening" : "Pengencangan terkontrol", copy: lang === "en" ? "QL clicks and RTD slips when the set torque is reached." : "QL memberi klik dan RTD melakukan slip saat set torque tercapai." },
              { icon: Settings2, number: "04", title: lang === "en" ? "Right-sized selection" : "Pemilihan sesuai kebutuhan", copy: lang === "en" ? "Match the model and range to the fastener and application." : "Sesuaikan model dan range dengan fastener serta aplikasinya." }
            ].map(({ icon: Icon, number, title, copy }) => (
              <article key={number} className="min-h-64 bg-white p-7">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center bg-industrial-700 text-white"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <span className="text-5xl font-black tracking-[-0.08em] text-graphite-100">{number}</span>
                </div>
                <h3 className="mt-10 text-2xl font-black text-graphite-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(24,61,97,0.12)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="container-page">
        <div className="overflow-hidden border border-graphite-200 bg-white shadow-panel">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-72 flex-col justify-center bg-signal-500 p-8 text-white md:p-12">
              <BadgeCheck className="h-10 w-10" aria-hidden="true" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                {lang === "en" ? "Authorized distributor" : "Distributor resmi"}
              </p>
              <div className="relative mt-5 h-20 w-full max-w-xs bg-white p-3">
                <Image src="/assets/brands/logos/tohnichi--nobg.png" alt="TOHNICHI" fill sizes="320px" className="object-contain p-3" />
              </div>
            </div>

            <div className="p-8 md:p-12 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">CSE Technical Support</p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black tracking-[-0.04em] text-graphite-900 md:text-6xl">
                {lang === "en" ? "Bring the application. We will help with the model." : "Bawa aplikasinya. Kami bantu pilih modelnya."}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[lang === "en" ? "Fastener type" : "Jenis fastener", lang === "en" ? "Target torque" : "Target torsi", lang === "en" ? "Work process" : "Proses kerja"].map((item, index) => (
                  <div key={item} className="border-l-2 border-industrial-700 pl-4">
                    <span className="text-xs font-black text-signal-600">0{index + 1}</span>
                    <p className="mt-1 text-sm font-bold text-graphite-800">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={contactHref} className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-signal-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-signal-600">
                  {lang === "en" ? "Discuss QL or RTD" : "Konsultasikan QL atau RTD"}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="mailto:cse@citra-sukses.com?subject=Konsultasi%20TOHNICHI%20QL%20%2F%20RTD" className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center border border-graphite-200 px-6 py-4 text-sm font-bold text-graphite-800 transition hover:border-industrial-600">
                  cse@citra-sukses.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
