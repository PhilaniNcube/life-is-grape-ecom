import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import { Metadata } from 'next'

import { cn } from '@/lib/utils'
import SpiritsList from './_components/spirits-list'
import { Id } from '@/convex/_generated/dataModel'
import SpiritFilter from './_components/spirit-filter'
import { littlepot } from '@/app/fonts'
import SpiritProductFilter from './[slug]/_components/spirit-product-filter'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'South African Spirits | Life is Grape',
  description: 'Discover our curated selection of premium South African spirits. From craft gin to artisanal brandy, explore the finest spirits South Africa has to offer.',
  openGraph: {
    title: 'South African Spirits | Life is Grape',
    description: 'Discover our curated selection of premium South African spirits. From craft gin to artisanal brandy, explore the finest spirits South Africa has to offer.',
    type: 'website',
    locale: 'en_ZA',
  }
}

// JSON-LD Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'South African Spirits Collection',
  description: 'Discover our curated selection of premium South African spirits. From craft gin to artisanal brandy, explore the finest spirits South Africa has to offer.',
  publisher: {
    '@type': 'Organization',
    name: 'Life is Grape',
    url: 'https://lifeisgrape.co.za'
  },
  url: 'https://lifeisgrape.co.za/spirits'
}

const SpritsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: Id<'categories'> | '' }>
}) => {

  const filter = (await searchParams).filter ?? ''


  // Add JSON-LD script
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='peer container flex flex-col gap-4 md:flex-row'>
        <SpiritProductFilter slug={filter} />
        <Suspense fallback={<SpiritsListLoading />}>
          <SpiritsList filter={filter} />
        </Suspense>
      </div>
    </>
  )
}
export default SpritsPage

const SpiritsListLoading = () => {
  return (
    <section className='w-full py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className={cn('mb-6 text-3xl text-gray-900', littlepot.className)}>
          Our Selection of South African Spirits
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
