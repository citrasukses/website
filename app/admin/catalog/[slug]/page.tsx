import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BrandEditor } from "@/components/admin/BrandEditor";
import { getCatalogBrandBySlug } from "@/lib/catalog";
import { isCatalogAdmin } from "@/lib/catalog-auth";
import type { CatalogBrand } from "@/data/catalog-types";

export const metadata: Metadata = { title: "Edit Catalog Brand", robots: { index: false, follow: false } };

const newBrand: CatalogBrand = {
  slug: "new-brand",
  name: "",
  brandType: "general-trading",
  published: false,
  countryCode: "",
  country: "",
  category: { id: "", en: "" },
  logo: "",
  heroImage: "",
  summary: { id: "", en: "" },
  description: { id: "", en: "" },
  strengths: [],
  searchTerms: [],
  productGroups: []
};

export default async function CatalogBrandEditorPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> }) {
  if (!(await isCatalogAdmin())) redirect("/admin/catalog/login");
  const { slug } = await params;
  const { saved } = await searchParams;
  const brand = slug === "new" ? structuredClone(newBrand) : await getCatalogBrandBySlug(slug, { includeUnpublished: true });
  if (!brand) notFound();

  return (
    <section className="bg-graphite-50 py-12">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/admin/catalog" className="text-sm font-semibold text-industrial-700">← All brands</Link><h1 className="mt-3 text-3xl font-bold text-graphite-900">{slug === "new" ? "Create brand" : `Edit ${brand.name}`}</h1></div>
          {saved ? <p className="border border-industrial-500 bg-white px-4 py-3 text-sm font-semibold text-industrial-700">Changes saved.</p> : null}
        </div>
        <BrandEditor initialBrand={brand} previousSlug={slug === "new" ? undefined : slug} />
      </div>
    </section>
  );
}

