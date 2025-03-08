import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { cn } from '@/lib/utils'
import { Id } from '@/convex/_generated/dataModel'
import ProductItem from '../../_components/product-item'
import { littlepot } from '@/app/fonts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ProductListViewTracker } from '@/components/analytics/ProductViewTracker'

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
      <section className='py-12'>
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
    <section className='w-full py-4 @container peer-has-[data-[pending=true]]:animate-pulse'>
      <ProductListViewTracker
        items={filteredSpirits}
        listName={`Spirits - ${filter}`}
      />
      <ScrollArea className='mx-auto h-[calc(100dvh-12rem)] max-w-7xl'>
        {/* Section Heading */}

        <h2 className={cn('mb-6 text-3xl text-gray-900', littlepot.className)}>
          Our Selection of South African Spirits
        </h2>

        {/* 3-Column Grid */}
        <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3'>
          {filteredSpirits.map(spirit => (
            <ProductItem key={spirit._id} product_id={spirit._id} />
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}
export default SpiritsList
