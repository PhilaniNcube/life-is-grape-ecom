import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Metadata } from 'next'
import Script from 'next/script'
import ProductDetail from '../_components/product-detail'
import { trackViewItem } from '@/lib/analytics'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchQuery(api.products.getProductBySlug, { slug })

  if (!product)
    return {
      title: 'Product Not Found | Life is Grape',
      description: 'The requested product could not be found.',
    }

  return {
    title: `${product.product.name} | Life is Grape`,
    description:
      product.product.description ||
      `Buy ${product.product.name} from Life is Grape. Premium South African wines and spirits.`,
    openGraph: {
      title: `${product.product.name} | Life is Grape`,
      description: product.product.description,
      images: [{ url: product.product.main_image || '' }],
      type: 'website', // Changed from 'product' to 'website'
      locale: 'en_ZA',
    },
  }
}

const page = async ({ params }: Props) => {
  const { slug } = await params
  const product = await fetchQuery(api.products.getProductBySlug, { slug })

  if (!product) return <div>Product not found</div>

  // get the product image
  const productImage = await fetchQuery(api.products.getMainImage, {
    id: product?.product.main_image!,
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.product.name,
    description: product.product.description,
    image: productImage,
    sku: product?.product._id,
    offers: {
      '@type': 'Offer',
      price: product.product.on_sale
        ? product.product.sale_price
        : product?.product.price,
      priceCurrency: 'ZAR',
      availability: product.product.in_stock ? 'InStock' : 'OutOfStock',
      url: `https://lifeisgrape.co.za/products/${slug}`,
    },
  }

  return (
    <>
      <Script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='container'>
        <ProductDetail slug={slug} />
      </div>
    </>
  )
}

export default page
