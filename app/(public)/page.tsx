import AboutUs from "./_components/about-us";
import DeliveryInfo from "./_components/delivery-info";
import HomePageHero from "./_components/home-page-hero";
import SugarbirdBanner from "./_components/sugarbird-banner";
import WinesSection from "./_components/wines-section";

export default function Home() {
  return (
    <section className=''>
      <HomePageHero />
      <DeliveryInfo />
      <WinesSection />
      <AboutUs />
      <SugarbirdBanner />
    </section>
  )
}
