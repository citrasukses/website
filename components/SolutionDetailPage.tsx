import Image from "next/image";
import Link from "next/link";
import {
  Activity, AlertTriangle, ArrowDown, ArrowRight, CheckCircle2, ClipboardCheck,
  Database, FileCheck2, FileQuestion, Gauge, GitCompareArrows, PackageCheck,
  RadioTower, RotateCcw, Search, ShieldCheck, TimerReset, Wrench
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import type { SolutionPage } from "@/data/solution-pages";
import { localizedPath, text, type Language, withLang } from "@/lib/i18n";

type ExperienceProps = { solution: SolutionPage; lang: Language };

function SolutionActions({ solution, lang, dark = false }: ExperienceProps & { dark?: boolean }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <CTAButton href={withLang(`/contact?solution=${solution.slug}`, lang)}>
        <span className="inline-flex items-center gap-2">
          {lang === "en" ? "Discuss the requirement" : "Diskusikan kebutuhan"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </CTAButton>
      <CTAButton href={withLang("/guides", lang)} variant="ghost" className={dark ? "!border-white/30 !bg-transparent !text-white hover:!border-white hover:!bg-white/10 hover:!text-white" : ""}>
        {lang === "en" ? "Read buyer guides" : "Baca buyer guides"}
      </CTAButton>
    </div>
  );
}

function TorqueControlExperience({ solution, lang }: ExperienceProps) {
  const pdcaStages = lang === "en"
    ? [
        { phase: "PLAN", detail: "Define the joint, target, risk, and evidence required." },
        { phase: "DO", detail: "Apply the correct tool and controlled tightening method." },
        { phase: "CHECK", detail: "Verify the result, process signal, and tool condition." },
        { phase: "ACT", detail: "Correct abnormalities and standardize what works." }
      ]
    : [
        { phase: "PLAN", detail: "Definisikan joint, target, risiko, dan bukti yang dibutuhkan." },
        { phase: "DO", detail: "Gunakan tool dan metode tightening yang terkendali." },
        { phase: "CHECK", detail: "Verifikasi hasil, signal proses, dan kondisi tool." },
        { phase: "ACT", detail: "Koreksi abnormalitas dan standardisasi hasil perbaikan." }
      ];
  const pdcaPlacements = [
    "col-start-1 row-start-1",
    "col-start-3 row-start-1",
    "col-start-3 row-start-3",
    "col-start-1 row-start-3"
  ];

  return (
    <>
      <section className="relative overflow-hidden border-y border-graphite-200 bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 blueprint-soft lg:block" />
        <div className="container-page relative grid min-h-[610px] gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative z-10">
            <p className="inline-flex border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.22em] text-industrial-700">{text(solution.eyebrow, lang)} · Closed loop</p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.08] text-graphite-900 md:text-6xl">{text(solution.title, lang)}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-graphite-600 md:text-lg">{text(solution.description, lang)}</p>
            <SolutionActions solution={solution} lang={lang} />
          </div>
          <div className="relative min-h-[430px] border border-graphite-200 bg-graphite-50 p-6 shadow-panel md:p-8">
            <div className="absolute inset-0 dot-matrix opacity-60" />
            <div className="relative flex items-center justify-between border-b border-graphite-200 pb-4 text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">
              <span className="flex items-center gap-2">
                {lang === "en" ? "Control loop" : "Siklus kontrol"}
                <span className="bg-industrial-700 px-2 py-1 text-[10px] text-white">PDCA</span>
              </span>
              <span className="flex items-center gap-2 text-industrial-700"><Activity className="h-4 w-4" /> CONTINUOUS PROCESS</span>
            </div>
            <div
              className="relative mt-7 grid grid-cols-[minmax(0,1fr)_2.25rem_minmax(0,1fr)] grid-rows-[auto_2.25rem_auto]"
              role="list"
              aria-label={lang === "en" ? "PDCA continuous improvement loop" : "Siklus perbaikan berkelanjutan PDCA"}
            >
              {pdcaStages.map((stage, index) => (
                <article key={stage.phase} role="listitem" className={`${pdcaPlacements[index]} flex min-h-36 flex-col border border-graphite-200 bg-white p-4 text-graphite-900`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-signal-600">0{index + 1}</span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-industrial-700">{stage.phase}</span>
                  </div>
                  <p className="mt-auto pt-5 text-sm font-semibold leading-5 text-graphite-700">{stage.detail}</p>
                </article>
              ))}
              <div className="col-start-2 row-start-1 flex items-center justify-center text-signal-600" aria-hidden="true"><ArrowRight className="h-5 w-5" /></div>
              <div className="col-start-3 row-start-2 flex items-center justify-center text-signal-600" aria-hidden="true"><ArrowDown className="h-5 w-5" /></div>
              <div className="col-start-2 row-start-3 flex items-center justify-center text-signal-600" aria-hidden="true"><ArrowRight className="h-5 w-5 rotate-180" /></div>
              <div className="col-start-1 row-start-2 flex items-center justify-center text-signal-600" aria-hidden="true"><ArrowDown className="h-5 w-5 rotate-180" /></div>
              <div className="col-start-2 row-start-2 flex items-center justify-center" aria-hidden="true">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-industrial-700 text-white"><RotateCcw className="h-4 w-4" /></span>
              </div>
            </div>
            <div className="relative mt-3 flex items-center gap-3 border border-industrial-700 bg-white p-4 text-sm font-semibold text-industrial-800">
              <RotateCcw className="h-5 w-5 shrink-0" aria-hidden="true" />
              {lang === "en" ? "CHECK finds the gap; ACT turns the lesson into the next PLAN." : "CHECK menemukan gap; ACT mengubah pembelajaran menjadi PLAN berikutnya."}
            </div>
            <Image src={solution.image} alt={text(solution.imageAlt, lang)} width={420} height={170} className="relative mx-auto mt-5 h-28 w-auto object-contain mix-blend-multiply" />
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-16 text-white">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{lang === "en" ? "System architecture" : "Arsitektur sistem"}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{lang === "en" ? "Four decisions. One controlled result." : "Empat keputusan. Satu hasil terkendali."}</h2></div>
            <p className="max-w-2xl leading-7 text-white/65">{text(solution.challenge, lang)}</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-4">
            {solution.approach.map((item, index) => (
              <li key={item.title.en} className="relative bg-graphite-900 p-6">
                <span className="text-xs font-bold tracking-[0.2em] text-signal-500">LAYER 0{index + 1}</span>
                <h3 className="mt-10 text-xl font-bold">{text(item.title, lang)}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{text(item.description, lang)}</p>
                {index < solution.approach.length - 1 ? <ArrowRight className="absolute -right-3 top-8 z-10 hidden h-6 w-6 rounded-full bg-signal-500 p-1 lg:block" aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "Process diagnosis" : "Diagnosis proses"}</p><h2 className="mt-3 text-3xl font-bold text-graphite-900">{text(solution.challengeTitle, lang)}</h2></div>
          <div className="divide-y divide-graphite-200 border-y border-graphite-200">
            {solution.symptoms.map((item, index) => (
              <article key={item.title.en} className="grid gap-3 py-5 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:items-start"><span className="text-sm font-bold text-signal-600">0{index + 1}</span><h3 className="font-bold text-graphite-900">{text(item.title, lang)}</h3><p className="text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p></article>
            ))}
          </div>
        </div>
      </section>
      <TwoColumnBrief solution={solution} lang={lang} tone="blueprint" />
    </>
  );
}

function PokaYokeExperience({ solution, lang }: ExperienceProps) {
  const signalFlow = lang === "en"
    ? ["Fastener", "Completion signal", "Count / sequence", "Release or interlock"]
    : ["Fastener", "Completion signal", "Count / sequence", "Release atau interlock"];

  return (
    <>
      <section className="relative overflow-hidden bg-graphite-900 text-white">
        <div className="absolute inset-0 blueprint-dark opacity-20" />
        <div className="container-page relative grid min-h-[620px] gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-signal-500">{text(solution.eyebrow, lang)} · Station logic</p><h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] md:text-6xl">{text(solution.title, lang)}</h1><p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">{text(solution.description, lang)}</p><SolutionActions solution={solution} lang={lang} dark /></div>
          <div className="border border-white/15 bg-black/15 p-5 md:p-8">
            <div className="flex items-center justify-between border-b border-white/15 pb-4"><span className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">{lang === "en" ? "Station handshake" : "Handshake station"}</span><RadioTower className="h-5 w-5 text-signal-500" aria-hidden="true" /></div>
            <div className="mt-6 grid gap-3">
              {signalFlow.map((label, index) => (
                <div key={label}>
                  <div className={`${index === 3 ? "border-signal-500 bg-signal-500" : "border-white/20 bg-white/5"} flex items-center gap-4 border p-4`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{index + 1}</span><span className="font-bold">{label}</span>{index === 3 ? <ShieldCheck className="ml-auto h-5 w-5" aria-hidden="true" /> : null}</div>
                  {index < signalFlow.length - 1 ? <ArrowDown className="mx-auto my-1 h-5 w-5 text-white/35" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">Failure-mode lab</p><h2 className="mt-3 text-3xl font-bold text-graphite-900 md:text-4xl">{text(solution.challengeTitle, lang)}</h2><p className="mt-5 leading-7 text-graphite-600">{text(solution.challenge, lang)}</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {solution.symptoms.map((item, index) => (
              <article key={item.title.en} className="grid grid-cols-[4rem_1fr] overflow-hidden border border-graphite-200 bg-graphite-50"><div className="flex flex-col items-center justify-between bg-graphite-900 px-2 py-5 text-white"><AlertTriangle className="h-5 w-5 text-signal-500" aria-hidden="true" /><span className="text-2xl font-bold text-white/30">0{index + 1}</span></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">{lang === "en" ? "Abnormal state" : "Kondisi abnormal"}</p><h3 className="mt-3 text-xl font-bold text-graphite-900">{text(item.title, lang)}</h3><p className="mt-3 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="lg:sticky lg:top-24 lg:self-start"><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">Logic test bench</p><h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Design the abnormal flow first." : "Rancang abnormal flow lebih dulu."}</h2><p className="mt-4 leading-7 text-graphite-600">{lang === "en" ? "A station is only error-proof when it knows what to do after a missed point, repeated hit, lost signal, or authorized rework." : "Station baru benar-benar error-proof ketika tahu apa yang harus dilakukan setelah missed point, repeated hit, signal hilang, atau rework resmi."}</p></div>
          <ol className="grid gap-4 sm:grid-cols-2">{solution.approach.map((item, index) => <li key={item.title.en} className="border-t-4 border-industrial-700 bg-white p-6 shadow-sm"><span className="font-mono text-xs font-bold text-signal-600">TEST_0{index + 1}</span><h3 className="mt-6 text-xl font-bold text-graphite-900">{text(item.title, lang)}</h3><p className="mt-3 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p></li>)}</ol>
        </div>
      </section>
      <TwoColumnBrief solution={solution} lang={lang} tone="signal" />
    </>
  );
}

function CalibrationExperience({ solution, lang }: ExperienceProps) {
  return (
    <>
      <section className="tohnichi-calibration-field border-y border-graphite-200">
        <div className="container-page grid min-h-[610px] gap-10 py-14 lg:grid-cols-2 lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-600">{text(solution.eyebrow, lang)} · Tool health</p><h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] text-graphite-900 md:text-6xl">{text(solution.title, lang)}</h1><p className="mt-6 max-w-xl text-base leading-8 text-graphite-600 md:text-lg">{text(solution.description, lang)}</p><SolutionActions solution={solution} lang={lang} /></div>
          <div className="tohnichi-instrument-surface border border-graphite-300 p-5 shadow-panel md:p-8">
            <div className="grid grid-cols-[1fr_auto] items-center gap-5 border-b border-graphite-300 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-graphite-500">{lang === "en" ? "Tool status" : "Status tool"}</p><p className="mt-2 text-2xl font-bold text-graphite-900">KNOWN GOOD</p></div><div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-industrial-700 bg-white text-industrial-700"><Gauge className="h-8 w-8" aria-hidden="true" /></div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{[[lang === "en" ? "Identity" : "Identitas", "ID / RANGE"], [lang === "en" ? "Last check" : "Check terakhir", "PASS"], [lang === "en" ? "Next action" : "Aksi berikut", "DUE DATE"]].map(([label, value]) => <div key={label} className="border border-graphite-300 bg-white p-4"><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-graphite-500">{label}</p><p className="mt-5 font-mono text-sm font-bold text-industrial-800">{value}</p></div>)}</div>
            <div className="relative mt-5 h-44 overflow-hidden border border-graphite-300 bg-white"><Image src={solution.image} alt={text(solution.imageAlt, lang)} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-5" /></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16"><div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "Tool-health lifecycle" : "Siklus kesehatan tool"}</p><h2 className="mt-3 text-3xl font-bold text-graphite-900 md:text-4xl">{lang === "en" ? "Calibration is one event in a longer control cycle." : "Calibration adalah satu kejadian dalam siklus kontrol yang lebih panjang."}</h2><p className="mt-5 leading-7 text-graphite-600">{text(solution.challenge, lang)}</p></div>
        <ol className="relative grid gap-0 border-l-2 border-industrial-700 pl-8">{solution.approach.map((item, index) => <li key={item.title.en} className="relative border-b border-graphite-200 py-5 last:border-b-0"><span className="absolute -left-[2.65rem] top-5 flex h-5 w-5 items-center justify-center rounded-full bg-industrial-700 ring-4 ring-white"><span className="h-1.5 w-1.5 rounded-full bg-white" /></span><div className="flex gap-4"><span className="font-mono text-xs font-bold text-signal-600">0{index + 1}</span><div><h3 className="font-bold text-graphite-900">{text(item.title, lang)}</h3><p className="mt-2 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p></div></div></li>)}</ol></div></section>

      <section className="bg-graphite-900 py-16 text-white"><div className="container-page"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">Warning log</p><h2 className="mt-3 text-3xl font-bold">{text(solution.challengeTitle, lang)}</h2></div><span className="inline-flex items-center gap-2 text-sm font-semibold text-white/60"><TimerReset className="h-5 w-5" />{lang === "en" ? "Act before the next due date" : "Bertindak sebelum due date berikutnya"}</span></div>
        <div className="mt-9 divide-y divide-white/15 border-y border-white/15">{solution.symptoms.map((item, index) => <article key={item.title.en} className="grid gap-3 py-5 md:grid-cols-[5rem_0.65fr_1.35fr] md:items-center"><span className="font-mono text-xs font-bold text-signal-500">WARN-0{index + 1}</span><h3 className="font-bold">{text(item.title, lang)}</h3><p className="text-sm leading-6 text-white/60">{text(item.description, lang)}</p></article>)}</div></div></section>
      <TwoColumnBrief solution={solution} lang={lang} tone="instrument" />
    </>
  );
}

function SourcingExperience({ solution, lang }: ExperienceProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f1eee7]"><div className="absolute inset-0 drafting-lines opacity-50" /><div className="container-page relative grid min-h-[620px] gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-600">{text(solution.eyebrow, lang)} · Case desk</p><h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.05] text-graphite-900 md:text-6xl">{lang === "en" ? "From a vague request to a verifiable RFQ." : "Dari permintaan samar menjadi RFQ yang bisa diverifikasi."}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-graphite-600 md:text-lg">{text(solution.description, lang)}</p><SolutionActions solution={solution} lang={lang} /></div>
        <div className="relative min-h-[450px]"><div className="absolute left-8 right-0 top-0 rotate-2 border border-graphite-300 bg-white p-5 shadow-panel"><p className="font-mono text-xs font-bold text-signal-600">SOURCE MATERIAL / 01</p><div className="mt-5 h-24 bg-graphite-100" /><p className="mt-4 text-sm font-bold text-graphite-900">“Need same item. Old model. Urgent.”</p></div><div className="absolute bottom-3 left-0 right-8 -rotate-1 border-t-4 border-industrial-700 bg-white p-6 shadow-panel"><div className="flex items-center justify-between"><p className="font-mono text-xs font-bold text-industrial-700">VERIFIED RFQ / READY</p><FileCheck2 className="h-6 w-6 text-industrial-700" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{(lang === "en" ? ["Complete identity", "Operating context", "Fixed parameters", "Approved alternatives"] : ["Identitas lengkap", "Konteks operasi", "Parameter tetap", "Alternatif disetujui"]).map((item) => <div key={item} className="flex items-center gap-2 border border-graphite-200 p-3 text-sm font-semibold text-graphite-700"><CheckCircle2 className="h-4 w-4 text-industrial-700" />{item}</div>)}</div></div></div>
      </div></section>

      <section className="bg-white py-16"><div className="container-page"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">RFQ rescue</p><h2 className="mt-3 text-3xl font-bold text-graphite-900 md:text-4xl">{text(solution.challengeTitle, lang)}</h2><p className="mt-5 leading-7 text-graphite-600">{text(solution.challenge, lang)}</p></div>
        <div className="mt-10 grid overflow-hidden border border-graphite-200 lg:grid-cols-2"><div className="bg-graphite-50 p-6 md:p-8"><div className="flex items-center gap-3 text-signal-600"><FileQuestion className="h-6 w-6" /><h3 className="text-lg font-bold">{lang === "en" ? "What often arrives" : "Yang sering masuk"}</h3></div><div className="mt-6 grid gap-3">{solution.symptoms.map((item) => <div key={item.title.en} className="border-l-2 border-signal-500 bg-white p-4"><p className="font-bold text-graphite-900">{text(item.title, lang)}</p><p className="mt-1 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p></div>)}</div></div>
          <div className="bg-industrial-800 p-6 text-white md:p-8"><div className="flex items-center gap-3"><PackageCheck className="h-6 w-6 text-signal-500" /><h3 className="text-lg font-bold">{lang === "en" ? "What procurement receives" : "Yang diterima procurement"}</h3></div><div className="mt-6 grid gap-3">{solution.deliverables.map((item) => <div key={item.en} className="flex gap-3 border border-white/15 bg-white/5 p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" /><p className="text-sm font-semibold leading-6 text-white/80">{text(item, lang)}</p></div>)}</div></div></div>
      </div></section>

      <section className="bg-graphite-900 py-16 text-white"><div className="container-page"><div className="flex items-end justify-between gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{lang === "en" ? "The sourcing desk" : "Meja sourcing"}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{lang === "en" ? "Every clue has a job." : "Setiap petunjuk punya fungsi."}</h2></div><Search className="hidden h-10 w-10 text-white/20 md:block" /></div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solution.approach.map((item, index) => { const Icon = [Search, ClipboardCheck, FileCheck2, GitCompareArrows][index]; return <li key={item.title.en} className="border border-white/15 bg-white/5 p-6"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-signal-500" /><span className="font-mono text-xs text-white/35">0{index + 1}</span></div><h3 className="mt-8 text-xl font-bold">{text(item.title, lang)}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text(item.description, lang)}</p></li>; })}</ol>
      </div></section>

      <section className="bg-[#f1eee7] py-16"><div className="container-page grid gap-10 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">Evidence pack</p><h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Bring what you have. We will expose what is missing." : "Kirim yang tersedia. Kami bantu menemukan yang masih kurang."}</h2></div><div className="grid gap-px overflow-hidden border border-graphite-300 bg-graphite-300 sm:grid-cols-2">{solution.inputs.map((item, index) => <div key={item.en} className="flex gap-4 bg-white p-5"><span className="font-mono text-xs font-bold text-signal-600">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-semibold leading-6 text-graphite-700">{text(item, lang)}</p></div>)}</div></div></section>
    </>
  );
}

function TwoColumnBrief({ solution, lang, tone }: ExperienceProps & { tone: "blueprint" | "signal" | "instrument" }) {
  const sectionClass = tone === "instrument" ? "tohnichi-calibration-field" : tone === "signal" ? "bg-white" : "bg-graphite-50";
  const iconClass = tone === "signal" ? "text-signal-600" : "text-industrial-700";
  return (
    <section className={`${sectionClass} py-16`}><div className="container-page grid gap-8 lg:grid-cols-2">
      <div className="border border-graphite-200 bg-white p-7 md:p-8"><Database className={`h-7 w-7 ${iconClass}`} /><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "What the review produces" : "Hasil review"}</p><h2 className="mt-3 text-2xl font-bold text-graphite-900">{text(solution.deliverablesTitle, lang)}</h2><div className="mt-6 divide-y divide-graphite-200 border-y border-graphite-200">{solution.deliverables.map((item) => <div key={item.en} className="flex gap-3 py-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-industrial-700" /><p className="text-sm font-semibold leading-6 text-graphite-700">{text(item, lang)}</p></div>)}</div></div>
      <div className="border border-graphite-800 bg-graphite-900 p-7 text-white md:p-8"><Wrench className="h-7 w-7 text-signal-500" /><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-signal-500">{lang === "en" ? "Your first brief" : "Brief pertama Anda"}</p><h2 className="mt-3 text-2xl font-bold">{lang === "en" ? "Start with operational facts." : "Mulai dari fakta operasional."}</h2><ol className="mt-6 grid gap-4">{solution.inputs.map((item, index) => <li key={item.en} className="flex items-start gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 text-xs font-bold text-white/60">{index + 1}</span><p className="text-sm font-semibold leading-6 text-white/75">{text(item, lang)}</p></li>)}</ol></div>
    </div></section>
  );
}

function SolutionFooter({ solution, lang }: ExperienceProps) {
  const closingTitle = {
    "torque-control": { id: "Kendalikan joint, proses, dan buktinya sebagai satu sistem.", en: "Control the joint, the process, and its evidence as one system." },
    "poka-yoke-tightening": { id: "Rancang station yang mengenali kesalahan sebelum produk berpindah.", en: "Design a station that recognizes errors before the product moves on." },
    "torque-calibration-verification": { id: "Jaga status setiap tool tetap diketahui—bukan sekadar punya sertifikat.", en: "Keep every tool's status known—not merely certified." },
    "industrial-sourcing": { id: "Ubah petunjuk yang tersedia menjadi RFQ yang aman untuk dibeli.", en: "Turn the clues you have into an RFQ that is safe to buy." }
  }[solution.slug];
  return (
    <>
      <section className="bg-white py-16"><div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{lang === "en" ? "Decision support" : "Pendukung keputusan"}</p><h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Continue with the evidence you need next." : "Lanjutkan dengan bukti yang Anda perlukan berikutnya."}</h2></div><div className="grid gap-4 md:grid-cols-3">{solution.related.map((item) => <Link key={item.href} href={withLang(item.href, lang)} className="focus-ring group border-t-4 border-graphite-900 bg-graphite-50 p-5 transition hover:border-signal-500 hover:bg-white hover:shadow-panel"><h3 className="font-bold text-graphite-900">{text(item.title, lang)}</h3><p className="mt-3 text-sm leading-6 text-graphite-600">{text(item.description, lang)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-industrial-700">{lang === "en" ? "Open" : "Buka"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>
      <section className="bg-graphite-50 py-16"><div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">FAQ</p><h2 className="mt-3 text-3xl font-bold text-graphite-900">{lang === "en" ? "Questions before starting" : "Pertanyaan sebelum memulai"}</h2></div><FAQAccordion items={solution.faqs.map((item) => ({ question: text(item.question, lang), answer: text(item.answer, lang) }))} /></div></section>
      <section className="bg-industrial-700 py-14 text-white"><div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><h2 className="max-w-3xl text-3xl font-bold">{text(closingTitle, lang)}</h2><CTAButton href={withLang(`/contact?solution=${solution.slug}`, lang)}>{lang === "en" ? "Request an application review" : "Minta review aplikasi"}</CTAButton></div></section>
    </>
  );
}

export function SolutionDetailPage({ solution, lang }: ExperienceProps) {
  const path = `/solutions/${solution.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", name: text(solution.title, lang), description: text(solution.description, lang), url: `https://cse.co.id${localizedPath(path, lang)}`, areaServed: { "@type": "Country", name: "Indonesia" }, provider: { "@type": "Organization", "@id": "https://cse.co.id/#organization", name: "PT Citra Sukses Ekapratama", url: "https://cse.co.id" }, serviceType: text(solution.eyebrow, lang) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: solution.faqs.map((item) => ({ "@type": "Question", name: text(item.question, lang), acceptedAnswer: { "@type": "Answer", text: text(item.answer, lang) } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "CSE", item: "https://cse.co.id" }, { "@type": "ListItem", position: 2, name: lang === "en" ? "Solutions" : "Solusi", item: `https://cse.co.id${localizedPath("/solutions", lang)}` }, { "@type": "ListItem", position: 3, name: text(solution.title, lang), item: `https://cse.co.id${localizedPath(path, lang)}` }] }
  ];
  const experience = {
    "torque-control": <TorqueControlExperience solution={solution} lang={lang} />,
    "poka-yoke-tightening": <PokaYokeExperience solution={solution} lang={lang} />,
    "torque-calibration-verification": <CalibrationExperience solution={solution} lang={lang} />,
    "industrial-sourcing": <SourcingExperience solution={solution} lang={lang} />
  }[solution.slug];
  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Breadcrumb homeHref={withLang("/", lang)} items={[{ href: withLang("/solutions", lang), label: lang === "en" ? "Solutions" : "Solusi" }, { label: text(solution.title, lang) }]} />{experience}<SolutionFooter solution={solution} lang={lang} /></>
  );
}
