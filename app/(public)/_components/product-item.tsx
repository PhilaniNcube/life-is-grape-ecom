import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import ListAddToCartButton from '../products/_components/list-add-to-cart-button'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'
import { CustomButton } from '@/components/ui'

const ProductItem = async ({ product_id }: { product_id: Id<'products'> }) => {
  const productPromise = fetchQuery(
    api.products.getShallowProductWithMainImage,
    {
      id: product_id,
    }
  )

  const [product] = await Promise.all([productPromise])

  if (!product) return null

  return (
    <article className='relative flex flex-col justify-between overflow-hidden rounded-lg shadow-md @container'>
      <Link href={`/products/${product.slug}`} className='cursor-pointer'>
        <Image
          src={product.main_image}
          alt={product.name}
          width={500}
          height={500}
          className='aspect-square w-full'
          priority
          quality={100}
        />
      </Link>

      {/* Sales Badge */}
      {product.on_sale && (
        <div className='text-x absolute right-0 top-0 z-10 bg-red-500 p-2 font-bold text-white'>
          Sale
        </div>
      )}

      {/* product Details */}
      <div className='p-2 @container @md:p-6'>
        <h3 className='line-clamp-1 text-xs text-gray-800 sm:text-sm md:line-clamp-1 lg:text-lg'>
          {product.name}
        </h3>

        {/* Price and Action Button */}
        <span className='text-sm font-bold text-gray-900 md:text-lg'>
          {product.on_sale && product.sale_price
            ? formatPrice(product.sale_price!)
            : formatPrice(product.price)}
        </span>
        <div className='mt-4 flex items-end justify-between'>
          <ListAddToCartButton product={product} />
          <Link
            href={`/products/${product.slug}`}
            className='hidden @md:inline-block'
          >
            <CustomButton
              aria-description='view product details'
              className='rounded-md bg-gray-700 text-white'
            >
              <span className='hidden text-xs lg:inline-block'>
                View Details
              </span>
              <EyeIcon className='h-4 w-4' />
            </CustomButton>
          </Link>
        </div>
      </div>
    </article>
  )
}
export default ProductItem
