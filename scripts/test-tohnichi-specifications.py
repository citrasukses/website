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

    def test_side_by_side_panels_are_models_not_parameter_names(self):
        table = extract.html.fromstring("""<table>
          <tr><td>MODEL</td><td>DIMENSION</td><td>WEIGHT [kg]</td>
              <td>MODEL</td><td>DIMENSION</td><td>WEIGHT [kg]</td></tr>
          <tr><td>QLMS2N-MH</td><td>27.3</td><td>0.35</td>
              <td>CLMS2NX8D-MH</td><td>27.3</td><td>0.32</td></tr>
          <tr><td>QLMS5N-MH</td><td>27.3</td><td>0.35</td>
              <td>CLMS5NX8D-MH</td><td>27.3</td><td>0.32</td></tr>
        </table>""")
        tables = extract.normalize_table(table, 0)
        self.assertEqual([row["model"] for table in tables for row in table["rows"]],
                         ["QLMS2N-MH", "QLMS5N-MH", "CLMS2NX8D-MH", "CLMS5NX8D-MH"])

    def test_type_headings_are_not_models(self):
        table = extract.html.fromstring("""<table>
          <tr><td>MODEL</td><td>Receiver</td></tr>
          <tr><td>MODEL</td><td>R-CM</td></tr>
          <tr><td>POWER</td><td>DC24V</td></tr>
        </table>""")
        tables = extract.normalize_table(table, 0)
        self.assertEqual([row["model"] for table in tables for row in table["rows"]], ["R-CM"])

    def test_omitted_model_heading_is_inferred_from_codes(self):
        table = extract.html.fromstring("""<table>
          <tr><td></td><td></td><td>SCL2N-9X12-MH</td><td>SCL5N-9X12-MH</td></tr>
          <tr><td>TORQUE RANGE [N・m]</td><td>MIN.-MAX.</td><td>0.4-2</td><td>1-5</td></tr>
        </table>""")
        tables = extract.normalize_table(table, 0)
        self.assertEqual([row["model"] for row in tables[0]["rows"]], ["SCL2N-9X12-MH", "SCL5N-9X12-MH"])

    def test_horizontal_parameters_are_not_combined(self):
        table = extract.html.fromstring("""<table>
          <tr><td>DENSITY [g/cm3]</td><td>WEIGHT [g]</td><td>CONTAINER [mm]</td></tr>
          <tr><td>0.89</td><td>NET90 PER BOTTLE</td><td>φ41×152</td></tr>
        </table>""")
        parameters = extract.normalize_table(table, 0)[0]["commonSpecifications"]
        self.assertEqual(parameters, [{"label": "DENSITY [g/cm3]", "value": "0.89"},
                                      {"label": "WEIGHT [g]", "value": "NET90 PER BOTTLE"},
                                      {"label": "CONTAINER [mm]", "value": "φ41×152"}])

    def test_parameter_panels_keep_their_own_values(self):
        table = extract.html.fromstring("""<table>
          <tr><td>VOLTAGE</td><td>DC 5V</td><td></td><td>OUTPUT</td><td>RS232C</td></tr>
          <tr><td>SAMPLING SPEED</td><td>4000/sec.</td><td></td><td>POWER AC [V]</td><td>100-240</td></tr>
        </table>""")
        parameters = extract.normalize_table(table, 0)[0]["commonSpecifications"]
        self.assertEqual(parameters[0], {"label": "VOLTAGE", "value": "DC 5V"})
        self.assertEqual(parameters[2], {"label": "OUTPUT", "value": "RS232C"})


if __name__ == "__main__":
    unittest.main()
