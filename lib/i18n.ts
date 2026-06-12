export type Language = "id" | "en";

export type LocalizedText = Record<Language, string>;

export type SearchParams = Record<string, string | string[] | undefined>;

export function resolveLanguage(searchParams?: SearchParams): Language {
  const lang = searchParams?.lang;
  const value = Array.isArray(lang) ? lang[0] : lang;
  return value === "en" ? "en" : "id";
}

export function text(value: LocalizedText, lang: Language): string {
  return value[lang] ?? value.id;
}

export function withLang(path: string, lang: Language): string {
  if (lang !== "en" || path.startsWith("#")) {
    return path;
  }

  return path.includes("?") ? `${path}&lang=en` : `${path}?lang=en`;
}
