import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { DashboardPageBody } from "@/components/dashboard/DashboardPageBody";
import { adminPanelSlug } from "@/lib/admin-panel-path";

/** Netlify / SSR ortamında ADMIN_PANEL_SLUG’ın istek anında okunması için */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Ürün, görsel, sipariş ve toptan talep yönetimi.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function YonetimSlugPage({ params }: PageProps) {
  await connection();
  const expected = adminPanelSlug();
  const { slug } = await params;
  if (!expected || slug !== expected) notFound();
  return <DashboardPageBody />;
}
