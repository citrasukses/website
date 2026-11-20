import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";

const moduleSource = stripTypeScriptTypes(readFileSync(new URL("../lib/tohnichi-specification-tables.ts", import.meta.url), "utf8"));
const { consolidateTables, groupModelRows } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString("base64")}`);
const dataPath = process.argv[2] ?? new URL("../data/tohnichi-specifications.json", import.meta.url);
const { products } = JSON.parse(readFileSync(dataPath, "utf8"));

function table(columns, vectors) {
  return { title: "Specifications", accuracy: "", columns, rows: vectors.map((values, index) => ({
    key: `option-${index}`, model: values[0], values, details: columns.map((label, i) => ({ label, value: values[i] }))
  })) };
}

const fixture = consolidateTables([table(["MODEL", "WIDTH ACROSS FLATS [mm]", "OVERALL LENGTH [mm]"], [
  ["SP2N2", "17", "180"], ["SP8N2", "7", "169"], ["SP2N2", "19", "180"], ["SP2N2", "19", "180"]
])]);
const fixtureGroups = groupModelRows(fixture);
assert.equal(fixtureGroups.length, 2);
assert.deepEqual(fixtureGroups[0].rows.map(row => row.values[1]), ["17", "19"]);
assert.equal(fixtureGroups[0].rows[0].spans[0], 2);
assert.equal(fixtureGroups[0].rows[1].spans[0], 0);
assert.equal(fixtureGroups[0].rows[0].spans[2], 2);
assert.equal(fixtureGroups[0].rows[1].spans[2], 0);

// Imperial equivalents must not produce duplicate S.I. model rows.
const imperial = consolidateTables([table(["S.I. MODEL", "AMERICAN MODEL", "TORQUE RANGE [cN・m]"], [
  ["RTD15CN", "RTD20Z", "2-15"], ["RTD15CN", "RTD1.3I", "2-15"]
])]);
assert.equal(imperial.rows.length, 1);
assert.equal(groupModelRows(imperial).length, 1);

// A published model with unspecified dimensions must still be present.
assert.equal(groupModelRows(consolidateTables([table(["MODEL", "LENGTH"], [["QSPMS3N4", ""]])])).length, 1);

const report = [];
for (const [slug, product] of Object.entries(products)) {
  for (const table of product.specificationTables) {
    for (const row of table.rows) for (const detail of row.details) {
      if (!table.columns.includes(detail.label)) continue;
      assert(!/^[※]/.test(detail.label), `${slug}: a footnote became a column heading`);
      assert(!(/range/i.test(detail.label) && /^(?:[mc]?N|[km]?gf|lbf|ozf)[・·.](?:cm|m|in|ft)$/.test(detail.value)), `${slug}: unit label used as a numeric range`);
      if (!/model/i.test(detail.label) && detail.value.length > 5) {
        assert(!detail.label.includes(detail.value), `${slug}: a parameter value became part of its own heading`);
      }
    }
  }
  const spec = consolidateTables(product.specificationTables);
  const groups = groupModelRows(spec);
  const expectedModels = new Set(product.specificationTables.flatMap(table => table.rows)
    .map(row => row.values[0]?.trim()).filter(model => model && model !== "-")
    .map(model => model.normalize("NFKC").toUpperCase()));
  const displayedModels = new Set(groups.map(group => group.key));
  for (const model of expectedModels) assert(displayedModels.has(model), `${slug}: source primary model missing: ${model}`);
  const canonicalModels = groups.map(group => group.key.replace(/\s+/g, "").replace(/×/g, "X"));
  assert.equal(new Set(canonicalModels).size, groups.length, `${slug}: equivalent model spellings printed separately`);
  assert.equal(groups.flatMap(group => group.rows).length, spec.rows.length, `${slug}: dropped option`);
  assert.equal(new Set(groups.map(group => group.key)).size, groups.length, `${slug}: duplicate model group`);
  assert.equal(new Set(spec.rows.map(row => row.values.join("\0"))).size, spec.rows.length, `${slug}: duplicate option`);
  for (const group of groups) {
    assert.equal(group.rows[0].spans[group.modelColumnIndex], group.rows.length, `${slug}: repeated model name`);
    assert(group.rows.slice(1).every(row => row.spans[group.modelColumnIndex] === 0), `${slug}: repeated model name`);
    assert(!/^(?:Accuracy|MODEL|WEIGHT|Application|Manufacturer|Receiver|Transmitter|Wireless module)(?:$|\s*[±[])/i.test(group.model), `${slug}: header used as model: ${group.model}`);
    const expanded = group.rows.map(() => Array(spec.columns.length));
    group.rows.forEach((row, rowIndex) => {
      assert.equal(row.values.length, spec.columns.length, `${slug}: malformed row`);
      row.spans.forEach((span, column) => {
        for (let offset = 0; offset < span; offset += 1) {
          assert(rowIndex + offset < group.rows.length, `${slug}: rowspan crosses model boundary`);
          assert.equal(expanded[rowIndex + offset][column], undefined, `${slug}: overlapping cell`);
          expanded[rowIndex + offset][column] = row.values[column];
        }
      });
    });
    group.rows.forEach((row, index) => assert.deepEqual(expanded[index], row.values, `${slug}: size/specification pairing changed`));
  }
  report.push({ slug, models: groups.length, options: spec.rows.length, parameters: spec.commonSpecifications.length });
}

const sp = groupModelRows(consolidateTables(products["sp-sp2-sp2-mh"].specificationTables));
assert.equal(sp.length, 11);
assert.equal(sp.filter(group => group.model === "SP2N2").length, 1);
assert.equal(sp.find(group => group.model === "SP2N2").rows.length, 8);
assert(report.find(row => row.slug === "qlls-clls-pqlls-pclls-tiqlls-yclls").models >= 50);
assert(report.find(row => row.slug === "qspls-cspls-qrspls-spls-spls-mh-rspls-rspls-mh-spls-n").models >= 150);
assert(report.find(row => row.slug === "scl-mh").models === 8);
assert(report.find(row => row.slug === "scsp-mh").models === 8);
console.log(`Passed: ${report.length} families, ${report.reduce((sum, row) => sum + row.models, 0)} unique model groups, ${report.reduce((sum, row) => sum + row.options, 0)} option rows.`);
console.log("SP: 11 unique model groups; SP2N2 appears once and retains all 8 opening sizes.");
