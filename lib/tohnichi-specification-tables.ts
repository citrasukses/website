import type { TohnichiSpecificationTable, TohnichiTechnicalDetail } from "@/data/tohnichi-product-details";

export function normalizedColumnKey(label: string) {
  const normalized = label
    .normalize("NFKC")
    .replace(/[’′]/g, "'")
    .replace(/\bMETIRC\b/gi, "METRIC")
    .replace(/\bDIMENSIONS\b/gi, "DIMENSION")
    .replace(/\bS\.I\.\s*RANGE\b/gi, "S.I. RANGE")
    .replace(/\bS\.?\s*I\.?\s*MODEL\b/gi, "S.I. MODEL")
    .replace(/\s+/g, " ")
    .replace(/\s*([/[\]()])\s*/g, "$1")
    .replace(/MIN\.?\s*-\s*MAX\.?/gi, "MIN.-MAX.")
    .trim()
    .toUpperCase();

  return normalized;
}

function isGenericTableTitle(title: string) {
  return /^Model options \d+$/i.test(title) || /^Specifications(?: \d+)?$/i.test(title);
}

function isAmericanColumn(label: string) {
  const normalized = normalizedColumnKey(label);
  if (/AMERICAN|AMERICAL/.test(normalized) && normalized.includes("MODEL")) return true;

  return /(?:LBF|OZF)\s*[・·.]?\s*(?:IN|FT)/.test(normalized);
}

function isModelColumn(label: string) {
  const normalized = normalizedColumnKey(label);
  if (/^(?:PART|CATALOGUE)\s*NO\.?$/.test(normalized)) return true;
  if (/\b(?:MIN|MAX|SCALE|GRAD|DIGIT)\b/.test(normalized)) return false;
  return /^(?:(?:S\.I\.|METRIC)\s+)?MODEL(?:\/TYPE)?(?:\s|$|\(|\[)/.test(normalized);
}

export type ConsolidatedRow = {
  key: string;
  values: string[];
};

export type ConsolidatedSpecification = {
  columns: string[];
  rows: ConsolidatedRow[];
  commonSpecifications: TohnichiTechnicalDetail[];
  identityColumnIndexes: number[];
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

export function consolidateTables(
  tables: TohnichiSpecificationTable[]
): ConsolidatedSpecification {
  const candidateModelTables = tables
    .map((table) => {
      const primary = table.columns.findIndex((label) => (isModelColumn(label) || normalizedColumnKey(label) === "NAME") && !isAmericanColumn(label));
      return {
        table,
        columns: table.columns
        .map((label, originalIndex) => ({ label, originalIndex }))
        .filter(({ label }) => !isAmericanColumn(label))
        .map((column) => column.originalIndex === primary ? { ...column, label: "MODEL" } : column)
      };
    })
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
    return { columns: [], rows: [], commonSpecifications, identityColumnIndexes: [] };
  }

  const includeCategory =
    modelTables.length > 1 &&
    modelTables.every(({ table }) => !isGenericTableTitle(table.title));
  const columnLabels = new Map<string, string>();
  if (candidateModelTables.some(({ columns }) => columns.some(({ label }) => label === "MODEL"))) columnLabels.set("MODEL", "MODEL");
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
      if ([...identityColumnIndexes].every((index) => !values[index]?.trim() || values[index] === "-")) continue;
      const rowSignature = values.join("\u0001");
      if (seenRows.has(rowSignature)) continue;
      seenRows.add(rowSignature);
      rows.push({
        key: `${tableIndex}-${row.key || rowIndex}`,
        values
      });
    }
  }

  return { columns, rows, commonSpecifications, identityColumnIndexes: [...identityColumnIndexes] };
}

export type ModelRowGroup = {
  key: string;
  model: string;
  modelColumnIndex: number;
  rows: Array<ConsolidatedRow & { spans: number[] }>;
};

/** A model is printed once; related option rows retain their exact value pairs. */
export function groupModelRows(specification: ConsolidatedSpecification): ModelRowGroup[] {
  const groups = new Map<string, ModelRowGroup>();
  for (const row of specification.rows) {
    const modelColumnIndex = specification.identityColumnIndexes.find(
      (index) => row.values[index]?.trim() && row.values[index] !== "-"
    ) ?? specification.identityColumnIndexes[0] ?? 0;
    const model = row.values[modelColumnIndex]?.trim() ?? "";
    if (!model || model === "-") continue;
    const key = model.normalize("NFKC").toUpperCase();
    let group = groups.get(key);
    if (!group) {
      group = { key, model, modelColumnIndex, rows: [] };
      groups.set(key, group);
    }
    group.rows.push({ ...row, spans: row.values.map(() => 1) });
  }
  for (const group of groups.values()) {
    // Keep aliases together too, without separating a size from its dimensions.
    group.rows.sort((left, right) => {
      for (const index of specification.identityColumnIndexes) {
        const comparison = left.values[index].localeCompare(right.values[index]);
        if (comparison) return comparison;
      }
      return 0;
    });
    specification.columns.forEach((_, column) => {
      let start = 0;
      while (start < group.rows.length) {
        let end = start + 1;
        while (end < group.rows.length && group.rows[end].values[column] === group.rows[start].values[column]) end += 1;
        group.rows[start].spans[column] = end - start;
        for (let index = start + 1; index < end; index += 1) group.rows[index].spans[column] = 0;
        start = end;
      }
    });
  }
  return [...groups.values()];
}

