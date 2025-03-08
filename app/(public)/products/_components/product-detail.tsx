import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'
import ProductImage from '../../_components/product-image'
import AddToCart from './add-to-cart'
import { littlepot } from '@/app/fonts'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { trackViewItem } from '@/lib/analytics'

const ProductDetail = async ({ slug }: { slug: string }) => {
  const product = await fetchQuery(api.products.getProductBySlug, { slug })

  if (!product) return null

  await trackViewItem({
    id: product.product._id,
    name: product.product.name,
    price: product.product.price,
    category: product.product.product_type,
  })

  const relatedProducts = await fetchQuery(api.products.getRelatedProducts, {
    product_id: product?.product._id,
    limit: 4,
  })

  const renderAttributes = () => {
    if (!product?.attributes) return null

    if (product.product.product_type === 'wine') {
      return (
        <ul className='space-y-1'>
          <li>Variety: {product.attributes.variety || 'N/A'}</li>
          <li>Vintage: {product.attributes.vintage || 'N/A'}</li>
          <li>Region: {product.attributes.region || 'N/A'}</li>
          <li>Alcohol Content: {product.attributes.alcohol_content}%</li>
          <li>
            <strong>Tasting Notes:</strong>{' '}
            <span className='text-sm'>
              {product.attributes.tasting_notes || 'N/A'}
            </span>
          </li>
        </ul>
      )
    }

    return (
      <ul className='space-y-1'>
        <li>Aging: {product.attributes.aging || 'N/A'}</li>
        <li>
          Distillation Method: {product.attributes.distillation_method || 'N/A'}
        </li>
        <li>Region: {product.attributes.region || 'N/A'}</li>
        <li>Alcohol Content: {product.attributes.alcohol_content}%</li>
        <li>
          <strong>Tasting Notes:</strong>{' '}
          <span className='text-sm'>
            {product.attributes.tasting_notes || 'N/A'}
          </span>
        </li>
      </ul>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='relative grid gap-8 md:grid-cols-2'>
        {product === null ? (
          <div className='aspect-square w-full bg-slate-200'>
            Product image not found
          </div>
        ) : (
          <ProductImage id={product.product.main_image} />
        )}
        <div className='space-y-6'>
          {product === null ? (
            <div className='h-6 w-1/2 animate-pulse bg-slate-200' />
          ) : (
            <>
              <h1 className={cn('text-3xl font-bold', littlepot.className)}>
                {product.product.name}
              </h1>
              {product.product.on_sale && (
                <Badge className='absolute right-0 top-0 rounded-full bg-red-600 text-xs text-white'>
                  Sale
                </Badge>
              )}
              <p className={cn('text-2xl font-semibold')}>
                {product.product.on_sale && product.product.sale_price ? (
                  <div className='flex flex-col items-start'>
                    <span className='text-sm font-semibold text-gray-500 line-through'>
                      {formatPrice(product.product.price)}
                    </span>
                    <span className=''>
                      {formatPrice(product.product.sale_price!)}
                    </span>
                  </div>
                ) : (
                  <span className=''>{formatPrice(product.product.price)}</span>
                )}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-50'>
                {product.product.description}
              </p>
              <Card>
                <CardContent className='p-4'>
                  <h3 className='mb-2 font-semibold'>Product Attributes</h3>
                  {renderAttributes()}
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-3'>
                  <AddToCart product={product.product} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold'>Related Products</h2>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {relatedProducts?.map(product => (
            <Link key={product._id} href={`/products/${product.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle className='sr-only'>{product.name}</CardTitle>
                </CardHeader>
                <Image
                  src={product.main_image}
                  alt={product.name}
                  width={300}
                  height={300}
                />
                <CardContent>
                  <p className='line-clamp-1 text-sm'>{product.name}</p>

                  <p className='text-md font-light'>
                    {product.on_sale && product.sale_price ? (
                      <div className='flex flex-col items-start'>
                        <span className='text-sm font-semibold text-gray-500 line-through'>
                          {formatPrice(product.price)}
                        </span>
                        <span className=''>
                          {formatPrice(product.sale_price)}
                        </span>
                      </div>
                    ) : (
                      <span className=''>{formatPrice(product.price)}</span>
                    )}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProductDetail
