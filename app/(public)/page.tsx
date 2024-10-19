import AboutUs from "./_components/about-us";
import HomePageHero from "./_components/home-page-hero";
import TastingExperiences from "./_components/tasting-experiences";

export default function Home() {
  return (
    <section className=''>
      <HomePageHero />
      <TastingExperiences />
      <AboutUs />
    </section>
  )
}
