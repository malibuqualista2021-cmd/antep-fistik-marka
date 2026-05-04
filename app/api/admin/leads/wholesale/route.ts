import { NextResponse } from "next/server";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import { readWholesaleLeads } from "@/lib/server/wholesale-leads-store";

export async function GET() {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;
  const leads = await readWholesaleLeads();
  return NextResponse.json({ ok: true, leads });
}
