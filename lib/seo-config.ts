import { languageAlternates, localizedPath, type Language } from "@/lib/i18n";

export const siteConfig = {
  name: "CSE",
  legalName: "PT Citra Sukses Ekapratama",
  url: "https://cse.co.id",
  defaultLocale: "id",
  locales: ["id", "en"] as const
} as const;

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path || "/", `${siteConfig.url}/`).toString();
}

export function absoluteLocalizedUrl(path: string, lang: Language) {
  return absoluteUrl(localizedPath(path, lang));
}

export function absoluteLanguageAlternates(path: string) {
  return Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, localizedUrl]) => [language, absoluteUrl(localizedUrl)])
  );
}
