'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store-provider'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

const AddToCart = ({
  variants,
  product,
}: {
  variants: Doc<"product_variants">[]
  product: Doc<'products'>
}) => {

  const {addToCart, toggleCart} = useCartStore(state => state)

  const [selectedVariantId, setSelectedVariantId] = useState<Id<"product_variants"> | null>(variants[0]?._id)

  const selectedVariant = variants.find(variant => variant._id === selectedVariantId)

  return (
    <div className='w-full'>
      <Select value={selectedVariantId?.toString()} onValueChange={(value:Id<"product_variants">) => setSelectedVariantId(value)}>
        <SelectTrigger id="variant">
          <SelectValue placeholder='Select product variant' />
        </SelectTrigger>
        <SelectContent>
          {variants.map(variant => (
            <SelectItem disabled={variant.stock_level <= 0} key={variant._id} value={variant._id.toString()}>
              {variant.volume}ml - {formatPrice(variant.price)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={() => {
        if (!selectedVariant) return
        addToCart(product, selectedVariant)
        toggleCart()
      }} className="rounded-none mt-4 w-full">
       <ShoppingCart className="mr-2"/> Add to Cart
      </Button>
    </div>
  )
}
export default AddToCart
