"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CatalogBrand } from "@/data/catalog-types";
import { removeCatalogBrand } from "@/app/admin/catalog/actions";

export function CatalogAdminList({ brands }: { brands: CatalogBrand[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.toLowerCase().trim());
  const filtered = useMemo(
    () => brands.filter((brand) => `${brand.name} ${brand.country} ${brand.slug}`.toLowerCase().includes(deferredQuery)),
    [brands, deferredQuery]
  );

  return (
    <>
      <div className="relative mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, country, or slug"
          className="min-h-12 w-full border border-graphite-300 bg-white pl-12 pr-4 text-sm"
        />
      </div>
      <div className="mt-6 overflow-x-auto border border-graphite-200 bg-white">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-graphite-900 text-white">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-200">
            {filtered.map((brand) => (
              <tr key={brand.slug}>
                <td className="px-4 py-3 text-graphite-500">{brand.popularityRank ?? "—"}</td>
                <td className="px-4 py-3">
                  <p className="font-bold text-graphite-900">{brand.name}</p>
                  <p className="mt-1 text-xs text-graphite-500">{brand.slug}</p>
                </td>
                <td className="px-4 py-3 text-graphite-600">{brand.brandType === "represented" ? "Represented" : "General trading"}</td>
                <td className="px-4 py-3 text-graphite-600">{brand.productGroups.reduce((sum, group) => sum + group.products.length, 0)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-bold ${brand.published ? "bg-industrial-500/10 text-industrial-700" : "bg-graphite-100 text-graphite-500"}`}>
                    {brand.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/catalog/${brand.slug}`} className="border border-graphite-300 px-3 py-2 font-semibold hover:border-industrial-600 hover:text-industrial-700">Edit</Link>
                    <form action={removeCatalogBrand} onSubmit={(event) => {
                      if (!window.confirm(`Delete ${brand.name}? This cannot be undone.`)) event.preventDefault();
                    }}>
                      <input type="hidden" name="slug" value={brand.slug} />
                      <button type="submit" className="border border-graphite-300 px-3 py-2 font-semibold text-signal-600 hover:border-signal-500">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
