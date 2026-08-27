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
