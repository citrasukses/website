import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "cse_catalog_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function adminPassword() {
  return process.env.CATALOG_ADMIN_PASSWORD ?? (process.env.NODE_ENV !== "production" ? "admin" : "");
}

function sessionSecret() {
  return process.env.CATALOG_SESSION_SECRET ?? (process.env.NODE_ENV !== "production" ? "cse-local-catalog-secret" : "");
}

function sign(expiresAt: string) {
  return createHmac("sha256", sessionSecret()).update(expiresAt).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function catalogAuthConfigured() {
  return Boolean(adminPassword() && sessionSecret());
}

export function usesDevelopmentAdminDefaults() {
  return process.env.NODE_ENV !== "production" && !process.env.CATALOG_ADMIN_PASSWORD;
}

export async function verifyCatalogPassword(candidate: string) {
  const expected = adminPassword();
  return Boolean(expected) && safeEqual(candidate, expected);
}

export async function createCatalogSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + sessionLifetimeSeconds);
  const token = `${expiresAt}.${sign(expiresAt)}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetimeSeconds
  });
}

export async function clearCatalogSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isCatalogAdmin() {
  if (!catalogAuthConfigured()) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(expiresAt));
}

export async function requireCatalogAdmin() {
  if (!(await isCatalogAdmin())) throw new Error("Unauthorized catalog operation.");
}

