import { CheckCircle2 } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { TohnichiProductVideo } from "@/components/TohnichiProductVideo";
import { TohnichiProductPromotionCarousel } from "@/components/TohnichiProductPromotionCarousel";
import { withLang, type Language } from "@/lib/i18n";

export function TohnichiBrandEducation({ lang }: { lang: Language }) {
  return (
    <>
      <section id="tohnichi-demonstration" className="scroll-mt-24 bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
              TOHNICHI Mfg. Co., Ltd.
            </p>
            <h2 className="text-balance text-2xl font-bold tracking-normal text-graphite-900 md:text-4xl">
              {lang === "en" ? "Precision technology from Japan since 1949." : "Teknologi presisi dari Jepang sejak tahun 1949."}
            </h2>
            <div className="mt-6">
              <CTAButton href={withLang("/tohnichi-torsi-tepat", lang)} variant="ghost">
                {lang === "en" ? "Why correct torque matters" : "Mengapa torsi yang tepat penting"}
              </CTAButton>
            </div>
            <div className="mt-7 border-t border-graphite-200 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
                {lang === "en" ? "Torque wrench" : "Kunci torsi"}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-snug text-graphite-900 md:text-2xl">
                {lang === "en"
                  ? "Tighten bolts with precision and repeatability."
                  : "Kencangkan baut dengan mudah, presisi, dan konsisten."}
              </h3>
              <p className="mt-3 text-sm leading-6 text-graphite-500">
                {lang === "en"
                  ? "CSE helps match torque tools to production, inspection, small torque, calibration, and poka-yoke requirements."
                  : "CSE membantu mencocokkan torque tools untuk produksi, inspeksi, torsi kecil, kalibrasi, dan kebutuhan poka-yoke."}
              </p>
            </div>
          </div>
          <div className="overflow-hidden border border-graphite-200 bg-graphite-900 shadow-panel">
            <TohnichiProductVideo lang={lang} />
            <a
              href="https://www.youtube.com/watch?v=vtZKwdSp5Ow"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring block border-t border-white/15 bg-graphite-900 px-5 py-4 text-sm font-bold leading-6 text-white underline decoration-white/30 underline-offset-4 transition hover:bg-industrial-800 hover:decoration-white"
            >
              {lang === "en" ? "Watch QL+ / CL+ on TOHNICHI’s official YouTube channel" : "Tonton QL+ / CL+ di kanal YouTube resmi TOHNICHI"}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 text-white">
        <div className="container-page py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.62fr)_minmax(0,1.38fr)] lg:items-start">
            <section
              className="border border-white/15 bg-white/[0.025] p-6 sm:p-7"
              aria-labelledby="tohnichi-safety-title"
            >
              <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Safety first
              </p>
              <h2
                id="tohnichi-safety-title"
                className="mt-4 text-balance text-2xl font-bold leading-tight tracking-normal sm:text-3xl"
              >
                {lang === "en"
                  ? "Avoid under-tightening and over-tightening."
                  : "Utamakan safety. Hindari baut yang kurang kencang atau terlalu kencang."}
              </h2>
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  {lang === "en"
                    ? "Stages to tightening assurance"
                    : "Tahapan menuju tightening assurance"}
                </p>
                <ol className="mt-5">
                  {[
                    {
                      number: "01",
                      title: lang === "en" ? "Define the standard" : "Tentukan standar",
                      body:
                        lang === "en"
                          ? "Set the torque value, tolerance, and work method."
                          : "Tetapkan nilai torsi, toleransi, dan metode kerja."
                    },
                    {
                      number: "02",
                      title: lang === "en" ? "Control tightening" : "Kendalikan tightening",
                      body:
                        lang === "en"
                          ? "Use the correct torque tool and prevent missed work."
                          : "Gunakan torque tool yang tepat dan cegah proses terlewat."
                    },
                    {
                      number: "03",
                      title: lang === "en" ? "Verify the result" : "Verifikasi hasil",
                      body:
                        lang === "en"
                          ? "Inspect, record, and trace each tightening result."
                          : "Periksa, rekam, dan telusuri setiap hasil tightening."
                    }
                  ].map((stage) => (
                    <li
                      key={stage.number}
                      className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-6"
                    >
                      <span
                        className="absolute bottom-0 left-[1.22rem] top-10 w-px bg-white/15"
                        aria-hidden="true"
                      />
                      <span className="relative z-10 flex h-10 w-10 items-center justify-center border border-signal-500/45 bg-graphite-900 font-mono text-xs font-black text-signal-500">
                        {stage.number}
                      </span>
                      <div className="pt-0.5">
                        <p className="text-sm font-bold leading-5 text-white">{stage.title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/55">{stage.body}</p>
                      </div>
                    </li>
                  ))}
                  <li className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center bg-[#f4c91d] text-graphite-900">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="border border-[#f4c91d]/40 bg-[#f4c91d]/10 px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#f4c91d]">
                        {lang === "en" ? "Controlled outcome" : "Hasil terkendali"}
                      </p>
                      <p className="mt-1 text-sm font-bold leading-5 text-white">
                        Tightening Assurance System
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <div className="min-w-0">
              <TohnichiProductPromotionCarousel lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
