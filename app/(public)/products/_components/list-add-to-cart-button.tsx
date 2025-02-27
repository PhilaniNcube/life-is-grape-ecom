'use client'

import { CustomButton } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useCartStore } from '@/store/cart-store-provider'
import { useQuery } from 'convex/react'
import { ShoppingBagIcon, ShoppingCart } from 'lucide-react'

type ProductVariant = Doc<'product_variants'>

// define a type for the product prop where the main_image is a string
type ProductWithImage = Omit<Doc<'products'>, 'main_image'> & {
  main_image: string
}

const ListAddToCartButton = ({ product }: { product: ProductWithImage }) => {
  const { addToCart, toggleCart } = useCartStore(state => state)

  // exclude the product variants from the product object

  if (!product) return null

  return (
    <CustomButton
      aria-description='Add to cart'
      variant='outline'
      className='font-sm flex w-fit flex-row items-center justify-center text-xs'
      onClick={() => addToCart(product)}
    >
      <span className='hidden lg:flex'>Add To Cart</span>
      <ShoppingBagIcon className='h-4 w-4 lg:ml-2' />
    </CustomButton>
  )
}
export default ListAddToCartButton
