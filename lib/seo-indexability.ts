import { nacCouplingProductDetails } from "@/data/nac-coupling-product-details";
import { nacProductDetails } from "@/data/nac-product-details";
import { sankyoRikagakuProductDetails } from "@/data/sankyo-rikagaku-product-details";
import { isTohnichiPriorityProduct } from "@/data/tohnichi-seo";

export type IndexabilityDecision = {
  index: boolean;
  follow: boolean;
  reason: string;
};

export const INDEXABLE: IndexabilityDecision = {
  index: true,
  follow: true,
  reason: "Published page with sufficient unique value"
};

export const NOINDEX_FOLLOW: IndexabilityDecision = {
  index: false,
  follow: true,
  reason: "Public supporting page that is not currently eligible for indexing"
};

export const NOINDEX_NOFOLLOW: IndexabilityDecision = {
  index: false,
  follow: false,
  reason: "Unpublished or unavailable page"
};

export function getBrandIndexability({ published, publiclyAvailable }: { published: boolean; publiclyAvailable: boolean }) {
  return published && publiclyAvailable ? INDEXABLE : NOINDEX_NOFOLLOW;
}

export function getBrandCatalogueIndexability() {
  return {
    ...NOINDEX_FOLLOW,
    reason: "Complete catalogue supports discovery but is intentionally excluded to avoid competing with focused landing pages"
  };
}

export function getProductIndexability({
  brandSlug,
  productSlug,
  published,
  publiclyAvailable
}: {
  brandSlug: string;
  productSlug: string;
  published: boolean;
  publiclyAvailable: boolean;
}): IndexabilityDecision {
  if (!published || !publiclyAvailable) return NOINDEX_NOFOLLOW;

  if (brandSlug === "tohnichi") {
    return isTohnichiPriorityProduct(productSlug)
      ? INDEXABLE
      : {
          ...NOINDEX_FOLLOW,
          reason: "TOHNICHI family is accessible but has not been promoted into the priority indexing set"
        };
  }

  if (brandSlug === "nac") {
    const hasVerifiedDetail = Boolean(nacProductDetails[productSlug] ?? nacCouplingProductDetails[productSlug]);
    return hasVerifiedDetail
      ? INDEXABLE
      : { ...NOINDEX_FOLLOW, reason: "NAC family does not yet have verified product-detail content" };
  }

  if (brandSlug === "fuji-star") {
    return sankyoRikagakuProductDetails[productSlug]
      ? INDEXABLE
      : { ...NOINDEX_FOLLOW, reason: "FUJISTAR family does not yet have verified product-detail content" };
  }

  return {
    ...NOINDEX_FOLLOW,
    reason: "Product family requires an explicit verified-content indexing rule"
  };
}
