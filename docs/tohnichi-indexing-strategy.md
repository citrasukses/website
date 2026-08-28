# TOHNICHI indexing and Search Console plan

Implementation date: 28 August 2026

## Decision

The local catalogue contains 159 TOHNICHI product-family pages. All 159 have an official product source, 128 have populated model/specification tables, and 31 are application, accessory, system, or incomplete pages without a populated model table.

The first indexing phase is intentionally limited to 25 current, fully specified families. The remaining 134 pages stay accessible and `follow`, but are `noindex` and excluded from the sitemap. This preserves catalogue usefulness without asking Google to evaluate every family at once.

“Popular” is treated as a research proxy, not a claim about sales volume. TOHNICHI does not publish model-level sales figures. Selection uses current manufacturer prominence, inclusion in TOHNICHI's product-selection guide, breadth of industrial use, and complete official-source specification coverage.

## Priority families

1. QL/QLE2
2. QL+
3. QSP/QSP-MH
4. CL/CLE2
5. RTD
6. RNTD
7. DB/DBE/DBR
8. QL-MH
9. CL-MH
10. CSP/CSP-MH
11. SP/SP2/SP2-MH
12. RSP2/RSP2-MH
13. CEM3/CEM3-G
14. CTB2/CTB2-G
15. CTA2/CTA2-G
16. STC2-G/STC2-G-BT
17. FTD
18. DOTE4/DOTE4-G
19. TCC2/TCC2-G
20. TDT3/TDT3-G
21. LC3/LC3-G
22. DLC/DLC-G
23. ATGE/ATGE-G
24. BTGE/BTGE-G
25. TME3-G

Primary research sources:

- [TOHNICHI Reference Guide 2025.10](https://en.global-tohnichi.com/download_services/download?category=download&fid=736&filetype=1&search=&subid=316)
- [Adjustable torque-wrench category](https://en.global-tohnichi.com/products/categories/13)
- [Manual-tool calibration and management category](https://en.global-tohnichi.com/products/categories/58)
- [Torque gauge category](https://en.global-tohnichi.com/products/categories/31)
- [Torque meter category](https://en.global-tohnichi.com/products/categories/32/1000)

The selected pages all have one or more populated specification tables in `data/tohnichi-specifications.json`. Discontinued DOTE3, DOT(E3)-MD, and TME2 families are deliberately excluded.

## Internal-link architecture

- `/brands/tohnichi` is the canonical TOHNICHI entity and commercial landing page.
- The brand page focuses on CSE's authorization, three buyer-facing categories, six representative series, services, applications, guides, and RFQ paths. Its primary structured-data list points to the category hubs and separate catalogue.
- `/brands/tohnichi/products` holds the complete searchable 159-family catalogue. It is `noindex,follow` so it remains useful and crawlable without competing with the brand landing page.
- Every product family links back through the breadcrumb, “All TOHNICHI products” action, and catalogue-lineup navigation.
- Every torque category links to the brand page from its hero and support block.
- Every buyer guide links to the brand page from its hero.
- The complete catalogue remains crawlable from the brand page; the 134 non-priority family pages remain `noindex,follow`.

## Search Console measurement

The pre-deployment baseline covers 29 June–19 August 2026:

- `tohnichi`: 2 clicks, 12 impressions, 16.7% CTR, average position 7.5.
- `tohnichi indonesia`: 7 clicks, 29 impressions, 24.1% CTR, average position 5.6.
- `/brands/tohnichi`: 5 clicks, 33 impressions, 15.2% CTR, average position 7.5.
- `/en/brands/tohnichi`: 2 clicks, 6 impressions, 33.3% CTR, average position 6.3.

After deployment and recrawl:

1. In **Performance → Search results**, use the query regex `^tohnichi$|^tohnichi indonesia$`.
2. Add the **Page** dimension and compare `/`, `/brands/tohnichi`, `/en/brands/tohnichi`, and product URLs.
3. Compare the latest complete 28 days with the previous 28 days; retain the baseline above for the pre-launch reference.
4. Confirm that the brand page becomes the main landing page for the exact branded query. Product pages should earn model-specific long-tail queries, not compete for bare `TOHNICHI`.
5. In **Page indexing**, verify that non-priority product URLs move to “Excluded by `noindex`” and that only the 25 priority families per language remain submitted product URLs.
6. Recheck the same split after 6–8 weeks. Promote additional families only after their content is complete and the first set shows stable crawl/index performance.

Search Console cannot prove causality from a manual ranking check. Use page-level impressions, clicks, average position, indexed-page counts, and branded landing-page share together.
