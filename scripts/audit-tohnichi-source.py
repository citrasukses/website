"""Independently check normalized records against the official HTML cell grid.

This checker does not use pandas or the production table-normalization functions.
It verifies each record's values coexist in one source row or column, so a model
cannot silently inherit another model's dimensions through a shifted import.
"""

import argparse
import json
import re
from decimal import Decimal, InvalidOperation
from collections import Counter
from pathlib import Path
from lxml import html


def clean(value):
    for original, replacement in {"～": "-", "~": "-", "−": "-", "–": "-", "—": "-",
                                   "＋": "+", "％": "%", "･": "・", "１": "1", "ー": "-",
                                   "―": "-", "－": "-"}.items():
        value = value.replace(original, replacement)
    value = re.sub(r"\(\s*\)\s*dimension\s+is\s+-MH", "", value, flags=re.I)
    value = re.sub(r"\s+", " ", value).strip()
    try:
        # pandas may write a numeric cell as '3.0' when the source says '3'.
        return format(Decimal(value).normalize(), "f") if value else value
    except InvalidOperation:
        return value


def grid(table):
    rows = []
    for row_index, source_row in enumerate(table.xpath(".//tr")):
        while len(rows) <= row_index:
            rows.append({})
        column = 0
        for cell in source_row.xpath("./td|./th"):
            while column in rows[row_index]:
                column += 1
            value = clean(" ".join(cell.itertext()))
            for row_offset in range(int(cell.get("rowspan", "1"))):
                while len(rows) <= row_index + row_offset:
                    rows.append({})
                for column_offset in range(int(cell.get("colspan", "1"))):
                    rows[row_index + row_offset][column + column_offset] = value
            column += int(cell.get("colspan", "1"))
    width = max((max(row, default=-1) + 1 for row in rows), default=0)
    return [[row.get(column, "") for column in range(width)] for row in rows]


MODEL_MARKER = re.compile(r"^(?:(?:S\.?\s*I\.?|METRIC|AMERICAN|AMERICAL)\s*)?MODEL(?:/TYPE)?(?:\s|$|\[|\()", re.I)


def is_code(value):
    base = value.replace("（", "(").split("(")[0].strip()
    return bool(
        re.fullmatch(r"[A-Z0-9][-A-Z0-9 .×x/]*", base)
        and (re.search(r"[A-Z].*\d|\d.*[A-Z]", base) or re.fullmatch(r"[A-Z]+(?:-[A-Z]+)+", base))
        and not re.search(r"\b(?:SPECIFICATIONS|DIGIT|SCALE|LENGTH|HEAD|BODY|DIMENSION)\b|^M\d+$", base)
        and base not in {"SIMPLEX-BTS", "DUPLEX-BTD"}
    )


def source_models(tables):
    expected = set()
    for table in tables:
        rows = grid(table)
        for row_index, row in enumerate(rows):
            indexes = [i for i, value in enumerate(row) if MODEL_MARKER.match(value) or value.upper() == "NAME"]
            if not indexes:
                continue
            if any(re.search(r"dimension|weight|thickness|capacity|compliant|allowable torque", value, re.I) for value in row):
                for column in indexes:
                    expected.update(source_row[column] for source_row in rows[row_index + 1:]
                                    if is_code(source_row[column]) or (row[column].upper() == "NAME"
                                    and source_row[column] and source_row[column].upper() != "NAME"))
            else:
                expected.update(value for value in row if is_code(value))
                if row_index and not any(rows[row_index - 1][:indexes[-1] + 1]):
                    expected.update(value for value in rows[row_index - 1] if is_code(value))
    return expected


def semantic_axes(rows):
    """A unit at the left of a range row also applies to following numeric cells."""
    cells = [[{value} for value in row] for row in rows]
    unit_prefix = re.compile(r"^((?:[mc]?N|[km]?gf|lbf|ozf)[・·.](?:cm|m|in|ft))(?:\s+(.*))?$")
    for row_index, row in enumerate(rows):
        if not any(re.search(r"\brange\b", value, re.I) for value in row[:5]):
            continue
        unit = ""
        for column, value in enumerate(row):
            match = unit_prefix.fullmatch(value)
            if match:
                unit = match.group(1)
            elif unit and re.match(r"^[（(]?[-+\d]", value) and value != "-":
                cells[row_index][column].add(f"{unit} {value}")
    axes = [set().union(*row) for row in cells]
    if cells:
        axes.extend(set().union(*(row[column] for row in cells)) for column in range(len(cells[0])))
    return axes


def audit(data, html_dir):
    failures = []
    records = 0
    for slug, product in data["products"].items():
        source = html_dir / f"{slug}.html"
        if not source.exists():
            if product["specificationTables"]:
                failures.append(f"{slug}: source HTML missing")
            continue
        document = html.fromstring(source.read_bytes())
        source_tables = document.xpath('//table[contains(concat(" ",normalize-space(@class)," ")," excel ")]')
        if not source_tables:
            source_tables = document.xpath('//*[@id="spec_box"]//table')
        if not source_tables:
            source_tables = document.xpath('//div[contains(@class,"results_list_box")]//table')
        axes = []
        for table in source_tables:
            rows = grid(table)
            axes.extend(semantic_axes(rows))
        observed_models = {clean(detail["value"]) for table in product["specificationTables"] for row in table["rows"]
                           for detail in row["details"] if MODEL_MARKER.match(detail["label"]) or detail["label"].upper() == "NAME"}
        for missing in sorted(source_models(source_tables) - observed_models):
            failures.append(f"{slug}: source model missing from the normalized model fields: {missing}")
        all_values = set().union(*axes) if axes else set()
        for table in product["specificationTables"]:
            for parameter in table.get("commonSpecifications", []):
                if clean(parameter["value"]) not in all_values:
                    failures.append(f"{slug}: parameter value absent from source: {parameter['label']}")
            for row in table["rows"]:
                values = {clean(detail["value"]) for detail in row["details"] if detail["value"]}
                records += 1
                if not any(values <= axis for axis in axes):
                    failures.append(f"{slug}: {row['key']} ({row['model']}) values do not align in the source")
    return records, failures


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", default="data/tohnichi-specifications.json", type=Path)
    parser.add_argument("--html-dir", required=True, type=Path)
    args = parser.parse_args()
    records, failures = audit(json.loads(args.data.read_text()), args.html_dir)
    for failure in failures[:20]:
        print(failure)
    if failures:
        print(dict(Counter(failure.split(":")[0] for failure in failures)))
    print(f"Source alignment: {records} records checked, {len(failures)} errors.")
    raise SystemExit(bool(failures))
