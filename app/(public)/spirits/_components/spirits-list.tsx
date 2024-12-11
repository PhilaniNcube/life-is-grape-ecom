import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import ProductImage from '../../_components/product-image'
import { cn, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import ListAddToCartButton from '../../products/_components/list-add-to-cart-button'
import ProductItem from '../../_components/product-item'
import { littlepot } from '@/app/fonts'

const SpiritsList = async ({ filter }: { filter: Id<'categories'> | '' }) => {
  const spirits = await fetchQuery(
    api.products.getShallowProductsWithMainImage,
    {
      type: 'spirit',
    }
  )

  // Handle the case where no spirits are returned
  if (!spirits || spirits.length === 0) {
    return (
      <section className='bg-gray-100 py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
            Our Selection of South African Spirits
          </h2>
          <p className='text-lg text-gray-600'>
            Currently, we have no spirits available. Please check back later!
          </p>
        </div>
      </section>
    )
  }

  let filteredSpirits

  if (
    filter === '' ||
    filter === null ||
    filter === undefined ||
    filter === 'all'
  ) {
    {
      filteredSpirits = spirits
    }
  } else {
    filteredSpirits = spirits.filter(spirit => {
      return spirit.categories.includes(filter)
    })
  }

  return (
    <section className='py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Heading */}

        <h2 className={cn('mb-6 text-3xl text-gray-900', littlepot.className)}>
          Our Selection of South African Spirits
        </h2>

        {/* 3-Column Grid */}
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredSpirits.map(spirit => (
            <ProductItem key={spirit._id} product_id={spirit._id} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default SpiritsList
