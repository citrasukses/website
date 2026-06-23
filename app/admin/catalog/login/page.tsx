import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CatalogLoginForm } from "@/components/admin/CatalogLoginForm";
import { catalogAuthConfigured, isCatalogAdmin, usesDevelopmentAdminDefaults } from "@/lib/catalog-auth";

export const metadata: Metadata = { title: "Catalog Admin", robots: { index: false, follow: false } };

export default async function CatalogLoginPage() {
  if (await isCatalogAdmin()) redirect("/admin/catalog");
  const configured = catalogAuthConfigured();
  const developmentDefaults = usesDevelopmentAdminDefaults();

  return (
    <section className="bg-graphite-50 py-20">
      <div className="mx-auto max-w-md border border-graphite-200 bg-white p-8 shadow-panel">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">Internal catalog</p>
        <h1 className="mt-3 text-3xl font-bold text-graphite-900">Catalog administration</h1>
        <p className="mt-3 text-sm leading-6 text-graphite-500">Sign in to create, edit, publish, and remove brands or products.</p>
        {!configured ? (
          <p className="mt-6 border border-signal-500 bg-signal-500/5 p-4 text-sm font-semibold text-signal-600">
            Configure CATALOG_ADMIN_PASSWORD and CATALOG_SESSION_SECRET before using this page.
          </p>
        ) : null}
        {developmentDefaults ? (
          <p className="mt-6 border border-industrial-500 bg-industrial-500/5 p-4 text-sm text-industrial-700">
            Local development default password: <strong>admin</strong>. Production refuses this default.
          </p>
        ) : null}
        {configured ? <CatalogLoginForm /> : null}
      </div>
    </section>
  );
}

