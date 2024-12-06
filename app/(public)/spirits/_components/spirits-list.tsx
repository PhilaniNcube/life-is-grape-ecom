import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import ProductImage from '../../_components/product-image'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'

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
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
            Our Selection of Fine Spirits
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
        <h2 className='mb-6 text-center text-3xl font-extrabold text-gray-900'>
          Explore Our Diverse Collection of Spirits
        </h2>

        {/* 3-Column Grid */}
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredSpirits.map(spirit => (
            <div
              key={spirit._id}
              className='overflow-hidden rounded-lg bg-white shadow-md'
            >
              {/* spirit Image */}
              <Image
                src={spirit.main_image}
                alt={spirit.name}
                width={800}
                height={800}
                className='aspect-square w-full'
              />

              {/* spirit Details */}
              <div className='p-6'>
                <h3 className='line-clamp-1 text-xl font-semibold text-gray-800'>
                  {spirit.name}
                </h3>
                <p className='mt-2 line-clamp-3 text-gray-600'>
                  {spirit.description}
                </p>

                {/* Price and Action Button */}
                <div className='mt-4 flex items-center justify-between'>
                  <span className='text-lg font-bold text-gray-900'>
                    {formatPrice(spirit.price)}
                  </span>
                  <Link href={`/products/${spirit.slug}`}>
                    <Button className='rounded-none text-white hover:bg-red-700'>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default SpiritsList
