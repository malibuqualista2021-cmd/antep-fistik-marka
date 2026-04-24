import { AudienceChoice } from "@/components/page-sections/AudienceChoice";
import { BottomCta } from "@/components/page-sections/BottomCta";
import { CategoryDiscovery } from "@/components/page-sections/CategoryDiscovery";
import { FaqHome } from "@/components/page-sections/FaqHome";
import { HeroHome } from "@/components/page-sections/HeroHome";
import { HomeShoppingJourney } from "@/components/page-sections/HomeShoppingJourney";
import { MarketplaceProductRail } from "@/components/page-sections/MarketplaceProductRail";
import { MarketplacePromoStrip } from "@/components/page-sections/MarketplacePromoStrip";
import { RetailTrustStrip } from "@/components/page-sections/RetailTrustStrip";
import { WholesaleMiniCta } from "@/components/page-sections/WholesaleMiniCta";

export default function HomePage() {
  return (
    <main id="icerik">
      <HeroHome />
      <MarketplacePromoStrip />
      <CategoryDiscovery />
      <MarketplaceProductRail />
      <AudienceChoice />
      <HomeShoppingJourney />
      <RetailTrustStrip />
      <FaqHome />
      <WholesaleMiniCta />
      <BottomCta />
    </main>
  );
}
