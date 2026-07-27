import type { Brand, Product, ProductGroup } from "@/data/brands";
import type { LocalizedText } from "@/lib/i18n";

export type BrandType = "represented" | "general-trading";

export type ProductSpecification = {
  label: LocalizedText;
  value: LocalizedText;
};

export type CatalogProduct = Product & {
  slug: string;
  images: string[];
  specifications: ProductSpecification[];
};

export type CatalogProductGroup = Omit<ProductGroup, "products"> & {
  products: CatalogProduct[];
};

export type CatalogBrand = Omit<Brand, "productGroups"> & {
  brandType: BrandType;
  published: boolean;
  popularityRank?: number;
  productGroups: CatalogProductGroup[];
};

