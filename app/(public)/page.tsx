import AboutUs from "./_components/about-us";
import HomePageHero from "./_components/home-page-hero";
import WinesSection from "./_components/wines-section";

export default function Home() {
  return (
    <section className=''>
      <HomePageHero />
      <WinesSection />
      <AboutUs />
    </section>
  )
}
