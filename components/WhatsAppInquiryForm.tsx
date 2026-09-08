"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { company } from "@/data/navigation";
import type { Language } from "@/lib/i18n";
import { trackLeadEvent } from "@/lib/inquiry-attribution";

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function Field({
  label,
  name,
  required = false,
  placeholder
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite-800">
      {label}
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900"
      />
    </label>
  );
}

export function WhatsAppInquiryForm({
  lang,
  selectedBrand = "",
  selectedProduct = ""
}: {
  lang: Language;
  selectedBrand?: string;
  selectedProduct?: string;
}) {
  const [brandValue, setBrandValue] = useState(selectedBrand);
  const [productValue, setProductValue] = useState(selectedProduct);
  const [pageContext, setPageContext] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandSlug = params.get("brand");
    const product = params.get("product");
    const context = [params.get("topic"), params.get("solution"), params.get("issue"), params.get("step")]
      .filter(Boolean)
      .join(" / ");

    if (brandSlug) {
      setBrandValue(brandSlug.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()));
    }
    if (product) setProductValue(product);
    setPageContext(context);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = {
      name: value(formData, "name"),
      company: value(formData, "company"),
      industry: value(formData, "industry"),
      brand: value(formData, "brand"),
      product: value(formData, "product"),
      quantity: value(formData, "quantity"),
      application: value(formData, "application"),
      message: value(formData, "message")
    };
    const labels =
      lang === "en"
        ? {
            intro: "Hello CSE, I would like to discuss a product requirement.",
            name: "Name",
            company: "Company",
            industry: "Industry",
            brand: "Brand",
            product: "Product / model",
            quantity: "Quantity",
            application: "Application",
            context: "Inquiry context",
            message: "Message"
          }
        : {
            intro: "Halo CSE, saya ingin mendiskusikan kebutuhan produk.",
            name: "Nama",
            company: "Perusahaan",
            industry: "Industri",
            brand: "Brand",
            product: "Produk / model",
            quantity: "Kuantitas",
            application: "Aplikasi",
            context: "Konteks inquiry",
            message: "Pesan"
          };
    const details = [
      [labels.name, fields.name],
      [labels.company, fields.company],
      [labels.industry, fields.industry],
      [labels.brand, fields.brand],
      [labels.product, fields.product],
      [labels.quantity, fields.quantity],
      [labels.application, fields.application],
      [labels.context, pageContext],
      [labels.message, fields.message]
    ]
      .filter(([, fieldValue]) => fieldValue)
      .map(([label, fieldValue]) => `*${label}:* ${fieldValue}`)
      .join("\n");
    const href = `${company.whatsapp.href}?text=${encodeURIComponent(`${labels.intro}\n\n${details}`)}`;

    trackLeadEvent("whatsapp_inquiry_click", {
      inquiryType: "rfq",
      language: lang,
      context: pageContext || "contact"
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form id="whatsapp-inquiry" onSubmit={submit} className="scroll-mt-24 grid gap-5 border border-graphite-200 bg-white p-6 shadow-panel">
      <div className="border-l-4 border-[#128c4a] bg-[#eefbf3] px-4 py-3 text-sm leading-6 text-graphite-700">
        {lang === "en"
          ? "Complete the useful details below. You can review the prepared message in WhatsApp before sending it."
          : "Lengkapi detail yang diperlukan. Anda dapat meninjau pesan yang sudah disiapkan di WhatsApp sebelum mengirimnya."}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={lang === "en" ? "Name" : "Nama"} name="name" required />
        <Field label={lang === "en" ? "Company" : "Perusahaan"} name="company" required />
        <Field
          label={lang === "en" ? "Industry" : "Industri"}
          name="industry"
          required
          placeholder={lang === "en" ? "e.g. Automotive manufacturing" : "Contoh: Manufaktur otomotif"}
        />
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Brand interested" : "Brand yang diminati"}
          <input
            name="brand"
            value={brandValue}
            onChange={(event) => setBrandValue(event.target.value)}
            placeholder={lang === "en" ? "Any industrial brand" : "Brand industrial apa pun"}
            className="focus-ring min-h-11 border border-graphite-300 bg-white px-3 text-sm font-normal text-graphite-900"
          />
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
        <Field
          label={lang === "en" ? "Application / use case" : "Aplikasi / kebutuhan"}
          name="application"
          placeholder={lang === "en" ? "Where and how will it be used?" : "Akan digunakan di mana dan untuk apa?"}
        />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-graphite-800">
        {lang === "en" ? "What do you need help with?" : "Apa yang perlu kami bantu?"}
        <textarea
          name="message"
          required
          rows={5}
          className="focus-ring resize-y border border-graphite-300 bg-white px-3 py-3 text-sm font-normal text-graphite-900"
        />
      </label>
      <div>
        <button
          type="submit"
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#128c4a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f7a40]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {lang === "en" ? "Continue in WhatsApp" : "Lanjutkan di WhatsApp"}
        </button>
      </div>
    </form>
  );
}
