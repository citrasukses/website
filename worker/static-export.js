const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
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
