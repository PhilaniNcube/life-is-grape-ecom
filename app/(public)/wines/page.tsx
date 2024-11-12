

import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import ProductImage from '../_components/product-image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import WineList from './_components/wine-list'
import WineFilter from './_components/wines-filter'

const WinesPage = async () => {

  const wineCategories = await fetchQuery(
    api.categories.getCategoriesByType,{
      type: 'wine'
    }
  )



  console.log(wineCategories)

  return (
    <div className='container flex gap-x-4'>
      <WineFilter categories={wineCategories} />
      <Suspense fallback={<WineListLoading />}>
        <WineList />
      </Suspense>
    </div>
  )
}
export default WinesPage

const WineListLoading = () => {
  return (
    <section className='bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
        <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
          Our Selection of Fine Wines
        </h2>
        <div className='flex w-full gap-x-5'>
          <div className='animate-pulse rounded bg-slate-200 lg:h-[400px] lg:w-[300px]'>
            <h2 className='p-6 text-2xl font-semibold text-black'>
              Filter Loading...
            </h2>
          </div>
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
