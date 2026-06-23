import { brands as representedBrands, type Product, type ProductGroup } from "@/data/brands";
import { popularBrands2026 } from "@/data/popular-brands";
import { tradingBrands as legacyTradingBrands } from "@/data/trading-brands";
import { getBrandLogoPath } from "@/data/brand-logos";
import type { CatalogBrand, CatalogProduct, CatalogProductGroup } from "@/data/catalog-types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function lookupKey(value: string) {
  return value.toLowerCase().replace(/\[[^\]]+\]/g, "").replace(/[^a-z0-9]+/g, "");
}

function toCatalogProduct(product: Product, index: number): CatalogProduct {
  const slug = slugify(product.model || product.name) || `product-${index + 1}`;
  return {
    ...product,
    slug,
    images: product.image ? [product.image] : [],
    specifications: []
  };
}

function toCatalogGroup(group: ProductGroup): CatalogProductGroup {
  return {
    ...group,
    products: group.products.map(toCatalogProduct)
  };
}

const representedAliases = new Map<string, string>([
  [lookupKey("UNIT"), "nippon-unit-brush"]
]);

const representedByKey = new Map(representedBrands.map((brand) => [lookupKey(brand.name), brand]));
for (const [alias, slug] of representedAliases) {
  const brand = representedBrands.find((candidate) => candidate.slug === slug);
  if (brand) representedByKey.set(alias, brand);
}

const tradingByKey = new Map(legacyTradingBrands.map((brand) => [lookupKey(brand.name), brand]));

export function buildSeedCatalog(): CatalogBrand[] {
  const rankedSlugs = new Set<string>();

  const ranked = popularBrands2026.map<CatalogBrand>((sourceName, index) => {
    const key = lookupKey(sourceName);
    const represented = representedByKey.get(key);

    if (represented) {
      rankedSlugs.add(represented.slug);
      return {
        ...represented,
        brandType: "represented",
        published: true,
        popularityRank: index + 1,
        productGroups: represented.productGroups.map(toCatalogGroup)
      };
    }

    const legacy = tradingByKey.get(key);
    const name = legacy?.name ?? sourceName;
    const slug = slugify(name);
    rankedSlugs.add(slug);

    return {
      slug,
      name,
      brandType: "general-trading",
      published: true,
      popularityRank: index + 1,
      countryCode: "",
      country: legacy?.country ?? "",
      category: legacy?.category ?? {
        id: "Produk industrial dan supply general trading",
        en: "Industrial products and general trading supply"
      },
      logo: getBrandLogoPath(slug),
      heroImage: "",
      summary: {
        id: `${name} termasuk dalam daftar brand general trading populer CSE untuk kebutuhan procurement industrial.`,
        en: `${name} is part of CSE's popular general trading portfolio for industrial procurement.`
      },
      description: {
        id: `Kirim model, spesifikasi, kuantitas, dan aplikasi produk ${name} agar tim CSE dapat meninjau opsi supply yang sesuai.`,
        en: `Send the ${name} model, specification, quantity, and application so CSE can review suitable supply options.`
      },
      strengths: [
        { id: "Dukungan sourcing berdasarkan model dan spesifikasi", en: "Sourcing support by model and specification" },
        { id: "Review kebutuhan dan alternatif produk", en: "Requirement and product alternative review" },
        { id: "Proses RFQ untuk kebutuhan industrial", en: "RFQ process for industrial requirements" }
      ],
      searchTerms: Array.from(new Set([name, sourceName, ...(legacy?.searchTerms ?? [])])),
      productGroups: []
    };
  });

  const additionalRepresented = representedBrands
    .filter((brand) => !rankedSlugs.has(brand.slug))
    .map<CatalogBrand>((brand) => ({
      ...brand,
      brandType: "represented",
      published: true,
      productGroups: brand.productGroups.map(toCatalogGroup)
    }));

  return [...ranked, ...additionalRepresented];
}

export const seedCatalog = buildSeedCatalog();
