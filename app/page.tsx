import { ApproachStrip } from "@/components/page-sections/ApproachStrip";
import { BottomCta } from "@/components/page-sections/BottomCta";
import { CategoryBand } from "@/components/page-sections/CategoryBand";
import { FaqHome } from "@/components/page-sections/FaqHome";
import { FeaturedProducts } from "@/components/page-sections/FeaturedProducts";
import { HeroHome } from "@/components/page-sections/HeroHome";
import { RetailWholesaleSplit } from "@/components/page-sections/RetailWholesaleSplit";
import { TrustBand } from "@/components/page-sections/TrustBand";
import { TrustClientSegments } from "@/components/page-sections/TrustClientSegments";
import { WhyUs } from "@/components/page-sections/WhyUs";
import { WholesaleTeaser } from "@/components/page-sections/WholesaleTeaser";

export default function HomePage() {
  return (
    <main id="icerik">
      <HeroHome />
      <CategoryBand />
      <WhyUs />
      <RetailWholesaleSplit />
      <FeaturedProducts />
      <ApproachStrip />
      <TrustClientSegments />
      <WholesaleTeaser />
      <TrustBand />
      <FaqHome />
      <BottomCta />
    </main>
  );
}
