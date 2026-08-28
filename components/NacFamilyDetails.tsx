import { BookOpen, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import type { NacCouplingProductFamilyDetail } from "@/data/nac-coupling-product-details";
import type { NacProductFamilyDetail } from "@/data/nac-product-details";
import { text, type Language } from "@/lib/i18n";

const fastenerSafetyPoints = [
  {
    id: "Gunakan safety glasses dan jangan menyentuh socket atau bit yang sedang berputar.",
    en: "Wear safety glasses and never touch a rotating socket or bit."
  },
  {
    id: "Putuskan power source sebelum memasang atau mengganti socket, bit, ring, atau pin.",
    en: "Disconnect the power source before installing or changing a socket, bit, ring, or pin."
  },
  {
    id: "Ganti tool, retaining ring, atau pin yang retak, aus, berubah bentuk, atau rusak.",
    en: "Replace tools, retaining rings, or pins that are cracked, worn, deformed, or damaged."
  },
  {
    id: "Gunakan ukuran yang tepat dan masukkan fastener sepenuhnya sebelum tool dijalankan.",
    en: "Use the correct size and fully engage the fastener before operating the tool."
  }
];

const couplingSafetyPoints = [
  {
    id: "Isolasi, depressurize, dan drain line sebelum disconnection atau maintenance.",
    en: "Isolate, depressurize, and drain the line before disconnection or maintenance."
  },
  {
    id: "Jangan melebihi working pressure, temperature, atau chemical compatibility untuk exact model.",
    en: "Never exceed the working pressure, temperature, or chemical compatibility limits of the exact model."
  },
  {
    id: "Pastikan socket dan plug berasal dari series dan size yang kompatibel; jangan memaksa connection.",
    en: "Make sure socket and plug use a compatible series and size; never force the connection."
  },
  {
    id: "Ganti coupling atau seal yang bocor, retak, korosi, berubah bentuk, atau tidak mengunci dengan benar.",
    en: "Replace any coupling or seal that leaks, cracks, corrodes, deforms, or no longer locks correctly."
  }
];

export function NacFamilyDetails({
  productName,
  detail,
  lang,
  hideCatalogueSummary = false
}: {
  productName: string;
  detail: NacProductFamilyDetail | NacCouplingProductFamilyDetail;
  lang: Language;
  hideCatalogueSummary?: boolean;
}) {
  const isCoupling = "kind" in detail && detail.kind === "coupling";
  const safetyPoints = isCoupling ? couplingSafetyPoints : fastenerSafetyPoints;

  return (
    <section id="catalogue-model-options" className="scroll-mt-24 bg-graphite-50 py-14">
      <div className="container-page">
        <div className={`grid gap-6 ${hideCatalogueSummary ? "" : "lg:grid-cols-[0.78fr_1.22fr] lg:items-end"}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Catalogue family selection" : "Pemilihan keluarga katalog"}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-graphite-900">
              {lang === "en"
                ? `${productName} models and options`
                : `Model dan pilihan ${productName}`}
            </h2>
          </div>
          {hideCatalogueSummary ? null : (
            <div className="flex flex-col gap-3 lg:items-end">
              <span className="inline-flex w-fit items-center gap-2 border border-industrial-200 bg-white px-3 py-2 text-sm font-bold text-industrial-800">
                <BookOpen className="h-4 w-4 text-signal-600" aria-hidden="true" />
                {detail.catalogueReference}
              </span>
              <p className="max-w-2xl text-sm leading-6 text-graphite-500 lg:text-right">
                {isCoupling
                  ? lang === "en"
                    ? "The table summarizes connection configurations and real catalogue model families. Final selection depends on fluid, pressure, temperature, flow, size, body, seal, and disconnection behavior."
                    : "Tabel merangkum konfigurasi koneksi dan keluarga model katalog. Pemilihan akhir bergantung pada fluida, pressure, temperatur, flow, size, body, seal, dan perilaku saat disconnected."
                  : lang === "en"
                    ? "The table summarizes catalogue families and model prefixes. Final part numbers depend on the exact drive, fastener, length, retention, and access requirements."
                    : "Tabel merangkum keluarga katalog dan prefix model. Part number akhir bergantung pada drive, fastener, panjang, retention, dan kebutuhan akses yang tepat."}
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs font-semibold text-graphite-500 md:hidden">
          {lang === "en"
            ? "Swipe or scroll sideways to compare every catalogue option."
            : "Geser tabel ke samping untuk membandingkan seluruh pilihan katalog."}
        </p>

        <div className="mt-3 max-w-full overflow-x-auto border border-graphite-200 bg-white shadow-sm md:mt-7">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <caption className="sr-only">
              {lang === "en"
                ? `${productName} catalogue models and options`
                : `Model dan pilihan katalog ${productName}`}
            </caption>
            <thead>
              <tr className="border-b border-graphite-300 bg-industrial-800 text-white">
                <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {isCoupling ? (lang === "en" ? "Configuration" : "Konfigurasi") : (lang === "en" ? "Option" : "Pilihan")}
                </th>
                <th scope="col" className="border-l border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {isCoupling ? (lang === "en" ? "Models" : "Model") : (lang === "en" ? "Series / model prefix" : "Series / prefix model")}
                </th>
                <th scope="col" className="border-l border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {isCoupling ? (lang === "en" ? "Valve / function" : "Valve / fungsi") : (lang === "en" ? "Tool interface" : "Interface tool")}
                </th>
                <th scope="col" className="border-l border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {isCoupling ? (lang === "en" ? "Connection / size" : "Koneksi / ukuran") : (lang === "en" ? "Working end / size" : "Working end / ukuran")}
                </th>
                <th scope="col" className="border-l border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {isCoupling ? (lang === "en" ? "Body / seal / pressure" : "Body / seal / pressure") : (lang === "en" ? "Length range" : "Rentang panjang")}
                </th>
                <th scope="col" className="border-l border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
                  {lang === "en" ? "Application" : "Aplikasi"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200">
              {detail.options.map((option, optionIndex) => (
                <tr key={option.key} className={optionIndex % 2 === 1 ? "bg-graphite-50/70" : "bg-white"}>
                  <th scope="row" className="px-4 py-4 text-sm font-bold text-graphite-900">
                    {text(option.option, lang)}
                  </th>
                  <td className="border-l border-graphite-200 px-4 py-4 font-mono text-xs font-bold text-industrial-800">
                    {option.series}
                  </td>
                  <td className="border-l border-graphite-200 px-4 py-4 text-sm text-graphite-600">
                    {option.toolInterface}
                  </td>
                  <td className="border-l border-graphite-200 px-4 py-4 text-sm text-graphite-600">
                    {option.workingEnd}
                  </td>
                  <td className="border-l border-graphite-200 px-4 py-4 text-sm text-graphite-600">
                    {option.lengths}
                  </td>
                  <td className="border-l border-graphite-200 px-4 py-4 text-sm leading-6 text-graphite-600">
                    {text(option.application, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-signal-600" aria-hidden="true" />
            <h3 className="text-xl font-bold text-graphite-900">
              {lang === "en" ? "Information to confirm before selection" : "Informasi yang perlu dikonfirmasi"}
            </h3>
          </div>
          <div className="mt-5 grid gap-px overflow-hidden border border-graphite-200 bg-graphite-200 sm:grid-cols-2 lg:grid-cols-4">
            {detail.selectionChecklist.map((item) => (
              <article key={item.label.en} className="bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-signal-600">
                  {text(item.label, lang)}
                </p>
                <p className="mt-3 text-sm leading-6 text-graphite-600">
                  {text(item.value, lang)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="border border-graphite-200 bg-white p-5 md:p-6">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-industrial-700" aria-hidden="true" />
              <h3 className="text-base font-bold text-graphite-900">
                {lang === "en" ? "Catalogue notes" : "Catatan katalog"}
              </h3>
            </div>
            <ol className="mt-4 space-y-2 pl-5 text-sm leading-6 text-graphite-600">
              {detail.notes.map((note) => (
                <li key={note.en} className="list-decimal">
                  {text(note, lang)}
                </li>
              ))}
            </ol>
          </article>

          <article className="border border-signal-200 bg-[#fff8f6] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-signal-600" aria-hidden="true" />
              <h3 className="text-base font-bold text-graphite-900">
                {isCoupling
                  ? lang === "en"
                    ? "Quick-coupling safety essentials"
                    : "Panduan safety quick coupling"
                  : lang === "en"
                    ? "NAC catalogue safety essentials"
                    : "Panduan safety utama katalog NAC"}
              </h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-graphite-600">
              {safetyPoints.map((point) => (
                <li key={point.en} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-signal-500" aria-hidden="true" />
                  <span>{text(point, lang)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-4 text-xs leading-5 text-graphite-500">
          {lang === "en"
            ? "Catalogue dimensions and availability may change. Confirm the final part number, current specification, and delivery status with CSE before ordering."
            : "Dimensi katalog dan ketersediaan dapat berubah. Konfirmasikan part number akhir, spesifikasi terkini, dan status pengiriman dengan CSE sebelum memesan."}
        </p>
      </div>
    </section>
  );
}
