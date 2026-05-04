import type { ReactNode } from "react";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/components/shop/CartProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import type { SitePresentation } from "@/lib/site-presentation";

export function SiteShell({ children, presentation }: { children: ReactNode; presentation: SitePresentation }) {
  return (
    <CartProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <Header />
        <div className="flex flex-1 flex-col pb-24 md:pb-0">{children}</div>
        <Footer presentation={presentation} />
      </div>
      <FloatingWhatsapp />
      <MobileBottomNav />
    </CartProvider>
  );
}
