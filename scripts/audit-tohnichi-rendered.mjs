import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { load } from "cheerio";

const moduleSource = stripTypeScriptTypes(readFileSync(new URL("../lib/tohnichi-specification-tables.ts", import.meta.url), "utf8"));
const { consolidateTables, groupModelRows } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString("base64")}`);
const root = new URL("../", import.meta.url);
const { products } = JSON.parse(readFileSync(new URL("data/tohnichi-specifications.json", root)));
const catalogue = JSON.parse(readFileSync(new URL("data/tohnichi-products.json", root)));
const slugify = value => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const text = value => value.replace(/\s+/g, " ").trim();

function expandGrid($, rows, width, context) {
  const result = rows.map(() => Array(width));
  rows.forEach((row, rowIndex) => {
    let column = 0;
    $(row).children("th,td").each((_, cell) => {
      while (result[rowIndex][column] !== undefined) column += 1;
      const rowSpan = Number($(cell).attr("rowspan") ?? 1);
      const columnSpan = Number($(cell).attr("colspan") ?? 1);
      for (let y = 0; y < rowSpan; y += 1) for (let x = 0; x < columnSpan; x += 1) {
        assert(rowIndex + y < rows.length && column + x < width, `${context}: cell extends beyond grid`);
        assert.equal(result[rowIndex + y][column + x], undefined, `${context}: overlapping cells`);
        result[rowIndex + y][column + x] = text($(cell).text());
      }
      column += columnSpan;
    });
    assert(result[rowIndex].every(value => value !== undefined) && result[rowIndex].filter(value => value !== undefined).length === width,
      `${context}: missing cell`);
  });
  return result;
}

let pages = 0;
let displayedModels = 0;
for (const product of catalogue.flatMap(group => group.products)) {
  const slug = product.slug ?? slugify(product.name);
  let tables = products[slug]?.specificationTables;
  if (["m-fd", "m-fh"].includes(slug)) {
    const model = slug.toUpperCase();
    const source = products["r-cm"].specificationTables.find(table => table.rows.some(row => row.model === model));
    assert(source, `Missing R-CM source for ${slug}`);
    tables = [{ ...source, rows: source.rows.filter(row => row.model === model) }];
  }
  assert(tables, `Missing specification source for ${slug}`);
  const spec = consolidateTables(tables);
  const groups = groupModelRows(spec);
  for (const language of ["", "en/"]) {
    const context = `${language || "id/"}${slug}`;
    const $ = load(readFileSync(new URL(`out/${language}brands/tohnichi/products/${slug}.html`, root), "utf8"));
    const modelTable = $("table[data-tohnichi-models]");
    const bodies = modelTable.children("tbody[data-model]").toArray();
    assert.equal(modelTable.length, groups.length ? 1 : 0, `${context}: unexpected model table`);
    assert.deepEqual(bodies.map(body => $(body).attr("data-model")), groups.map(group => group.model), `${context}: models missing, duplicated, or out of order`);
    if (groups.length) expandGrid($, modelTable.find("thead tr").toArray(), spec.columns.length, `${context} header`);
    bodies.forEach((body, index) => {
      const group = groups[index];
      assert.equal($(body).find('th[scope="rowgroup"]').length, 1, `${context}: model name must appear exactly once`);
      assert.equal(text($(body).find('th[scope="rowgroup"]').text()), group.model, `${context}: model name changed`);
      const actual = expandGrid($, $(body).children("tr").toArray(), spec.columns.length, `${context} ${group.model}`);
      const expected = group.rows.map(row => row.values.map(value => text(value || "—")));
      assert.deepEqual(actual, expected, `${context}: rendered option/specification associations changed`);
    });
    const parameters = $("table[data-tohnichi-common] tbody tr td").toArray().map(cell => text($(cell).text()));
    assert.deepEqual(parameters, spec.commonSpecifications.map(parameter => text(parameter.value)), `${context}: common specifications lost or changed`);
    if (!spec.rows.length && !spec.commonSpecifications.length) assert.equal($("main table").length, 0, `${context}: fabricated fallback table`);
    if (slug === "sp-sp2-sp2-mh") {
      assert.equal(bodies.length, 11);
      assert.equal($("tbody[data-model='SP2N2'] th[scope='rowgroup']").length, 1);
    }
    pages += 1;
    displayedModels += bodies.length;
  }
}
console.log(`Rendered-table audit passed: ${pages} pages across Indonesian and English, ${displayedModels} model groups; no duplicate primary model names or broken cell spans.`);
