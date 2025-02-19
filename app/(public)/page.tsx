import ComingSoon from "@/components/coming-soon";
import AboutUs from "./_components/about-us";
import DeliveryInfo from "./_components/delivery-info";
import HomePageGrid from "./_components/home-page-grid";
import HomePageHero from "./_components/home-page-hero";
import SpecialsBanner from './_components/specials-banner'
import WinesSection from "./_components/wines-section";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: 'Life is Grape',
  description: 'Your one-stop shop for exquisite wines and spirits. Discover new favorites and enjoy convenient delivery.',
  keywords: 'wine shop, wine delivery, spirits, wine, alcohol, wine store, wine online, wine near me, wine delivery near me, wine delivery service, wine delivery',
  verification: {
    google: "e8fWRAIfxJNV7ACBM9jTrNN_PoF6fVEloPeuZxnCDAY",
  },
}

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
