const permanentRedirects = new Map([
  ["/brands/tohnichi/products/rtd-rtdfh", "/brands/tohnichi"],
  ["/en/brands/tohnichi/products/rtd-rtdfh", "/en/brands/tohnichi"]
]);

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const normalizedPathname =
      url.pathname === "/" ? url.pathname : url.pathname.replace(/\/+$/, "");
    const permanentRedirect = permanentRedirects.get(normalizedPathname);

    if (permanentRedirect) {
      const redirectUrl = new URL(permanentRedirect, url.origin);

      if (url.searchParams.get("lang") === "en" && !permanentRedirect.startsWith("/en/")) {
        redirectUrl.searchParams.set("lang", "en");
      }

      return Response.redirect(redirectUrl, 301);
    }

    const isPageRequest =
      !url.pathname.startsWith("/_next/") &&
      !url.pathname.startsWith("/assets/") &&
      !url.pathname.startsWith("/en/");

    if (url.searchParams.get("lang") === "en" && isPageRequest) {
      url.pathname = `/en${url.pathname}`;
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  }
};

export default worker;
