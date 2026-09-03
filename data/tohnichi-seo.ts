/**
 * TOHNICHI catalogue families prioritized for the first indexing phase.
 *
 * Selection criteria:
 * - highlighted in TOHNICHI's current product categories or 2025.10 Reference Guide;
 * - represents a core tightening, inspection, calibration, or measurement use case;
 * - has populated model/specification tables sourced from the official product page.
 *
 * Keep this list intentionally small. Other catalogue pages remain accessible and
 * followable, but are excluded from the sitemap and marked noindex until promoted.
 */
export const TOHNICHI_PRIORITY_PRODUCT_SLUGS = [
  "ql-qle2",
  "ql",
  "qsp-qsp-mh",
  "cl-cle2",
  "rtd",
  "rntd",
  "db-dbe-dbr",
  "ql-mh",
  "cl-mh",
  "csp-csp-mh",
  "sp-sp2-sp2-mh",
  "rsp2-rsp2-mh",
  "cem3-cem3-g",
  "ctb2-ctb2-g",
  "cta2-cta2-g",
  "stc2-g-stc2-g-bt",
  "ftd",
  "dote4-dote4-g",
  "tcc2-tcc2-g",
  "tdt3-tdt3-g",
  "lc3-lc3-g",
  "dlc-dlc-g",
  "atge-atge-g",
  "btge-btge-g",
  "tme3-g"
] as const;

export type TohnichiPriorityProductSlug = (typeof TOHNICHI_PRIORITY_PRODUCT_SLUGS)[number];

const priorityProductSlugs = new Set<string>(TOHNICHI_PRIORITY_PRODUCT_SLUGS);

export function isTohnichiPriorityProduct(slug: string) {
  return priorityProductSlugs.has(slug);
}
