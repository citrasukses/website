# CSE SEO Update Guide

Use this guide whenever the website is updated. Its purpose is to keep public pages discoverable, crawlable, indexable, and consistent across Indonesian and English without relying on developer memory.

This website uses the Next.js App Router, a bilingual static export, and Cloudflare. Indonesian pages use the root URL structure and English equivalents use `/en`.

## Non-negotiable rules

- Do not redesign a page only for SEO.
- Do not add hidden, filler, duplicated, or keyword-stuffed content.
- Do not invent product specifications, prices, availability, reviews, ratings, certifications, or claims.
- Do not add `<meta name="keywords">`.
- Do not make every generated page indexable automatically.
- Preserve intentional `noindex,follow` behavior for useful but low-priority or incomplete pages.
- Use `https://cse.co.id` for all production canonicals and structured-data URLs.
- Every indexable page must be in the sitemap and reachable through at least one normal internal link.
- Every invalid dynamic slug must return a real 404.
- Never edit generated files in `out/` directly. Change the source and rebuild.

## Current SEO architecture

| Concern | Current source |
|---|---|
| Shared metadata helpers | `lib/seo.ts` |
| URL localization and language alternates | `lib/i18n.ts` |
| Sitemap generation | `app/sitemap.ts` |
| Robots output | `app/robots.ts` |
| Brand publication rules | `lib/brand-publication.ts` |
| Brand visibility rules | `lib/brand-visibility.ts` |
| Selective TOHNICHI product indexing | `data/tohnichi-seo.ts` |
| Legacy redirects and language redirects | `worker/static-export.js` |
| Bilingual production build | `scripts/build-bilingual-site.mjs` |

When changing any of these files, verify both Indonesian and English output.

## Indexability policy

An indexable page is intended to appear in search results. A public page may still be intentionally non-indexable.

| Page family | Default policy |
|---|---|
| Homepage and important static pages | Indexable |
| Product category hubs | Indexable |
| Published industry, solution, and guide pages | Indexable |
| Published and verified brand pages | Indexable |
| Draft or unresolved brand pages | Not indexable or not generated publicly |
| `/brands/tohnichi/products` complete catalogue | `noindex,follow` |
| Priority TOHNICHI product families | Indexable |
| Other TOHNICHI product families | `noindex,follow` |
| Other product families | Decide from verified page value; do not assume automatically |
| Search, filter, preview, utility, and duplicate variants | Not indexable |
| Unknown routes or slugs | 404 |

Before indexing a product page, confirm that it has enough verified, unique value. Useful signals include:

- clear product identity and manufacturer;
- category and application;
- verified specifications or model information;
- selection guidance or use cases;
- relevant images with descriptive alternative text;
- related brand, category, solution, industry, or guide links;
- a useful RFQ path.

If the page is mainly a name, image, and generic request form, keep it `noindex,follow` until it is improved.

## Workflow for every website update

### 1. Classify the change

Determine whether the update:

- edits content on an existing URL;
- adds a new URL;
- adds or changes a product, brand, category, industry, solution, or guide;
- changes navigation or internal links;
- changes Indonesian or English content;
- renames, moves, merges, or removes a URL;
- changes metadata, structured data, robots, redirects, or sitemap logic.

Content-only changes still require metadata, language, and internal-link checks.

### 2. Decide indexability before publishing

For a new or substantially changed page, record the answer to these questions:

1. Is the page public and complete?
2. Does it provide unique value beyond another existing page?
3. Should it appear in Google Search?
4. Is the content supported by verified repository data?
5. Does an equivalent Indonesian or English page actually exist?

If the page is indexable, it must have a self-referencing canonical and be included in the sitemap. If it is not indexable, emit `noindex` and exclude it from the sitemap.

Do not use `robots.txt` to remove a normal HTML page from search results. The crawler must be able to access a page to see its `noindex` directive.

### 3. Check metadata

Every indexable page needs:

- a unique and descriptive title;
- a useful description based on visible page content;
- a self-referencing production canonical;
- correct robots behavior;
- Open Graph and Twitter metadata when an appropriate image exists;
- Indonesian and English alternates when both equivalents exist.

Dynamic pages should use `generateMetadata()` with the same data used to render the page. Prefer `buildPageMetadata()` instead of adding another page-specific URL builder.

Avoid titles such as `Product | CSE`. Include the brand, product family, application, or subject that distinguishes the page.

### 4. Check Indonesian and English versions

For equivalent localized pages:

- Indonesian canonical: `https://cse.co.id/<path>`;
- English canonical: `https://cse.co.id/en/<path>`;
- each page references itself and the other language version;
- both pages link back to each other;
- `<html lang>` and visible page language are correct;
- internal links stay within the selected language;
- there are no new internal `?lang=en` links.

Do not emit hreflang for a translation that does not exist or contains meaningfully different content.

### 5. Check internal linking

Every important indexable page needs at least one crawlable incoming link from a relevant page.

Use Next.js `<Link>` or a normal `<a href>`. Do not make essential navigation depend only on a JavaScript click handler.

Recommended relationships include:

- brand index to brand page;
- brand page to priority products;
- product page back to its brand and category;
- category to relevant products and guides;
- industry to relevant solutions and brands;
- solution to relevant products, industries, and guides;
- guide to the related category, solution, brand, and product pages.

Use descriptive, natural anchor text. Avoid repeating generic text such as “Learn more” for every link.

### 6. Check sitemap behavior

`app/sitemap.ts` must include every canonical, indexable URL and exclude:

- `noindex` pages;
- redirects and redirect sources;
- preview or localhost URLs;
- duplicate and non-canonical variants;
- invalid or unfinished pages;
- 404 pages.

Generate routes from the same structured data used by the pages. Do not maintain a second large manual URL list.

Only emit `lastModified` when it comes from a trustworthy content update date. Do not update dates merely because the site was rebuilt.

### 7. Check page structure

Each important page should have:

- one clear primary `<h1>`;
- logical `<h2>` and `<h3>` hierarchy;
- meaningful content inside the root layout's `<main>`;
- crawlable links;
- descriptive `alt` text for informative images;
- `alt=""` for purely decorative images;
- useful content in the initial server-rendered HTML.

Do not add hidden SEO paragraphs or visually duplicate content.

### 8. Check structured data

Structured data must match visible, verified content.

Suitable types currently include:

- `Organization` for CSE;
- `BreadcrumbList` for hierarchy;
- `CollectionPage` and `ItemList` for collections;
- `Article` for buyer guides;
- `Service` for solution pages;
- product-related types only when their properties accurately describe the page.

Valid JSON-LD alone does not guarantee eligibility for a Google rich result. Product rich results require real offer, review, or rating data. If CSE does not have that data, do not invent it merely to remove a Search Console warning.

When adding JSON-LD:

- use absolute production URLs;
- keep entity names and descriptions consistent with visible content;
- omit unknown properties;
- avoid conflicting copies of the same entity;
- verify the generated JSON parses successfully.

### 9. Handle URL changes safely

When renaming, moving, merging, or removing an indexed URL:

1. Find the most relevant current destination.
2. Add a permanent redirect in `worker/static-export.js`.
3. Preserve the `/en` language mapping.
4. Remove the old URL from the sitemap.
5. Update all internal links to the destination URL.
6. Confirm there is no redirect chain or loop.
7. Confirm the redirect target returns 200 and has the expected canonical.

Do not redirect every removed product to the homepage. Use a relevant brand, category, replacement product, or catalogue page. Return 404 when there is no honest replacement.

## Update-specific checklists

### New static, industry, solution, category, or guide page

- [ ] Route renders in Indonesian and English, if both versions exist.
- [ ] Page has one H1 and logical headings.
- [ ] Title and description are unique and accurate.
- [ ] Canonical is self-referencing.
- [ ] Hreflang targets exist and are reciprocal.
- [ ] Indexability decision is explicit.
- [ ] Indexable URL is generated by the sitemap.
- [ ] At least one relevant page links to it.
- [ ] Images use appropriate alt text.
- [ ] Structured data matches visible content.
- [ ] Invalid slugs return 404 for dynamic routes.

### New or updated brand

- [ ] Brand identity and official source are verified.
- [ ] Publication rules are updated deliberately.
- [ ] Indonesian and English summaries are meaningful.
- [ ] Brand page is not based on unresolved or ambiguous identity.
- [ ] Brand page links to relevant products or product categories.
- [ ] Brand index and other relevant pages link to the brand.
- [ ] Metadata uses the correct brand name and actual offering.
- [ ] Sitemap inclusion matches robots behavior.

### New or updated product family

- [ ] Product belongs to the correct brand and group.
- [ ] Slug is stable, descriptive, and unique.
- [ ] Product content uses verified source data.
- [ ] Indexability is decided from page value, not page existence.
- [ ] TOHNICHI priority promotion updates `data/tohnichi-seo.ts` deliberately.
- [ ] Product metadata is unique and accurate.
- [ ] Product page links back to brand/category context.
- [ ] A relevant collection page links to the product.
- [ ] Sitemap inclusion and robots metadata agree.
- [ ] Legacy URL is redirected when replacing an older family URL.

### Navigation or component update

- [ ] Important links remain real anchors or Next.js links.
- [ ] Indonesian links do not unexpectedly point to `/en`.
- [ ] English links retain the `/en` prefix.
- [ ] No indexable page becomes orphaned.
- [ ] No internal link points to a redirect or 404.
- [ ] Heading hierarchy is not broken by reusable components.

## Verification commands

Run from the repository root:

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:audit
```

After the build, inspect at least:

```text
out/robots.txt
out/sitemap.xml
out/index.html
out/en/index.html
```

Use `npm run verify:seo` to run lint, typecheck, the bilingual production build, and the SEO audit as one workflow. The audit exits non-zero when it finds crawlability or indexability errors; warnings remain visible without failing the command.

The automated audit checks generated HTML, `sitemap.xml`, `robots.txt`, canonicals, robots directives, hreflang reciprocity, internal links, redirect targets, titles, descriptions, H1 counts, JSON-LD syntax, image alt attributes, and indexable orphan pages. It also warns about thin pages and duplicate metadata within the same locale.

Minimum representative set:

```text
homepage
static page
brand page
priority product page
intentional noindex product page
industry page
solution page
guide page
Indonesian page
English page
invalid dynamic slug
legacy redirect, when redirects changed
```

For each representative page, verify:

- HTTP behavior or generated file existence;
- title and description;
- robots directive;
- canonical;
- hreflang;
- H1;
- internal links;
- structured-data JSON;
- correct visible language.

## Cloudflare and Search Console checks

Repository code does not control every Cloudflare WAF or bot setting. After a deployment that changes SEO behavior:

- confirm `https://cse.co.id/robots.txt` is reachable;
- confirm `https://cse.co.id/sitemap.xml` is reachable;
- confirm verified search-engine bots are not receiving a challenge page;
- inspect important changed URLs in Google Search Console;
- monitor Page Indexing, especially `Discovered - currently not indexed`, `Crawled - currently not indexed`, `Duplicate`, `404`, and `Excluded by noindex`;
- compare results with `SEO_SEARCH_CONSOLE_BASELINE_2026-08-21.md` and `docs/tohnichi-indexing-strategy.md`;
- allow time for recrawling before judging the update from manual searches.

Submitting a sitemap and requesting indexing are discovery signals, not guarantees that Google will index or rank a page.

## Definition of done

An update is SEO-safe when:

- [ ] the bilingual production build succeeds;
- [ ] intended indexable URLs resolve successfully;
- [ ] invalid URLs return 404;
- [ ] sitemap and robots behavior match the indexability decision;
- [ ] canonicals use the production hostname consistently;
- [ ] Indonesian and English alternates are accurate and reciprocal;
- [ ] no important page is orphaned;
- [ ] no new broken or redirecting internal links exist;
- [ ] metadata is unique and based on visible content;
- [ ] structured data is accurate and parseable;
- [ ] intentional selective product indexing remains intact;
- [ ] no fabricated SEO content or product claims were introduced.
