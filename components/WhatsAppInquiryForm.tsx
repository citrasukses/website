"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { company } from "@/data/navigation";
import type { Language } from "@/lib/i18n";
import { trackLeadEvent } from "@/lib/inquiry-attribution";

function currentInquiryContext() {
  const params = new URLSearchParams(window.location.search);
  const details = [
    ["Product", params.get("product")],
    ["Topic", params.get("topic")],
    ["Solution", params.get("solution")]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return details.map(([label, value]) => `${label}: ${value}`).join("\n");
}

export function WhatsAppInquiryForm({ lang }: { lang: Language }) {
  const [companyName, setCompanyName] = useState("");
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    const brand = new URLSearchParams(window.location.search).get("brand");
    if (brand) {
      setBrandName(brand.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()));
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "email" ? "email" : "whatsapp";
    const industry = String(formData.get("industry") ?? "").trim();
    const brand = brandName.trim();
    const context = currentInquiryContext();
    const intro =
      lang === "en"
        ? `Hello CSE, I am contacting you from ${companyName.trim()}. I have a part number, photo, or document that I would like your help identifying.`
        : `Halo CSE, saya dari ${companyName.trim()}. Saya punya part number, foto, atau dokumen yang ingin dibantu identifikasi.`;
    const details = [
      [lang === "en" ? "Industry" : "Industri", industry],
      ["Brand", brand],
      ...(context ? [[lang === "en" ? "Page context" : "Konteks halaman", context]] : [])
    ]
      .filter((entry) => Boolean(entry[1]))
      .map(([label, detail]) => `*${label}:* ${detail}`)
      .join("\n");
    const message = `${intro}\n\n${details}`;

    if (channel === "email") {
      trackLeadEvent("contact_email_click", {
        inquiryType: "rfq",
        language: lang,
        context: "easy-inquiry"
      });
      const subject = lang === "en" ? `CSE product inquiry - ${companyName.trim()}` : `RFQ CSE - ${companyName.trim()}`;
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      return;
    }

    trackLeadEvent("whatsapp_inquiry_click", {
      inquiryType: "rfq",
      language: lang,
      context: "easy-inquiry"
    });
    window.open(`${company.whatsapp.href}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      id="whatsapp-inquiry"
      onSubmit={submit}
      className="scroll-mt-24 border border-graphite-200 bg-white p-6 text-graphite-900 shadow-panel sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-signal-600">
        {lang === "en" ? "Start with what you have" : "Mulai dari yang ada"}
      </p>
      <h3 className="mt-3 text-balance text-2xl font-bold leading-tight sm:text-3xl">
        {lang === "en" ? "Already have a part number or product photo?" : "Sudah punya part number atau foto barang?"}
      </h3>
      <p className="mt-3 text-lg font-bold text-industrial-700">
        {lang === "en" ? "Just send it. We’ll help identify it." : "Kirim saja. Kami bantu identifikasi."}
      </p>
      <p className="mt-4 text-sm leading-6 text-graphite-600">
        {lang === "en"
          ? "Industrial inquiries are often incomplete. An old photo, a damaged part, or one page from a catalogue can be enough to begin."
          : "Inquiry industrial sering belum lengkap. Foto lama, part rusak, atau satu halaman katalog sudah cukup untuk memulai."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Company name" : "Nama perusahaan"}
          <input
            type="text"
            name="company"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
            autoComplete="organization"
            placeholder={lang === "en" ? "Your company" : "Nama perusahaan Anda"}
            className="focus-ring min-h-12 border border-graphite-300 bg-white px-4 text-sm font-normal text-graphite-900"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite-800">
          {lang === "en" ? "Industry" : "Industri"}
          <input
            type="text"
            name="industry"
            required
            placeholder={lang === "en" ? "e.g. Automotive manufacturing" : "Contoh: Manufaktur otomotif"}
            className="focus-ring min-h-12 border border-graphite-300 bg-white px-4 text-sm font-normal text-graphite-900"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite-800 sm:col-span-2">
          {lang === "en" ? "Brand interested (optional)" : "Brand yang diminati (opsional)"}
          <input
            type="text"
            name="brand"
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
            placeholder={lang === "en" ? "Any industrial brand" : "Brand industrial apa pun"}
            className="focus-ring min-h-12 border border-graphite-300 bg-white px-4 text-sm font-normal text-graphite-900"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          name="channel"
          value="whatsapp"
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-[#128c4a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f7a40]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {lang === "en" ? "Send via WhatsApp" : "Kirim via WhatsApp"}
        </button>
        <button
          type="submit"
          name="channel"
          value="email"
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-graphite-300 bg-white px-5 py-3 text-sm font-bold text-graphite-900 transition hover:border-industrial-600 hover:text-industrial-700"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          {lang === "en" ? "Send RFQ via Email" : "Kirim RFQ via Email"}
        </button>
      </div>

      <div className="mt-6 border-l-2 border-signal-500 bg-graphite-50 px-4 py-3">
        <p className="text-sm font-semibold leading-6 text-graphite-700">
          {lang === "en"
            ? "To speed up the quotation, include when available:"
            : "Untuk mempercepat quotation, sertakan jika tersedia:"}
        </p>
        <p className="mt-1 text-sm leading-6 text-graphite-600">
          brand/model · quantity · foto/drawing · aplikasi
        </p>
      </div>

    </form>
  );
}
