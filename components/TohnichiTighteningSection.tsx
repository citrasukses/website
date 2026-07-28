"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Database,
  Gauge,
  ListChecks,
  Pause,
  Play,
  ShieldCheck
} from "lucide-react";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { TohnichiFourMOverview } from "@/components/TohnichiFourMOverview";
import { TohnichiTorqueCarousel } from "@/components/TohnichiTorqueCarousel";
import { text, withLang, type Language, type LocalizedText } from "@/lib/i18n";

type TohnichiTighteningSectionProps = {
  lang: Language;
};

type TighteningChallenge = {
  id: string;
  icon: typeof Gauge;
  topic: LocalizedText;
  title: LocalizedText;
  problem: LocalizedText;
  solutionTitle: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText;
  product?: {
    src: string;
    name: string;
  };
};

const challenges: TighteningChallenge[] = [
  {
    id: "over-tightening",
    icon: Gauge,
    topic: {
      id: "Over-tightening",
      en: "Over-tightening"
    },
    title: {
      id: "Komponen rusak karena over-tightening",
      en: "Components damaged by over-tightening"
    },
    problem: {
      id: "Takt time yang ketat dan hasil operator yang tidak konsisten dapat merusak komponen—bahkan baru terlihat setelah produk dikirim.",
      en: "Tight takt times and inconsistent operator technique can damage components—even when the defect only appears after shipment."
    },
    solutionTitle: {
      id: "RTD dan mekanisme slip / break-over",
      en: "RTD and slip / break-over mechanisms"
    },
    solution: {
      id: "Torque screwdriver RTD dan torque wrench tipe slip atau break-over melepaskan gaya saat set torque tercapai, sehingga torque tambahan tidak diteruskan.",
      en: "RTD torque screwdrivers and slip or break-over torque wrenches release at the set torque so additional force is not transferred."
    },
    result: {
      id: "Komponen terlindungi dari torque berlebih.",
      en: "Components are protected from excess torque."
    },
    product: {
      src: "/assets/brands/products/tohnichi/RTD120CN.jpg",
      name: "RTD Series"
    }
  },
  {
    id: "missed-tightening",
    icon: ListChecks,
    topic: {
      id: "Missed tightening / jumlah baut tidak lengkap",
      en: "Missed tightening / incomplete bolt count"
    },
    title: {
      id: "Assembly tidak lengkap karena titik tightening terlewat",
      en: "Incomplete assemblies caused by missed fastening points"
    },
    problem: {
      id: "Pada assembly dengan banyak baut, tanda manual atau ingatan operator dapat membuat proses terlihat selesai padahal satu atau lebih titik belum dikencangkan.",
      en: "On multi-bolt assemblies, manual marks or operator memory can make the process look complete even when one or more fastening points were skipped."
    },
    solutionTitle: {
      id: "Marking wrench atau signal wrench + counter / PLC",
      en: "Marking wrench or signal wrench + counter / PLC"
    },
    solution: {
      id: "Marking torque wrench hanya memberi tanda setelah set torque tercapai, sementara signal wrench mengirim konfirmasi ke counter atau PLC untuk menghitung setiap tightening yang valid.",
      en: "A marking torque wrench marks only after the set torque is reached, while a signal wrench confirms every valid tightening event to a counter or PLC."
    },
    result: {
      id: "Setiap titik tightening terkonfirmasi secara visual atau melalui hitungan sistem.",
      en: "Every fastening point is confirmed visually or through the system count."
    },
    product: {
      src: "/assets/brands/products/tohnichi/CSPFDD100N3x15D-AD.jpg",
      name: "Marking Torque Wrench"
    }
  },
  {
    id: "calibration-drift",
    icon: ShieldCheck,
    topic: {
      id: "Torque wrench drift",
      en: "Torque wrench drift"
    },
    title: {
      id: "Produk tidak sesuai akibat torque wrench drift",
      en: "Nonconforming products caused by torque-wrench drift"
    },
    problem: {
      id: "Torque wrench dapat keluar dari toleransi di antara jadwal kalibrasi dan membuat produk tidak sesuai terus mengalir.",
      en: "A torque wrench can drift out of tolerance between calibration dates while nonconforming products continue down the line."
    },
    solutionTitle: {
      id: "Daily check dan pre-start verification",
      en: "Daily checks and pre-start verification"
    },
    solution: {
      id: "Line checker memungkinkan daily check atau pre-start inspection, sehingga abnormalitas diketahui tanpa menunggu kalibrasi periodik.",
      en: "A line checker enables daily or pre-start inspections so abnormalities are found without waiting for periodic calibration."
    },
    result: {
      id: "Alat bermasalah diketahui lebih awal.",
      en: "Problem tools are identified earlier."
    },
    product: {
      src: "/assets/brands/products/tohnichi/Tohnichi TCC2-G.jpg",
      name: "Torque Verification System"
    }
  },
  {
    id: "nutrunner-check",
    icon: ClipboardCheck,
    topic: {
      id: "Verifikasi nutrunner",
      en: "Nutrunner verification"
    },
    title: {
      id: "Produksi terganggu saat nutrunner diperiksa",
      en: "Production disrupted during nutrunner checks"
    },
    problem: {
      id: "Melepas nutrunner untuk torque check mengganggu produksi, membutuhkan unit cadangan, dan menambah biaya.",
      en: "Removing a nutrunner for torque checks disrupts production, requires a spare machine, and adds cost."
    },
    solutionTitle: {
      id: "ST peak torque meter",
      en: "ST peak torque meter"
    },
    solution: {
      id: "Peak torque meter ST dipasang di antara nutrunner dan socket untuk memantau kondisi fastening machine langsung di tempat kerja.",
      en: "An ST peak torque meter installs between the nutrunner and socket to monitor fastening-machine condition at the workstation."
    },
    result: {
      id: "Downtime lebih rendah, abnormalitas lebih cepat terdeteksi.",
      en: "Less downtime and earlier abnormality detection."
    }
  },
  {
    id: "traceability",
    icon: Database,
    topic: {
      id: "Traceability",
      en: "Traceability"
    },
    title: {
      id: "Hasil tightening tidak dapat ditelusuri",
      en: "Tightening results cannot be traced"
    },
    problem: {
      id: "Pencatatan manual atau data yang tersebar membuat nilai torque, sudut, waktu, dan identitas pekerjaan sulit dibuktikan saat audit atau investigasi defect.",
      en: "Manual records or scattered data make torque, angle, time, and work identity difficult to prove during audits or defect investigations."
    },
    solutionTitle: {
      id: "Digital torque wrench + TDMS",
      en: "Digital torque wrench + TDMS"
    },
    solution: {
      id: "CEM3-G-BT/BTA, CEM3-WF/G-WF, dan CES-G menyimpan hasil tightening dan mengirimkannya melalui Bluetooth, wireless LAN, atau koneksi data ke TDMS atau PC untuk pencatatan terpusat dan backup.",
      en: "CEM3-G-BT/BTA, CEM3-WF/G-WF, and CES-G store tightening results and send them through Bluetooth, wireless LAN, or a data connection to TDMS or a PC for centralized logging and backup."
    },
    result: {
      id: "Setiap hasil tightening tersimpan, terhubung ke pekerjaan, dan siap ditelusuri kembali.",
      en: "Every tightening result is stored, linked to the job, and ready to be traced."
    },
    product: {
      src: "/assets/brands/products/tohnichi/catalog/interchangeable-head-torque-wrenches/cem3-g-bta.png",
      name: "CEM3-G-BTA · Digital Torque & Angle Wrench"
    }
  }
];

const manufacturingProblems = challenges;

function TighteningRiskVisual({
  challenge,
  lang
}: {
  challenge: TighteningChallenge;
  lang: Language;
}) {
  const Icon = challenge.icon;

  return (
    <div className="relative min-h-52 overflow-hidden border border-graphite-200 bg-[#eef0ec] p-5">
      <span className="absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.2em] text-graphite-500">
        {lang === "en" ? "Process condition" : "Kondisi proses"}
      </span>

      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-industrial-700/20 bg-white text-industrial-700 shadow-sm">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-5 bottom-5">
        {challenge.id === "over-tightening" ? (
          <div className="grid gap-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.14em]">
                <span className="text-graphite-500">
                  {lang === "en" ? "Applied torque" : "Torsi aktual"}
                </span>
                <span className="text-signal-600">
                  {lang === "en" ? "Exceeds target" : "Melebihi target"}
                </span>
              </div>
              <div className="relative h-3 bg-white">
                <div className="absolute inset-y-0 left-0 w-[68%] bg-industrial-700" />
                <div className="absolute inset-y-0 left-[68%] right-0 bg-signal-500" />
                <div className="absolute -top-1 left-[68%] h-5 w-px bg-graphite-900" />
                <span className="absolute left-[68%] top-5 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.12em] text-graphite-700">
                  {lang === "en" ? "Target torque" : "Torsi target"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-graphite-200 pt-4">
              <div
                className="relative h-12"
                role="img"
                aria-label={
                  lang === "en"
                    ? "Bolted joint compressed by excessive torque"
                    : "Sambungan baut tertekan akibat torsi berlebih"
                }
              >
                <div className="absolute inset-x-0 top-3 h-3 border border-graphite-200 bg-white" />
                <div className="absolute inset-x-0 top-6 h-3 border-x border-b border-industrial-700/30 bg-industrial-700/15" />
                <div className="absolute left-1/2 top-1 h-10 w-2 -translate-x-1/2 bg-graphite-700" />
                <div className="absolute left-1/2 top-0 h-3 w-8 -translate-x-1/2 bg-graphite-800 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />
                <div className="absolute left-1/2 top-8 h-3 w-7 -translate-x-1/2 border-2 border-signal-500 bg-white [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />
                <div className="absolute left-[calc(50%+1rem)] top-3 h-px w-10 rotate-[16deg] bg-signal-500" />
                <div className="absolute left-[calc(50%+1rem)] top-6 h-px w-8 -rotate-[14deg] bg-signal-500" />
              </div>
              <div className="border-l-2 border-signal-500 pl-3">
                <p className="max-w-24 text-[10px] font-black uppercase leading-4 tracking-[0.12em] text-signal-600">
                  {lang === "en" ? "Excess joint stress" : "Stress joint berlebih"}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {challenge.id === "missed-tightening" ? (
          <div className="grid grid-cols-[1fr_auto] items-end gap-5">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-graphite-300 pb-3">
                {[1, 2, 3, 4].map((bolt) => (
                  <span
                    key={bolt}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-4 bg-white text-xs font-black ${
                      bolt === 4
                        ? "border-signal-500 text-signal-600"
                        : "border-industrial-700 text-industrial-700"
                    }`}
                  >
                    {bolt}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.14em] text-signal-600">
                {lang === "en" ? "01 point not confirmed" : "01 titik belum terkonfirmasi"}
              </p>
            </div>
            <div className="bg-graphite-900 px-4 py-3 text-right text-white shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">Count</p>
              <p className="font-mono text-2xl font-black text-[#e8b923]">09 / 10</p>
            </div>
          </div>
        ) : null}

        {challenge.id === "calibration-drift" ? (
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-graphite-300 bg-graphite-300">
            <div className="bg-white p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-graphite-500">Target</p>
              <p className="mt-2 font-mono text-2xl font-black text-graphite-900">10.0</p>
              <p className="text-[9px] font-bold text-graphite-500">N·m</p>
            </div>
            <div className="bg-[#fff7db] p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-signal-600">Daily check</p>
              <p className="mt-2 font-mono text-2xl font-black text-signal-600">9.2</p>
              <p className="text-[9px] font-bold text-signal-600">NG · OUT OF RANGE</p>
            </div>
          </div>
        ) : null}

        {challenge.id === "nutrunner-check" ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-12 flex-1 items-center justify-center border border-graphite-400 bg-white text-[10px] font-black uppercase tracking-[0.12em] text-graphite-700">
                Nutrunner
              </span>
              <span className="h-px w-5 bg-graphite-500" />
              <span className="flex h-12 w-16 items-center justify-center border-2 border-signal-500 bg-[#fff7db] text-sm font-black text-signal-600">
                ST
              </span>
              <span className="h-px w-5 bg-graphite-500" />
              <span className="flex h-12 w-16 items-center justify-center rounded-r-full border border-graphite-400 bg-white text-[10px] font-black uppercase text-graphite-700">
                Socket
              </span>
            </div>
            <p className="mt-4 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-signal-600">
              {lang === "en" ? "Avoid removing the machine" : "Tanpa melepas mesin"}
            </p>
          </div>
        ) : null}

        {challenge.id === "traceability" ? (
          <div>
            <div className="grid grid-cols-3 gap-px overflow-hidden border border-graphite-300 bg-graphite-300">
              <div className="bg-white p-3">
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-graphite-500">
                  Torque
                </p>
                <p className="mt-2 font-mono text-lg font-black text-graphite-900">20.0</p>
                <p className="text-[8px] font-bold text-graphite-500">N·m</p>
              </div>
              <div className="bg-white p-3">
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-graphite-500">
                  Work ID
                </p>
                <p className="mt-3 font-mono text-sm font-black text-graphite-400">--</p>
              </div>
              <div className="bg-[#fff2ee] p-3">
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-signal-600">
                  Record
                </p>
                <p className="mt-3 text-[9px] font-black uppercase leading-4 text-signal-600">
                  {lang === "en" ? "Not saved" : "Tidak tersimpan"}
                </p>
              </div>
            </div>
            <p className="mt-3 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-signal-600">
              {lang === "en" ? "No audit trail" : "Tidak ada audit trail"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SolutionVisual({
  challenge,
  lang
}: {
  challenge: TighteningChallenge;
  lang: Language;
}) {
  if (challenge.product) {
    return (
      <div className="relative h-32 w-full overflow-hidden border border-graphite-200 bg-white">
        <Image
          src={challenge.product.src}
          alt={`${challenge.product.name} — ${text(challenge.solutionTitle, lang)}`}
          fill
          sizes="(min-width: 1024px) 200px, 45vw"
          className="object-contain p-3"
        />
      </div>
    );
  }

  return (
    <div className="flex h-32 w-full items-center justify-center border border-graphite-200 bg-white p-4">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
        <span className="h-px bg-graphite-300" />
        <span className="flex h-16 w-20 flex-col items-center justify-center border-2 border-signal-500 bg-[#fff7db]">
          <strong className="text-xl text-signal-600">ST</strong>
          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-graphite-500">Peak N·m</span>
        </span>
        <span className="h-px bg-graphite-300" />
      </div>
    </div>
  );
}

const controlLayers = [
  {
    number: "01",
    label: { id: "Cegah", en: "Prevent" },
    body: {
      id: "Batasi torque di titik yang benar.",
      en: "Limit torque at the correct point."
    }
  },
  {
    number: "02",
    label: { id: "Buktikan", en: "Prove" },
    body: {
      id: "Tandai, hitung, dan rekam hasil.",
      en: "Mark, count, and record the result."
    }
  },
  {
    number: "03",
    label: { id: "Verifikasi", en: "Verify" },
    body: {
      id: "Periksa kondisi alat setiap hari.",
      en: "Check tool condition every day."
    }
  }
];

export function TohnichiTighteningSection({ lang }: TohnichiTighteningSectionProps) {
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const activeChallenge = manufacturingProblems[activeProblemIndex];
  const isAutoRotationPaused = rotationPaused || isInteracting;

  useEffect(() => {
    if (
      isAutoRotationPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveProblemIndex((current) => (current + 1) % manufacturingProblems.length);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [activeProblemIndex, isAutoRotationPaused]);

  const showPreviousProblem = () => {
    setActiveProblemIndex(
      (current) => (current - 1 + manufacturingProblems.length) % manufacturingProblems.length
    );
  };

  const showNextProblem = () => {
    setActiveProblemIndex((current) => (current + 1) % manufacturingProblems.length);
  };

  return (
    <section
      id="expertise"
      className="tohnichi-calibration-field relative isolate overflow-hidden border-y border-graphite-200 text-graphite-900"
      aria-labelledby="tohnichi-expertise-title"
    >
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <div className="inline-flex w-fit max-w-full flex-col overflow-hidden border border-graphite-200 bg-white shadow-sm">
              <div className="flex items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4">
                <Image
                  src="/assets/brands/logos/tohnichi--nobg.png"
                  alt="Tohnichi"
                  width={181}
                  height={84}
                  className="h-12 w-auto object-contain sm:h-14"
                />
                <span className="border-l border-graphite-200 py-1 pl-4 text-xs font-bold uppercase tracking-[0.22em] text-graphite-500 sm:text-sm">
                  Japan
                </span>
              </div>
              <div className="flex items-center gap-3 bg-industrial-700 px-5 py-3.5 text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 bg-white/10">
                  <BadgeCheck className="h-5 w-5 text-[#e8c63d]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
                    {lang === "en" ? "Official partnership" : "Kemitraan resmi"}
                  </p>
                  <p className="mt-0.5 text-base font-bold leading-tight sm:whitespace-nowrap sm:text-lg">
                    {lang === "en"
                      ? "Authorized Distributor of Tohnichi"
                      : "Distributor Resmi Tohnichi"}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-industrial-700">
              {lang === "en" ? "Expertise 01 · Tightening control" : "Expertise 01 · Tightening control"}
            </p>
            <h2
              id="tohnichi-expertise-title"
              className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl"
            >
              {lang === "en"
                ? "Turn tightening from operator judgment into a controlled process."
                : "Ubah tightening dari keputusan operator menjadi proses yang terkendali."}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-graphite-600 md:text-lg md:leading-8">
              {lang === "en"
                ? "Tohnichi helps manufacturing teams prevent product damage, expose missed work, prove every tightening result, and detect tool abnormalities before defects leave the line."
                : "Tohnichi membantu tim manufaktur mencegah kerusakan produk, menemukan pekerjaan yang terlewat, membuktikan setiap hasil tightening, dan mendeteksi abnormalitas alat sebelum defect keluar dari lini."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={withLang("/contact", lang)}>
                <span className="inline-flex items-center gap-2">
                  {lang === "en" ? "Review your tightening process" : "Review proses tightening Anda"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </CTAButton>
              <CTAButton
                href={withLang("/brands/tohnichi", lang)}
                variant="ghost"
              >
                {lang === "en" ? "Explore Tohnichi products" : "Lihat produk Tohnichi"}
              </CTAButton>
            </div>
          </div>

          <div className="relative overflow-hidden border border-graphite-200 bg-white shadow-panel">
            <div className="flex items-center justify-between border-b border-graphite-200 bg-white px-5 py-4 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-500">
                {lang === "en" ? "Controlled tightening architecture" : "Arsitektur tightening terkendali"}
              </p>
              <span className="border border-signal-500/40 bg-signal-500/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-signal-600">
                Torque + Data
              </span>
            </div>

            <TohnichiTorqueCarousel lang={lang} />

            <ol className="grid gap-px bg-graphite-200 sm:grid-cols-3">
              {controlLayers.map((layer) => (
                <li key={layer.number} className="bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.18em] text-signal-500">{layer.number}</span>
                    <span className="h-px flex-1 bg-graphite-200" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-graphite-900">
                    {text(layer.label, lang)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-graphite-500">{text(layer.body, lang)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <TohnichiFourMOverview lang={lang} />

        <div
          className="mt-8 overflow-hidden border border-graphite-200 bg-white shadow-panel lg:mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label={lang === "en" ? "Manufacturing problems and Tohnichi solutions" : "Masalah manufaktur dan solusi Tohnichi"}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsInteracting(false);
            }
          }}
        >
          <div className="flex flex-col gap-5 border-b border-graphite-200 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-signal-600">
                Tohnichi application guide
              </p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-graphite-900 sm:text-3xl">
                Manufacturing Problems
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite-500">
                {lang === "en"
                  ? "Select a failure mode to see where it begins and how the right Tohnichi setup controls it."
                  : "Pilih failure mode untuk melihat sumber masalah dan bagaimana setup Tohnichi yang tepat mengendalikannya."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRotationPaused((current) => !current)}
              className="flex min-h-10 shrink-0 items-center gap-2 self-start border border-graphite-200 bg-graphite-50 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-graphite-700 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700 sm:self-auto"
              aria-pressed={rotationPaused}
              aria-label={
                rotationPaused
                  ? lang === "en"
                    ? "Resume automatic problem rotation"
                    : "Lanjutkan pergantian masalah otomatis"
                  : lang === "en"
                    ? "Pause automatic problem rotation"
                    : "Jeda pergantian masalah otomatis"
              }
            >
              {rotationPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {rotationPaused
                ? lang === "en"
                  ? "Resume"
                  : "Lanjutkan"
                : lang === "en"
                  ? "Auto rotation"
                  : "Rotasi otomatis"}
            </button>
          </div>

          <div className="overflow-x-auto border-b border-graphite-200">
            <div
              className="grid min-w-[960px] grid-cols-5"
              aria-label={lang === "en" ? "Manufacturing problem topics" : "Topik masalah manufaktur"}
            >
              {manufacturingProblems.map((challenge, index) => {
                const active = index === activeProblemIndex;

                return (
                  <button
                    id={`manufacturing-problem-${challenge.id}`}
                    key={challenge.id}
                    type="button"
                    onClick={() => setActiveProblemIndex(index)}
                    className={`group relative flex min-h-24 items-center gap-3 border-r border-graphite-200 px-5 text-left transition-colors last:border-r-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-industrial-700 ${
                      active
                        ? "bg-industrial-700 text-white"
                        : "bg-white text-graphite-700 hover:bg-graphite-50 hover:text-industrial-700"
                    }`}
                    aria-pressed={active}
                    aria-controls="active-manufacturing-problem"
                  >
                    <span
                      className={`text-[10px] font-black tracking-[0.16em] ${
                        active ? "text-[#e8c63d]" : "text-signal-500"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold leading-5">
                      {text(challenge.topic, lang)}
                    </span>
                    {index < manufacturingProblems.length - 1 ? (
                      <ChevronRight
                        className={`absolute right-2 h-4 w-4 ${
                          active ? "text-white/45" : "text-graphite-200 group-hover:text-industrial-700/40"
                        }`}
                        aria-hidden="true"
                      />
                    ) : null}
                    {active ? (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-[#e8c63d]" aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="active-manufacturing-problem"
            role="group"
            aria-labelledby={`manufacturing-problem-${activeChallenge.id}`}
            aria-live={isAutoRotationPaused ? "polite" : "off"}
          >
            <div key={activeChallenge.id} className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <article className="border-b border-graphite-200 bg-white p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-graphite-500">
                  {lang === "en" ? "Manufacturing risk" : "Risiko manufaktur"} ·{" "}
                  {String(activeProblemIndex + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 text-xl font-bold leading-snug text-graphite-900 sm:text-2xl">
                  {text(activeChallenge.title, lang)}
                </h4>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-graphite-500">
                  {text(activeChallenge.problem, lang)}
                </p>
                <div className="mt-5">
                  <TighteningRiskVisual challenge={activeChallenge} lang={lang} />
                </div>
              </article>

              <article className="bg-[#fffaf0] p-5 sm:p-7">
                <div className="inline-flex bg-[#e2b91d] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-graphite-900">
                  {lang === "en" ? "Tohnichi solution" : "Solusi Tohnichi"}
                </div>
                <h5 className="mt-4 text-xl font-bold leading-snug text-graphite-900 sm:text-2xl">
                  {text(activeChallenge.solutionTitle, lang)}
                </h5>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-graphite-600">
                  {text(activeChallenge.solution, lang)}
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_11rem] sm:items-center">
                  <div className="flex items-start gap-3 border-y border-[#dfd4a0] py-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-graphite-500">
                        {lang === "en" ? "Controlled result" : "Hasil terkendali"}
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-graphite-700">
                        {text(activeChallenge.result, lang)}
                      </p>
                    </div>
                  </div>
                  <SolutionVisual challenge={activeChallenge} lang={lang} />
                </div>
              </article>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-graphite-200 bg-graphite-50 px-5 py-4 sm:px-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-graphite-500">
              {String(activeProblemIndex + 1).padStart(2, "0")} /{" "}
              {String(manufacturingProblems.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPreviousProblem}
                className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
                aria-label={lang === "en" ? "Previous manufacturing problem" : "Masalah manufaktur sebelumnya"}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextProblem}
                className="flex h-10 w-10 items-center justify-center border border-graphite-200 bg-white text-graphite-900 transition-colors hover:border-industrial-700 hover:text-industrial-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-700"
                aria-label={lang === "en" ? "Next manufacturing problem" : "Masalah manufaktur berikutnya"}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-px border border-graphite-200 bg-graphite-200 shadow-panel md:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-signal-500 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {lang === "en" ? "The tightening objective" : "Tujuan tightening"}
            </p>
            <p className="mt-3 max-w-3xl text-2xl font-bold leading-snug text-white sm:text-3xl">
              {lang === "en"
                ? "Do not postpone quality inspection. Control it at every bolt."
                : "Jangan menunda inspeksi quality. Kendalikan sejak setiap baut dikencangkan."}
            </p>
          </div>
          <div className="flex flex-col justify-center bg-industrial-700 p-7 text-white sm:p-9">
            <p className="text-sm font-bold">
              {lang === "en" ? "CSE helps define the right setup" : "CSE membantu menentukan setup yang tepat"}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {lang === "en"
                ? "Application, torque range, access, line control, data, and verification."
                : "Aplikasi, range torque, akses, line control, data, dan kebutuhan verifikasi."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
