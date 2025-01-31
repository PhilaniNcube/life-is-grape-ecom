import { api } from '@/convex/_generated/api'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import { littlepot } from '@/app/fonts'
import { cn } from '@/lib/utils'
import ProductItem from '../../_components/product-item'
import ProductFilter from '../../wines/[slug]/_components/product-filter'
import SpiritProductFilter from './_components/spirit-product-filter'
import { ScrollArea } from '@/components/ui/scroll-area'


const SpiritCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params

  console.log(slug)

  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {
    slug,
  })

  console.log(products)

  return (
    <div className='peer container mx-auto flex flex-col gap-4 md:flex-row'>
      <div className='sticky top-0 z-10'>
        <SpiritProductFilter slug={slug} />
      </div>
      <section className='w-full py-4 @container peer-has-[data-[pending=true]]:animate-pulse'>
        <ScrollArea className='mx-auto max-w-7xl h-[calc(100dvh-12rem)]'>
          {/* Section Heading */}
          <h2
            className={cn(
              'mb-6 text-3xl font-extrabold text-gray-900',
              littlepot.className
            )}
          >
            Our Selection of Spirits
          </h2>

          {/* 3-Column Grid */}

          <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3'>
            {products.map(wine => (
              <ProductItem key={wine._id} product_id={wine._id} />
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  )
}
export default SpiritCategoryPage
