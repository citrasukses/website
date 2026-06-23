"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearCatalogSession,
  createCatalogSession,
  requireCatalogAdmin,
  verifyCatalogPassword
} from "@/lib/catalog-auth";
import { deleteCatalogBrand, saveCatalogBrand, syncCatalogFromPopularBrands } from "@/lib/catalog";
import { slugify } from "@/data/catalog-seed";
import type { CatalogBrand } from "@/data/catalog-types";

export type LoginState = { error: string };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateBrand(input: CatalogBrand): CatalogBrand {
  const name = clean(input.name);
  const slug = slugify(clean(input.slug) || name);
  if (!name || !slug) throw new Error("Brand name and slug are required.");

  const productGroups = (input.productGroups ?? []).map((group, groupIndex) => ({
    ...group,
    slug: slugify(clean(group.slug) || clean(group.title?.en) || clean(group.title?.id) || `category-${groupIndex + 1}`),
    title: { id: clean(group.title?.id), en: clean(group.title?.en) },
    description: { id: clean(group.description?.id), en: clean(group.description?.en) },
    products: (group.products ?? []).map((product, productIndex) => {
      const productName = clean(product.name);
      return {
        ...product,
        name: productName,
        slug: slugify(clean(product.slug) || clean(product.model) || productName || `product-${productIndex + 1}`),
        model: clean(product.model) || undefined,
        image: clean(product.image),
        images: Array.from(new Set((product.images ?? []).map(clean).filter(Boolean))),
        summary: { id: clean(product.summary?.id), en: clean(product.summary?.en) },
        tags: (product.tags ?? []).map((tag) => ({ id: clean(tag.id), en: clean(tag.en) })).filter((tag) => tag.id || tag.en),
        specifications: (product.specifications ?? [])
          .map((specification) => ({
            label: { id: clean(specification.label?.id), en: clean(specification.label?.en) },
            value: { id: clean(specification.value?.id), en: clean(specification.value?.en) }
          }))
          .filter((specification) => specification.label.id || specification.label.en)
      };
    }).filter((product) => product.name)
  }));

  return {
    ...input,
    slug,
    name,
    countryCode: clean(input.countryCode).toUpperCase(),
    country: clean(input.country),
    logo: clean(input.logo),
    heroImage: clean(input.heroImage),
    category: { id: clean(input.category?.id), en: clean(input.category?.en) },
    summary: { id: clean(input.summary?.id), en: clean(input.summary?.en) },
    description: { id: clean(input.description?.id), en: clean(input.description?.en) },
    strengths: (input.strengths ?? []).map((item) => ({ id: clean(item.id), en: clean(item.en) })).filter((item) => item.id || item.en),
    searchTerms: (input.searchTerms ?? []).map(clean).filter(Boolean),
    popularityRank: input.popularityRank && input.popularityRank > 0 ? Math.round(input.popularityRank) : undefined,
    productGroups
  };
}

export async function loginCatalogAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  const password = clean(formData.get("password"));
  if (!(await verifyCatalogPassword(password))) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { error: "Invalid password." };
  }
  await createCatalogSession();
  redirect("/admin/catalog");
}

export async function logoutCatalogAdmin() {
  await clearCatalogSession();
  redirect("/admin/catalog/login");
}

export async function upsertCatalogBrand(formData: FormData) {
  await requireCatalogAdmin();
  const payload = clean(formData.get("payload"));
  const previousSlug = clean(formData.get("previousSlug")) || undefined;
  const brand = validateBrand(JSON.parse(payload) as CatalogBrand);
  await saveCatalogBrand(brand, previousSlug);
  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath(`/brands/${brand.slug}`);
  redirect(`/admin/catalog/${brand.slug}?saved=1`);
}

export async function removeCatalogBrand(formData: FormData) {
  await requireCatalogAdmin();
  const slug = clean(formData.get("slug"));
  if (slug) await deleteCatalogBrand(slug);
  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath("/admin/catalog");
}

export async function importPopularBrandRanking() {
  await requireCatalogAdmin();
  await syncCatalogFromPopularBrands();
  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath("/admin/catalog");
}
