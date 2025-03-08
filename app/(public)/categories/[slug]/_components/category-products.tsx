import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import ProductItem from '@/app/(public)/_components/product-item'
import { littlepot } from '@/app/fonts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { trackViewItemList } from '@/lib/analytics'
import { ProductListViewTracker } from '@/components/analytics/ProductViewTracker'

const CategoryProducts = async ({ slug }: { slug: string }) => {
  // const category = await fetchQuery(api.categories.getCategoryBySlug, { slug })

  const categoryPromise = fetchQuery(api.categories.getCategoryBySlug, { slug })

  const productsPromise = fetchQuery(api.categories.getProductsByCategorySlug, {
    slug,
  })

  const [category, products] = await Promise.all([
    categoryPromise,
    productsPromise,
  ])

  return (
    <section className='w-full py-12'>
      <ProductListViewTracker items={products} listName={slug} />
      <ScrollArea className='mx-auto h-[calc(100dvh-16rem)] w-full max-w-7xl'>
        {/* Section Heading */}
        <h1
          className={cn(
            'mb-6 text-3xl font-extrabold text-gray-900',
            littlepot.className
          )}
        >
          {category?.name}
        </h1>
        <div className='flex w-full @container'>
          {/* 3-Column Grid */}
          <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3'>
            {products.map(product => (
              <ProductItem key={product._id} product_id={product._id} />
            ))}
          </div>
        </div>

        {/* Optional: Link to View All Wines */}
      </ScrollArea>
    </section>
  )
}
export default CategoryProducts
