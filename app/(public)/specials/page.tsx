import { fetchQuery } from 'convex/nextjs'
import SpecialsBanner from './_components/specials-banner'
import { api } from '@/convex/_generated/api'
import ProductItem from '../_components/product-item'
import { ScrollArea } from '@/components/ui/scroll-area'

const page = async () => {
  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {
    slug: 'specials',
  })

  return (
    <div>
      <SpecialsBanner />
      <ScrollArea className='mt flex w-full @container h-[calc(100dvh-16rem)]'>
        {/* 3-Column Grid */}
        <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3 max-w-7xl mx-auto py-6'>
          {products.map(product => (
            <ProductItem key={product._id} product_id={product._id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
export default page
