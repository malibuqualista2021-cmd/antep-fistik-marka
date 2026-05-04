import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { dashboardAuthReady, isDashboardAuthenticated } from "@/lib/admin-auth";
import { isCloudinaryConfigured } from "@/lib/admin/cloudinary-config";
import { mediaSlotsResolved } from "@/lib/media-slots";
import { getSitePresentation } from "@/lib/site-presentation";

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Ürün, görsel, sipariş ve toptan talep yönetimi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const authed = await isDashboardAuthenticated();
  const presentation = await getSitePresentation();
  const slots = mediaSlotsResolved(presentation);
  const cloudinaryConfigured = isCloudinaryConfigured();

  return (
    <main id="icerik" className="section-y">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Admin panel
          </p>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight text-foreground md:text-[2.5rem]">
            Yönetim paneli
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Ürün kataloğu (fiyat, stok, gramaj, açıklama), vitrin görselleri (Cloudinary), sipariş kayıtları ve toptan
            form talepleri tek yerden yönetilir. Oturum çerez ile korunur; üretimde güçlü parola ve{" "}
            <code className="rounded bg-background px-1">ADMIN_DASHBOARD_SECRET</code> kullanın.
          </p>
        </div>

        {authed ? (
          <DashboardTabs
            slots={slots}
            cloudinaryConfigured={cloudinaryConfigured}
            categories={presentation.categories}
          />
        ) : (
          <DashboardLogin ready={dashboardAuthReady()} />
        )}
      </Container>
    </main>
  );
}
