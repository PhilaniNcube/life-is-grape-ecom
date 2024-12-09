import AboutUs from "./_components/about-us";
import Brands from "./_components/brands";
import BrandCarousel from "./_components/brands";
import DeliveryInfo from "./_components/delivery-info";
import GiftBoxes from "./_components/gift-boxes";
import GrapeDescisions from "./_components/grape-descisions";
import HomePageHero from "./_components/home-page-hero";
import SugarbirdBanner from "./_components/sugarbird-banner";
import WinesSection from "./_components/wines-section";

export default function Home() {
  return (
    <section className=''>
      {/* <HomePageHero /> */}
      <GrapeDescisions />
      <DeliveryInfo />
      <WinesSection />
      {/* <Brands /> */}
      <AboutUs />
      <GiftBoxes />
      <SugarbirdBanner />
    </section>
  )
}
