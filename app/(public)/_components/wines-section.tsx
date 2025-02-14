// wines-section.tsx

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { littlepot } from '@/app/fonts'
import ProductItem from './product-item'





const WinesSection = async () => {

  const featuredWines = await fetchQuery(api.products.getFeaturedProducts, {type: 'wine'})

  return (
    <section className='py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2
          className={cn(
            'mb-6 text-center text-3xl font-extrabold text-gray-900',
            littlepot.className
          )}
        >
          Our Selection of Fine Wines
        </h2>
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {featuredWines.map(wine => (
            <ProductItem key={wine._id} product_id={wine._id} />
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Link href='/wines'>
            <Button className='px-6 py-3 text-lg text-white bg-gray-700'>
              View All Wines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WinesSection
