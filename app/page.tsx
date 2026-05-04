import type { Metadata } from "next";
import { BottomCta } from "@/components/page-sections/BottomCta";
import { CategoryDiscovery } from "@/components/page-sections/CategoryDiscovery";
import { FaqHome } from "@/components/page-sections/FaqHome";
import { HeroHome } from "@/components/page-sections/HeroHome";
import { HomeBestsellers } from "@/components/page-sections/HomeBestsellers";
import {
  HomeCampaignBanner,
  HomeCommerceTrustBar,
  HomeNewHarvestShelf,
  HomeValuePacksShelf,
} from "@/components/page-sections/HomeMarketplaceSections";
import { HomeProducerSourceTrust } from "@/components/page-sections/HomeProducerSourceTrust";
import { HomeProducerWhy } from "@/components/page-sections/HomeProducerWhy";
import { HomeShoppingJourney } from "@/components/page-sections/HomeShoppingJourney";
import { WholesaleMiniCta } from "@/components/page-sections/WholesaleMiniCta";
import { getSitePresentation } from "@/lib/site-presentation";
import { getRetailProducts } from "@/lib/catalog/get-retail-products";

export default async function HomePage() {
  const catalog = await getRetailProducts();
  const presentation = await getSitePresentation();

  return (
    <main id="icerik">
      <HeroHome presentation={presentation} />
      <HomeCampaignBanner presentation={presentation} />
      <HomeCommerceTrustBar presentation={presentation} />
      <HomeBestsellers catalog={catalog} />
      <CategoryDiscovery tiles={presentation.discoveryTiles} />
      <HomeNewHarvestShelf catalog={catalog} presentation={presentation} />
      <HomeValuePacksShelf catalog={catalog} presentation={presentation} />
      <HomeShoppingJourney />
      <HomeProducerWhy />
      <WholesaleMiniCta />
      <HomeProducerSourceTrust />
      <FaqHome />
      <BottomCta />
    </main>
  );
}
