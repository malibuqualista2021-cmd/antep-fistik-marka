import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sipariş alındı",
  description: `${site.name} perakende siparişiniz alındı.`,
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main id="icerik" className="pb-16">
      <Container className="py-14 md:py-20">
        <div className="card-elevated mx-auto max-w-2xl rounded-[var(--radius-xl)] p-7 text-center md:p-10">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Sipariş alındı
          </p>
          <h1 className="mt-2 font-serif text-[2rem] text-foreground md:text-[2.6rem]">
            Teşekkürler
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-muted">
            Siparişiniz başarıyla alındı. Ödeme bağlantısı, hazırlık ve çıkış bilgisi
            iletişim bilgileriniz üzerinden paylaşılacaktır.
          </p>
          {order ? (
            <p className="mt-5 rounded-[var(--radius-input)] bg-surface px-4 py-3 font-sans text-sm text-foreground">
              Sipariş numarası: <strong>{order}</strong>
            </p>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/urunler#perakende-satin-al">Alışverişe devam et</Button>
            <Button variant="secondary" href="/iletisim">İletişim</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
