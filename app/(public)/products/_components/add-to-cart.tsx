'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

const AddToCart = ({
  variants,
  product_id,
}: {
  variants: Doc<"product_variants">[]
  product_id: Id<'products'>
}) => {

  const [selectedVariant, setSelectedVariant] = useState<Id<"product_variants"> | null>(variants[0]?._id)

  return (
    <div className='w-full'>
      <Select value={selectedVariant?.toString()} onValueChange={(value:Id<"product_variants">) => setSelectedVariant(value)}>
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

      <Button className="rounded-none mt-4 w-full">
       <ShoppingCart className="mr-2"/> Add to Cart
      </Button>
    </div>
  )
}
export default AddToCart
