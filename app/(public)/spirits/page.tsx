import { api } from '@/convex/_generated/api'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import ProductImage from '../_components/product-image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import SpiritsList from './_components/spirits-list'
import { Id } from '@/convex/_generated/dataModel'
import SpiritFilter from './_components/spirit-filter'

const WinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: Id<'categories'> | '' }>
}) => {

    const filter = (await searchParams).filter ?? ''

      const spiritCategories = await preloadQuery(
        api.categories.getCategoriesByType,
        {
          type: 'spirit',
        }
      )

  return (
    <div className='peer container flex gap-x-4'>
      <SpiritFilter categories={spiritCategories} />
      <Suspense fallback={<SpiritsListLoading />}>
        <SpiritsList filter={filter} />
      </Suspense>
    </div>
  )
}
export default WinesPage


const SpiritsListLoading = () => {
  return (
    <section className='w-full bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
        <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
          Explore Our Diverse Collection of Spirits
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
