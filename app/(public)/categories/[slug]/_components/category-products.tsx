import { fetchQuery } from 'convex/nextjs'

import { api } from '@/convex/_generated/api'
import { Suspense } from 'react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Filter from '@/app/(public)/products/_components/filter'
import ProductImage from '@/app/(public)/_components/product-image'
import Image from 'next/image'
import ProductItem from '@/app/(public)/_components/product-item'

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
              <ProductItem key={product._id} product_id={product._id} />
            ))}
          </div>
        </div>

        {/* Optional: Link to View All Wines */}
      </div>
    </section>
  )
}
export default CategoryProducts
