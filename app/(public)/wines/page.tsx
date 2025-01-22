

import { api } from '@/convex/_generated/api'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import ProductImage from '../_components/product-image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import WineList from './_components/wine-list'
import WineFilter from './_components/wines-filter'
import { Id } from '@/convex/_generated/dataModel'
import { littlepot } from '@/app/fonts'
import ProductFilter from './[slug]/_components/product-filter'

const WinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: Id<"categories"> | '' }>
}) => {

  const filter = (await searchParams).filter ?? ''



  const wineCategories = await preloadQuery(api.categories.getCategoriesByType, {
    type: 'wine',
  })


  return (
    <div className='container flex flex-col md:flex-row gap-4 peer'>
      <ProductFilter slug={filter} />
      <Suspense fallback={<WineListLoading />}>
        <WineList filter={filter} />
      </Suspense>
    </div>
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
