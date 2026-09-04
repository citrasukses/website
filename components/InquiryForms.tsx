"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { company } from "@/data/navigation";
import type { Language } from "@/lib/i18n";
import { getInquiryAttribution, trackLeadEvent } from "@/lib/inquiry-attribution";

type FormStatus = {
  state: "idle" | "sending" | "success" | "error";
  message: string;
  fallbackHref?: string;
  fallbackLabel?: string;
};

type InquiryType = "rfq" | "partner";

type InquiryResponse = {
  ok?: boolean;
  reference?: string;
  message?: string;
};

const initialStatus: FormStatus = { state: "idle", message: "" };

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

async function sendInquiry(type: InquiryType, lang: Language, fields: Record<string, string>, contactUrl: string) {
  const attribution = getInquiryAttribution();
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type, lang, fields, contactUrl, attribution })
  });
  const result = (await response.json().catch(() => ({}))) as InquiryResponse;

  if (!response.ok || !result.ok || !result.reference) {
    throw new Error(result.message || `Inquiry request failed (${response.status}).`);
  }

  return result.reference;
}

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-signal-600 disabled:cursor-wait disabled:opacity-65"
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function StatusMessage({ status, inquiryType, lang }: { status: FormStatus; inquiryType: InquiryType; lang: Language }) {
  if (!status.message) return null;

  return (
    <p
      role={status.state === "error" ? "alert" : "status"}
      aria-live="polite"
      className={`text-sm font-semibold ${status.state === "success" ? "text-industrial-700" : status.state === "error" ? "text-signal-600" : "text-graphite-600"}`}
    >
      {status.message}
      {status.fallbackHref ? (
        <>
          {" "}
          <a
            className="underline underline-offset-2"
            href={status.fallbackHref}
            onClick={() => trackLeadEvent("inquiry_email_fallback", { inquiryType, language: lang })}
          >
            {status.fallbackLabel}
          </a>
        </>
      ) : null}
    </p>
  );
}

function SpamTrap() {
  return (
    <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Leave this field empty
        <input name="contactUrl" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
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
  const [status, setStatus] = useState<FormStatus>(initialStatus);
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = {
      name: value(formData, "name"),
      company: value(formData, "company"),
      email: value(formData, "email"),
      phone: value(formData, "phone"),
      brand: value(formData, "brand"),
      product: value(formData, "product"),
      quantity: value(formData, "quantity"),
      application: value(formData, "application"),
      message: value(formData, "message")
    };

    if (!fields.name || !fields.company || !fields.email || !fields.message) {
      setStatus({
        state: "error",
        message: lang === "en" ? "Please complete the required fields." : "Mohon lengkapi field yang wajib diisi."
      });
      return;
    }

    const emailFields = {
      Name: fields.name,
      Company: fields.company,
      Email: fields.email,
      "Phone / WhatsApp": fields.phone,
      "Brand interested": fields.brand,
      "Product / model": fields.product,
      Quantity: fields.quantity,
      "Application / use case": fields.application,
      Message: fields.message
    };
    const fallbackHref = mailtoHref(`CSE RFQ: ${fields.company} - ${fields.brand || "General inquiry"}`, emailFields);

    setStatus({
      state: "sending",
      message: lang === "en" ? "Sending your inquiry..." : "Mengirim inquiry Anda..."
    });

    try {
      const reference = await sendInquiry("rfq", lang, fields, value(formData, "contactUrl"));
      form.reset();
      setBrandValue("");
      setProductValue("");
      trackLeadEvent("inquiry_submit_success", { inquiryType: "rfq", language: lang });
      setStatus({
        state: "success",
        message:
          lang === "en"
            ? `Inquiry received. Your reference is ${reference}.`
            : `Inquiry telah diterima. Nomor referensi Anda ${reference}.`
      });
    } catch {
      setStatus({
        state: "error",
        message:
          lang === "en"
            ? "We could not send the form right now."
            : "Form belum dapat dikirim saat ini.",
        fallbackHref,
        fallbackLabel: lang === "en" ? "Email CSE instead." : "Kirim melalui email."
      });
    }
  }

  return (
    <form onSubmit={submit} className="relative grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <SpamTrap />
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
        <SubmitButton
          pending={status.state === "sending"}
          label={
            status.state === "sending"
              ? lang === "en" ? "Sending..." : "Mengirim..."
              : lang === "en" ? "Send RFQ" : "Kirim RFQ"
          }
        />
        <StatusMessage status={status} inquiryType="rfq" lang={lang} />
      </div>
    </form>
  );
}

export function PartnerInquiryForm({ lang }: { lang: Language }) {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = {
      name: value(formData, "name"),
      company: value(formData, "company"),
      email: value(formData, "email"),
      country: value(formData, "country"),
      website: value(formData, "website"),
      category: value(formData, "category"),
      markets: value(formData, "markets"),
      support: value(formData, "support"),
      message: value(formData, "message")
    };

    if (!fields.name || !fields.company || !fields.email || !fields.country || !fields.message) {
      setStatus({
        state: "error",
        message: lang === "en" ? "Please complete the required fields." : "Mohon lengkapi field yang wajib diisi."
      });
      return;
    }

    const emailFields = {
      Name: fields.name,
      Company: fields.company,
      Email: fields.email,
      Country: fields.country,
      Website: fields.website,
      "Product category": fields.category,
      "Current export markets": fields.markets,
      "Support needed in Indonesia": fields.support,
      Message: fields.message
    };
    const fallbackHref = mailtoHref(`CSE Partner Inquiry: ${fields.company} (${fields.country})`, emailFields);

    setStatus({
      state: "sending",
      message: lang === "en" ? "Sending your inquiry..." : "Mengirim inquiry Anda..."
    });

    try {
      const reference = await sendInquiry("partner", lang, fields, value(formData, "contactUrl"));
      form.reset();
      trackLeadEvent("inquiry_submit_success", { inquiryType: "partner", language: lang });
      setStatus({
        state: "success",
        message:
          lang === "en"
            ? `Inquiry received. Your reference is ${reference}.`
            : `Inquiry telah diterima. Nomor referensi Anda ${reference}.`
      });
    } catch {
      setStatus({
        state: "error",
        message:
          lang === "en"
            ? "We could not send the form right now."
            : "Form belum dapat dikirim saat ini.",
        fallbackHref,
        fallbackLabel: lang === "en" ? "Email CSE instead." : "Kirim melalui email."
      });
    }
  }

  return (
    <form onSubmit={submit} className="relative grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <SpamTrap />
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
          pending={status.state === "sending"}
          label={
            status.state === "sending"
              ? lang === "en" ? "Sending..." : "Mengirim..."
              : lang === "en" ? "Send partner inquiry" : "Kirim inquiry partner"
          }
        />
        <StatusMessage status={status} inquiryType="partner" lang={lang} />
      </div>
    </form>
  );
}
