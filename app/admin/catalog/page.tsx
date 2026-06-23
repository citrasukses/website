import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CatalogAdminList } from "@/components/admin/CatalogAdminList";
import { getCatalogBrands, catalogStorageMode } from "@/lib/catalog";
import { isCatalogAdmin } from "@/lib/catalog-auth";
import { importPopularBrandRanking, logoutCatalogAdmin } from "@/app/admin/catalog/actions";

export const metadata: Metadata = { title: "Catalog Admin", robots: { index: false, follow: false } };

export default async function CatalogAdminPage() {
  if (!(await isCatalogAdmin())) redirect("/admin/catalog/login");
  const brands = await getCatalogBrands({ includeUnpublished: true });
  const storageMode = catalogStorageMode();

  return (
    <section className="bg-graphite-50 py-16">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">Catalog administration</p>
            <h1 className="mt-3 text-4xl font-bold text-graphite-900">Brands and products</h1>
            <p className="mt-3 text-sm text-graphite-500">{brands.length} brands · storage: {storageMode}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <form action={importPopularBrandRanking}>
              <button type="submit" className="min-h-11 border border-graphite-300 bg-white px-4 text-sm font-semibold hover:border-industrial-600">Reapply Excel ranking</button>
            </form>
            <Link href="/admin/catalog/new" className="inline-flex min-h-11 items-center bg-signal-500 px-4 text-sm font-semibold text-white hover:bg-signal-600">New brand</Link>
            <form action={logoutCatalogAdmin}>
              <button type="submit" className="min-h-11 border border-graphite-300 bg-white px-4 text-sm font-semibold">Sign out</button>
            </form>
          </div>
        </div>
        {storageMode === "read-only" ? (
          <p className="mt-6 border border-signal-500 bg-white p-4 text-sm font-semibold text-signal-600">
            DATABASE_URL is missing. The deployed catalog can be viewed but mutations are disabled.
          </p>
        ) : null}
        <CatalogAdminList brands={brands} />
      </div>
    </section>
  );
}
