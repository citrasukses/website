# TOHNICHI landing page update — 27 September 2026

Scope: implement the seven-section plan on `/brands/tohnichi` and `/en/brands/tohnichi` without changing their canonical URLs.

## Completed sections and evidence

1. Introduction, quotation action, official verification: expanded bilingual hero; brand-prefilled quotation link; manufacturer sales/service and calibration/repair references directly below the hero.
2. Product categories and selected models: three categories and ten existing family links appear before service and educational content.
3. Local support: purchasing, calibration/verification, and repair information includes the inputs customers should provide and the details to confirm with CSE.
4. Technical expertise: a three-step selection framework connects joint requirements, process control, and verification to CSE's existing technical guidance. This uses the plan's technical-expertise option; it makes no customer case-study or measured-outcome claim.
5. Demonstration and tightening education: existing QL/CL video, safety sequence, promotion carousel, and educational links retained after the expertise section.
6. Technical guides: all nine guides retained; dark background, heading, introduction, and eyebrow use defined, readable colors.
7. Buyer/service FAQs and final inquiry action: six native expandable FAQs followed by a TOHNICHI-specific inquiry CTA.

## Sources and claims

Manufacturer references checked during implementation:
- https://en.global-tohnichi.com/support/distributors.html
- https://en.global-tohnichi.com/support/

No invented prices, stock, turnaround times, accreditation, customer outcomes, or service photographs were added. Individual service scope and documents are confirmed through inquiry.

## Verification

- ESLint: zero errors; five existing unused-variable warnings in the industry page/components, outside this change.
- TypeScript: passed.
- Bilingual production build: passed. A later rebuild collided with another live workspace build while copying `out`; that process was allowed to finish. Its completed output was checked to contain the final changes in both languages.
- SEO audit: 586 HTML pages, 312 indexable pages and sitemap entries, zero errors or warnings.
- Performance asset budgets: passed.
- Final generated HTML assertions: both locales contain all seven sections in order, one H1, correct canonicals, official references, three product categories, three service cards, three expertise steps, video, nine guide links, six FAQs, and localized inquiry URLs.
- Browser: Indonesian and English quotation links reach contact forms with TOHNICHI prefilled; service FAQ expands; desktop and narrow/mobile layouts inspected; no horizontal overflow at 390px; final guide contrast visually confirmed; no captured browser errors.
- React review: added content remains server-rendered; no new client dependency, effect, or event listener; native details/summary provides FAQ interaction.

Deployment was not performed as part of this change. Local preview: http://127.0.0.1:3187/brands/tohnichi
