import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Metadata } from "next"
import Script from "next/script"
import Filter from "./_components/filter"
import ProductItem from "../_components/product-item"

import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: 'Shop All Products | Life is Grape',
  description: 'Browse our complete collection of premium South African wines and spirits. Find the perfect bottle for any occasion.',
  openGraph: {
    title: 'Shop All Products | Life is Grape',
    description: 'Browse our complete collection of premium South African wines and spirits. Find the perfect bottle for any occasion.',
    type: 'website',
    locale: 'en_ZA',
    
  }
}

const ShopPage = async () => {
  const products = await fetchQuery(api.products.getShallowProducts)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Products',
    description: 'Complete collection of premium South African wines and spirits',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
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
    }))
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='py-12'>
        <div className='max-w-7xl mx-auto '>
          {/* Section Heading */}

          <div className='flex w-full flex-col md:flex-row'>
            <div className=''>
              <Filter />
            </div>

            {/* 3-Column Grid */}
            <ScrollArea className='md:flex-1 @container h-[calc(100dvh-14rem)]'>
              <div className='grid w-full grid-cols-2 gap-8 @lg:gap-16 @lg:grid-cols-3'>
                {products.map(product => (
                  <ProductItem key={product._id} product_id={product._id} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Optional: Link to View All Wines */}
        </div>
      </section>
    </>
  )
}

export default ShopPage
