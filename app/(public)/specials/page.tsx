import { fetchQuery } from 'convex/nextjs'
import { Metadata } from 'next'
import SpecialsBanner from './_components/specials-banner'
import { api } from '@/convex/_generated/api'
import ProductItem from '../_components/product-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Special Offers | Life is Grape',
  description: 'Discover our latest wine and spirit specials. Limited time offers on premium South African wines and spirits.',
  openGraph: {
    title: 'Special Offers | Life is Grape',
    description: 'Discover our latest wine and spirit specials. Limited time offers on premium South African wines and spirits.',
    type: 'website',
    locale: 'en_ZA',
  }
}

const page = async () => {
  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {
    slug: 'valentines',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Special Offers',
    description: 'Limited time special offers on premium South African wines and spirits',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.main_image,
        sku: product._id,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'ZAR',
          availability: product.in_stock  ? 'InStock' : 'OutOfStock'
        }
      }
    }))
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className=''>
        <SpecialsBanner />
        <ScrollArea className='mt flex w-full @container h-[calc(100dvh-12rem)]'>
          {/* 3-Column Grid */}
          <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3 max-w-7xl mx-auto py-16'>
            {products.map(product => (
              <ProductItem key={product._id} product_id={product._id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default page
