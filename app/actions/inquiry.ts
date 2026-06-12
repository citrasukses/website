"use server";

import { fieldsToHtml, sendInquiryEmail } from "@/lib/email";
import { company } from "@/data/navigation";
import type { Language } from "@/lib/i18n";

export type InquiryState = {
  ok: boolean;
  message: string;
};

const messages = {
  required: {
    en: "Please complete the required fields.",
    id: "Mohon lengkapi field yang wajib diisi."
  },
  buyerOk: {
    en: "Inquiry received. CSE will follow up by email.",
    id: "Inquiry diterima. CSE akan follow up melalui email."
  },
  partnerOk: {
    en: "Partnership inquiry received. CSE will follow up by email.",
    id: "Inquiry partnership diterima. CSE akan follow up melalui email."
  },
  deliveryNotConfigured: {
    en: `Email delivery is not configured yet. Please email ${company.email} directly.`,
    id: `Pengiriman email belum dikonfigurasi. Mohon email langsung ke ${company.email}.`
  },
  deliveryFailed: {
    en: `Inquiry could not be sent. Please email ${company.email} directly.`,
    id: `Inquiry belum dapat terkirim. Mohon email langsung ke ${company.email}.`
  }
} satisfies Record<string, Record<Language, string>>;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function requireFields(fields: Record<string, string>, required: string[]) {
  return required.every((key) => fields[key]?.length > 0);
}

function languageFromForm(formData: FormData): Language {
  return field(formData, "lang") === "en" ? "en" : "id";
}

export async function submitBuyerInquiry(_prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const lang = languageFromForm(formData);
  const fields = {
    Name: field(formData, "name"),
    Company: field(formData, "company"),
    Email: field(formData, "email"),
    "Phone / WhatsApp": field(formData, "phone"),
    "Brand interested": field(formData, "brand"),
    "Product / model": field(formData, "product"),
    Quantity: field(formData, "quantity"),
    "Application / use case": field(formData, "application"),
    Message: field(formData, "message")
  };

  if (!requireFields(fields, ["Name", "Company", "Email", "Message"])) {
    return { ok: false, message: messages.required[lang] };
  }

  try {
    const result = await sendInquiryEmail({
      subject: `CSE RFQ: ${fields.Company} - ${fields["Brand interested"] || "General inquiry"}`,
      html: fieldsToHtml("Buyer RFQ", fields),
      replyTo: fields.Email
    });

    if (!result.delivered) {
      return { ok: false, message: messages.deliveryNotConfigured[lang] };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: messages.deliveryFailed[lang] };
  }

  return {
    ok: true,
    message: messages.buyerOk[lang]
  };
}

export async function submitPartnerInquiry(_prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const lang = languageFromForm(formData);
  const fields = {
    Name: field(formData, "name"),
    Company: field(formData, "company"),
    Email: field(formData, "email"),
    Country: field(formData, "country"),
    Website: field(formData, "website"),
    "Product category": field(formData, "category"),
    "Current export markets": field(formData, "markets"),
    "Support needed in Indonesia": field(formData, "support"),
    Message: field(formData, "message")
  };

  if (!requireFields(fields, ["Name", "Company", "Email", "Country", "Message"])) {
    return { ok: false, message: messages.required[lang] };
  }

  try {
    const result = await sendInquiryEmail({
      subject: `CSE Partner Inquiry: ${fields.Company} (${fields.Country})`,
      html: fieldsToHtml("Partner Inquiry", fields),
      replyTo: fields.Email
    });

    if (!result.delivered) {
      return { ok: false, message: messages.deliveryNotConfigured[lang] };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: messages.deliveryFailed[lang] };
  }

  return {
    ok: true,
    message: messages.partnerOk[lang]
  };
}
