import { CheckCircle2, ChevronDown, ExternalLink, Info } from "lucide-react";
import type {
  TohnichiProductFamilyDetail,
  TohnichiSpecificationTable
} from "@/data/tohnichi-product-details";
import { text, type Language } from "@/lib/i18n";

const indonesiaLabelReplacements: Array<[RegExp, string]> = [
  [/\bS\.?\s*I\.?\s*MODEL\b/gi, "Model S.I."],
  [/\bMETRIC MODEL\b/gi, "Model metrik"],
  [/\bAMERICAN MODEL\b/gi, "Model Amerika"],
  [/\bMODEL\s*\/\s*TYPE\b/gi, "Model/tipe"],
  [/\bMODEL\b/gi, "Model"],
  [/\bTORQUE RANGE\b/gi, "Rentang torsi"],
  [/\bMEASUREMENT RANGE\b/gi, "Rentang pengukuran"],
  [/MIN\.?\s*-\s*MAX\.?/gi, "Min.-maks."],
  [/GRAD(?:UATION)?\.?/gi, "Graduasi"],
  [/\bAPPLICABLE SCREW\b/gi, "Sekrup yang sesuai"],
  [/\bAPPLICABLE BOLT\b/gi, "Baut yang sesuai"],
  [/\bAPPLICABLE MODELS?\b/gi, "Model yang sesuai"],
  [/\bSMALL SCREW\b/gi, "Sekrup kecil"],
  [/\bTAPPING SCREW\b/gi, "Sekrup tapping"],
  [/\bALLOWABLE TORQUE\b/gi, "Torsi yang diizinkan"],
  [/\bMAX\.?\s*HAND FORCE\b/gi, "Gaya tangan maksimum"],
  [/\bDIMENSION\b/gi, "Dimensi"],
  [/\bOVERALL LENGTH\b/gi, "Panjang total"],
  [/\bEFFECTIVE LENGTH\b/gi, "Panjang efektif"],
  [/\bOUTSIDE WIDTH\b/gi, "Lebar luar"],
  [/\bTHICKNESS\b/gi, "Ketebalan"],
  [/\bLENGTH\b/gi, "Panjang"],
  [/\bWEIGHT\b/gi, "Berat"],
  [/\bSQ\.?\s*DRIVE\b/gi, "Square drive"],
  [/\bDATA MEMORY\b/gi, "Memori data"],
  [/\bDISPLAY\b/gi, "Layar"],
  [/\bOUTPUT\b/gi, "Keluaran"],
  [/\bINPUT\b/gi, "Masukan"],
  [/\bOPERATING TEMPERATURE RANGE\b/gi, "Rentang suhu operasi"],
  [/\bMEASUREMENT METHOD\b/gi, "Metode pengukuran"],
  [/\bMEASUREMENT TARGET\b/gi, "Target pengukuran"],
  [/\bCOMPLIANT MODELS\b/gi, "Model kompatibel"],
  [/\bOPEN WRENCH HEAD\b/gi, "Kepala open-end wrench"],
  [/\bRING HEAD\b/gi, "Kepala ring"],
  [/\bRATCHET HEAD\b/gi, "Kepala ratchet"],
  [/\bSQUARE DRIVE HEAD\b/gi, "Kepala square drive"],
  [/\bHEX HEAD\b/gi, "Kepala hex"],
  [/\bHOOK HEAD\b/gi, "Kepala hook"],
  [/\bADJUSTABLE OPEN END HEAD\b/gi, "Kepala open-end adjustable"],
  [/\bPIPE WRENCH HEADS?\b/gi, "Kepala pipe wrench"],
  [/\bINCH SIZES\b/gi, "Ukuran inci"],
  [/\bBODY SIZE\b/gi, "Ukuran body"],
  [/\bJAN CODE\b/gi, "Kode JAN"],
  [/\bINVENTORY\b/gi, "Stok"],
  [/\bPRICES?\b/gi, "Harga"],
  [/\bCOMMON STEEL\b/gi, "Baja umum"],
  [/\bHIGH TENSION\b/gi, "Baja high-tension"],
  [/\bVALUE\b/gi, "Nilai"]
];

function technicalLabel(label: string, lang: Language) {
  if (lang === "en") return label;
  return indonesiaLabelReplacements.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    label
  );
}

function tableTitle(title: string, index: number, lang: Language) {
  if (/^Model options \d+$/i.test(title)) {
    return lang === "en" ? `Model options ${index + 1}` : `Pilihan model ${index + 1}`;
  }
  if (/^Specifications(?: \d+)?$/i.test(title)) {
    return lang === "en" ? title : title.replace("Specifications", "Spesifikasi");
  }
  return technicalLabel(title, lang);
}

function CommonSpecificationTable({
  productName,
  table,
  lang
}: {
  productName: string;
  table: TohnichiSpecificationTable;
  lang: Language;
}) {
  if (!table.commonSpecifications?.length) return null;
  return (
    <div className="overflow-hidden border border-graphite-200 bg-white">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {lang === "en"
            ? `${productName} common specifications`
            : `Spesifikasi umum ${productName}`}
        </caption>
        <thead>
          <tr className="bg-graphite-800 text-white">
            <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
              {lang === "en" ? "Parameter" : "Parameter"}
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]">
              {lang === "en" ? "Specification" : "Spesifikasi"}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-graphite-200">
          {table.commonSpecifications.map((specification, index) => (
            <tr key={`${specification.label}-${index}`} className={index % 2 ? "bg-graphite-50/70" : "bg-white"}>
              <th scope="row" className="w-[38%] px-4 py-3 text-sm font-bold text-graphite-800">
                {technicalLabel(specification.label, lang)}
              </th>
              <td className="px-4 py-3 text-sm leading-6 text-graphite-600">
                {specification.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModelOptionTable({
  productName,
  table,
  lang
}: {
  productName: string;
  table: TohnichiSpecificationTable;
  lang: Language;
}) {
  if (!table.rows.length || !table.columns.length) return null;
  const visibleColumns = new Set(table.columns);
  const hasAdditionalDetails = table.rows.some((row) =>
    row.details.some((detail) => !visibleColumns.has(detail.label))
  );

  return (
    <>
      <p className="mb-2 text-xs font-semibold text-graphite-500 md:hidden">
        {lang === "en"
          ? "Swipe or scroll sideways to compare every model."
          : "Geser tabel ke samping untuk membandingkan seluruh model."}
      </p>
      <div className="max-w-full overflow-x-auto border border-graphite-200 bg-white shadow-sm">
        <table className="w-full min-w-[1180px] border-collapse text-left">
          <caption className="sr-only">
            {lang === "en"
              ? `${productName} model and option specifications`
              : `Spesifikasi model dan opsi ${productName}`}
          </caption>
          <thead>
            <tr className="border-b border-graphite-300 bg-graphite-800 text-white">
              {table.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="min-w-[130px] border-r border-graphite-600 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.06em] last:border-r-0"
                >
                  {technicalLabel(column, lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-200">
            {table.rows.map((row, rowIndex) => (
              <tr key={row.key} className={rowIndex % 2 ? "bg-graphite-50/70" : "bg-white"}>
                {row.values.map((value, valueIndex) => (
                  <td
                    key={`${row.key}-${table.columns[valueIndex]}`}
                    className={`whitespace-nowrap border-r border-graphite-200 px-3 py-3 text-center text-sm last:border-r-0 ${
                      valueIndex === 0 ? "font-bold text-graphite-900" : "text-graphite-600"
                    }`}
                  >
                    {value || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasAdditionalDetails ? (
        <details className="group mt-4 border border-graphite-200 bg-white">
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-graphite-800">
            <span>
              {lang === "en"
                ? "Complete dimensions and technical details for every model"
                : "Dimensi dan detail teknis lengkap setiap model"}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="border-t border-graphite-200 p-4">
            <div className="grid gap-3 lg:grid-cols-2">
              {table.rows.map((row) => {
                const additionalDetails = row.details.filter(
                  (detail) => !visibleColumns.has(detail.label)
                );
                if (!additionalDetails.length) return null;
                return (
                  <article key={`${row.key}-details`} className="border border-graphite-200">
                    <h4 className="bg-graphite-50 px-4 py-3 text-sm font-bold text-graphite-900">
                      {row.model}
                    </h4>
                    <dl className="divide-y divide-graphite-100">
                      {additionalDetails.map((detail, index) => (
                        <div key={`${detail.label}-${index}`} className="grid grid-cols-[0.52fr_0.48fr] gap-3 px-4 py-2.5">
                          <dt className="text-xs font-semibold leading-5 text-graphite-600">
                            {technicalLabel(detail.label, lang)}
                          </dt>
                          <dd className="text-right text-xs leading-5 text-graphite-700">
                            {detail.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                );
              })}
            </div>
          </div>
        </details>
      ) : null}
    </>
  );
}

export function TohnichiSpecificationTables({
  productName,
  detail,
  lang
}: {
  productName: string;
  detail: TohnichiProductFamilyDetail;
  lang: Language;
}) {
  const hasTables = detail.specificationTables.length > 0;

  return (
    <section className="bg-graphite-50 py-14">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? "Model and option selection" : "Pemilihan model dan opsi"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-graphite-900">
              {lang === "en"
                ? `${productName} models and specifications`
                : `Model dan spesifikasi ${productName}`}
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            {detail.accuracy ? (
              <span className="inline-flex w-fit items-center gap-2 border border-industrial-200 bg-white px-3 py-2 text-sm font-bold text-industrial-800">
                <CheckCircle2 className="h-4 w-4 text-signal-600" aria-hidden="true" />
                {lang === "en" ? "Accuracy" : "Akurasi"} {detail.accuracy}
              </span>
            ) : null}
            <p className="max-w-2xl text-sm leading-6 text-graphite-500 lg:text-right">
              {text(detail.catalogueReference, lang)}
            </p>
            <a
              href={detail.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-bold text-industrial-700 hover:text-industrial-900"
            >
              {lang === "en" ? "Official Tohnichi product data" : "Data produk resmi Tohnichi"}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {hasTables ? (
          <div className="mt-8 space-y-9">
            {detail.specificationTables.map((table, index) => (
              <article key={`${table.title}-${index}`}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-graphite-900">
                    {tableTitle(table.title, index, lang)}
                  </h3>
                  {table.accuracy && table.accuracy !== detail.accuracy ? (
                    <span className="border border-graphite-200 bg-white px-3 py-1.5 text-xs font-bold text-graphite-700">
                      {lang === "en" ? "Accuracy" : "Akurasi"} {table.accuracy}
                    </span>
                  ) : null}
                </div>
                <ModelOptionTable productName={productName} table={table} lang={lang} />
                <CommonSpecificationTable productName={productName} table={table} lang={lang} />
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden border border-graphite-200 bg-white">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {lang === "en"
                  ? `${productName} selection information`
                  : `Informasi pemilihan ${productName}`}
              </caption>
              <tbody className="divide-y divide-graphite-200">
                <tr>
                  <th scope="row" className="w-[38%] bg-graphite-50 px-5 py-4 text-sm font-bold text-graphite-800">
                    {lang === "en" ? "Product family" : "Product family"}
                  </th>
                  <td className="px-5 py-4 text-sm text-graphite-600">{productName}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-graphite-50 px-5 py-4 text-sm font-bold text-graphite-800">
                    {lang === "en" ? "Configuration" : "Konfigurasi"}
                  </th>
                  <td className="px-5 py-4 text-sm leading-6 text-graphite-600">
                    {lang === "en"
                      ? "Selected according to the application, connected equipment, communication method, and quality-control requirements."
                      : "Dipilih berdasarkan aplikasi, peralatan yang terhubung, metode komunikasi, dan kebutuhan quality control."}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="bg-graphite-50 px-5 py-4 text-sm font-bold text-graphite-800">
                    {lang === "en" ? "Ordering information" : "Informasi pemesanan"}
                  </th>
                  <td className="px-5 py-4 text-sm leading-6 text-graphite-600">
                    {lang === "en"
                      ? "Include the application, required function, connected model, quantity, and working environment in the RFQ."
                      : "Sertakan aplikasi, fungsi yang dibutuhkan, model yang terhubung, kuantitas, dan lingkungan kerja dalam RFQ."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {detail.notes.length || detail.standardAccessories.length ? (
          <div className={`mt-6 grid gap-4 ${detail.notes.length && detail.standardAccessories.length ? "md:grid-cols-2" : ""}`}>
            {detail.notes.length ? (
              <article className="border border-graphite-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-signal-600" aria-hidden="true" />
                  <h3 className="text-base font-bold text-graphite-900">
                    {lang === "en" ? "Notes" : "Catatan"}
                  </h3>
                </div>
                <ol className="mt-4 space-y-2 pl-5 text-sm leading-6 text-graphite-600">
                  {detail.notes.map((note) => (
                    <li key={note.en} className="list-decimal">{text(note, lang)}</li>
                  ))}
                </ol>
              </article>
            ) : null}
          </div>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-graphite-500">
          {lang === "en"
            ? "Confirm the final model, current specification, compatibility, and availability with CSE before ordering."
            : "Konfirmasikan model akhir, spesifikasi terkini, kompatibilitas, dan ketersediaan dengan CSE sebelum memesan."}
        </p>
      </div>
    </section>
  );
}
