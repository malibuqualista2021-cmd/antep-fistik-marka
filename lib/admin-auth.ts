import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "af_admin_session";
const ONE_DAY = 60 * 60 * 24;

function authSecret(): string {
  const value =
    process.env.ADMIN_DASHBOARD_SECRET || process.env.ADMIN_DASHBOARD_PASSWORD || "";
  return value.trim();
}

function expectedPassword(): string {
  return (process.env.ADMIN_DASHBOARD_PASSWORD || "").trim();
}

function sign(payload: string): string {
  return createHmac("sha256", authSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function dashboardAuthReady() {
  return Boolean(authSecret() && expectedPassword());
}

export function verifyDashboardPassword(raw: string) {
  const value = raw.trim();
  const expected = expectedPassword();
  if (!value || !expected) return false;
  return safeEqual(value, expected);
}

export function createSessionToken() {
  const ts = Date.now().toString();
  const sig = sign(ts);
  return `${ts}.${sig}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !authSecret()) return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = sign(ts);
  if (!safeEqual(sig, expected)) return false;

  const ageMs = Date.now() - Number(ts);
  if (!Number.isFinite(ageMs) || ageMs > ONE_DAY * 1000) return false;
  return true;
}

export async function isDashboardAuthenticated() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export function sessionCookieName() {
  return COOKIE_NAME;
}

export function sessionCookieMaxAge() {
  return ONE_DAY;
}
