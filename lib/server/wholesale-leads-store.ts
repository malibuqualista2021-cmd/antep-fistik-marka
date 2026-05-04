import { readRuntimeJsonValue, writeRuntimeJsonValue } from "@/lib/server/runtime-json-storage";

export type WholesaleLeadAdminStatus = "new" | "contacted" | "quoted" | "won" | "lost" | "archived";

export type WholesaleLeadRecord = {
  id: string;
  createdAt: string;
  source: string;
  name: string;
  phone: string;
  company?: string;
  productType: string;
  quantity: string;
  usageArea: string;
  deliveryCity: string;
  targetDate?: string;
  requestType: string;
  note?: string;
  /** Panel takibi — POST ile `new` atanır */
  adminStatus?: WholesaleLeadAdminStatus;
  adminNote?: string;
};

async function readLeadsList(): Promise<WholesaleLeadRecord[]> {
  const raw = await readRuntimeJsonValue("wholesaleLeads");
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean) as WholesaleLeadRecord[];
}

async function writeLeadsList(list: WholesaleLeadRecord[]): Promise<void> {
  await writeRuntimeJsonValue("wholesaleLeads", list);
}

export async function appendWholesaleLead(lead: WholesaleLeadRecord): Promise<void> {
  const list = await readLeadsList();
  list.unshift(lead);
  await writeLeadsList(list);
}

export async function readWholesaleLeads(): Promise<WholesaleLeadRecord[]> {
  return readLeadsList();
}

const adminStatuses: WholesaleLeadAdminStatus[] = ["new", "contacted", "quoted", "won", "lost", "archived"];

export async function updateWholesaleLeadPatch(
  leadId: string,
  patch: { adminStatus?: WholesaleLeadAdminStatus; adminNote?: string },
): Promise<boolean> {
  const list = await readLeadsList();
  const idx = list.findIndex((l) => l.id === leadId);
  if (idx === -1) return false;
  const row = list[idx];
  let adminStatus = row.adminStatus ?? "new";
  let adminNote = row.adminNote ?? "";
  if (patch.adminStatus !== undefined) {
    if (!adminStatuses.includes(patch.adminStatus)) return false;
    adminStatus = patch.adminStatus;
  }
  if (patch.adminNote !== undefined) {
    adminNote = patch.adminNote;
  }
  list[idx] = { ...row, adminStatus, adminNote: adminNote.trim() || undefined };
  await writeLeadsList(list);
  return true;
}
