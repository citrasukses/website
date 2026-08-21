# CSE SEO and Search Console baseline

Audit date: 21 August 2026  
Property: `sc-domain:cse.co.id`

This report records the live-site baseline before the local crawlability and language-routing fixes are deployed.

## Executive finding

CSE already has some relevance for branded Tohnichi searches, but Google is not showing the site consistently. The main causes visible in Search Console are:

1. Google discovered 102 submitted/current pages but had not crawled or indexed them.
2. The catalogue migration left ranking product URLs returning 404 instead of redirecting to their replacements.
3. The previous English implementation exposed hundreds of `?lang=en` URL variants instead of consolidating them onto dedicated `/en/...` URLs.
4. Overall search demand and authority are still low: only 776 impressions and 56 clicks were recorded in the available period.

The signed-in versus random-account ranking difference is therefore plausible. A signed-in result can be influenced by history, location, language, and device. Search Console's average position is an aggregate across all impressions, not a promise that every searcher sees the same rank.

## Performance baseline

Available reporting period: 29 June–19 August 2026.

| Metric | Result |
|---|---:|
| Clicks | 56 |
| Impressions | 776 |
| CTR | 7.2% |
| Average position | 21.0 |

Recent comparison:

| Period | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| Last 28 days | 46 | 552 | 8.3% | 18.6 |
| Last 7 days | 7 | 167 | 4.2% | 24.8 |

The seven-day decline is directionally concerning but too short and low-volume to treat as a stable trend.

### Leading queries

| Query | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| `tohnichi indonesia` | 7 | 29 | 24.1% | 5.6 |
| `citra sukses ekapratama` | 4 | 18 | 22.2% | 3.5 |
| `tohnichi` | 2 | 12 | 16.7% | 7.5 |
| `pt cse` | 1 | 58 | 1.7% | 4.2 |
| `thk indonesia` | 0 | 12 | 0% | 22.2 |
| `deburring brush` | 0 | 2 | 0% | 10.5 |

`tohnichi indonesia` averaging position 5.6 means Google showed CSE around that position across 29 recorded impressions. It does not mean an anonymous user will always see the site on page one.

### Leading pages

| Page | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| `/` | 45 | 549 | 8.2% | 20.0 |
| `/brands/tohnichi` | 5 | 33 | 15.2% | 7.5 |
| `/en/brands/tohnichi` | 2 | 6 | 33.3% | 6.3 |
| `/brands` | 1 | 59 | 1.7% | 37.8 |
| `/industries` | 0 | 22 | 0% | 20.5 |

Several obsolete product URLs also earned clicks before returning 404, including `tcc2-g`, `rtd-rtdfh`, `ql-cl-series`, `db-cdb-series`, `ces-g`, and `fdd-series`. Their existing search signals should be preserved through redirects.

## Indexing baseline

Search Console page report last updated 17 August 2026.

| Status/reason | URLs |
|---|---:|
| Indexed | 96 |
| Not indexed — total | 485 |
| Alternate page with proper canonical | 256 |
| Excluded by `noindex` | 102 |
| Discovered — currently not indexed | 102 |
| Not found (404) | 18 |
| Page with redirect | 5 |
| Crawled — currently not indexed | 2 |

The 102 discovered-but-not-indexed URLs were first detected on 5 August and had no crawl date. Examples were `/about` and many Tohnichi product pages such as `/brands/tohnichi/products/5tm`, `/a`, `/a3-a4`, `/ap2`, and `/atge-atge-g`.

The 18 known 404s included former Tohnichi URLs such as `cem3-g`, `dote-g`, `rntd-series`, `cspfdd-ad`, `ces-g`, `fdd-series`, `stc2-g`, and `db-cdb-series`, plus former NAC and FUJI STAR product URLs.

## Sitemap and search features

- `https://cse.co.id/sitemap.xml` was submitted on 5 August, last read on 12 August, and reported **Success** with 167 discovered pages.
- Breadcrumb structured data: 1 valid item, 0 invalid.
- Product snippets: 1 invalid item, 0 valid. The issue is missing `offers`, `review`, or `aggregateRating`. CSE should not invent pricing or reviews; this needs a separate schema decision.
- HTTPS: 9 HTTPS URLs and 0 non-HTTPS URLs; no issue detected.
- Core Web Vitals: insufficient real-user data on both mobile and desktop.

## Priority 2 fixes completed locally

1. Every published product URL is now present in the initial HTML of its brand page. The collapsed Tohnichi catalogue uses native `<details>` so links remain crawlable without client-side interaction.
2. English pages now use dedicated `/en/...` URLs throughout navigation, metadata, canonicals, and internal links.
3. Old `?lang=en` page URLs now 301 redirect to their `/en/...` equivalent while preserving other query parameters.
4. The sitemap now emits reciprocal Indonesian, English, and `x-default` alternates for every published route.
5. Legacy catalogue URLs now 301 redirect to the closest current product-family page, in both Indonesian and English.

## Verification completed

- TypeScript: passed with `npx tsc --noEmit`.
- Production bilingual build: passed.
- Generated sitemap: 564 unique URLs, including 282 English URLs.
- Product coverage: 205 Indonesian and 205 English product URLs.
- Crawl graph: all 410 generated product URLs have an incoming link from their brand page; 0 are orphaned.
- Generated HTML contains no internal `?lang=en` links.
- Representative English product pages have English metadata and self-referencing `/en/...` canonicals.

## Post-deployment measurement

After deployment, use this report as the baseline. Do not judge the change from manual searches alone. Compare Search Console after Google recrawls the site, focusing on:

- indexed versus discovered-but-not-indexed product pages;
- non-branded Tohnichi impressions and clicks;
- the `/brands/tohnichi` landing page;
- whether legacy 404 URLs move into the redirect category;
- organic RFQ, contact, email, and WhatsApp actions.
