"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { submitBuyerInquiry, submitPartnerInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { Language } from "@/lib/i18n";

const initialState: InquiryState = { ok: false, message: "" };

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-signal-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {pending ? pendingLabel : label}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite-800">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900"
      />
    </label>
  );
}

function TextArea({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite-800">
      {label}
      <textarea
        name={name}
        required={required}
        rows={5}
        className="focus-ring resize-y border border-graphite-300 bg-white px-3 py-3 text-sm font-normal text-graphite-900"
      />
    </label>
  );
}

export function RFQForm({ lang, brands }: { lang: Language; brands: Array<{ slug: string; name: string }> }) {
  const [state, formAction] = useActionState(submitBuyerInquiry, initialState);
  const searchParams = useSearchParams();
  const selectedBrand = (() => {
    const brandSlug = searchParams.get("brand");
    return brands.find((brand) => brand.slug === brandSlug)?.name ?? "";
  })();
  const selectedProduct = searchParams.get("product") ?? "";

  return (
    <form action={formAction} className="grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <input type="hidden" name="lang" value={lang} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={lang === "en" ? "Name" : "Nama"} name="name" required />
        <Field label={lang === "en" ? "Company" : "Perusahaan"} name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label={lang === "en" ? "Phone / WhatsApp" : "Telepon / WhatsApp"} name="phone" />
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Brand interested" : "Brand yang diminati"}
          <select
            name="brand"
            defaultValue={selectedBrand}
            className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900"
          >
            <option value="">{lang === "en" ? "General" : "Umum"}</option>
            {brands.map((brand) => (
              <option key={brand.slug} value={brand.name}>{brand.name}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Product / model" : "Produk / model"}
          <input name="product" defaultValue={selectedProduct} className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900" />
        </label>
        <Field label={lang === "en" ? "Quantity" : "Kuantitas"} name="quantity" />
        <Field label={lang === "en" ? "Application / use case" : "Aplikasi / kebutuhan"} name="application" />
      </div>
      <TextArea label={lang === "en" ? "Message" : "Pesan"} name="message" required />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton label={lang === "en" ? "Send RFQ" : "Kirim RFQ"} pendingLabel={lang === "en" ? "Sending..." : "Mengirim..."} />
        {state.message ? (
          <p className={`text-sm font-semibold ${state.ok ? "text-industrial-700" : "text-signal-600"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export function PartnerInquiryForm({ lang }: { lang: Language }) {
  const [state, formAction] = useActionState(submitPartnerInquiry, initialState);

  return (
    <form action={formAction} className="grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <input type="hidden" name="lang" value={lang} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={lang === "en" ? "Name" : "Nama"} name="name" required />
        <Field label={lang === "en" ? "Company" : "Perusahaan"} name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label={lang === "en" ? "Country" : "Negara"} name="country" required />
        <Field label="Website" name="website" type="url" placeholder="https://" />
        <Field label={lang === "en" ? "Product category" : "Kategori produk"} name="category" />
        <Field label={lang === "en" ? "Current export markets" : "Pasar ekspor saat ini"} name="markets" />
      </div>
      <TextArea label={lang === "en" ? "What support is needed in Indonesia?" : "Dukungan apa yang dibutuhkan di Indonesia?"} name="support" />
      <TextArea label={lang === "en" ? "Message" : "Pesan"} name="message" required />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton
          label={lang === "en" ? "Send partner inquiry" : "Kirim inquiry partner"}
          pendingLabel={lang === "en" ? "Sending..." : "Mengirim..."}
        />
        {state.message ? (
          <p className={`text-sm font-semibold ${state.ok ? "text-industrial-700" : "text-signal-600"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
