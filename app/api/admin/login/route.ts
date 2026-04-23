import { NextResponse } from "next/server";
import {
  createSessionToken,
  dashboardAuthReady,
  sessionCookieMaxAge,
  sessionCookieName,
  verifyDashboardPassword,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!dashboardAuthReady()) {
    return NextResponse.json(
      { ok: false, message: "Dashboard ayarları eksik. .env değerlerini kontrol edin." },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password || "";

  if (!verifyDashboardPassword(password)) {
    return NextResponse.json({ ok: false, message: "Şifre hatalı." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: sessionCookieName(),
    value: createSessionToken(),
    maxAge: sessionCookieMaxAge(),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
