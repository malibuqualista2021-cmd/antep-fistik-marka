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

/** Kopyala-yapıştırda sık görülen tire/minus karakterlerini ASCII tire ile eşler */
function normalizePasswordChars(raw: string) {
  return raw.trim().replace(/[\u2013\u2014\u2212]/g, "-");
}

function safeEqualUtf8(a: string, b: string) {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function dashboardAuthReady() {
  return Boolean(authSecret() && expectedPassword());
}

export function verifyDashboardPassword(raw: string) {
  const value = normalizePasswordChars(raw);
  const expected = normalizePasswordChars(expectedPassword());
  if (!value || !expected) return false;
  return safeEqualUtf8(value, expected);
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
  if (!safeEqualUtf8(sig, expected)) return false;

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
