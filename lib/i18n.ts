export type Language = "id" | "en";

export type LocalizedText = Record<Language, string>;

export function staticLanguage(): Language {
  return process.env.NEXT_PUBLIC_SITE_LANGUAGE === "en" ? "en" : "id";
}

export function text(value: LocalizedText, lang: Language): string {
  return value[lang] ?? value.id;
}

export function localizedPath(path: string, lang: Language): string {
  if (
    lang !== "en" ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    /^https?:\/\//.test(path) ||
    path === "/en" ||
    path.startsWith("/en/")
  ) {
    return path;
  }

  return path === "/" ? "/en" : `/en${path}`;
}

export function languageAlternates(path: string) {
  return {
    "id-ID": path,
    en: localizedPath(path, "en"),
    "x-default": path
  };
}

export function withLang(path: string, lang: Language): string {
  return localizedPath(path, lang);
}
