import Image from "next/image";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Gauge,
  ListChecks,
  ScanLine,
  ShieldCheck
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { TohnichiTorqueCarousel } from "@/components/TohnichiTorqueCarousel";
import { text, withLang, type Language, type LocalizedText } from "@/lib/i18n";

type TohnichiTighteningSectionProps = {
  lang: Language;
};

type TighteningChallenge = {
  id: string;
  icon: typeof Gauge;
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
    title: {
      id: "Mencegah over-tightening",
      en: "Prevent over-tightening"
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
    icon: ScanLine,
    title: {
      id: "Menemukan missed tightening",
      en: "Expose missed tightening"
    },
    problem: {
      id: "Tanda manual bisa dibuat walaupun baut belum dikencangkan, sehingga proses terlihat selesai padahal satu titik terlewat.",
      en: "A manual mark can be applied even when a bolt was never tightened, making an incomplete process look finished."
    },
    solutionTitle: {
      id: "Marking torque wrench",
      en: "Marking torque wrench"
    },
    solution: {
      id: "Marking torque wrench membuat tanda melalui mekanisme internal hanya setelah set torque tercapai—bukan berdasarkan ingatan operator.",
      en: "A marking torque wrench applies its mark through an internal mechanism only after the set torque is reached—not from operator memory."
    },
    result: {
      id: "Status tightening dapat diverifikasi secara visual.",
      en: "Tightening status becomes visually verifiable."
    },
    product: {
      src: "/assets/brands/products/tohnichi/CSPFDD100N3x15D-AD.jpg",
      name: "Marking Torque Wrench"
    }
  },
  {
    id: "bolt-count",
    icon: ListChecks,
    title: {
      id: "Memastikan seluruh baut selesai",
      en: "Confirm every fastening point"
    },
    problem: {
      id: "Pada assembly dengan banyak baut, operator dapat mengira semua titik sudah dikerjakan meskipun jumlahnya belum lengkap.",
      en: "On multi-bolt assemblies, an operator can believe the job is complete even when one fastening point was skipped."
    },
    solutionTitle: {
      id: "Signal wrench + counter atau PLC",
      en: "Signal wrench + counter or PLC"
    },
    solution: {
      id: "Torque wrench dengan output signal mengirim konfirmasi ke counter atau PLC. Opsi wired dan wireless membantu menghitung setiap tightening yang valid.",
      en: "Signal-output torque wrenches send completion to a counter or PLC. Wired and wireless options can count every valid tightening event."
    },
    result: {
      id: "Jumlah tightening sesuai work instruction.",
      en: "The tightening count matches the work instruction."
    },
    product: {
      src: "/assets/brands/products/tohnichi/R-CM+M-FH.jpg",
      name: "R-CM / M-FH"
    }
  },
  {
    id: "calibration-drift",
    icon: ShieldCheck,
    title: {
      id: "Mendeteksi drift sebelum kalibrasi berikutnya",
      en: "Catch drift before the next calibration"
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
    title: {
      id: "Memeriksa nutrunner secara in-house",
      en: "Check nutrunners in-house"
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
  }
];

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
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-graphite-300 pb-5">
              {[1, 2, 3, 4].map((bolt) => (
                <span
                  key={bolt}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-4 bg-white text-xs font-black ${
                    bolt === 4
                      ? "border-signal-500 text-signal-600"
                      : "border-industrial-700 text-industrial-700"
                  }`}
                >
                  {bolt}
                </span>
              ))}
            </div>
            <p className="mt-3 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-signal-600">
              {lang === "en" ? "01 point not confirmed" : "01 titik belum terkonfirmasi"}
            </p>
          </div>
        ) : null}

        {challenge.id === "bolt-count" ? (
          <div className="grid grid-cols-[1fr_auto] items-end gap-5 border-t border-graphite-300 pt-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-graphite-500">
                {lang === "en" ? "Required tightening" : "Target tightening"}
              </p>
              <p className="mt-1 text-sm font-bold text-graphite-700">10 bolts / workpiece</p>
            </div>
            <div className="bg-graphite-900 px-4 py-3 text-right text-white shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">Count</p>
              <p className="font-mono text-3xl font-black text-[#e8b923]">09 / 10</p>
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
  return (
    <section
      id="expertise"
      className="tohnichi-calibration-field relative isolate overflow-hidden border-y border-graphite-200 text-graphite-900"
      aria-labelledby="tohnichi-expertise-title"
    >
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 border border-graphite-200 bg-white px-4 py-2 shadow-sm">
              <Image
                src="/assets/brands/logos/tohnichi--nobg.png"
                alt="Tohnichi"
                width={132}
                height={61}
                className="h-10 w-auto object-contain"
              />
              <span className="border-l border-graphite-200 pl-3 text-[10px] font-bold uppercase tracking-[0.18em] text-graphite-500">
                Japan
              </span>
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

        <div className="mt-20 border-t border-graphite-200 pt-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h3 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-graphite-900 sm:text-4xl">
              {lang === "en"
                ? "What Tohnichi solves on the factory floor."
                : "Masalah yang Tohnichi selesaikan di lantai produksi."}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-graphite-600 lg:justify-self-end">
              {lang === "en"
                ? "The attached field guide describes five common failure modes. The right Tohnichi setup addresses each risk at the point where it begins—during tightening, completion confirmation, or tool verification."
                : "Panduan aplikasi Tohnichi merangkum lima failure mode yang umum terjadi. Solusi yang tepat mengendalikan setiap risiko di titik awalnya—saat tightening, konfirmasi penyelesaian, atau verifikasi kondisi alat."}
            </p>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-6">
            {challenges.map((challenge, index) => {
              const cardWidth = index < 3 ? "lg:col-span-2" : "lg:col-span-3";

              return (
                <li
                  key={challenge.id}
                  className={`${cardWidth} relative flex flex-col overflow-hidden border border-graphite-200 bg-white text-graphite-900 shadow-panel`}
                >
                  <div className="flex items-stretch border-b border-graphite-200 bg-white">
                    <div className="flex w-24 shrink-0 flex-col justify-center bg-[#e2b91d] px-4 py-3 text-graphite-900">
                      <span className="text-[9px] font-black uppercase leading-4 tracking-[0.12em]">
                        Trouble
                        <br />
                        shooting
                      </span>
                      <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em]">
                        Case {index + 1}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-graphite-500">
                        {lang === "en" ? "Manufacturing risk" : "Risiko manufaktur"}
                      </p>
                      <span className="text-2xl font-black text-graphite-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-6 p-5 sm:p-6">
                    <div>
                      <h4 className="text-xl font-bold leading-snug">{text(challenge.title, lang)}</h4>
                      <p className="mt-3 text-sm leading-6 text-graphite-500">{text(challenge.problem, lang)}</p>
                    </div>
                    <TighteningRiskVisual challenge={challenge} lang={lang} />
                  </div>

                  <div className="flex justify-center py-3" aria-hidden="true">
                    <span className="h-12 w-14 bg-[#e2b91d] [clip-path:polygon(18%_0,82%_0,82%_48%,100%_48%,50%_100%,0_48%,18%_48%)]" />
                  </div>

                  <div className="border-t border-[#d8c979] bg-[#fffaf0] p-5 sm:p-6">
                    <div className="inline-flex bg-[#e2b91d] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-graphite-900">
                      {lang === "en" ? "Solution" : "Solusi"}
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_9rem] sm:items-start">
                      <div>
                        <h5 className="text-base font-bold leading-snug text-graphite-900">
                          {text(challenge.solutionTitle, lang)}
                        </h5>
                        <p className="mt-3 text-sm leading-6 text-graphite-600">{text(challenge.solution, lang)}</p>
                      </div>
                      <SolutionVisual challenge={challenge} lang={lang} />
                    </div>

                    <div className="mt-5 flex items-start gap-3 border-t border-[#dfd4a0] pt-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true" />
                      <p className="text-xs font-bold leading-5 text-graphite-700">{text(challenge.result, lang)}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 grid gap-px border border-graphite-200 bg-graphite-200 shadow-panel md:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-signal-500 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {lang === "en" ? "The tightening objective" : "Tujuan tightening"}
            </p>
            <p className="mt-3 max-w-3xl text-2xl font-bold leading-snug text-white sm:text-3xl">
              {lang === "en"
                ? "Do not inspect quality into the product. Control it at every bolt."
                : "Jangan menunggu masalah quality ditemukan saat inspeksi. Kendalikan sejak setiap baut dikencangkan."}
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
