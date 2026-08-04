import { CheckCircle2, ExternalLink, Info } from "lucide-react";
import type {
  TohnichiProductFamilyDetail,
  TohnichiSpecificationTable,
  TohnichiTechnicalDetail
} from "@/data/tohnichi-product-details";
import { text, type Language } from "@/lib/i18n";

const indonesiaLabelReplacements: Array<[RegExp, string]> = [
  [/\bS\.?\s*I\.?\s*MODEL\b/gi, "Model S.I."],
  [/\bMETRIC MODEL\b/gi, "Model metrik"],
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
  [/\bCATEGORY\b/gi, "Kategori"],
  [/\bVALUE\b/gi, "Nilai"]
];

function technicalLabel(label: string, lang: Language) {
  if (lang === "en") return label;
  return indonesiaLabelReplacements.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    label
  );
}

function normalizedColumnKey(label: string) {
  const normalized = label
    .normalize("NFKC")
    .replace(/[’′]/g, "'")
    .replace(/\bMETIRC\b/gi, "METRIC")
    .replace(/\bDIMENSIONS\b/gi, "DIMENSION")
    .replace(/\bS\.I\.\s*RANGE\b/gi, "S.I. RANGE")
    .replace(/\s+/g, " ")
    .replace(/\s*([/[\]()])\s*/g, "$1")
    .replace(/MIN\.?\s*-\s*MAX\.?/gi, "MIN.-MAX.")
    .trim()
    .toUpperCase();

  if (/^MODEL\/TYPE(?:\s|$|\()/.test(normalized)) return "MODEL/TYPE";
  return normalized;
}

function isGenericTableTitle(title: string) {
  return /^Model options \d+$/i.test(title) || /^Specifications(?: \d+)?$/i.test(title);
}

function isAmericanColumn(label: string) {
  const normalized = normalizedColumnKey(label);
  if (normalized.includes("AMERICAN") && normalized.includes("MODEL")) return true;

  return /(?:LBF|OZF)\s*[・·.]?\s*(?:IN|FT)/.test(normalized);
}

function isModelColumn(label: string) {
  const normalized = normalizedColumnKey(label);
  return /^(?:(?:S\.I\.|METRIC)\s+)?MODEL(?:\/TYPE)?(?:\s|$|\()/.test(normalized);
}

type ConsolidatedRow = {
  key: string;
  values: string[];
};

type ConsolidatedSpecification = {
  columns: string[];
  rows: ConsolidatedRow[];
  commonSpecifications: TohnichiTechnicalDetail[];
};

function modelTableSignature({
  table,
  columns
}: {
  table: TohnichiSpecificationTable;
  columns: Array<{ label: string; originalIndex: number }>;
}) {
  const titleKey = isGenericTableTitle(table.title)
    ? "__GENERIC__"
    : normalizedColumnKey(table.title);
  const columnKey = columns.map(({ label }) => normalizedColumnKey(label)).join("\u0001");
  const rowKey = table.rows
    .map((row) =>
      columns
        .map(({ originalIndex }) => row.values[originalIndex]?.trim() ?? "")
        .join("\u0001")
    )
    .join("\u0002");

  return `${titleKey}\u0000${columnKey}\u0000${rowKey}`;
}

function isEmbeddedHeaderValue(value: string) {
  const normalized = normalizedColumnKey(value);
  return /^(?:MIN\.-MAX\.|MIN\s*~\s*MAX|GRAD(?:UATION)?\.?|1 DIGIT|OVERALL LENGTH|APPROX\.? WEIGHT(?: \[KG\])?|WEIGHT(?: \[KG\])?|L'|L|ΦD|Φd|ℓ1|ℓ2)$/.test(
    normalized
  );
}

function isEmbeddedHeaderRow(
  row: TohnichiSpecificationTable["rows"][number],
  columns: Array<{ label: string; originalIndex: number }>
) {
  if (columns.length < 2) return false;

  const specificationValues = columns
    .slice(1)
    .map(({ originalIndex }) => row.values[originalIndex]?.trim() ?? "")
    .filter(Boolean);
  if (specificationValues.length < 2) return false;

  const headerValueCount = specificationValues.filter(isEmbeddedHeaderValue).length;
  return headerValueCount >= 2 && headerValueCount / specificationValues.length >= 0.6;
}

function consolidateTables(
  tables: TohnichiSpecificationTable[]
): ConsolidatedSpecification {
  const candidateModelTables = tables
    .map((table) => ({
      table,
      columns: table.columns
        .map((label, originalIndex) => ({ label, originalIndex }))
        .filter(({ label }) => !isAmericanColumn(label))
    }))
    .filter(({ table, columns }) => table.rows.length && columns.length);
  const seenTableSignatures = new Set<string>();
  const modelTables = candidateModelTables.filter((modelTable) => {
    const signature = modelTableSignature(modelTable);
    if (seenTableSignatures.has(signature)) return false;
    seenTableSignatures.add(signature);
    return true;
  });
  const commonSpecifications: TohnichiTechnicalDetail[] = [];
  const commonKeys = new Set<string>();

  for (const table of tables) {
    for (const specification of table.commonSpecifications ?? []) {
      const key = `${normalizedColumnKey(specification.label)}\u0000${specification.value}`;
      if (commonKeys.has(key)) continue;
      commonKeys.add(key);
      commonSpecifications.push(specification);
    }
  }

  if (!modelTables.length) {
    return { columns: [], rows: [], commonSpecifications };
  }

  const includeCategory =
    modelTables.length > 1 &&
    modelTables.every(({ table }) => !isGenericTableTitle(table.title));
  const columnLabels = new Map<string, string>();
  if (includeCategory) columnLabels.set("__CATEGORY__", "CATEGORY");

  for (const { columns: tableColumns } of modelTables) {
    for (const column of tableColumns) {
      const key = normalizedColumnKey(column.label);
      if (!columnLabels.has(key)) columnLabels.set(key, column.label);
    }
  }

  const richerModelNames = new Set(
    modelTables
      .filter(({ columns: tableColumns }) => tableColumns.length > 1)
      .flatMap(({ table, columns: tableColumns }) =>
        table.rows
          .filter((row) => !isEmbeddedHeaderRow(row, tableColumns))
          .map((row) => row.model.trim().toUpperCase())
      )
  );
  const columns = Array.from(columnLabels.values());
  const columnKeys = Array.from(columnLabels.keys());
  const modelColumnIndexes = columnKeys
    .map((key, index) => ({ key, index }))
    .filter(({ key }) => key !== "__CATEGORY__" && isModelColumn(key))
    .map(({ index }) => index);
  const fallbackModelColumnIndex = columnKeys.findIndex(
    (key) => key !== "__CATEGORY__"
  );
  const identityColumnIndexes = new Set(
    modelColumnIndexes.length
      ? modelColumnIndexes
      : fallbackModelColumnIndex >= 0
        ? [fallbackModelColumnIndex]
        : []
  );
  const specificationColumnIndexes = columnKeys
    .map((key, index) => ({ key, index }))
    .filter(
      ({ key, index }) =>
        key !== "__CATEGORY__" && !identityColumnIndexes.has(index)
    )
    .map(({ index }) => index);
  const seenRows = new Set<string>();
  const rows: ConsolidatedRow[] = [];

  for (const [tableIndex, { table, columns: tableColumns }] of modelTables.entries()) {
    const tableColumnKeys = tableColumns.map(({ label }) => normalizedColumnKey(label));
    for (const [rowIndex, row] of table.rows.entries()) {
      if (isEmbeddedHeaderRow(row, tableColumns)) continue;

      const normalizedModel = row.model.trim().toUpperCase();
      if (tableColumns.length === 1 && richerModelNames.has(normalizedModel)) continue;

      const valuesByColumn = new Map<string, string>();
      if (includeCategory) valuesByColumn.set("__CATEGORY__", table.title);
      tableColumnKeys.forEach((key, index) => {
        valuesByColumn.set(key, row.values[tableColumns[index].originalIndex] ?? "");
      });
      const values = columnKeys.map((key) => valuesByColumn.get(key) ?? "");
      if (
        specificationColumnIndexes.length > 0 &&
        specificationColumnIndexes.every((index) => !values[index]?.trim())
      ) {
        continue;
      }
      const rowSignature = values.join("\u0001");
      if (seenRows.has(rowSignature)) continue;
      seenRows.add(rowSignature);
      rows.push({
        key: `${tableIndex}-${row.key || rowIndex}`,
        values
      });
    }
  }

  return { columns, rows, commonSpecifications };
}

type HeaderTone = "amber" | "emerald" | "sky" | "graphite";

const headerToneClasses: Record<
  HeaderTone,
  { top: string; sub: string }
> = {
  amber: {
    top: "border-amber-300 bg-amber-100 text-amber-950",
    sub: "border-amber-300 bg-amber-50 text-amber-950"
  },
  emerald: {
    top: "border-emerald-300 bg-emerald-100 text-emerald-950",
    sub: "border-emerald-300 bg-emerald-50 text-emerald-950"
  },
  sky: {
    top: "border-sky-300 bg-sky-100 text-sky-950",
    sub: "border-sky-300 bg-sky-50 text-sky-950"
  },
  graphite: {
    top: "border-graphite-300 bg-graphite-200 text-graphite-800",
    sub: "border-graphite-300 bg-graphite-100 text-graphite-800"
  }
};

function headerTone(label: string): HeaderTone {
  const normalized = normalizedColumnKey(label);

  if (normalized.includes("METRIC MODEL") || normalized.includes("KGF")) {
    return "emerald";
  }
  if (
    normalized.includes("S.I. MODEL") ||
    /(?:^|\[)(?:C?N)[・·.]?M(?:\]|$)/.test(normalized) ||
    /^(MODEL|MODEL\/TYPE)(?:\s|$|\()/.test(normalized)
  ) {
    return "amber";
  }
  if (
    /(DIMENSION|LENGTH|WIDTH|THICKNESS|WEIGHT|SQ\.?DRIVE|BODY SIZE)/.test(
      normalized
    )
  ) {
    return "graphite";
  }
  return "sky";
}

type HeaderColumn = {
  index: number;
  label: string;
  groupLabel: string;
  subLabel: string | null;
  tone: HeaderTone;
};

type HeaderGroup = {
  key: string;
  label: string;
  tone: HeaderTone;
  columns: HeaderColumn[];
  grouped: boolean;
};

function splitHeaderLabel(label: string) {
  let roundDepth = 0;
  let squareDepth = 0;

  for (let index = 0; index < label.length; index += 1) {
    const character = label[index];
    if (character === "(") roundDepth += 1;
    if (character === ")") roundDepth = Math.max(0, roundDepth - 1);
    if (character === "[") squareDepth += 1;
    if (character === "]") squareDepth = Math.max(0, squareDepth - 1);

    if (
      character === "/" &&
      roundDepth === 0 &&
      squareDepth === 0 &&
      /\s/.test(label[index - 1] ?? "") &&
      /\s/.test(label[index + 1] ?? "")
    ) {
      return {
        groupLabel: label.slice(0, index).trim(),
        subLabel: label.slice(index + 1).trim()
      };
    }
  }

  return { groupLabel: label, subLabel: null };
}

function buildHeaderGroups(columns: string[]) {
  const headerColumns: HeaderColumn[] = columns.map((label, index) => {
    const { groupLabel, subLabel } = splitHeaderLabel(label);
    return {
      index,
      label,
      groupLabel,
      subLabel,
      tone: headerTone(groupLabel)
    };
  });
  const groups: HeaderGroup[] = [];

  for (const column of headerColumns) {
    const previous = groups.at(-1);
    const canJoinPrevious =
      Boolean(column.subLabel) &&
      previous?.grouped &&
      previous.tone === column.tone &&
      normalizedColumnKey(previous.label) === normalizedColumnKey(column.groupLabel);

    if (canJoinPrevious && previous) {
      previous.columns.push(column);
      continue;
    }

    groups.push({
      key: `${column.index}-${column.groupLabel}`,
      label: column.subLabel ? column.groupLabel : column.label,
      tone: column.tone,
      columns: [column],
      grouped: Boolean(column.subLabel)
    });
  }

  return {
    groups,
    hasSubHeaders: headerColumns.some(({ subLabel }) => Boolean(subLabel))
  };
}

function ConsolidatedModelTable({
  productName,
  specification,
  lang
}: {
  productName: string;
  specification: ConsolidatedSpecification;
  lang: Language;
}) {
  if (!specification.rows.length || !specification.columns.length) return null;
  const { groups, hasSubHeaders } = buildHeaderGroups(specification.columns);
  const minimumTableWidth = Math.max(720, specification.columns.length * 130);

  return (
    <>
      <p className="mb-2 text-xs font-semibold text-graphite-500 md:hidden">
        {lang === "en"
          ? "Swipe or scroll sideways to compare every model."
          : "Geser tabel ke samping untuk membandingkan seluruh model."}
      </p>
      <div className="max-w-full overflow-x-auto border border-graphite-200 bg-white shadow-sm">
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth: `${minimumTableWidth}px` }}
        >
          <caption className="sr-only">
            {lang === "en"
              ? `${productName} model and option specifications`
              : `Spesifikasi model dan opsi ${productName}`}
          </caption>
          <thead>
            <tr className="border-b border-graphite-300">
              {groups.map((group) => (
                <th
                  key={group.key}
                  scope={group.grouped ? "colgroup" : "col"}
                  colSpan={group.grouped ? group.columns.length : undefined}
                  rowSpan={!group.grouped && hasSubHeaders ? 2 : undefined}
                  className={`min-w-[130px] border-r px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.06em] last:border-r-0 ${headerToneClasses[group.tone].top}`}
                >
                  {technicalLabel(group.label, lang)}
                </th>
              ))}
            </tr>
            {hasSubHeaders ? (
              <tr className="border-b border-graphite-300">
                {groups.flatMap((group) =>
                  group.grouped
                    ? group.columns.map((column) => (
                        <th
                          key={`${column.index}-${column.subLabel}`}
                          scope="col"
                          className={`min-w-[130px] border-r px-3 py-2 text-center text-xs font-bold last:border-r-0 ${headerToneClasses[column.tone].sub}`}
                        >
                          {technicalLabel(column.subLabel ?? "", lang)}
                        </th>
                      ))
                    : []
                )}
              </tr>
            ) : null}
          </thead>
          <tbody className="divide-y divide-graphite-200">
            {specification.rows.map((row, rowIndex) => (
              <tr key={row.key} className={rowIndex % 2 ? "bg-graphite-50/70" : "bg-white"}>
                {row.values.map((value, valueIndex) => (
                  <td
                    key={`${row.key}-${valueIndex}-${specification.columns[valueIndex]}`}
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
    </>
  );
}

function CommonSpecificationTable({
  productName,
  specifications,
  lang
}: {
  productName: string;
  specifications: TohnichiTechnicalDetail[];
  lang: Language;
}) {
  if (!specifications.length) return null;
  return (
    <div className="overflow-hidden border border-graphite-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {lang === "en"
            ? `${productName} specifications`
            : `Spesifikasi ${productName}`}
        </caption>
        <thead>
          <tr className="border-b border-graphite-300">
            <th
              scope="col"
              className="border-r border-amber-300 bg-amber-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-amber-950"
            >
              Parameter
            </th>
            <th
              scope="col"
              className="bg-emerald-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-emerald-950"
            >
              {lang === "en" ? "Specification" : "Spesifikasi"}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-graphite-200">
          {specifications.map((specification, index) => (
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

export function TohnichiSpecificationTables({
  productName,
  detail,
  lang
}: {
  productName: string;
  detail: TohnichiProductFamilyDetail;
  lang: Language;
}) {
  const consolidated = consolidateTables(detail.specificationTables);
  const hasTables =
    consolidated.rows.length > 0 || consolidated.commonSpecifications.length > 0;

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
          <div className="mt-8">
            {consolidated.rows.length ? (
              <ConsolidatedModelTable
                productName={productName}
                specification={consolidated}
                lang={lang}
              />
            ) : (
              <CommonSpecificationTable
                productName={productName}
                specifications={consolidated.commonSpecifications}
                lang={lang}
              />
            )}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden border border-graphite-200 bg-white">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {lang === "en"
                  ? `${productName} selection information`
                  : `Informasi pemilihan ${productName}`}
              </caption>
              <thead>
                <tr className="border-b border-graphite-300">
                  <th
                    scope="col"
                    className="border-r border-amber-300 bg-amber-100 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-amber-950"
                  >
                    Parameter
                  </th>
                  <th
                    scope="col"
                    className="bg-emerald-100 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-emerald-950"
                  >
                    {lang === "en" ? "Specification" : "Spesifikasi"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-200">
                <tr>
                  <th scope="row" className="w-[38%] border-r border-graphite-200 px-5 py-4 text-sm font-bold text-graphite-800">
                    {lang === "en" ? "Product family" : "Product family"}
                  </th>
                  <td className="px-5 py-4 text-sm text-graphite-600">{productName}</td>
                </tr>
                <tr className="bg-graphite-50/70">
                  <th scope="row" className="border-r border-graphite-200 px-5 py-4 text-sm font-bold text-graphite-800">
                    {lang === "en" ? "Configuration" : "Konfigurasi"}
                  </th>
                  <td className="px-5 py-4 text-sm leading-6 text-graphite-600">
                    {lang === "en"
                      ? "Selected according to the application, connected equipment, communication method, and quality-control requirements."
                      : "Dipilih berdasarkan aplikasi, peralatan yang terhubung, metode komunikasi, dan kebutuhan quality control."}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="border-r border-graphite-200 px-5 py-4 text-sm font-bold text-graphite-800">
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
