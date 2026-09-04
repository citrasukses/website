export type InquiryChannel = "direct" | "organic" | "referral" | "email" | "social" | "paid" | "campaign";

export type InquiryAttribution = {
  landingPath: string;
  referrer: string;
  channel: InquiryChannel;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

type BrowserLocation = Pick<Location, "href" | "hostname" | "pathname" | "search">;

const STORAGE_KEY = "cse:first-touch-attribution:v1";
const VALUE_LIMIT = 160;
const SEARCH_HOST_PATTERN = /(^|\.)(google\.|bing\.com$|duckduckgo\.com$|search\.yahoo\.com$|baidu\.com$|yandex\.)/i;

function clean(value: string | null, limit = VALUE_LIMIT) {
  return String(value ?? "").trim().slice(0, limit);
}

function cleanReferrer(referrer: string) {
  if (!referrer) return "";

  try {
    const url = new URL(referrer);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return "";
  }
}

function channelFor(location: BrowserLocation, referrer: string, medium: string): InquiryChannel {
  const normalizedMedium = medium.toLowerCase();
  if (/^(cpc|ppc|paid|paidsearch|display|retargeting)$/.test(normalizedMedium)) return "paid";
  if (/^(email|newsletter)$/.test(normalizedMedium)) return "email";
  if (/^(social|social-media|social_media)$/.test(normalizedMedium)) return "social";
  if (normalizedMedium === "organic") return "organic";
  if (normalizedMedium) return "campaign";
  if (!referrer) return "direct";

  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.hostname === location.hostname) return "direct";
    return SEARCH_HOST_PATTERN.test(referrerUrl.hostname) ? "organic" : "referral";
  } catch {
    return "direct";
  }
}

export function buildInquiryAttribution(
  location: BrowserLocation,
  referrer: string
): InquiryAttribution {
  const params = new URLSearchParams(location.search);
  const utmMedium = clean(params.get("utm_medium"));

  return {
    landingPath: clean(location.pathname || "/", 500),
    referrer: cleanReferrer(referrer),
    channel: channelFor(location, referrer, utmMedium),
    utmSource: clean(params.get("utm_source")),
    utmMedium,
    utmCampaign: clean(params.get("utm_campaign")),
    utmContent: clean(params.get("utm_content")),
    utmTerm: clean(params.get("utm_term"))
  };
}

export function initializeInquiryAttribution() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as InquiryAttribution;

    const attribution = buildInquiryAttribution(window.location, document.referrer);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return buildInquiryAttribution(window.location, document.referrer);
  }
}

export function getInquiryAttribution() {
  return initializeInquiryAttribution();
}

export function trackLeadEvent(
  event: "inquiry_submit_success" | "inquiry_email_fallback" | "contact_email_click",
  details: { inquiryType: "rfq" | "partner" | "general"; language: "id" | "en"; context?: string }
) {
  if (typeof window === "undefined") return;

  const attribution = getInquiryAttribution();
  const eventData = {
    event,
    inquiry_type: details.inquiryType,
    language: details.language,
    context: clean(details.context ?? "", 80),
    channel: attribution?.channel ?? "direct",
    landing_path: attribution?.landingPath ?? "/"
  };

  const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push(eventData);
  window.dispatchEvent(new CustomEvent("cse:lead", { detail: eventData }));
}
