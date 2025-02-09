import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import Script from "next/script";
import ProductItem from "../_components/product-item";
import { cn } from "@/lib/utils";
import { littlepot } from "@/app/fonts";

export const metadata: Metadata = {
  title: 'Sale Items | Life is Grape',
  description: 'Shop our sale items - amazing deals on premium South African wines and spirits. Limited time offers with great savings.',
  openGraph: {
    title: 'Sale Items | Life is Grape',
    description: 'Shop our sale items - amazing deals on premium South African wines and spirits. Limited time offers with great savings.',
    type: 'website',
    locale: 'en_ZA',
  }
}

const SalePage = async () => {
  const products = await fetchQuery(api.products.getProductsOnSaleWithMainImage)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Sale Items',
    description: 'Current sale items and special offers on premium South African wines and spirits',
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
          availability: product.in_stock  ? 'InStock' : 'OutOfStock',
          priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
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
      <div className="container mx-auto py-12">
        <h1 className={cn('text-2xl md:text-3xl text-center', littlepot.className)}>Products on Sale</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-6">
          {products.map(product => {
            return <ProductItem key={product._id} product_id={product._id} />
          })}
        </div>
      </div>
    </>
  )
};

export default SalePage;
