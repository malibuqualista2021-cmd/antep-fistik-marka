import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="icerik" className="flex flex-1 flex-col justify-center py-20">
      <Container className="text-center">
        <p className="font-sans text-sm font-medium uppercase tracking-wider text-accent">
          404
        </p>
        <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
          Sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-3 max-w-md font-sans text-muted">
          Aradığınız adres taşınmış veya silinmiş olabilir. Ana sayfadan
          ürünlerimize dönebilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" href="/">
            Ana sayfa
          </Button>
          <Button variant="secondary" href="/urunler">
            Ürünler
          </Button>
        </div>
      </Container>
    </main>
  );
}
