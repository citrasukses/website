# TOHNICHI specification table audit — 20 November 2026

The catalogue now prints each primary model name once per product table. Shared
specifications use merged cells, while different opening sizes, head variants,
dimensions, and compatible equipment remain paired in their individual option
rows. SP/SP2/SP2-MH has 11 model groups; SP2N2 appears once and retains its eight
opening sizes. Different options are not collapsed into an ambiguous range.

## Scope and source evidence

- All 161 catalogue product pages, in Indonesian and English: 322 rendered pages.
- 159 manufacturer product sources, plus the M-FD and M-FH pages. Their tables
  derive from the matching, independently checked R-CM records.
- 1,855 normalized source records. The independent source checker expands the
  original HTML spans without pandas, then checks that every record's values
  coexist in a source row or column. It also checks source model-code coverage
  and common parameter values. Numeric `3` and `3.0` are treated as equivalent.
  A range unit printed at the left applies only to following numeric cells in
  that source row. Units are made explicit without converting numeric values.
- Source URLs, SHA-256 fingerprints, and per-family counts are recorded in
  `data/tohnichi-specification-audit.json`.

The cache is local and ignored by Git. Re-fetching creates a new source snapshot;
review a changed snapshot before replacing published data.

## Corrections

- Stacked standard, memory-pointer, Bluetooth, and FD/FDD headers retain their
  real model codes. Receiver/transmitter category labels and dimension notes
  are not published as orderable models.
- Multi-panel model tables are read vertically within each panel. This restores
  53 models for QLLS/CLLS/PQLLS/PCLLS/TiQLLS/YCLLS and the larger
  QSPLS/CSPLS/QRSPLS/SPLS/RSPLS table.
- SCL-MH and SCSP-MH retain the eight model codes in their unlabeled first rows.
- Interchangeable marking heads and part-number sections are kept separate from
  the main MPCL/MCSP wrench specifications.
- Common specification sections, horizontal parameter headings, and side-by-side
  parameter lists retain their proper label/value associations.
- Exact duplicate dimension rows are removed. Genuine alternative values remain.
- Unit-only cells are not imported as extra model options or numeric ranges.
  Shared parameter values are not copied into their own column headings, and
  technical footnotes remain notes rather than becoming specification columns.
- RTD and LTD use the same verified source pipeline as the rest of the catalogue;
  the competing handwritten model arrays and renderer have been removed.
- Unit case is preserved in headings. Generic fallback prose is not presented as
  a technical specification table. Standard accessories and notes remain visible.

Two manufacturer heading errors are corrected with the Reference Guide 2025.10:
EPP16M3's “Thermal Line Dot” is a printing method, not a weight (page 69), and
DWQL's torque limits/graduation are torque specifications, not model names
(page 24). Exact corrections and the official reference URL are stored in
`data/tohnichi-specification-corrections.json`. No numeric specification is
invented by these corrections.

TDMS App's official detail URL currently returns 404. Its official category
listing is used instead; it publishes no specification table, so none is
fabricated for that page.

## Verification and maintenance

Python extraction checks require `lxml`, `pandas`, `pdfplumber`, and `pypdf`.
The Node checks run on Node 22, matching the existing CI configuration.

```sh
python scripts/cache-tohnichi-sources.py --directory output/tohnichi-audit/html
python scripts/test-tohnichi-specifications.py
python scripts/refresh-tohnichi-specifications.py \
  --html-dir output/tohnichi-audit/html --output output/tohnichi-audit/candidate.json
python scripts/audit-tohnichi-source.py \
  --data output/tohnichi-audit/candidate.json --html-dir output/tohnichi-audit/html
node --disable-warning=ExperimentalWarning scripts/test-tohnichi-tables.mjs \
  output/tohnichi-audit/candidate.json
```

After reviewing and promoting the candidate data:

```sh
npm run test:tohnichi
npm run typecheck
npm run build
npm run tohnichi:audit
npm run seo:audit
npm run performance:audit
```

The rendered audit checks every model name, header grid, rowspan boundary, option
value, and common parameter on all 322 pages. It expands merged cells and compares
them with the expected data, detecting missing models and changed size/dimension
associations. The catalogue checks also ensure every source primary model reaches
the display and that equivalent spellings are not printed separately. Both
TOHNICHI checks are part of `npm run verify:seo` in CI.

Browser checks covered the SP table on desktop and a 390-pixel mobile viewport,
including horizontal scrolling and focus on the scroll region, and the restored
QLLS table in English. Local proof screenshots are in `output/tohnichi-audit/`.

Publication to the separate `cse.co.id` Cloudflare deployment still requires a
valid Cloudflare login; the existing token expired and could not be refreshed.
