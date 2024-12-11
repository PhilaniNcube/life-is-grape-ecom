import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import ListAddToCartButton from '../products/_components/list-add-to-cart-button'
import Link from 'next/link'

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
    <article className='relative overflow-hidden rounded-lg bg-white shadow-md'>
      <Image
        src={product.main_image}
        alt={product.name}
        width={500}
        height={500}
        className='aspect-square w-full'
      />

      {/* product Details */}
      <div className='p-6'>
        <h3 className='line-clamp-1 text-sm text-gray-800'>{product.name}</h3>


        {/* Price and Action Button */}
        <span className='text-lg font-bold text-gray-900'>
          {formatPrice(product.price)}
        </span>
        <div className='mt-4 flex items-center justify-between'>
          <ListAddToCartButton product={product} variants={variants} />
          <Link href={`/products/${product.slug}`}>
            <Button className='rounded-md bg-gray-700 text-white' size='sm'>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
export default ProductItem
