# Post-deployment SEO checklist

Use this checklist after **every production deployment** to `https://cse.co.id`. Complete the immediate checks even when a release appears unrelated to SEO: navigation, metadata, build configuration, redirects, or hosting behavior can affect crawling and lead capture indirectly.

For the implementation rules behind these checks, refer to `docs/SEO.md`. For performance budgets and test routes, refer to `docs/PERFORMANCE.md`.

## Deployment record

Complete this first so any ranking, indexing, or conversion change can be tied to a release.

```text
Deployment date and time:
Git commit or release:
Person deploying:
Summary of changes:
Changed public URLs:
Added URLs:
Removed or redirected URLs:
SEO-sensitive changes: metadata / content / links / sitemap / robots / redirects / schema / performance / forms / none
Search Console actions taken:
Problems found and resolution:
Final result: PASS / PASS WITH FOLLOW-UP / FAILED
```

## 1. Immediate production checks

Complete within 15 minutes of deployment.

### Availability and crawlability

- [ ] `https://cse.co.id/` loads successfully over HTTPS.
- [ ] Every changed public URL loads successfully and shows the intended language and content.
- [ ] Test at least one Indonesian URL and its `/en` equivalent.
- [ ] `https://cse.co.id/robots.txt` returns the expected rules and names the production sitemap.
- [ ] `https://cse.co.id/sitemap.xml` loads as valid XML using `https://cse.co.id` URLs.
- [ ] No indexable page is blocked by `robots.txt`, a Cloudflare challenge, authentication, or a `noindex` directive.
- [ ] Invalid dynamic slugs return a real `404`, not a branded page with status `200`.
- [ ] Any redirect changed in this release reaches the correct final URL without a loop or unnecessary chain.
- [ ] Static assets load from production without `404`, mixed-content, or MIME-type errors.

Optional quick header checks:

```bash
curl -I https://cse.co.id/
curl -I https://cse.co.id/robots.txt
curl -I https://cse.co.id/sitemap.xml
curl -I https://cse.co.id/brands/tohnichi
curl -I https://cse.co.id/en/brands/tohnichi
```

### Search metadata

Inspect the homepage, every SEO-sensitive changed page, and at least one representative dynamic product page.

- [ ] The page has one descriptive `<title>` and one meta description.
- [ ] The canonical points to the correct `https://cse.co.id` production URL.
- [ ] Indonesian and English `hreflang` links are present, reciprocal, and use the correct paths.
- [ ] The page has exactly one visible H1 matching its intended search intent.
- [ ] Indexable pages are present in the sitemap; intentional `noindex` pages are absent.
- [ ] Open Graph and X metadata use the correct page title, description, and image.
- [ ] Structured data is valid, supported by visible content, and contains no invented offer, rating, review, certification, or availability data.
- [ ] Important internal links use the final canonical URL instead of a redirect.

### Conversion and attribution

- [ ] Submit one clearly labelled production test RFQ and confirm that a success reference is returned.
- [ ] Confirm the inquiry is stored and can be retrieved by the responsible CSE team.
- [ ] Confirm `payload_json._attribution` contains a landing pathname, channel, and query-free referrer where applicable.
- [ ] Confirm no name, email, phone number, company, or message is placed in analytics events.
- [ ] Click a visible CSE email link and confirm the `contact_email_click` event is available to the configured analytics collector.
- [ ] If the form fallback is intentionally tested, confirm `inquiry_email_fallback` is emitted.
- [ ] If an approved WhatsApp link exists in a future release, confirm its click event without exposing the visitor's message or personal data.
- [ ] Mark the production test inquiry as test/spam or remove it through the approved operational process.

Attribution test URL:

```text
https://cse.co.id/?utm_source=deployment-test&utm_medium=referral&utm_campaign=post-deploy
```

Open that URL in a fresh private session, navigate normally to `/contact`, submit the test RFQ, and verify that first-touch attribution remains attached to the inquiry.

### Critical user experience

- [ ] Desktop and mobile navigation work in Indonesian and English.
- [ ] The homepage, TOHNICHI brand page, priority product page, guide, and contact page have no obvious layout breakage.
- [ ] The TOHNICHI video shows its poster and does not download or autoplay before the visitor presses play.
- [ ] Product images do not overflow, stretch, or cause obvious layout shifts.
- [ ] There are no blocking browser-console errors on representative pages.

## 2. Search Console actions

Complete on the deployment day when indexable content, metadata, canonicals, redirects, sitemap membership, or robots behavior changed.

- [ ] Inspect the homepage and each materially changed priority URL with **URL Inspection**.
- [ ] Use **Test Live URL** to confirm Google can retrieve the current deployment.
- [ ] Confirm the declared canonical and Google-selected canonical are aligned when Search Console has processed the page.
- [ ] Request indexing only for a small number of important, materially changed indexable URLs.
- [ ] Submit `https://cse.co.id/sitemap.xml` if this is the first submission or its URL membership changed materially.
- [ ] Do not repeatedly resubmit an unchanged sitemap or request indexing for all 312 URLs.
- [ ] Record inspected URLs and actions in the deployment record.

Priority inspection set when relevant:

```text
https://cse.co.id/
https://cse.co.id/brands/tohnichi
https://cse.co.id/en/brands/tohnichi
https://cse.co.id/tohnichi-torsi-tepat
https://cse.co.id/torque-wrench
https://cse.co.id/brands/tohnichi/products/ql-qle2
```

## 3. Performance checks

Complete after any layout, component, script, font, image, video, or hosting change. For a routine content-only deployment, test the changed page plus the homepage.

- [ ] Run PageSpeed Insights or an equivalent Chrome trace for both mobile and desktop.
- [ ] Test `/`, `/brands/tohnichi`, `/brands/tohnichi/products/ql-qle2`, `/tohnichi-torsi-tepat`, and `/contact` when the deployment affects shared code.
- [ ] Record LCP, CLS, INP or laboratory TBT, the largest transfers, and render-blocking resources.
- [ ] Target field LCP at or below `2.5 s`, INP at or below `200 ms`, and CLS at or below `0.1` at the 75th percentile.
- [ ] Investigate any regression against the previous deployment before adding more performance work.
- [ ] Confirm the production page still uses the optimized WebP images and click-to-play TOHNICHI video.

The local regression budgets should already have passed through `npm run verify:seo`; production measurement checks the real CDN, network, cache, and browser behavior that a local build cannot prove.

## 4. Checks during the first week

- [ ] Review Cloudflare or hosting logs for unexpected `5xx`, asset `404`, redirect loops, or bot challenges.
- [ ] Review Search Console **Page indexing** for new `404`, `Server error`, `Blocked`, `Duplicate`, or unexpected `Excluded by noindex` conditions.
- [ ] Confirm important changed URLs have been crawled or remain queued without a technical blocking reason.
- [ ] Check Search Console **Performance** for a site-wide fall in impressions or clicks; account for normal daily variation.
- [ ] Confirm organic RFQs continue to arrive with usable landing-page and channel attribution.
- [ ] Verify any new external backlink points directly to the canonical HTTPS URL.

Do not roll back merely because indexing is slow or rankings fluctuate for a few days. Recrawling and reprocessing can take time.

## 5. Review after 28 days

For an SEO-sensitive deployment, compare the latest complete 28 days with the previous 28 days.

- [ ] Record organic clicks, impressions, CTR, and average position.
- [ ] Separate branded and non-branded queries when enough data is available.
- [ ] Review results by query, page, country, and device.
- [ ] Identify high-impression, low-CTR pages that may need a clearer title, description, or intent match.
- [ ] Check whether the intended canonical owner ranks for its target query instead of another CSE page.
- [ ] Record organic RFQs and conversion rate by landing page.
- [ ] Review the exact `TOHNICHI` and `TOHNICHI Indonesia` query group using `^tohnichi$|^tohnichi indonesia$`.
- [ ] Decide whether to keep, refine, consolidate, or expand content based on query and conversion evidence.

Do not create mass pages simply because one keyword has impressions. Add or index a page only when CSE can provide verified, distinct, decision-useful content.

## 6. Stop-the-line conditions

Treat the deployment as failed or requiring immediate repair when any of these occurs:

- an important public page returns `5xx`, an unexpected `404`, or a challenge page;
- the homepage, a major landing page, `robots.txt`, or `sitemap.xml` is unavailable;
- an important indexable page receives `noindex` or an incorrect canonical;
- the sitemap exposes draft, private, duplicate, or intentionally non-indexable URLs;
- Indonesian and English canonicals or alternates cross incorrectly;
- redirects loop or send established URLs to unrelated content;
- the RFQ form cannot save inquiries;
- personal inquiry data appears in analytics events;
- a deployment introduces fabricated claims, specifications, reviews, prices, certification, or structured data; or
- a severe performance regression makes a primary page unusable.

## 7. Close the deployment review

- [ ] All immediate checks are complete.
- [ ] Problems and follow-up owners are recorded.
- [ ] Search Console actions are recorded.
- [ ] The production test inquiry is handled appropriately.
- [ ] Performance results are saved when required.
- [ ] The deployment record has a final status.

If every required item passes, mark the deployment **PASS**. Use **PASS WITH FOLLOW-UP** only for non-blocking monitoring items such as pending recrawl. Use **FAILED** when a stop-the-line condition remains unresolved.

## Related documentation

- `docs/SEO.md` — canonical SEO implementation and content rules.
- `docs/PERFORMANCE.md` — current asset budgets and performance test routes.
- `docs/tohnichi-indexing-strategy.md` — selective TOHNICHI indexing and Search Console comparison plan.
- `docs/seo-authority-plan.md` — verified authority signals, backlink outreach, and case-study requirements.
