import { CheckCircle2, ExternalLink, Info, Ruler } from "lucide-react";
import type { TohnichiProductFamilyDetail } from "@/data/tohnichi-product-details";
import { text, type Language } from "@/lib/i18n";

function Value({ children, strong = false }: { children?: string; strong?: boolean }) {
  return (
    <td className={`whitespace-nowrap border-r border-graphite-200 px-3 py-3 text-center text-sm last:border-r-0 ${strong ? "font-bold text-graphite-900" : "text-graphite-600"}`}>
      {children ?? "—"}
    </td>
  );
}

export function TohnichiModelTable({
  productName,
  detail,
  lang
}: {
  productName: string;
  detail: TohnichiProductFamilyDetail;
  lang: Language;
}) {
  const displayedModels = detail.models.filter(
    (model) => model.siModel || model.metricModel
  );

  return (
    <section className="bg-graphite-50 py-14">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Model selection" : "Pemilihan model"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">
              {lang === "en" ? `${productName} models and specifications` : `Model dan spesifikasi ${productName}`}
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <span className="inline-flex w-fit items-center gap-2 border border-industrial-200 bg-white px-3 py-2 text-sm font-bold text-industrial-800">
              <CheckCircle2 className="h-4 w-4 text-signal-600" aria-hidden="true" />
              {lang === "en" ? "Accuracy" : "Akurasi"} {detail.accuracy}
            </span>
            <a
              href={detail.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-bold text-industrial-700 hover:text-industrial-900"
            >
              {lang === "en" ? "Official TOHNICHI product data" : "Data produk resmi TOHNICHI"}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold text-graphite-500 md:hidden">
          {lang === "en"
            ? "Swipe or scroll sideways to compare every model and unit system."
            : "Geser tabel ke samping untuk membandingkan seluruh model dan sistem unit."}
        </p>

        <div className="mt-3 max-w-full overflow-x-auto border border-graphite-200 bg-white shadow-sm md:mt-7">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <caption className="sr-only">
              {lang === "en" ? `${productName} model specifications` : `Spesifikasi model ${productName}`}
            </caption>
            <thead>
              <tr className="border-b border-graphite-300">
                <th rowSpan={2} scope="col" className="bg-amber-100 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
                  {lang === "en" ? "S.I. model" : "Model S.I."}
                </th>
                <th colSpan={2} scope="colgroup" className="border-l border-amber-300 bg-amber-100 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
                  {lang === "en" ? "Torque [cN·m]" : "Torsi [cN·m]"}
                </th>
                <th rowSpan={2} scope="col" className="border-l border-emerald-300 bg-emerald-100 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-emerald-950">
                  {lang === "en" ? "Metric model" : "Model metrik"}
                </th>
                <th colSpan={2} scope="colgroup" className="border-l border-emerald-300 bg-emerald-100 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-emerald-950">
                  {lang === "en" ? "Torque [kgf·cm]" : "Torsi [kgf·cm]"}
                </th>
                <th rowSpan={2} scope="col" className="border-l border-graphite-300 bg-graphite-200 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-graphite-800">
                  {lang === "en" ? "Overall length [mm]" : "Panjang total [mm]"}
                </th>
                <th rowSpan={2} scope="col" className="border-l border-graphite-300 bg-graphite-200 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-graphite-800">
                  {lang === "en" ? "Weight [g]" : "Berat [g]"}
                </th>
              </tr>
              <tr className="border-b border-graphite-300">
                <th scope="col" className="border-l border-amber-300 bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-950">
                  {lang === "en" ? "Min.-max." : "Min.-maks."}
                </th>
                <th scope="col" className="border-l border-amber-300 bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-950">
                  Grad.
                </th>
                <th scope="col" className="border-l border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-950">
                  {lang === "en" ? "Min.-max." : "Min.-maks."}
                </th>
                <th scope="col" className="border-l border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-950">
                  Grad.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200">
              {displayedModels.map((model, index) => (
                <tr key={model.key} className={index % 2 === 1 ? "bg-graphite-50/70" : "bg-white"}>
                  <Value strong>{model.siModel}</Value>
                  <Value>{model.siRange}</Value>
                  <Value>{model.siGraduation}</Value>
                  <Value strong>{model.metricModel}</Value>
                  <Value>{model.metricRange}</Value>
                  <Value>{model.metricGraduation}</Value>
                  <Value>{model.overallLengthMm}</Value>
                  <Value>{model.weightG}</Value>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="border border-graphite-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-signal-600" aria-hidden="true" />
              <h3 className="text-base font-bold text-graphite-900">{lang === "en" ? "Notes" : "Catatan"}</h3>
            </div>
            <ol className="mt-4 space-y-2 pl-5 text-sm leading-6 text-graphite-600">
              {detail.notes.map((note) => (
                <li key={note.en} className="list-decimal">{text(note, lang)}</li>
              ))}
            </ol>
          </article>
          <article className="border border-graphite-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-industrial-700" aria-hidden="true" />
              <h3 className="text-base font-bold text-graphite-900">
                {lang === "en" ? "Standard accessories" : "Aksesori standar"}
              </h3>
            </div>
            <ol className="mt-4 space-y-2 pl-5 text-sm leading-6 text-graphite-600">
              {detail.standardAccessories.map((accessory) => (
                <li key={accessory.en} className="list-decimal">{text(accessory, lang)}</li>
              ))}
            </ol>
          </article>
        </div>

        <p className="mt-4 text-xs leading-5 text-graphite-500">
          {lang === "en"
            ? "Confirm the final model, current specification, and availability with CSE before ordering."
            : "Konfirmasikan model akhir, spesifikasi terkini, dan ketersediaan dengan CSE sebelum memesan."}
        </p>
      </div>
    </section>
  );
}
