import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import ListAddToCartButton from '../products/_components/list-add-to-cart-button'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

const ProductItem = async ({ product_id }: { product_id: Id<'products'> }) => {
  const productPromise = fetchQuery(
    api.products.getShallowProductWithMainImage,
    {
      id: product_id,
    }
  )
  const variantsPromise = fetchQuery(api.products.getProductVariants, {
    product_id: product_id,
  })

  const [product, variants] = await Promise.all([
    productPromise,
    variantsPromise,
  ])

  if (!product || !variants) return null

  return (
    <article className='relative overflow-hidden rounded-lg flex flex-col justify-between shadow-md @container'>
      <Link href={`/products/${product.slug}`} className='cursor-pointer'>
        <Image
          src={product.main_image}
          alt={product.name}
          width={500}
          height={500}
          className='aspect-square w-full'
        />
      </Link>

      {/* product Details */}
      <div className='p-2 @container @md:p-6'>
        <h3 className='line-clamp-1 text-xs text-gray-800 sm:text-sm md:line-clamp-1 md:text-lg'>
          {product.name}
        </h3>

        {/* Price and Action Button */}
        <span className='text-sm font-bold text-gray-900 md:text-lg'>
          {formatPrice(product.price)}
        </span>
        <div className='mt-4 flex items-end justify-between '>
          <ListAddToCartButton product={product} variants={variants} />
          <Link
            href={`/products/${product.slug}`}
            className='hidden @md:inline-block'
          >
            <Button className='rounded-md bg-gray-700 text-white'>
              <span className='hidden text-xs lg:inline-block'>
                View Details
              </span>
              <EyeIcon className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
export default ProductItem
