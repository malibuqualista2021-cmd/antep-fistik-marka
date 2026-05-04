import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionCookieName, verifySessionToken } from "@/lib/admin-auth";

export async function unauthorizedUnlessAdmin(): Promise<NextResponse | null> {
  const store = await cookies();
  const ok = verifySessionToken(store.get(sessionCookieName())?.value);
  if (!ok) return NextResponse.json({ ok: false, message: "Yetkisiz." }, { status: 401 });
  return null;
}
