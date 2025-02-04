import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'
import ProductImage from '../../_components/product-image'
import AddToCart from './add-to-cart'
import { littlepot } from '@/app/fonts'
import { Badge } from '@/components/ui/badge'

const ProductDetail = async ({ slug }: { slug: string }) => {
  const product = await fetchQuery(api.products.getProductBySlug, { slug })

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
      <div className='grid gap-8 md:grid-cols-2 relative'>
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
              {product.variants[0].is_on_sale && (
                <Badge className='absolute right-0 top-0 rounded-full bg-red-600 text-xs text-white'>
                  Sale
                </Badge>
              )}
              <p className={cn('text-2xl font-semibold')}>
                {product.variants[0].is_on_sale ? (
                  <div className='flex flex-col items-start'>
                    <span className='text-sm font-semibold text-gray-500 line-through'>
                      {formatPrice(product.variants[0].price)}
                    </span>
                    <span className=''>
                      {formatPrice(product.variants[0].sale_price!)}
                    </span>
                  </div>
                ) : (
                  <span className=''>
                    {formatPrice(product.variants[0].price)}
                  </span>
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
                  <h3 className='mb-2 font-semibold'>Product Variants</h3>
                  <AddToCart

                    product={product.product}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductDetail
