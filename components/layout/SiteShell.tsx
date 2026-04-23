import type { ReactNode } from "react";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col pb-24 md:pb-0">{children}</div>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
