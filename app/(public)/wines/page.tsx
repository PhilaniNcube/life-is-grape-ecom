import { Suspense } from 'react'
import { Metadata } from 'next'

import { cn } from '@/lib/utils'
import WineList from './_components/wine-list'

import { Id } from '@/convex/_generated/dataModel'
import { littlepot } from '@/app/fonts'
import ProductFilter from './[slug]/_components/product-filter'

export const metadata: Metadata = {
  title: 'Our Wines | Life is Grape',
  description: 'Browse our curated selection of fine wines from around the world.',
  keywords: 'wine, wines, red wine, white wine, rose wine, sparkling wine, champagne, wine shop, wine store, wine delivery, wine online, wine tasting, wine club, wine subscription, wine gift, wine accessories, wine glasses, wine decanters, wine openers, wine aerators, wine preservers, wine coolers, wine fridges, wine racks, wine cellars, wine cabinets, wine books, wine magazines, wine education, wine courses, wine events, wine tours, wine travel, wine regions, wine producers, wine makers, wine labels, wine brands, wine varietals, wine grapes, wine vintages, wine ratings, wine reviews, wine awards, wine competitions, wine news, wine trends, wine culture, wine history, wine art, wine photography, wine videos, wine podcasts, wine blogs, wine websites, wine social media, wine influencers', 
  openGraph: {
    title: 'Our Wines | Life is Grape',
    description: 'Browse our curated selection of fine wines from around the world.',
    type: 'website',
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Wines Collection",
  "description": "Browse our curated selection of fine wines from around the world.",
  "url": "https://lifeisgrape.com/wines",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Life is Grape",
    "@id": "https://lifeisgrape.com"
  },
  "about": {
    "@type": "Thing",
    "name": "Wine Collection"
  }
}

const WinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: Id<"categories"> | '' }>
}) => {

  const filter = (await searchParams).filter ?? ''


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className='container flex flex-col md:flex-row gap-4 peer'>
        <ProductFilter slug={filter} />
        <Suspense fallback={<WineListLoading />}>
          <WineList filter={filter} />
        </Suspense>
      </div>
    </>
  )
}
export default WinesPage

const WineListLoading = () => {
  return (
    <section className='w-full py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2
          className={cn(
            'mb-6 text-3xl font-extrabold text-gray-900',
            littlepot.className
          )}
        >
          Our Selection of Fine Wines
        </h2>
        <div className='flex w-full gap-x-5'>
          <div className='grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
            <div className='w-full gap-2 rounded-lg bg-slate-100 p-6 shadow-md'>
              <div className='aspect-square w-full'></div>
              <div className='h-7 w-full animate-pulse bg-slate-400' />
              <div className='h-[40px] w-full animate-pulse bg-slate-400' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
