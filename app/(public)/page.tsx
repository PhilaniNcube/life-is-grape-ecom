import ComingSoon from "@/components/coming-soon";
import AboutUs from "./_components/about-us";
import DeliveryInfo from "./_components/delivery-info";
import HomePageGrid from "./_components/home-page-grid";
import HomePageHero from "./_components/home-page-hero";
import SpecialsBanner from './_components/specials-banner'
import WinesSection from "./_components/wines-section";

export default function Home() {
  return (
    <section className=''>

      <HomePageHero />

      <DeliveryInfo />
      <HomePageGrid />
      <WinesSection />
      {/* <Brands /> */}
      <AboutUs />
      {/* <GiftBoxes /> */}
      <SpecialsBanner />
    </section>
  )
}
