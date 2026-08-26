#!/usr/bin/env python3
"""Build normalized TOHNICHI product-family specification data.

The script combines the supplied 2025.10 reference guide with locally downloaded
official TOHNICHI product pages. The PDF is used to identify catalogue page
references; the official HTML tables provide a machine-readable representation
of the same model/specification data and cover product families whose options
are maintained as online accessory lists.

Required Python packages: lxml, pandas, and pypdf.
"""

from __future__ import annotations

import argparse
import io
import json
import math
import re
import unicodedata
from collections.abc import Iterable
from pathlib import Path
from typing import Any

import pandas as pd
import pdfplumber
from lxml import etree, html
from pypdf import PdfReader


SPACE_RE = re.compile(r"\s+")
NON_ALNUM_RE = re.compile(r"[^a-z0-9]+")
ACCURACY_RE = re.compile(
    r"accuracy\s*[:：]?\s*([±＋+\-]?\s*\d+(?:\.\d+)?\s*%(?:\s*\+\s*\d+\s*digit)?)",
    re.IGNORECASE,
)
DIRECT_MODEL_LABEL_RE = re.compile(
    r"^(?:s\.?\s*i\.?\s*)?model(?:\s*/\s*type)?$|^(?:metric|american)\s*model$",
    re.IGNORECASE,
)

GROUP_PAGE_RANGES: dict[str, str] = {
    "torque-screwdrivers": "5-10",
    "torque-wrenches": "11-44",
    "interchangeable-head-torque-wrenches": "11-44",
    "power-torque-tools": "51-54",
    "multiple-units": "51-54",
    "tester-checker": "55-64",
    "torque-measuring-equipment": "55-64",
    "force-measuring-instruments": "65-68",
    "optional-equipment": "25-40 dan 49-70",
    "accessories": "45-50",
    "tightening-assurance-systems": "3-4 dan 25-40",
}

GROUP_PHYSICAL_PAGE_RANGES: dict[str, tuple[int, int]] = {
    "torque-screwdrivers": (10, 15),
    "torque-wrenches": (16, 49),
    "interchangeable-head-torque-wrenches": (16, 49),
    "power-torque-tools": (56, 59),
    "multiple-units": (56, 59),
    "tester-checker": (60, 69),
    "torque-measuring-equipment": (60, 69),
    "force-measuring-instruments": (70, 73),
    "accessories": (50, 55),
}

CORE_FIELD_PATTERNS = [
    re.compile(pattern, re.IGNORECASE)
    for pattern in (
        r"\bmodel\b",
        r"\btorque\b.*\brange\b",
        r"\brange\b",
        r"\bcapacity\b",
        r"\bmeasurement\b.*\brange\b",
        r"\bmin\.?\s*[-/～~]\s*max\.?\b",
        r"\bgrad(?:uation)?\.?\b",
        r"\b1\s*digit\b",
        r"\bapplicable\b.*\b(?:bolt|screw|model)\b",
        r"\ballowable\s+torque\b",
        r"\bmax\.?\s*hand\s*force\b",
        r"\beffective\s+length\b",
        r"\boverall\s+length\b",
        r"\bsq\.?\s*drive\b",
        r"\bdrive\b",
        r"\bweight\b",
        r"\bchuck\b",
        r"\bpressure\b",
        r"\bspeed\b",
        r"\bdata\s+memory\b",
        r"\bdisplay\b",
        r"\boutput\b",
    )
]


def clean_text(value: Any) -> str:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return ""
    text = str(value)
    replacements = {
        "\xa0": " ",
        "～": "-",
        "~": "-",
        "−": "-",
        "–": "-",
        "—": "-",
        "＋": "+",
        "％": "%",
        "･": "・",
        "１": "1",
        "ー": "-",
        "―": "-",
        "－": "-",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    return SPACE_RE.sub(" ", text).strip()


def normalize(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).lower()
    return NON_ALNUM_RE.sub("", value)


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).lower()
    return NON_ALNUM_RE.sub("-", value).strip("-")


def unique_nonempty(values: Iterable[str]) -> list[str]:
    result: list[str] = []
    for value in values:
        value = clean_text(value)
        if value and value not in result:
            result.append(value)
    return result


def dataframe_from_table(table: etree._Element) -> pd.DataFrame | None:
    try:
        frames = pd.read_html(io.StringIO(etree.tostring(table, encoding="unicode")))
    except ValueError:
        return None
    return frames[0] if frames else None


def clean_frame(frame: pd.DataFrame) -> tuple[list[str], list[list[str]]]:
    headers = [
        clean_text(" / ".join(unique_nonempty(column if isinstance(column, tuple) else [column])))
        for column in frame.columns
    ]
    rows = [[clean_text(value) for value in row] for row in frame.values.tolist()]

    if rows:
        active_columns = [
            index
            for index in range(len(rows[0]))
            if headers[index] or any(row[index] for row in rows)
        ]
        headers = [headers[index] for index in active_columns]
        rows = [[row[index] for index in active_columns] for row in rows]

    rows = [row for row in rows if any(row)]
    return headers, rows


def extract_accuracy(rows: list[list[str]], fallback_text: str) -> str:
    candidates = [fallback_text]
    candidates.extend(" ".join(row) for row in rows[:4])
    for candidate in candidates:
        match = ACCURACY_RE.search(candidate)
        if match:
            return clean_text(match.group(1)).replace(" ", "")
    return ""


def is_model_start(row: list[str]) -> bool:
    first = next((value for value in row if value), "")
    normalized = re.sub(r"[^a-z]", "", first.lower())
    return normalized in {"model", "simodel"} and len(unique_nonempty(row)) >= 2


def leading_descriptor_count(row: list[str]) -> int:
    first = next((value for value in row if value), "")
    first_normalized = normalize(first)
    if not first_normalized:
        return 0
    for index, value in enumerate(row):
        if value and normalize(value) != first_normalized:
            return index
    return 0


def field_label(row: list[str], descriptor_count: int, fallback: str = "") -> str:
    parts = unique_nonempty(row[:descriptor_count])
    if not parts and fallback:
        return fallback
    return " / ".join(parts)


def make_unique_labels(labels: list[str]) -> list[str]:
    seen: dict[str, int] = {}
    result: list[str] = []
    for label in labels:
        base = label or "Specification"
        seen[base] = seen.get(base, 0) + 1
        result.append(base if seen[base] == 1 else f"{base} ({seen[base]})")
    return result


def select_core_fields(fields: list[str]) -> list[str]:
    selected: list[str] = []
    for field in fields:
        if DIRECT_MODEL_LABEL_RE.search(field) and field not in selected:
            selected.append(field)
    for field in fields:
        if any(pattern.search(field) for pattern in CORE_FIELD_PATTERNS) and field not in selected:
            selected.append(field)
    if len(selected) < 4:
        for field in fields:
            if field not in selected:
                selected.append(field)
            if len(selected) >= 7:
                break
    return selected[:14]


def model_label(values: dict[str, str]) -> str:
    direct_models = unique_nonempty(
        value for label, value in values.items() if DIRECT_MODEL_LABEL_RE.search(label)
    )
    if direct_models:
        return " / ".join(direct_models)
    primary_model = next(
        (
            value
            for label, value in values.items()
            if "MODEL" in label.upper()
            and "APPLICABLE" not in label.upper()
            and "COMPLIANT" not in label.upper()
        ),
        "",
    )
    if primary_model:
        return primary_model
    model_like = unique_nonempty(
        value
        for label, value in values.items()
        if "MODEL" in label.upper()
        and "APPLICABLE" not in label.upper()
        and "COMPLIANT" not in label.upper()
    )
    if model_like:
        return " / ".join(model_like)
    return next((value for value in values.values() if value), "Option")


def normalize_model_segment(
    rows: list[list[str]],
    start: int,
    end: int,
    table_index: int,
    segment_index: int,
    accuracy: str,
) -> dict[str, Any] | None:
    descriptor_count = leading_descriptor_count(rows[start])
    if descriptor_count <= 0:
        return None

    segment_rows = rows[start:end]
    if start > 0:
        previous = rows[start - 1]
        if (
            len(previous) == len(rows[start])
            and not any(previous[:descriptor_count])
            and any(previous[descriptor_count:])
            and "accuracy" not in " ".join(previous).lower()
        ):
            segment_rows = [previous, *segment_rows]

    labels: list[str] = []
    for index, row in enumerate(segment_rows):
        fallback = "MODEL" if index == 0 and not any(row[:descriptor_count]) else ""
        labels.append(field_label(row, descriptor_count, fallback))
    labels = make_unique_labels(labels)

    last_data_column = descriptor_count
    for column in range(descriptor_count, len(rows[start])):
        if any(row[column] for row in segment_rows):
            last_data_column = column + 1

    records: list[dict[str, Any]] = []
    seen_vectors: set[tuple[str, ...]] = set()
    for column in range(descriptor_count, last_data_column):
        vector = tuple(row[column] for row in segment_rows)
        if not any(vector) or vector in seen_vectors:
            continue
        seen_vectors.add(vector)
        values = {label: value for label, value in zip(labels, vector) if value}
        if not values:
            continue
        if not any(
            DIRECT_MODEL_LABEL_RE.search(label) and value
            for label, value in values.items()
        ):
            continue
        records.append(
            {
                "key": f"table-{table_index + 1}-segment-{segment_index + 1}-option-{len(records) + 1}",
                "model": model_label(values),
                "values": values,
            }
        )

    if not records:
        return None

    fields = unique_nonempty(label for record in records for label in record["values"])
    core_fields = select_core_fields(fields)
    return {
        "title": f"Model options {segment_index + 1}",
        "accuracy": accuracy,
        "columns": core_fields,
        "rows": [
            {
                "key": record["key"],
                "model": record["model"],
                "values": [record["values"].get(field, "") for field in core_fields],
                "details": [
                    {"label": field, "value": value}
                    for field, value in record["values"].items()
                    if value
                ],
            }
            for record in records
        ],
    }


def normalize_row_table(
    headers: list[str],
    rows: list[list[str]],
    table_index: int,
    title: str,
) -> dict[str, Any] | None:
    meaningful_headers = unique_nonempty(headers)
    has_named_columns = any(not re.fullmatch(r"\d+", header) for header in meaningful_headers)

    if has_named_columns and len(headers) >= 2:
        normalized_headers = [
            header if header and not re.fullmatch(r"\d+", header) else f"Value {index + 1}"
            for index, header in enumerate(headers)
        ]
        option_rows = []
        for row_index, row in enumerate(rows):
            if not any(row):
                continue
            values = {
                header: value
                for header, value in zip(normalized_headers, row)
                if value
            }
            if not values:
                continue
            first_value = next(iter(values.values()))
            option_rows.append(
                {
                    "key": f"table-{table_index + 1}-row-{row_index + 1}",
                    "model": first_value,
                    "values": [values.get(header, "") for header in normalized_headers[:10]],
                    "details": [
                        {"label": label, "value": value}
                        for label, value in values.items()
                    ],
                }
            )
        if option_rows:
            return {
                "title": title,
                "accuracy": "",
                "columns": normalized_headers[:10],
                "rows": option_rows,
            }

    specification_rows: list[dict[str, str]] = []
    for row in rows:
        values = unique_nonempty(row)
        if len(values) < 2:
            continue
        specification_rows.append(
            {
                "label": values[0],
                "value": " / ".join(values[1:]),
            }
        )
    if not specification_rows:
        return None
    return {
        "title": title,
        "accuracy": "",
        "columns": [],
        "rows": [],
        "commonSpecifications": specification_rows,
    }


def table_title(table: etree._Element, table_index: int) -> str:
    section_heading = table.xpath(
        'preceding::h4[contains(concat(" ", normalize-space(@class), " "), " titlebar ")][normalize-space()][1]'
    )
    if section_heading:
        title = clean_text(" ".join(section_heading[0].itertext()))
        if title and title.lower() not in {"specifications", "specification"}:
            return title
    preceding = table.xpath(
        "preceding::*[self::h3 or self::h4 or self::h5][normalize-space()][1]"
    )
    if preceding:
        title = clean_text(" ".join(preceding[0].itertext()))
        if title and title.lower() not in {"specifications", "specification"}:
            return title
    return "Specifications" if table_index == 0 else f"Specifications {table_index + 1}"


def normalize_table(
    table: etree._Element, table_index: int
) -> list[dict[str, Any]]:
    frame = dataframe_from_table(table)
    if frame is None:
        return []
    headers, rows = clean_frame(frame)
    if not rows:
        return []

    raw_text = clean_text(" ".join(table.itertext()))
    accuracy = extract_accuracy(rows, raw_text)
    starts = [index for index, row in enumerate(rows) if is_model_start(row)]

    if starts:
        segments: list[dict[str, Any]] = []
        for segment_index, start in enumerate(starts):
            end = starts[segment_index + 1] if segment_index + 1 < len(starts) else len(rows)
            segment = normalize_model_segment(
                rows, start, end, table_index, segment_index, accuracy
            )
            if segment:
                segments.append(segment)
        if segments:
            return segments

    normalized = normalize_row_table(
        headers, rows, table_index, table_title(table, table_index)
    )
    return [normalized] if normalized else []


def technical_field_class(label: str) -> str:
    key = normalize(label)
    if not key:
        return ""
    if "applicable" in key and "model" in key:
        return "applicable-model"
    if "model" in key:
        if key.startswith("si") or "simodel" in key:
            return "model-si"
        if "metric" in key:
            return "model-metric"
        if "american" in key:
            return "model-american"
        return "model"
    if "torquerange" in key or (
        "range" in key and any(unit in key for unit in ("nm", "cnm", "kgf", "lbf", "ozf"))
    ):
        unit = next(
            (
                unit_name
                for token, unit_name in (
                    ("cnm", "cnm"),
                    ("kgfcm", "kgfcm"),
                    ("kgfm", "kgfm"),
                    ("ozfin", "ozfin"),
                    ("lbfin", "lbfin"),
                    ("lbfft", "lbfft"),
                    ("nm", "nm"),
                )
                if token in key
            ),
            "torque",
        )
        kind = "grad" if "grad" in key or "digit" in key else "range"
        return f"torque-{unit}-{kind}"
    if "overalllength" in key:
        return "overall-length"
    if "effectivelength" in key:
        return "effective-length"
    if "weight" in key:
        return "weight"
    if "sqdrive" in key or "squaredrive" in key:
        return "square-drive"
    if "maxhandforce" in key:
        return "max-hand-force"
    if "applicablebolt" in key:
        return "applicable-bolt-high" if "hightension" in key else "applicable-bolt-common"
    if "applicablescrew" in key:
        return "applicable-screw-tapping" if "tapping" in key else "applicable-screw-small"
    if "allowabletorque" in key:
        return "allowable-torque"
    return ""


def catalogue_table_headers(
    rows: list[list[str]],
    first_data_row: int,
) -> list[str]:
    width = max(len(row) for row in rows)
    header_rows = [row + [""] * (width - len(row)) for row in rows[:first_data_row]]
    filled_rows: list[list[str]] = []
    for row in header_rows:
        filled: list[str] = []
        previous = ""
        for value in row:
            if value:
                previous = value
            filled.append(value or previous)
        filled_rows.append(filled)

    headers: list[str] = []
    for column in range(width):
        if not any(row[column] for row in header_rows):
            headers.append("")
            continue
        headers.append(
            " / ".join(
                unique_nonempty(
                    row[column]
                    for row in filled_rows
                    if row[column] and "accuracy" not in row[column].lower()
                )
            )
        )

    if (
        width >= 3
        and not any(row[-1] for row in header_rows)
        and "overalllength" in normalize(headers[-2])
    ):
        headers[-1] = "WEIGHT"
    return make_unique_labels(headers)


def catalogue_model_tokens(
    specification_tables: list[dict[str, Any]],
) -> dict[str, list[dict[str, Any]]]:
    tokens: dict[str, list[dict[str, Any]]] = {}
    for table in specification_tables:
        for row in table.get("rows", []):
            for detail in row.get("details", []):
                field_class = technical_field_class(detail["label"])
                if not field_class.startswith("model") or field_class == "applicable-model":
                    continue
                token = normalize(detail["value"])
                if len(token) >= 2:
                    tokens.setdefault(token, []).append(row)
    return tokens


def apply_catalogue_overrides(
    specification_tables: list[dict[str, Any]],
    catalogue_tables: list[list[list[str | None]]],
) -> int:
    token_records = catalogue_model_tokens(specification_tables)
    if not token_records:
        return 0

    original_values: dict[tuple[int, str], str] = {}
    all_rows: list[dict[str, Any]] = []
    row_to_table: dict[int, dict[str, Any]] = {}
    for table in specification_tables:
        for row in table.get("rows", []):
            all_rows.append(row)
            row_to_table[id(row)] = table
    for row in all_rows:
        for detail in row.get("details", []):
            field_class = technical_field_class(detail["label"])
            if field_class:
                original_values[(id(row), field_class)] = detail["value"]

    direct_changes: dict[tuple[int, str, str], dict[str, int]] = {}
    label_replacements: dict[tuple[int, str], str] = {}
    change_count = 0

    for raw_table in catalogue_tables:
        rows = [
            [clean_text(value) for value in row]
            for row in raw_table
            if row and any(clean_text(value) for value in row)
        ]
        if len(rows) < 2:
            continue

        matching_rows: list[tuple[int, list[str], set[str]]] = []
        for row_index, row in enumerate(rows):
            matches = {
                normalize(value)
                for value in row
                if normalize(value) in token_records
            }
            if matches:
                matching_rows.append((row_index, row, matches))
        if not matching_rows:
            continue

        first_data_row = min(row_index for row_index, _, _ in matching_rows)
        if first_data_row == 0:
            continue
        headers = catalogue_table_headers(rows, first_data_row)

        for _, row_values, matches in matching_rows:
            target_rows: list[dict[str, Any]] = []
            for token in matches:
                for target in token_records[token]:
                    if target not in target_rows:
                        target_rows.append(target)

            for target in target_rows:
                details_by_class = {
                    technical_field_class(detail["label"]): detail
                    for detail in target.get("details", [])
                    if technical_field_class(detail["label"])
                }
                for column, value in enumerate(row_values):
                    if not value or value == "-" or column >= len(headers):
                        continue
                    field_class = technical_field_class(headers[column])
                    detail = details_by_class.get(field_class)
                    if not field_class or not detail:
                        continue
                    if field_class.startswith("model"):
                        continue
                    target_table = row_to_table[id(target)]
                    if field_class == "weight":
                        header_key = normalize(headers[column])
                        target_unit = (
                            "kg"
                            if "weightkg" in header_key
                            else "g"
                            if "weightg" in header_key
                            else ""
                        )
                        replacement_label = (
                            f"WEIGHT [{target_unit}]" if target_unit else "WEIGHT"
                        )
                        if not target_unit:
                            source_key = normalize(detail["label"])
                            source_unit = (
                                "kg"
                                if "weightkg" in source_key
                                else "g"
                                if "weightg" in source_key
                                else ""
                            )
                            try:
                                original_weight = float(detail["value"])
                                catalogue_weight = float(value)
                            except ValueError:
                                original_weight = math.nan
                                catalogue_weight = math.nan
                            target_unit = source_unit
                            if (
                                source_unit == "kg"
                                and not math.isnan(original_weight)
                                and original_weight
                                and 100 <= abs(catalogue_weight / original_weight) <= 10000
                            ):
                                target_unit = "g"
                            elif (
                                source_unit == "g"
                                and not math.isnan(original_weight)
                                and original_weight
                                and 0.0001 <= abs(catalogue_weight / original_weight) <= 0.01
                            ):
                                target_unit = "kg"
                            replacement_label = (
                                f"WEIGHT [{target_unit}]" if target_unit else "WEIGHT"
                            )
                        label_replacements[(id(target_table), field_class)] = replacement_label
                    original = detail["value"]
                    if original == value:
                        continue
                    detail["value"] = value
                    change_key = (id(target_table), field_class, original)
                    direct_changes.setdefault(change_key, {}).setdefault(value, 0)
                    direct_changes[change_key][value] += 1
                    change_count += 1

    for (table_id, field_class, original), replacements in direct_changes.items():
        replacement = max(replacements.items(), key=lambda item: item[1])[0]
        for row in all_rows:
            if id(row_to_table[id(row)]) != table_id:
                continue
            if original_values.get((id(row), field_class)) != original:
                continue
            for detail in row.get("details", []):
                if technical_field_class(detail["label"]) == field_class:
                    detail["value"] = replacement

    for table in specification_tables:
        for field_class in ("weight",):
            replacement_label = label_replacements.get((id(table), field_class))
            if not replacement_label:
                continue
            table["columns"] = [
                replacement_label
                if technical_field_class(column) == field_class
                else column
                for column in table.get("columns", [])
            ]
            for row in table.get("rows", []):
                for detail in row.get("details", []):
                    if technical_field_class(detail["label"]) == field_class:
                        source_key = normalize(detail["label"])
                        target_key = normalize(replacement_label)
                        original_value = original_values.get((id(row), field_class), "")
                        if detail["value"] == original_value:
                            try:
                                numeric_value = float(original_value)
                            except ValueError:
                                numeric_value = math.nan
                            source_unit = "kg" if "kg" in source_key else "g" if "g" in source_key else ""
                            target_unit = "kg" if "kg" in target_key else "g" if "g" in target_key else ""
                            if not math.isnan(numeric_value) and source_unit != target_unit:
                                if source_unit == "kg" and target_unit == "g":
                                    detail["value"] = f"{numeric_value * 1000:g}"
                                elif source_unit == "g" and target_unit == "kg":
                                    detail["value"] = f"{numeric_value / 1000:g}"
                        detail["label"] = replacement_label

        columns = table.get("columns", [])
        for row in table.get("rows", []):
            details = {detail["label"]: detail["value"] for detail in row.get("details", [])}
            row["values"] = [details.get(column, "") for column in columns]
            row["model"] = model_label(details)

    return change_count


def extract_copy_sections(document: etree._Element) -> tuple[list[str], list[str]]:
    applications: list[str] = []
    features: list[str] = []
    for box in document.xpath(
        '//*[contains(concat(" ", normalize-space(@class), " "), " copy_box ")]'
    ):
        heading = clean_text(" ".join(box.xpath("./h4//text()"))).lower()
        items = [
            clean_text(" ".join(item.itertext()))
            for item in box.xpath(".//li")
            if clean_text(" ".join(item.itertext()))
        ]
        if heading == "application":
            applications.extend(items)
        elif heading == "features":
            features.extend(items)
    return unique_nonempty(applications), unique_nonempty(features)


def pdf_page_references(
    product_name: str,
    group_slug: str,
    normalized_page_texts: list[str],
    raw_page_texts: list[str],
) -> list[int]:
    if product_name == "RTD":
        return [5]

    normalized_name = normalize(product_name.replace("Series", ""))
    raw_tokens = re.findall(r"[A-Za-z0-9][A-Za-z0-9+.-]*", product_name)
    token_pairs = [
        (token, normalize(token))
        for token in raw_tokens
        if len(normalize(token)) >= 3
        and normalize(token) not in {"series", "accessories", "option", "tools"}
    ]
    if not token_pairs and len(normalized_name) >= 3:
        token_pairs = [(product_name, normalized_name)]

    physical_bounds = GROUP_PHYSICAL_PAGE_RANGES.get(
        group_slug, (10, min(75, len(normalized_page_texts)))
    )
    page_range = range(
        physical_bounds[0] - 1,
        min(physical_bounds[1], len(normalized_page_texts)),
    )
    scored: list[tuple[int, int]] = []
    for physical_index in page_range:
        page = normalized_page_texts[physical_index]
        raw_page = raw_page_texts[physical_index]
        score = 0
        if len(normalized_name) >= 4 and normalized_name in page:
            score += 80 + min(len(normalized_name), 30)
        for raw_token, token in token_pairs:
            word = re.sub(r"[^a-z0-9]+", "", raw_token.lower())
            word_match = (
                re.search(
                    rf"(?<![a-z0-9]){re.escape(word)}(?![a-z0-9])",
                    raw_page,
                )
                if len(word) >= 2
                else None
            )
            if word_match:
                score += 45 + min(len(word), 12)
                if word_match.start() < 700:
                    score += 100
                elif word_match.start() < 1600:
                    score += 35
            if token in page:
                score += min(len(token), 14)
        if score:
            scored.append((score, physical_index + 1))

    if not scored:
        return []
    best_score = max(score for score, _ in scored)
    minimum = 12 if len(normalized_name) < 5 else 8
    if best_score < minimum:
        return []
    best_physical_page = min(
        physical_page for score, physical_page in scored if score == best_score
    )
    catalogue_page = best_physical_page - 5
    return [catalogue_page] if 1 <= catalogue_page <= 70 else []


def build_data(
    products_path: Path,
    html_dir: Path,
    pdf_path: Path,
    apply_pdf_values: bool = False,
) -> dict[str, Any]:
    groups = json.loads(products_path.read_text())
    reader = PdfReader(str(pdf_path))
    raw_page_texts = [
        SPACE_RE.sub(" ", (page.extract_text() or "").lower())
        for page in reader.pages
    ]
    normalized_page_texts = [normalize(page) for page in raw_page_texts]

    result: dict[str, Any] = {
        "meta": {
            "catalogue": pdf_path.name,
            "edition": "2025.10",
            "productFamilyCount": sum(len(group["products"]) for group in groups),
            "generatedFromOfficialTables": True,
            "catalogueValueOverrides": 0,
        },
        "products": {},
    }

    with pdfplumber.open(str(pdf_path)) as catalogue:
        catalogue_table_cache: dict[int, list[list[list[str | None]]]] = {}
        for category_index, group in enumerate(groups):
            for product_index, product in enumerate(group["products"]):
                product_slug = slugify(product.get("model") or product["name"])
                source_path = html_dir / f"{category_index}-{product_index}.html"
                document = html.fromstring(source_path.read_bytes())
                title = clean_text(
                    " ".join(document.xpath('//*[@id="prodcut_title_box"]//text()'))
                )
                applications, features = extract_copy_sections(document)

                excel_tables = document.xpath(
                    '//table[contains(concat(" ", normalize-space(@class), " "), " excel ")]'
                )
                source_tables = excel_tables
                if not source_tables and group["slug"] == "accessories":
                    source_tables = document.xpath(
                        '//div[contains(concat(" ", normalize-space(@class), " "), " results_list_box ")]//table'
                    )
                if not source_tables:
                    source_tables = document.xpath('//*[@id="spec_box"]//table')

                normalized_tables: list[dict[str, Any]] = []
                for table_index, table in enumerate(source_tables):
                    normalized_tables.extend(normalize_table(table, table_index))

                catalogue_pages = pdf_page_references(
                    product["name"],
                    group["slug"],
                    normalized_page_texts,
                    raw_page_texts,
                )
                if apply_pdf_values and catalogue_pages and normalized_tables:
                    physical_page = catalogue_pages[0] + 5
                    if 1 <= physical_page <= len(catalogue.pages):
                        if physical_page not in catalogue_table_cache:
                            catalogue_table_cache[physical_page] = catalogue.pages[
                                physical_page - 1
                            ].extract_tables()
                        applied = apply_catalogue_overrides(
                            normalized_tables,
                            catalogue_table_cache[physical_page],
                        )
                        result["meta"]["catalogueValueOverrides"] += applied

                result["products"][product_slug] = {
                    "sourceUrl": product["officialUrl"],
                    "sourceTitle": title,
                    "cataloguePages": catalogue_pages,
                    "catalogueSectionPages": GROUP_PAGE_RANGES[group["slug"]],
                    "applicationsEn": applications,
                    "featuresEn": features,
                    "specificationTables": normalized_tables,
                }

    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--products", type=Path, required=True)
    parser.add_argument("--html-dir", type=Path, required=True)
    parser.add_argument("--pdf", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument(
        "--apply-pdf-values",
        action="store_true",
        help="Experimentally overlay values extracted from PDF tables.",
    )
    args = parser.parse_args()

    data = build_data(
        args.products,
        args.html_dir,
        args.pdf,
        apply_pdf_values=args.apply_pdf_values,
    )
    args.output.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
