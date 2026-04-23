import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { MediaDashboard } from "@/components/dashboard/MediaDashboard";
import { dashboardAuthReady, isDashboardAuthenticated } from "@/lib/admin-auth";
import { mediaSlots } from "@/lib/media-slots";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Görsel yükleme ve media yönetimi paneli.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const authed = await isDashboardAuthenticated();
  const slots = mediaSlots();

  return (
    <main id="icerik" className="section-y">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Admin panel
          </p>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight text-foreground md:text-[2.5rem]">
            Görsel yönetim dashboard
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Netlify tarafında kalıcı yükleme için Cloudinary kullanılır. Yükledikten sonra çıkan
            ENV satırını Netlify Environment Variables alanına yapıştırıp yeniden deploy edin.
          </p>
        </div>

        {authed ? (
          <MediaDashboard slots={slots} />
        ) : (
          <DashboardLogin ready={dashboardAuthReady()} />
        )}
      </Container>
    </main>
  );
}
