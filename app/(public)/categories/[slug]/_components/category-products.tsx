import { fetchQuery } from 'convex/nextjs'

import { api } from '@/convex/_generated/api'
import { Suspense } from 'react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Filter from '@/app/(public)/products/_components/filter'
import ProductImage from '@/app/(public)/_components/product-image'
import Image from 'next/image'

const CategoryProducts = async ({ slug }: { slug: string }) => {
  // const category = await fetchQuery(api.categories.getCategoryBySlug, { slug })

  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {
    slug,
  })

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Heading */}

        <div className='flex w-full'>
          {/* 3-Column Grid */}
          <div className='grid flex-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
              <div
                key={product._id}
                className='overflow-hidden rounded-lg bg-white shadow-md'
              >
                {/* product Image */}
                <Image
                  src={product.main_image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className='aspect-square w-full'
                />

                {/* product Details */}
                <div className='p-6'>
                  <h3 className='text-lg line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
                    {product.name}
                  </h3>
                  {/* <p className='mt-2 line-clamp-3 text-sm text-gray-600'>
                    {product.description}
                  </p> */}

                  {/* Price and Action Button */}
                  <div className='mt-4 flex items-center justify-between'>
                    <span className='text-lg font-bold text-gray-900'>
                      {formatPrice(product.price)}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <Button
                        className='rounded-md text-white hover:bg-red-700'
                        size='sm'
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Link to View All Wines */}
      </div>
    </section>
  )
}
export default CategoryProducts
