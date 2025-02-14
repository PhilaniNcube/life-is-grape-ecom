import { Metadata } from 'next'
import { Suspense } from 'react'
import TastingEventDescription from './_components/tasting-event-description'
import WineTastingHeader from './_components/wine-tasting-header'
import ExperienceOptions from './_components/experience-options'

export const metadata: Metadata = {
  title: 'Wine Tasting Experiences | Life is Grape',
  description: 'Experience unique wine tasting events in a cozy setting. Book personalized wine tasting sessions with expert guidance.',
  keywords: 'wine tasting, wine experience, wine events, wine education, wine sampling, wine pairing, boutique winery'
  ,
  openGraph: {
    title: 'Wine Tasting Experiences | Life is Grape',
    description: 'Experience unique wine tasting events in a cozy setting. Book personalized wine tasting sessions with expert guidance.',
    type: 'website',
    siteName: 'Life is Grape',
    images: [
      {
        url: 'https://fabulous-peacock-233.convex.cloud/api/storage/eaf6c576-5a03-4e1a-b610-5af31002c7b8',
        width: 1200,
        height: 630,
        alt: 'Wine Tasting Experiences | Life is Grape'
      }
    ]
  }
}

const WineTastingPage = () => {
  return (
    <div>
      <WineTastingHeader />
      <section className='container mx-auto mt-12'>
        <ExperienceOptions />
      </section>
    </div>
  )
}
export default WineTastingPage
