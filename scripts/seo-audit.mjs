import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputFlagIndex = process.argv.indexOf("--dir");
const outputDirectory = path.resolve(projectRoot, outputFlagIndex >= 0 ? process.argv[outputFlagIndex + 1] : "out");
const productionOrigin = "https://cse.co.id";
const requiredLanguages = ["id-ID", "en", "x-default"];
const thinContentExemptPaths = new Set(["/contact", "/en/contact"]);

const errors = [];
const warnings = [];

function addIssue(collection, code, page, message) {
  collection.push({ code, page, message });
}

function normalizePathname(value) {
  const pathname = value || "/";
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function normalizeUrl(value) {
  try {
    const url = new URL(value, productionOrigin);
    url.hash = "";
    url.search = "";
    url.pathname = normalizePathname(url.pathname);
    return url.toString();
  } catch {
    return value;
  }
}

function fileToPath(relativeFile) {
  let pagePath = `/${relativeFile.split(path.sep).join("/").replace(/\.html$/, "")}`;
  if (pagePath === "/index") return "/";
  if (pagePath.endsWith("/index")) pagePath = pagePath.slice(0, -6);
  return normalizePathname(pagePath);
}

async function listFiles(directory) {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(directory, path.join(entry.parentPath, entry.name)));
}

function readRedirects(source) {
  const start = source.indexOf("const permanentRedirects = new Map([");
  if (start < 0) return new Map();
  const end = source.indexOf("]);", start);
  if (end < 0) return new Map();

  const redirects = new Map();
  for (const match of source.slice(start, end).matchAll(/\["([^"]+)",\s*"([^"]+)"\]/g)) {
    redirects.set(normalizePathname(match[1]), normalizePathname(match[2]));
  }
  return redirects;
}

function collectSchemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaTypes(item, types);
  } else if (value && typeof value === "object") {
    const schemaType = value["@type"];
    if (typeof schemaType === "string") types.add(schemaType);
    if (Array.isArray(schemaType)) schemaType.forEach((item) => types.add(item));
    Object.values(value).forEach((item) => collectSchemaTypes(item, types));
  }
  return types;
}

function localeForPath(pagePath) {
  return pagePath === "/en" || pagePath.startsWith("/en/") ? "en" : "id";
}

function visibleWordCount($) {
  $("script, style, noscript, svg").remove();
  return $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

let outputFiles;
try {
  outputFiles = await listFiles(outputDirectory);
} catch (error) {
  console.error(`SEO audit could not read ${outputDirectory}: ${error.message}`);
  console.error("Run `npm run build` before `npm run seo:audit`.");
  process.exit(1);
}

const htmlFiles = outputFiles.filter((file) => file.endsWith(".html"));
const pages = new Map();

for (const relativeFile of htmlFiles) {
  const pagePath = fileToPath(relativeFile);
  const is404 = pagePath === "/404" || pagePath.endsWith("/404");
  const html = await readFile(path.join(outputDirectory, relativeFile), "utf8");
  const $ = load(html);
  const canonicalElements = $('link[rel="canonical"]');
  const canonical = canonicalElements.first().attr("href") ?? "";
  const robots = $('meta[name="robots"]').attr("content")?.toLowerCase() ?? "";
  const noindex = robots.split(/\s*,\s*/).includes("noindex");
  const alternates = new Map();
  $('link[rel="alternate"][hreflang]').each((_, element) => {
    alternates.set($(element).attr("hreflang"), $(element).attr("href"));
  });

  const schemaTypes = new Set();
  $('script[type="application/ld+json"]').each((_, element) => {
    const json = $(element).html() ?? "";
    try {
      collectSchemaTypes(JSON.parse(json), schemaTypes);
    } catch (error) {
      addIssue(errors, "invalid-json-ld", pagePath, error.message);
    }
  });

  pages.set(pagePath, {
    $,
    relativeFile,
    is404,
    noindex,
    robots,
    canonical,
    alternates,
    schemaTypes,
    title: $("title").first().text().trim(),
    description: $('meta[name="description"]').attr("content")?.trim() ?? "",
    links: [],
    words: visibleWordCount(load(html))
  });
}

const sitemapPath = path.join(outputDirectory, "sitemap.xml");
const sitemapXml = await readFile(sitemapPath, "utf8");
const sitemapDocument = load(sitemapXml, { xmlMode: true });
const sitemapUrls = new Set();
sitemapDocument("loc").each((_, element) => sitemapUrls.add(normalizeUrl(sitemapDocument(element).text().trim())));

if (sitemapDocument("priority").length > 0 || sitemapDocument("changefreq").length > 0) {
  addIssue(warnings, "unused-sitemap-fields", "/sitemap.xml", "Google ignores priority and changefreq; omit them.");
}

const robotsText = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
if (!robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
  addIssue(errors, "robots-sitemap", "/robots.txt", "Production sitemap declaration is missing or incorrect.");
}
if (/^Disallow:\s*\/$/im.test(robotsText)) {
  addIssue(errors, "robots-blocks-site", "/robots.txt", "robots.txt blocks the entire site.");
}

const workerSource = await readFile(path.join(projectRoot, "worker/static-export.js"), "utf8");
const redirects = readRedirects(workerSource);
const localizedRedirects = new Map(redirects);
for (const [source, target] of redirects) {
  localizedRedirects.set(source === "/" ? "/en" : `/en${source}`, target === "/" ? "/en" : `/en${target}`);
}

for (const [source, target] of localizedRedirects) {
  if (localizedRedirects.has(target)) {
    addIssue(errors, "redirect-chain", source, `Redirect target ${target} redirects again.`);
  }
  if (!pages.has(target) || pages.get(target).is404) {
    addIssue(errors, "redirect-target", source, `Redirect target ${target} is not a generated page.`);
  }
}

const incomingLinks = new Map([...pages.keys()].map((pagePath) => [pagePath, new Set()]));

for (const [pagePath, page] of pages) {
  if (page.is404) continue;
  const pageUrl = `${productionOrigin}${pagePath === "/" ? "/" : pagePath}`;

  if (!page.title) addIssue(errors, "missing-title", pagePath, "Page has no title.");
  if (!page.description) addIssue(errors, "missing-description", pagePath, "Page has no meta description.");
  if (page.$('meta[name="keywords"]').length > 0) {
    addIssue(errors, "meta-keywords", pagePath, "Deprecated meta keywords are present.");
  }
  if (page.$('link[rel="canonical"]').length !== 1) {
    addIssue(errors, "canonical-count", pagePath, `Expected one canonical, found ${page.$('link[rel="canonical"]').length}.`);
  } else if (normalizeUrl(page.canonical) !== normalizeUrl(pageUrl)) {
    addIssue(errors, "canonical-mismatch", pagePath, `Canonical is ${page.canonical || "missing"}.`);
  }

  const h1Count = page.$("h1").length;
  if (h1Count !== 1) addIssue(errors, "h1-count", pagePath, `Expected one H1, found ${h1Count}.`);

  page.$("img").each((_, image) => {
    if (page.$(image).attr("alt") === undefined) {
      addIssue(warnings, "missing-image-alt", pagePath, "An image has no alt attribute.");
    }
  });

  for (const language of requiredLanguages) {
    if (!page.alternates.has(language)) {
      addIssue(errors, "missing-hreflang", pagePath, `Missing ${language} alternate.`);
    }
  }

  for (const [language, href] of page.alternates) {
    if (!href) continue;
    const targetUrl = new URL(href, productionOrigin);
    if (targetUrl.origin !== productionOrigin) {
      addIssue(errors, "hreflang-host", pagePath, `${language} alternate uses ${targetUrl.origin}.`);
      continue;
    }
    const targetPath = normalizePathname(targetUrl.pathname);
    const targetPage = pages.get(targetPath);
    if (!targetPage || targetPage.is404) {
      addIssue(errors, "hreflang-target", pagePath, `${language} alternate target ${targetPath} is missing.`);
      continue;
    }
    const reciprocal = [...targetPage.alternates.values()].some((candidate) => normalizeUrl(candidate) === normalizeUrl(pageUrl));
    if (!reciprocal) {
      addIssue(errors, "hreflang-reciprocal", pagePath, `${targetPath} does not reference this page.`);
    }
  }

  page.$("a[href]").each((_, anchor) => {
    const href = page.$(anchor).attr("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    let targetUrl;
    try {
      targetUrl = new URL(href, pageUrl);
    } catch {
      addIssue(errors, "invalid-link", pagePath, `Invalid href: ${href}`);
      return;
    }
    if (targetUrl.origin !== productionOrigin) return;

    const targetPath = normalizePathname(targetUrl.pathname);
    if (targetPath.startsWith("/_next/") || targetPath.startsWith("/assets/") || targetPath.startsWith("/api/")) return;
    if (targetPath === "/icon.png") return;

    page.links.push(targetPath);
    if (localizedRedirects.has(targetPath)) {
      addIssue(errors, "internal-redirect", pagePath, `Internal link points to redirect source ${targetPath}.`);
      return;
    }
    const targetPage = pages.get(targetPath);
    if (!targetPage || targetPage.is404) {
      addIssue(errors, "broken-internal-link", pagePath, `Internal link target ${targetPath} is missing.`);
      return;
    }
    incomingLinks.get(targetPath)?.add(pagePath);
  });

  const normalizedPageUrl = normalizeUrl(pageUrl);
  if (page.noindex && sitemapUrls.has(normalizedPageUrl)) {
    addIssue(errors, "noindex-in-sitemap", pagePath, "Noindex page appears in sitemap.xml.");
  }
  if (!page.noindex && !sitemapUrls.has(normalizedPageUrl)) {
    addIssue(errors, "missing-from-sitemap", pagePath, "Indexable page is absent from sitemap.xml.");
  }

  if (!page.noindex && page.words < 150 && !thinContentExemptPaths.has(pagePath)) {
    addIssue(warnings, "thin-page", pagePath, `Only ${page.words} visible words were detected.`);
  }
}

for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl);
  if (url.origin !== productionOrigin) {
    addIssue(errors, "sitemap-host", "/sitemap.xml", `Unexpected hostname in ${sitemapUrl}.`);
    continue;
  }
  const pagePath = normalizePathname(url.pathname);
  const page = pages.get(pagePath);
  if (!page || page.is404) addIssue(errors, "sitemap-output", pagePath, "Sitemap URL has no generated page.");
  else if (page.noindex) addIssue(errors, "sitemap-noindex", pagePath, "Sitemap URL is noindex.");
}

for (const [pagePath, incoming] of incomingLinks) {
  const page = pages.get(pagePath);
  if (!page || page.is404 || page.noindex || pagePath === "/") continue;
  if (incoming.size === 0) addIssue(errors, "orphan-page", pagePath, "Indexable page has no incoming internal link.");
}

function duplicateGroups(field) {
  const groups = new Map();
  for (const [pagePath, page] of pages) {
    if (page.is404 || page.noindex || !page[field]) continue;
    const key = `${localeForPath(pagePath)}\u0000${page[field]}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(pagePath);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

for (const group of duplicateGroups("title")) {
  addIssue(warnings, "duplicate-title", group.join(", "), "Indexable pages in the same locale share a title.");
}
for (const group of duplicateGroups("description")) {
  addIssue(warnings, "duplicate-description", group.join(", "), "Indexable pages in the same locale share a description.");
}

const activePages = [...pages.values()].filter((page) => !page.is404);
const indexableCount = activePages.filter((page) => !page.noindex).length;
const noindexCount = activePages.filter((page) => page.noindex).length;

console.log("CSE SEO AUDIT");
console.log("================================");
console.log(`HTML pages:       ${activePages.length}`);
console.log(`Indexable pages:  ${indexableCount}`);
console.log(`Noindex pages:    ${noindexCount}`);
console.log(`Sitemap URLs:     ${sitemapUrls.size}`);
console.log(`Errors:            ${errors.length}`);
console.log(`Warnings:          ${warnings.length}`);

function printIssues(label, issues) {
  if (issues.length === 0) return;
  console.log(`\n${label}`);
  for (const issue of issues) console.log(`[${issue.code}] ${issue.page}\n  ${issue.message}`);
}

printIssues("ERROR", errors);
printIssues("WARNING", warnings);

if (errors.length > 0) process.exitCode = 1;
