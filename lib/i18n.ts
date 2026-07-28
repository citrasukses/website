export type Language = "id" | "en";

export type LocalizedText = Record<Language, string>;

export function staticLanguage(): Language {
  return process.env.NEXT_PUBLIC_SITE_LANGUAGE === "en" ? "en" : "id";
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
