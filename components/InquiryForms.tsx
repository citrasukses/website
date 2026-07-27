"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { company } from "@/data/navigation";
import type { Language } from "@/lib/i18n";

type FormStatus = {
  ok: boolean;
  message: string;
};

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function mailtoHref(subject: string, fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, fieldValue]) => fieldValue.length > 0)
    .map(([label, fieldValue]) => `${label}: ${fieldValue}`)
    .join("\n");

  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-signal-600"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (!status.message) return null;

  return (
    <p className={`text-sm font-semibold ${status.ok ? "text-industrial-700" : "text-signal-600"}`}>
      {status.message}
    </p>
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

export function RFQForm({
  lang,
  brands,
  selectedBrand = "",
  selectedProduct = ""
}: {
  lang: Language;
  brands: Array<{ slug: string; name: string }>;
  selectedBrand?: string;
  selectedProduct?: string;
}) {
  const [status, setStatus] = useState<FormStatus>({ ok: false, message: "" });
  const [brandValue, setBrandValue] = useState(selectedBrand);
  const [productValue, setProductValue] = useState(selectedProduct);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandSlug = params.get("brand");
    const product = params.get("product");

    if (brandSlug) {
      setBrandValue(brands.find((brand) => brand.slug === brandSlug)?.name ?? "");
    }
    if (product) {
      setProductValue(product);
    }
  }, [brands]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = {
      Name: value(formData, "name"),
      Company: value(formData, "company"),
      Email: value(formData, "email"),
      "Phone / WhatsApp": value(formData, "phone"),
      "Brand interested": value(formData, "brand"),
      "Product / model": value(formData, "product"),
      Quantity: value(formData, "quantity"),
      "Application / use case": value(formData, "application"),
      Message: value(formData, "message")
    };

    if (!fields.Name || !fields.Company || !fields.Email || !fields.Message) {
      setStatus({
        ok: false,
        message: lang === "en" ? "Please complete the required fields." : "Mohon lengkapi field yang wajib diisi."
      });
      return;
    }

    setStatus({
      ok: true,
      message: lang === "en" ? "Opening your email client..." : "Membuka aplikasi email Anda..."
    });
    window.location.href = mailtoHref(`CSE RFQ: ${fields.Company} - ${fields["Brand interested"] || "General inquiry"}`, fields);
  }

  return (
    <form onSubmit={submit} className="grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={lang === "en" ? "Name" : "Nama"} name="name" required />
        <Field label={lang === "en" ? "Company" : "Perusahaan"} name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label={lang === "en" ? "Phone / WhatsApp" : "Telepon / WhatsApp"} name="phone" />
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Brand interested" : "Brand yang diminati"}
          <select
            name="brand"
            value={brandValue}
            onChange={(event) => setBrandValue(event.target.value)}
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
          <input
            name="product"
            value={productValue}
            onChange={(event) => setProductValue(event.target.value)}
            className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900"
          />
        </label>
        <Field label={lang === "en" ? "Quantity" : "Kuantitas"} name="quantity" />
        <Field label={lang === "en" ? "Application / use case" : "Aplikasi / kebutuhan"} name="application" />
      </div>
      <TextArea label={lang === "en" ? "Message" : "Pesan"} name="message" required />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton label={lang === "en" ? "Send RFQ by email" : "Kirim RFQ via email"} />
        <StatusMessage status={status} />
      </div>
    </form>
  );
}

export function PartnerInquiryForm({ lang }: { lang: Language }) {
  const [status, setStatus] = useState<FormStatus>({ ok: false, message: "" });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = {
      Name: value(formData, "name"),
      Company: value(formData, "company"),
      Email: value(formData, "email"),
      Country: value(formData, "country"),
      Website: value(formData, "website"),
      "Product category": value(formData, "category"),
      "Current export markets": value(formData, "markets"),
      "Support needed in Indonesia": value(formData, "support"),
      Message: value(formData, "message")
    };

    if (!fields.Name || !fields.Company || !fields.Email || !fields.Country || !fields.Message) {
      setStatus({
        ok: false,
        message: lang === "en" ? "Please complete the required fields." : "Mohon lengkapi field yang wajib diisi."
      });
      return;
    }

    setStatus({
      ok: true,
      message: lang === "en" ? "Opening your email client..." : "Membuka aplikasi email Anda..."
    });
    window.location.href = mailtoHref(`CSE Partner Inquiry: ${fields.Company} (${fields.Country})`, fields);
  }

  return (
    <form onSubmit={submit} className="grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
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
          label={lang === "en" ? "Send partner inquiry by email" : "Kirim inquiry partner via email"}
        />
        <StatusMessage status={status} />
      </div>
    </form>
  );
}
