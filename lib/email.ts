import { company } from "@/data/navigation";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendInquiryEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CSE_INQUIRY_TO ?? company.email;

  if (!apiKey || !from) {
    console.info("Inquiry email skipped because RESEND_API_KEY or RESEND_FROM is not configured.", {
      to,
      subject: payload.subject
    });
    return { delivered: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${message}`);
  }

  return { delivered: true };
}

export function fieldsToHtml(title: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(([key, value]) => {
      const safeValue = escapeHtml(value || "-").replace(/\n/g, "<br />");
      return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #ddd;">${safeValue}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#151a22;">
      <h2>${escapeHtml(title)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
