import { api } from '@/convex/_generated/api'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { littlepot } from '@/app/fonts'
import { cn } from '@/lib/utils'
import ProductItem from '../../_components/product-item'
import ProductFilter from '../../wines/[slug]/_components/product-filter'
import SpiritProductFilter from './_components/spirit-product-filter'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await fetchQuery(api.categories.getCategoryBySlug, { slug })
  
  const title = `${category?.name || 'Spirits'} | Life is Grape`
  const description = `Explore our selection of ${category?.name.toLowerCase() || 'spirits'} from South Africa's finest distilleries. Premium quality spirits at great prices.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_ZA',
    }
  }
}

const SpiritCategoryPage = async ({
  params,
}: Props) => {
  const { slug } = await params
  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {
    slug,
  })
  const category = await fetchQuery(api.categories.getCategoryBySlug, { slug })

  // Generate JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category?.name || 'Spirits'} Collection`,
    description: `Our selection of ${category?.name.toLowerCase() || 'spirits'} from South Africa`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.main_image,
        sku: product._id,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'ZAR',
          availability: product.in_stock ? 'InStock' : 'OutOfStock'
        }
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}

export default SpiritCategoryPage
