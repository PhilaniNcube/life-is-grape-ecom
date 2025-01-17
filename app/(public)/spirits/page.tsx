import { api } from '@/convex/_generated/api'
import {  preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import SpiritsList from './_components/spirits-list'
import { Id } from '@/convex/_generated/dataModel'
import SpiritFilter from './_components/spirit-filter'
import { littlepot } from '@/app/fonts'

const SpritsPage = async ({
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
              <div className='aspect-square w-full'>

              </div>
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
