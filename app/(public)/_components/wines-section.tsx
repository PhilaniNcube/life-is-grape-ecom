// wines-section.tsx
import React, { Suspense } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { formatPrice } from '@/lib/utils'
import ProductImage from './product-image'





const WinesSection = async () => {

  const featuredWines = await fetchQuery(api.products.getFeaturedProducts, {type: 'wine'})

  return (
    <section className='bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-gray-900'>
          Our Selection of Fine Wines
        </h2>
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {featuredWines.map(wine => (
            <div
              key={wine.slug}
              className='overflow-hidden rounded-lg bg-white shadow-md'
            >
              <Suspense fallback={<div className='w-full aspect-square animate-pulse bg-gray-200' />}>
                <ProductImage id={wine.main_image} />
              </Suspense>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {wine.name}
                </h3>
                <p className='mt-2 text-gray-600 line-clamp-4'>{wine.description}</p>
                <div className='mt-4 flex items-center justify-between'>
                  <span className='text-lg font-bold text-gray-900'>
                    {formatPrice(wine.price)}
                  </span>
                  <Link href={`/products/${wine.slug}`}>
                    <Button className='text-white hover:bg-red-700'>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Link href='/wines'>
            <Button className='px-6 py-3 text-lg text-white hover:bg-blue-700'>
              View All Wines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WinesSection
