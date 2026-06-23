"use client";

import { useState } from "react";
import { Plus, Save, Trash2, Upload } from "lucide-react";
import { upsertCatalogBrand } from "@/app/admin/catalog/actions";
import { slugify } from "@/data/catalog-seed";
import type { CatalogBrand, CatalogProduct, CatalogProductGroup, ProductSpecification } from "@/data/catalog-types";
import type { LocalizedText } from "@/lib/i18n";

const inputClass = "min-h-11 w-full border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900";
const textAreaClass = `${inputClass} min-h-24 py-3`;

function Field({ label, value, onChange, placeholder = "", type = "text" }: { label: string; value: string | number; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite-800">
      {label}
      <input className={inputClass} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite-800">
      {label}
      <textarea className={textAreaClass} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function LocalizedFields({ label, value, onChange, multiline = false }: { label: string; value: LocalizedText; onChange: (value: LocalizedText) => void; multiline?: boolean }) {
  const Component = multiline ? TextArea : Field;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Component label={`${label} (ID)`} value={value.id} onChange={(id) => onChange({ ...value, id })} />
      <Component label={`${label} (EN)`} value={value.en} onChange={(en) => onChange({ ...value, en })} />
    </div>
  );
}

function UploadButton({ brandSlug, onUploaded }: { brandSlug: string; onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.set("file", file);
    formData.set("brandSlug", brandSlug);
    try {
      const response = await fetch("/api/admin/catalog/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Upload failed.");
      onUploaded(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 border border-graphite-300 bg-white px-3 text-xs font-bold text-graphite-700 hover:border-industrial-600">
        <Upload className="h-4 w-4" aria-hidden="true" />
        {uploading ? "Uploading…" : "Upload image"}
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" disabled={uploading} onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }} />
      </label>
      {error ? <p className="mt-2 text-xs font-semibold text-signal-600">{error}</p> : null}
    </div>
  );
}

function emptyProduct(): CatalogProduct {
  return {
    slug: "new-product",
    name: "",
    model: "",
    image: "",
    images: [],
    summary: { id: "", en: "" },
    tags: [],
    specifications: []
  };
}

function emptyGroup(): CatalogProductGroup {
  return {
    slug: "new-category",
    title: { id: "", en: "" },
    description: { id: "", en: "" },
    products: []
  };
}

function ProductEditor({ product, brandSlug, onChange, onDelete }: { product: CatalogProduct; brandSlug: string; onChange: (product: CatalogProduct) => void; onDelete: () => void }) {
  const updateSpecification = (index: number, specification: ProductSpecification) => {
    const specifications = [...product.specifications];
    specifications[index] = specification;
    onChange({ ...product, specifications });
  };

  return (
    <div className="border border-graphite-200 bg-graphite-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-bold text-graphite-900">{product.name || "New product"}</h4>
        <button type="button" onClick={onDelete} className="inline-flex items-center gap-2 text-xs font-bold text-signal-600"><Trash2 className="h-4 w-4" /> Remove</button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Field label="Product name" value={product.name} onChange={(name) => onChange({ ...product, name, slug: product.slug === "new-product" ? slugify(name) : product.slug })} />
        <Field label="Model" value={product.model ?? ""} onChange={(model) => onChange({ ...product, model })} />
        <Field label="Slug" value={product.slug} onChange={(slug) => onChange({ ...product, slug: slugify(slug) })} />
      </div>
      <div className="mt-4"><LocalizedFields label="Summary" value={product.summary} onChange={(summary) => onChange({ ...product, summary })} multiline /></div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <Field label="Primary image URL" value={product.image} onChange={(image) => onChange({ ...product, image })} />
        <UploadButton brandSlug={brandSlug} onUploaded={(url) => onChange({ ...product, image: product.image || url, images: [...product.images, url] })} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TextArea label="Gallery image URLs (one per line)" value={product.images.join("\n")} onChange={(value) => onChange({ ...product, images: value.split("\n").map((item) => item.trim()).filter(Boolean) })} />
        <TextArea
          label="Tags (one per line: Indonesian | English)"
          value={product.tags.map((tag) => `${tag.id} | ${tag.en}`).join("\n")}
          onChange={(value) => onChange({ ...product, tags: value.split("\n").filter(Boolean).map((line) => {
            const [id = "", en = ""] = line.split("|").map((item) => item.trim());
            return { id, en: en || id };
          }) })}
        />
      </div>
      <div className="mt-5 border-t border-graphite-200 pt-5">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-bold text-graphite-900">Specifications</h5>
          <button type="button" onClick={() => onChange({ ...product, specifications: [...product.specifications, { label: { id: "", en: "" }, value: { id: "", en: "" } }] })} className="inline-flex items-center gap-2 text-xs font-bold text-industrial-700"><Plus className="h-4 w-4" /> Add specification</button>
        </div>
        <div className="mt-3 grid gap-3">
          {product.specifications.map((specification, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <Field label="Label ID" value={specification.label.id} onChange={(id) => updateSpecification(index, { ...specification, label: { ...specification.label, id } })} />
              <Field label="Label EN" value={specification.label.en} onChange={(en) => updateSpecification(index, { ...specification, label: { ...specification.label, en } })} />
              <Field label="Value ID" value={specification.value.id} onChange={(id) => updateSpecification(index, { ...specification, value: { ...specification.value, id } })} />
              <Field label="Value EN" value={specification.value.en} onChange={(en) => updateSpecification(index, { ...specification, value: { ...specification.value, en } })} />
              <button type="button" aria-label="Remove specification" onClick={() => onChange({ ...product, specifications: product.specifications.filter((_, itemIndex) => itemIndex !== index) })} className="mt-7 h-11 px-3 text-signal-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupEditor({ group, brandSlug, onChange, onDelete }: { group: CatalogProductGroup; brandSlug: string; onChange: (group: CatalogProductGroup) => void; onDelete: () => void }) {
  const updateProduct = (index: number, product: CatalogProduct) => {
    const products = [...group.products];
    products[index] = product;
    onChange({ ...group, products });
  };

  return (
    <section className="border border-graphite-300 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-600">Category</p><h3 className="mt-2 text-xl font-bold text-graphite-900">{group.title.en || group.title.id || "New category"}</h3></div>
        <button type="button" onClick={onDelete} className="inline-flex items-center gap-2 text-xs font-bold text-signal-600"><Trash2 className="h-4 w-4" /> Remove category</button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Field label="Category slug" value={group.slug} onChange={(slug) => onChange({ ...group, slug: slugify(slug) })} />
        <Field label="Title (ID)" value={group.title.id} onChange={(id) => onChange({ ...group, title: { ...group.title, id } })} />
        <Field label="Title (EN)" value={group.title.en} onChange={(en) => onChange({ ...group, title: { ...group.title, en } })} />
      </div>
      <div className="mt-4"><LocalizedFields label="Description" value={group.description} onChange={(description) => onChange({ ...group, description })} multiline /></div>
      <div className="mt-6 flex items-center justify-between border-t border-graphite-200 pt-5">
        <h4 className="font-bold text-graphite-900">Products ({group.products.length})</h4>
        <button type="button" onClick={() => onChange({ ...group, products: [...group.products, emptyProduct()] })} className="inline-flex items-center gap-2 border border-graphite-300 px-3 py-2 text-xs font-bold text-industrial-700"><Plus className="h-4 w-4" /> Add product</button>
      </div>
      <div className="mt-4 grid gap-4">
        {group.products.map((product, index) => (
          <ProductEditor key={index} product={product} brandSlug={brandSlug} onChange={(next) => updateProduct(index, next)} onDelete={() => onChange({ ...group, products: group.products.filter((_, itemIndex) => itemIndex !== index) })} />
        ))}
      </div>
    </section>
  );
}

export function BrandEditor({ initialBrand, previousSlug }: { initialBrand: CatalogBrand; previousSlug?: string }) {
  const [brand, setBrand] = useState(initialBrand);
  const updateGroup = (index: number, group: CatalogProductGroup) => {
    const productGroups = [...brand.productGroups];
    productGroups[index] = group;
    setBrand({ ...brand, productGroups });
  };

  return (
    <form action={upsertCatalogBrand} className="mt-8 grid gap-6">
      <input type="hidden" name="previousSlug" value={previousSlug ?? ""} />
      <input type="hidden" name="payload" value={JSON.stringify(brand)} />

      <section className="border border-graphite-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-graphite-900">Brand identity</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Field label="Brand name" value={brand.name} onChange={(name) => setBrand({ ...brand, name, slug: brand.slug === "new-brand" ? slugify(name) : brand.slug })} />
          <Field label="Slug" value={brand.slug} onChange={(slug) => setBrand({ ...brand, slug: slugify(slug) })} />
          <label className="grid gap-2 text-sm font-semibold text-graphite-800">Brand type<select className={inputClass} value={brand.brandType} onChange={(event) => setBrand({ ...brand, brandType: event.target.value as CatalogBrand["brandType"] })}><option value="general-trading">General trading</option><option value="represented">Represented</option></select></label>
          <Field label="Popularity rank" value={brand.popularityRank ?? ""} type="number" onChange={(value) => setBrand({ ...brand, popularityRank: value ? Number(value) : undefined })} />
          <Field label="Country" value={brand.country} onChange={(country) => setBrand({ ...brand, country })} />
          <Field label="Country code" value={brand.countryCode} onChange={(countryCode) => setBrand({ ...brand, countryCode })} placeholder="JP" />
          <label className="flex min-h-11 items-center gap-3 self-end border border-graphite-300 px-3 text-sm font-semibold"><input type="checkbox" checked={brand.published} onChange={(event) => setBrand({ ...brand, published: event.target.checked })} /> Published</label>
          <label className="flex min-h-11 items-center gap-3 self-end border border-graphite-300 px-3 text-sm font-semibold"><input type="checkbox" checked={brand.featured ?? false} onChange={(event) => setBrand({ ...brand, featured: event.target.checked })} /> Featured</label>
        </div>
      </section>

      <section className="border border-graphite-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-graphite-900">Value proposition and content</h2>
        <div className="mt-5 grid gap-5">
          <LocalizedFields label="Category / proposition" value={brand.category} onChange={(category) => setBrand({ ...brand, category })} />
          <LocalizedFields label="Short summary" value={brand.summary} onChange={(summary) => setBrand({ ...brand, summary })} multiline />
          <LocalizedFields label="Detailed description" value={brand.description} onChange={(description) => setBrand({ ...brand, description })} multiline />
          <TextArea label="Search terms (one per line)" value={(brand.searchTerms ?? []).join("\n")} onChange={(value) => setBrand({ ...brand, searchTerms: value.split("\n").map((item) => item.trim()).filter(Boolean) })} />
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-graphite-200 pt-5"><h3 className="font-bold text-graphite-900">Value proposition cards</h3><button type="button" onClick={() => setBrand({ ...brand, strengths: [...brand.strengths, { id: "", en: "" }] })} className="inline-flex items-center gap-2 text-xs font-bold text-industrial-700"><Plus className="h-4 w-4" /> Add card</button></div>
        <div className="mt-4 grid gap-3">
          {brand.strengths.map((strength, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <Field label="Card text (ID)" value={strength.id} onChange={(id) => setBrand({ ...brand, strengths: brand.strengths.map((item, itemIndex) => itemIndex === index ? { ...item, id } : item) })} />
              <Field label="Card text (EN)" value={strength.en} onChange={(en) => setBrand({ ...brand, strengths: brand.strengths.map((item, itemIndex) => itemIndex === index ? { ...item, en } : item) })} />
              <button type="button" aria-label="Remove card" onClick={() => setBrand({ ...brand, strengths: brand.strengths.filter((_, itemIndex) => itemIndex !== index) })} className="mt-7 h-11 px-3 text-signal-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-graphite-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-graphite-900">Brand images</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="grid gap-3"><Field label="Logo URL" value={brand.logo} onChange={(logo) => setBrand({ ...brand, logo })} /><UploadButton brandSlug={brand.slug} onUploaded={(logo) => setBrand({ ...brand, logo })} /></div>
          <div className="grid gap-3"><Field label="Hero image URL" value={brand.heroImage} onChange={(heroImage) => setBrand({ ...brand, heroImage })} /><UploadButton brandSlug={brand.slug} onUploaded={(heroImage) => setBrand({ ...brand, heroImage })} /></div>
        </div>
      </section>

      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-signal-600">Categories and products</p><h2 className="mt-2 text-2xl font-bold text-graphite-900">Product catalog</h2></div><button type="button" onClick={() => setBrand({ ...brand, productGroups: [...brand.productGroups, emptyGroup()] })} className="inline-flex min-h-11 items-center gap-2 bg-industrial-700 px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add category</button></div>
      {brand.productGroups.map((group, index) => <GroupEditor key={index} group={group} brandSlug={brand.slug} onChange={(next) => updateGroup(index, next)} onDelete={() => setBrand({ ...brand, productGroups: brand.productGroups.filter((_, itemIndex) => itemIndex !== index) })} />)}

      <div className="sticky bottom-4 z-20 flex justify-end"><button type="submit" className="inline-flex min-h-12 items-center gap-2 bg-signal-500 px-6 text-sm font-bold text-white shadow-panel hover:bg-signal-600"><Save className="h-4 w-4" /> Save brand</button></div>
    </form>
  );
}
