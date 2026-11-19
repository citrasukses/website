"""Regression checks for stacked model headers in official TOHNICHI tables.

Run with the extraction dependencies installed:
    python scripts/test-tohnichi-specifications.py
"""

import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location(
    "extract_tohnichi", Path(__file__).with_name("extract-tohnichi-specifications.py")
)
extract = importlib.util.module_from_spec(spec)
spec.loader.exec_module(extract)


class ModelHeaderRegressionTests(unittest.TestCase):
    def test_stacked_headers_preserve_model_opening_and_variant(self):
        table = extract.html.fromstring("""
          <table>
            <tr><td colspan="3" rowspan="2">MODEL</td>
                <td colspan="2" rowspan="2">SP2N2</td>
                <td colspan="2">SP19N2/SP19N2-MH</td></tr>
            <tr><td>( ) dimension is -MH</td><td>-1</td></tr>
            <tr><td colspan="3">S.I.RANGE[N・m]</td>
                <td colspan="2">0.4～2</td><td colspan="2">3.5～19</td></tr>
            <tr><td colspan="3">WIDTH ACROSS FLATS [mm]</td>
                <td>17</td><td>19</td><td colspan="2">10</td></tr>
            <tr><td rowspan="3">DIMENSION [mm]</td>
                <td>EFFECTIVE LENGTH</td><td>L</td>
                <td colspan="2">131</td><td colspan="2">155</td></tr>
            <tr><td rowspan="2">OVERALL LENGTH</td><td rowspan="2">L'</td>
                <td colspan="2" rowspan="2">180</td>
                <td colspan="2" rowspan="2">202 (202)</td></tr><tr></tr>
            <tr><td colspan="3">WEIGHT[kg]</td>
                <td colspan="2">0.15</td><td colspan="2">0.21</td></tr>
          </table>
        """)
        tables = extract.normalize_table(table, 0)
        self.assertEqual(len(tables), 1)
        result = tables[0]
        self.assertEqual(len(result["rows"]), 4)
        records = [dict(zip(result["columns"], row["values"])) for row in result["rows"]]
        self.assertEqual([record["MODEL"] for record in records],
                         ["SP2N2", "SP2N2", "SP19N2/SP19N2-MH", "SP19N2/SP19N2-MH"])
        self.assertEqual([record["WIDTH ACROSS FLATS [mm]"] for record in records],
                         ["17", "19", "10", "10"])
        self.assertEqual([record["HEAD VARIANT"] for record in records], ["", "", "", "-1"])
        self.assertEqual([column for column in result["columns"] if "OVERALL LENGTH" in column],
                         ["DIMENSION [mm] / OVERALL LENGTH / L'"])

    def test_distinct_model_sections_stay_separate(self):
        rows = [
            ["MODEL", "MODEL", "SP2N2", "SP8N2"],
            ["RANGE", "RANGE", "0.4-2", "1.5-8"],
            ["MODEL", "MODEL", "SP38N2/SP38N2-MH ( ) dimension is -MH", "SP67N2"],
            ["RANGE", "RANGE", "8-38", "13-67"],
        ]
        merged = extract.merge_model_header_rows(rows)
        self.assertEqual(len(merged), 4)
        self.assertEqual(merged[2][2], "SP38N2/SP38N2-MH")

    def test_adjacent_different_model_headers_stay_separate(self):
        rows = [["MODEL", "SP2N2", "SP8N2"], ["MODEL", "SP38N2", "SP67N2"]]
        self.assertEqual(extract.merge_model_header_rows(rows), rows)


if __name__ == "__main__":
    unittest.main()
