import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBinary = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const nextEnvironmentPath = path.join(projectRoot, "next-env.d.ts");
const originalNextEnvironment = readFileSync(nextEnvironmentPath, "utf8");

function readPort() {
  const portFlagIndex = process.argv.findIndex((value) => value === "-p" || value === "--port");
  const portValue = portFlagIndex >= 0 ? process.argv[portFlagIndex + 1] : undefined;
  const port = Number(portValue ?? process.env.PORT ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65533) {
    throw new Error(`Invalid development port: ${portValue ?? process.env.PORT}`);
  }

  return port;
}

const publicPort = readPort();
const languagePorts = {
  id: publicPort + 1,
  en: publicPort + 2
};
const children = [];
const readyLanguages = new Set();
let shuttingDown = false;
let previewServer;

function restoreNextEnvironment() {
  writeFileSync(nextEnvironmentPath, originalNextEnvironment);
}

function requestedLanguage(request) {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const cookieLanguage = request.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("cse_preview_lang="))
    ?.split("=")[1];
  const isSharedAsset =
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/icon.png";

  if (isSharedAsset) {
    return cookieLanguage === "en" ? "en" : "id";
  }

  return url.searchParams.get("lang") === "en" || url.pathname === "/en" || url.pathname.startsWith("/en/")
    ? "en"
    : "id";
}

function languageCookie(language) {
  return `cse_preview_lang=${language}; Path=/; SameSite=Lax`;
}

function upstreamPath(request, language) {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (language === "en" && (url.pathname === "/en" || url.pathname.startsWith("/en/"))) {
    url.pathname = url.pathname === "/en" ? "/" : url.pathname.slice(3);
  }

  return `${url.pathname}${url.search}`;
}

function proxyHttp(request, response) {
  const language = requestedLanguage(request);
  const headers = { ...request.headers, host: `127.0.0.1:${languagePorts[language]}` };
  const proxyRequest = http.request(
    {
      hostname: "127.0.0.1",
      port: languagePorts[language],
      method: request.method,
      path: upstreamPath(request, language),
      headers
    },
    (proxyResponse) => {
      const responseHeaders = { ...proxyResponse.headers };
      const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

      if (!url.pathname.startsWith("/_next/") && !url.pathname.startsWith("/assets/")) {
        const existingCookies = proxyResponse.headers["set-cookie"] ?? [];
        responseHeaders["set-cookie"] = [...existingCookies, languageCookie(language)];
      }

      response.writeHead(proxyResponse.statusCode ?? 502, responseHeaders);
      proxyResponse.pipe(response);
    }
  );

  proxyRequest.on("error", (error) => {
    if (!response.headersSent) {
      response.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    }
    response.end(`Language preview is starting. Please refresh shortly.\n${error.message}`);
  });

  request.pipe(proxyRequest);
}

function proxyWebSocket(request, socket, head) {
  const language = requestedLanguage(request);
  const upstream = net.connect(languagePorts[language], "127.0.0.1", () => {
    const headers = Object.entries(request.headers)
      .map(([name, value]) => `${name}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\r\n");

    upstream.write(
      `${request.method} ${upstreamPath(request, language)} HTTP/${request.httpVersion}\r\n${headers}\r\n\r\n`
    );
    if (head.length > 0) {
      upstream.write(head);
    }
    socket.pipe(upstream).pipe(socket);
  });

  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
}

function startLanguageServer(language) {
  const child = spawn(process.execPath, [nextBinary, "dev", "-p", String(languagePorts[language])], {
    cwd: projectRoot,
    env: {
      ...process.env,
      NEXT_DIST_DIR: `.next-dev-${language}`,
      NEXT_PUBLIC_SITE_LANGUAGE: language
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  const forwardOutput = (chunk) => {
    const output = chunk.toString();
    process.stdout.write(`[${language.toUpperCase()}] ${output}`);

    if (output.includes("Ready in")) {
      readyLanguages.add(language);
      if (readyLanguages.size === 2) {
        restoreNextEnvironment();
      }
    }
  };

  child.stdout.on("data", forwardOutput);
  child.stderr.on("data", forwardOutput);
  child.on("exit", (code) => {
    if (!shuttingDown && code !== 0) {
      console.error(`${language.toUpperCase()} preview exited with code ${code}.`);
      shutdown(code ?? 1);
    }
  });

  children.push(child);
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  for (const child of children) {
    child.kill("SIGTERM");
  }
  restoreNextEnvironment();
  previewServer?.close(() => process.exit(exitCode));
  setTimeout(() => process.exit(exitCode), 1_000).unref();
}

startLanguageServer("id");
startLanguageServer("en");

previewServer = http.createServer(proxyHttp);
previewServer.on("upgrade", proxyWebSocket);
previewServer.listen(publicPort, "127.0.0.1", () => {
  console.log(`Bilingual preview: http://127.0.0.1:${publicPort}`);
});

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
