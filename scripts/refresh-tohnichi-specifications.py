"""Rebuild all cached official product tables while preserving catalogue metadata.

python scripts/refresh-tohnichi-specifications.py --html-dir output/tohnichi-audit/html \
    --output output/tohnichi-audit/candidate.json
"""

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

module_spec = importlib.util.spec_from_file_location(
    "extract_tohnichi", Path(__file__).with_name("extract-tohnichi-specifications.py")
)
extract = importlib.util.module_from_spec(module_spec)
module_spec.loader.exec_module(extract)


def refresh(source, html_dir):
    report = []
    corrections = json.loads((Path(__file__).resolve().parents[1] / "data/tohnichi-specification-corrections.json").read_text())
    for slug, product in source["products"].items():
        for correction in corrections:
            if correction["slug"] == slug and "replacementSourceUrl" in correction:
                product["sourceUrl"] = correction["replacementSourceUrl"]
        cached = html_dir / f"{slug}.html"
        if not cached.exists():
            if product["specificationTables"]:
                raise ValueError(f"Cannot verify existing tables: missing source for {slug}")
            report.append({"slug": slug, "status": "no-table-source-unavailable", "tables": 0})
            continue
        raw = cached.read_bytes()
        document = extract.html.fromstring(raw)
        tables = document.xpath('//table[contains(concat(" ",normalize-space(@class)," ")," excel ")]')
        if not tables:
            tables = document.xpath('//*[@id="spec_box"]//table')
        if not tables:
            tables = document.xpath('//div[contains(@class,"results_list_box")]//table')
        normalized = [item for index, table in enumerate(tables)
                      for item in extract.normalize_table(table, index)]
        for correction in corrections:
            if correction["slug"] != slug:
                continue
            def label_for(label, value=None):
                if "labelPrefix" in correction and label.startswith(correction["labelPrefix"]):
                    return correction["replacementLabel"] + label[len(correction["labelPrefix"]):]
                if label == correction.get("label") and value == correction.get("value"):
                    return correction["replacementLabel"]
                return label
            for table in normalized:
                table["columns"] = [label_for(label) for label in table["columns"]]
                for row in table["rows"]:
                    for detail in row["details"]:
                        detail["label"] = label_for(detail["label"], detail["value"])
                for detail in table.get("commonSpecifications", []):
                    detail["label"] = label_for(detail["label"], detail["value"])
        if product["specificationTables"] and not normalized:
            raise ValueError(f"Source tables disappeared for {slug}; review before replacing")
        old_count = sum(len(t["rows"]) for t in product["specificationTables"])
        product["specificationTables"] = normalized
        report.append({
            "slug": slug, "status": "verified" if normalized else "no-official-table",
            "sourceUrl": product["sourceUrl"], "sourceSha256": hashlib.sha256(raw).hexdigest(),
            "tables": len(normalized), "previousRows": old_count,
            "rows": sum(len(t["rows"]) for t in normalized),
            "models": len(set(r["model"] for t in normalized for r in t["rows"])),
        })
    return source, report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--html-dir", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    source = json.loads((root / "data/tohnichi-specifications.json").read_text())
    updated, report = refresh(source, args.html_dir)
    args.output.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n")
    args.output.with_suffix(".audit.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(f"Audited {len(report)} families; {sum(row['tables'] for row in report)} tables.")
