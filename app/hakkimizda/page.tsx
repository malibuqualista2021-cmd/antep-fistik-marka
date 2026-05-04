import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brandPhotoAlts, brandPhotos } from "@/lib/site-images";
import { getSitePresentation } from "@/lib/site-presentation";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getSitePresentation();
  return {
    title: "Hakkımızda",
    description: `${p.branding.shortName} — Gaziantep merkezli Antep fıstığı ticareti: ürün seçimi, parti bilgisi ve sevkiyat yaklaşımı.`,
  };
}

export default async function AboutPage() {
  const { branding: brand, contact: c } = await getSitePresentation();
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-[var(--line-soft)] bg-surface/30 py-10 md:py-14">
        <Container>
          <p className="font-sans text-sm font-medium uppercase tracking-wider text-accent">
            Hakkımızda
          </p>
          <h1 className="mt-2 max-w-3xl font-serif text-[2rem] font-semibold leading-tight text-foreground sm:text-[2.65rem] md:text-[3rem]">
            Gaziantep’ten çıkan ürünün modern ticari vitrini: net parti, net teslim
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted md:text-lg">
            {brand.name}, Gaziantep Nizip&apos;te üretici olarak Antep fıstığını aracısız sunar; perakende paket ile
            toptan parti satışını aynı operasyon üzerinden yürütür. Amacımız gösterişli vaat değil; doğru ürün kodunu
            doğru kullanıma bağlamak ve çıkışı sürpriz yaşatmadan tamamlamaktır.
          </p>
        </Container>
      </section>

      <Container className="py-11 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 md:items-start">
          <div className="space-y-5 font-sans leading-relaxed text-muted">
            <h2 className="font-serif text-2xl text-foreground md:text-3xl">
              Bu marka neden var?
            </h2>
            <p>
              Kuruyemiş vitrinlerinde ve üretim hatlarında aynı soru tekrarlanır: hangi
              parti, hangi kullanım için? Yanıtın net olması gerekir; yoksa fire, tat ve
              maliyet aynı anda bozulur. Biz bu boşluğu doldurmak için buradayız: ürün
              dilini ticari süreçle aynı cümlede konuşmak.
            </p>
            <p>
              Perakende müşteriye paket okunurluğu ve gramaj netliği; toptan müşteriye
              torba/koli satırları, palet düzeni ve teslim penceresi. İkisi de aynı
              kalite filtresinden geçer; sadece teklif formatı değişir.
            </p>
          </div>
          <div className="space-y-5 font-sans leading-relaxed text-muted">
            <h2 className="font-serif text-2xl text-foreground md:text-3xl">
              Gaziantep bağlantısı ne anlama geliyor?
            </h2>
            <p>
              Yerel kök, “esnaf sitesi” hissi vermek için değil; tedarik ve eleme
              dilinin bu bölgede oturmuş olması için önemli. Parti seçerken kabuk,
              iç ve boz iç ayrımlarını sahada bilmek; hangi hattın hangi üretime
              oturduğunu tarif etmek demektir.
            </p>
            <p>
              Bu sayfa kurumsal metin çöplüğü değil: yaptığımız işin özünü — ürün,
              paketleme ve sevkiyatı birlikte düşünmeyi — yazılı olarak görmek
              isteyen müşteriler içindir.
            </p>
          </div>
        </div>
      </Container>

      <Container className="grid gap-10 pb-11 md:grid-cols-2 md:items-start md:gap-12 md:pb-14">
        <div className="space-y-5 font-sans text-muted">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">
            Ürün seçimi ve kalite yaklaşımı
          </h2>
          <p>
            İç fıstıkta renk ve doluluk, kabukta bütünlük ve boyut, boz içte doku ve
            karıştırma davranışı gibi kriterler parti bazında konuşulur. Ölçülebilir
            dil kullanırız; “en iyi” gibi boş sıfatlarla sayfa doldurmayız.
          </p>
          <p>
            Uzun vadeli alımlarda aynı ürün kodunda tekrarlanabilirlik için parti planı
            birlikte yapılır. Numune veya küçük deneme partisi, izin verilmeyen isimli
            referansların yerine geçen dürüst güven katmanıdır.
          </p>
          <h3 className="pt-2 font-serif text-xl text-foreground">Nasıl çalışıyoruz?</h3>
          <p>
            Sipariş öncesi kullanım alanını netleştiririz. Perakende paketlerde etiket
            ve gramaj; toptanda teklif satırları ve nakliye kalemi. Depo veya hazırlık
            alanı ziyareti randevu ve onay ile mümkündür.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-[var(--line-soft)]">
          <Image
            src={brandPhotos.heroOrchard}
            alt={brandPhotoAlts.aboutProducer}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </Container>

      <Container className="pb-6">
        <div className="rounded-[var(--radius-card)] bg-primary/[0.07] p-7 ring-1 ring-primary/10 md:p-9">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">
            Kime hizmet veriyoruz?
          </h2>
          <ul className="mt-5 grid gap-3 font-sans text-sm text-muted md:grid-cols-2 md:text-[0.95rem]">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Baklavacı ve tatlı üreticileri (iç fıstık, boz iç)
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Kuruyemiş perakende ve toptan satın alma
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Bireysel ve online satış için hazır paket alıcıları
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Gıda üretimi ve dolgu kullanan işletmeler
            </li>
          </ul>
        </div>
      </Container>

      <Container className="grid gap-8 border-t border-[var(--line-soft)] py-11 md:grid-cols-2 md:gap-12 md:py-14">
        <div className="space-y-4 font-sans leading-relaxed text-muted">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">
            Neyi farklı yapıyoruz?
          </h2>
          <p>
            Teklifte kalem kalem şeffaflık: birim, minimum, nakliye ayrı satır. Toptanda
            yazılı özet; perakendede paket seçenekleri net listelenir. Sosyal kanıt
            uydurmak yerine ürünü ve süreci göstermeyi tercih ederiz.
          </p>
          <p>
            Belge veya doğrulama bilgisi mevcut olduğunda açıkça paylaşırız; yoksa
            uydurma veri yazmayız. Güveni sahte rakamla değil, operasyon dilindeki
            tutarlılıkla kurarız.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 rounded-[var(--radius-card)] border border-[var(--line-soft)] bg-background p-6 md:p-8">
          <p className="font-serif text-lg text-foreground">
            Ürünü görmek veya toptan teklif almak için bir sonraki adım
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="primary" href="/urunler">
              Ürün vitrini
            </Button>
            <Button variant="secondary" href="/toptan-satis#teklif">
              Toptan talep
            </Button>
            <Button variant="ghost" href="/iletisim">
              İletişim
            </Button>
          </div>
        </div>
      </Container>

      <div id="isletme-bilgileri" className="scroll-mt-28 border-t border-[var(--line-soft)]">
        <Container className="py-11 md:py-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">İşletme bilgileri</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted">
            Mesafeli satış ve ön bilgilendirme formlarında yer alan satıcı bilgilerinin özeti. Vergi ve ticari ünvan env ile yapılandırıldığında yasal sayfalarda da ayrıntılı gösterilir.
          </p>
          <dl className="mt-6 grid gap-4 font-sans text-sm text-foreground md:max-w-xl">
            <div>
              <dt className="font-semibold text-muted">Marka / ticari görünen ad</dt>
              <dd className="mt-1">{brand.name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-muted">Adres</dt>
              <dd className="mt-1">
                {c.address.line1}
                <br />
                {c.address.line2}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-muted">İletişim</dt>
              <dd className="mt-1">
                {c.phoneDisplay ? (
                  <a className="text-primary hover:underline" href={`tel:${c.phoneE164}`}>
                    {c.phoneDisplay}
                  </a>
                ) : null}
                {c.email ? (
                  <>
                    <br />
                    <a className="text-primary hover:underline" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </>
                ) : null}
              </dd>
            </div>
          </dl>
          <p className="mt-6 font-sans text-sm text-muted">
            <Link href="/iletisim" className="font-semibold text-primary hover:underline">
              İletişim formu
            </Link>{" "}
            ve{" "}
            <Link href="/mesafeli-satis-sozlesmesi" className="font-semibold text-primary hover:underline">
              mesafeli satış sözleşmesi
            </Link>{" "}
            üzerinden güncel satıcı bilgilerine ulaşabilirsiniz.
          </p>
        </Container>
      </div>
    </main>
  );
}
