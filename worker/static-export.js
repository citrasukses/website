const permanentRedirects = new Map([
  ["/brands/tohnichi/products/db-cdb-series", "/brands/tohnichi/products/db-dbe-dbr"],
  ["/brands/tohnichi/products/cem3-g", "/brands/tohnichi/products/cem3-cem3-g"],
  ["/brands/tohnichi/products/ces-g", "/brands/tohnichi/products/ces-ces-g"],
  ["/brands/tohnichi/products/ql-cl-series", "/brands/tohnichi/products/ql-qle2"],
  ["/brands/tohnichi/products/cspfdd-ad", "/brands/tohnichi/products/fdd-ad"],
  ["/brands/tohnichi/products/fdd-series", "/brands/tohnichi/products/fd-fdd"],
  ["/brands/tohnichi/products/rtd-rtdfh", "/brands/tohnichi/products/rtd"],
  ["/brands/tohnichi/products/rntd-series", "/brands/tohnichi/products/rntd"],
  ["/brands/tohnichi/products/ftd-ftd-s", "/brands/tohnichi/products/ftd"],
  ["/brands/tohnichi/products/stc2-g", "/brands/tohnichi/products/stc2-g-stc2-g-bt"],
  ["/brands/tohnichi/products/tcc2-g", "/brands/tohnichi/products/tcc2-tcc2-g"],
  ["/brands/tohnichi/products/dote-g", "/brands/tohnichi/products/dote4-dote4-g"],
  ["/brands/tohnichi/products/r-cm-m-fh", "/brands/tohnichi/products/r-cm"],
  ["/brands/tohnichi/products/tme-series", "/brands/tohnichi/products/tme3-g"],
  ["/brands/nac/products/screwdriver-bit-attachments", "/brands/nac/products/fastening-attachments"],
  ["/brands/fuji-star/products/industrial-brush", "/brands"]
]);

const inquiryTableSql = `CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  reference_id TEXT NOT NULL UNIQUE,
  inquiry_type TEXT NOT NULL,
  language TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TEXT NOT NULL
)`;
const inquiryCreatedAtIndexSql =
  "CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at)";
const inquiryStatusIndexSql =
  "CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status)";

const fieldLimits = {
  name: 120,
  company: 160,
  email: 254,
  phone: 80,
  brand: 160,
  product: 240,
  quantity: 80,
  application: 500,
  country: 100,
  website: 500,
  category: 240,
  markets: 500,
  support: 2_000,
  message: 5_000
};

const requiredFields = {
  rfq: ["name", "company", "email", "message"],
  partner: ["name", "company", "email", "country", "message"]
};

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

function normalizeFields(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const fields = {};
  for (const [name, maxLength] of Object.entries(fieldLimits)) {
    const rawValue = input[name];
    if (rawValue !== undefined && typeof rawValue !== "string") return null;
    fields[name] = String(rawValue ?? "").trim().slice(0, maxLength + 1);
    if (fields[name].length > maxLength) return null;
  }
  return fields;
}

function inquirySubject(type, fields) {
  if (type === "partner") {
    return `Partner inquiry: ${fields.company} (${fields.country})`;
  }
  return `RFQ: ${fields.company} - ${fields.brand || "General inquiry"}`;
}

function inquiryReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `CSE-${date}-${suffix}`;
}

async function saveInquiry(request, env) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).origin !== new URL(request.url).origin) {
    return jsonResponse({ ok: false, message: "Invalid request origin." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return jsonResponse({ ok: false, message: "Inquiry is too large." }, 413);
  }

  let payload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 20_000) {
      return jsonResponse({ ok: false, message: "Inquiry is too large." }, 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, message: "Invalid inquiry data." }, 400);
  }

  const type = payload?.type;
  const language = payload?.lang === "en" ? "en" : "id";
  const fields = normalizeFields(payload?.fields);
  if ((type !== "rfq" && type !== "partner") || !fields) {
    return jsonResponse({ ok: false, message: "Invalid inquiry data." }, 400);
  }

  if (typeof payload.contactUrl === "string" && payload.contactUrl.trim()) {
    return jsonResponse({ ok: true, reference: inquiryReference() }, 201);
  }

  if (requiredFields[type].some((field) => !fields[field])) {
    return jsonResponse({ ok: false, message: "Required fields are missing." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return jsonResponse({ ok: false, message: "Please enter a valid email address." }, 400);
  }

  if (!env.DB) {
    return jsonResponse({ ok: false, message: "Inquiry service is temporarily unavailable." }, 503);
  }

  const reference = inquiryReference();
  const subject = inquirySubject(type, fields);
  const createdAt = new Date().toISOString();

  try {
    await env.DB.batch([
      env.DB.prepare(inquiryTableSql),
      env.DB.prepare(inquiryCreatedAtIndexSql),
      env.DB.prepare(inquiryStatusIndexSql)
    ]);
    await env.DB.prepare(
      `INSERT INTO inquiries (
        reference_id, inquiry_type, language, name, company, email, phone,
        subject, payload_json, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
    )
      .bind(
        reference,
        type,
        language,
        fields.name,
        fields.company,
        fields.email,
        fields.phone || null,
        subject,
        JSON.stringify(fields),
        createdAt
      )
      .run();
  } catch (error) {
    console.error("Unable to save inquiry", error);
    return jsonResponse({ ok: false, message: "Inquiry service is temporarily unavailable." }, 503);
  }

  return jsonResponse({ ok: true, reference }, 201);
}

function withoutEnglishPrefix(pathname) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

function withEnglishPrefix(pathname) {
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const normalizedPathname =
      url.pathname === "/" ? url.pathname : url.pathname.replace(/\/+$/, "");

    if (normalizedPathname === "/api/inquiries") {
      if (request.method !== "POST") {
        return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
      }
      return saveInquiry(request, env);
    }

    const requestedEnglish =
      normalizedPathname === "/en" ||
      normalizedPathname.startsWith("/en/") ||
      url.searchParams.get("lang") === "en";
    const basePathname = withoutEnglishPrefix(normalizedPathname);
    const permanentRedirect = permanentRedirects.get(basePathname);

    if (permanentRedirect) {
      url.pathname = requestedEnglish ? withEnglishPrefix(permanentRedirect) : permanentRedirect;
      url.searchParams.delete("lang");
      return Response.redirect(url, 301);
    }

    const isPageRequest =
      !normalizedPathname.startsWith("/_next/") &&
      !normalizedPathname.startsWith("/assets/");

    if (
      url.searchParams.get("lang") === "en" &&
      isPageRequest &&
      normalizedPathname !== "/en" &&
      !normalizedPathname.startsWith("/en/")
    ) {
      url.pathname = withEnglishPrefix(normalizedPathname);
      url.searchParams.delete("lang");
      return Response.redirect(url, 301);
    }

    return env.ASSETS.fetch(request);
  }
};

export default worker;
