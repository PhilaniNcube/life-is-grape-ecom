'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { cn, formatPrice } from '@/lib/utils'
import { GiftBox } from '@/store/cart'
import { useCartStore } from '@/store/cart-store-provider'
import { Check, ShoppingCart } from 'lucide-react'
import { startTransition, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { add } from 'date-fns'
import { format } from 'path'

type GiftWrappingOption = {
  name: string
  price: number
  description: string
  dimensions: string
}

// Add gift wrapping/box options to add to the cart along with the product
const giftWrappingOptions: GiftWrappingOption[] = [
  // {
  //   name: 'Single gift bag',
  //   price: 25,
  //   description:
  //     'A beautiful brown kraft bottle bag with strong rope handles. Hand-Painted for your celebration. Perfect for gifts',
  //   dimensions: '36cm x 12cm',
  // },
  {
    name: 'Brown Kraft Single Bottle Gift Box',
    price: 45,
    description:
      'A beautiful brown kraft bottle box with black vinyl lettering of your choice for your celebration.',
    dimensions: '(L)325mm x (W)120mm x (H)85mm',
  },
  {
    name: 'Brown Kraft Double Bottle Gift Box',
    price: 55,
    description:
      'A beautiful brown kraft bottle box, hand-painted for your celebration. Perfect for gifts.',
    dimensions: '(L)325mm x (W)240mm x (H)85mm',
  },
]

const AddToCart = ({
  variants,
  product,
}: {
  variants: Doc<'product_variants'>[]
  product: Doc<'products'>
}) => {
  const { addToCart, openCart } = useCartStore(state => state)

  const [selectedVariantId, setSelectedVariantId] =
    useState<Id<'product_variants'> | null>(variants[0]?._id)

  const selectedVariant = variants.find(
    variant => variant._id === selectedVariantId
  )

  const [selectedGiftBox, setSelectedGiftBox] =
    useState<GiftWrappingOption | null>(null)

  return (
    <div className='w-full'>
      {variants.map(variant => (
        <Badge
          key={variant._id}
          onClick={() => setSelectedVariantId(variant._id)}
          className={cn(
            'cursor-pointer',
            selectedVariantId === variant._id
              ? 'bg-blue-800 text-white'
              : 'mx-3 bg-slate-100 text-slate-600',
            variant.stock_level > 0 ? '' : 'opacity-80'
          )}
        >
          {variant.volume}ml -{' '}
          {variant.is_on_sale
            ? formatPrice(variant.sale_price!)
            : formatPrice(variant.price)}
          {selectedVariantId === variant._id && (
            <Check className='ml-2' size={12} />
          )}
        </Badge>
      ))}

      {selectedVariant && (
        <Button
          disabled={selectedVariant?.stock_level < 1}
          onClick={() => {
            if (!selectedVariant) return

            if (!selectedGiftBox) {
              addToCart(product, selectedVariant)
              return
            }

            const wrappingOption = {
              name: selectedGiftBox.name || '',
              price: selectedGiftBox.price,
              dimensions: selectedGiftBox.dimensions,
              description: selectedGiftBox.description,
              quantity: 1,
            }

            addToCart(product, selectedVariant, wrappingOption || undefined)
          }}
          className={cn(
            'mt-4 w-full rounded-none',
            selectedVariant.stock_level < 1
              ? 'cursor-not-allowed bg-red-200 text-gray-800 hover:bg-red-300 hover:text-gray-800'
              : 'bg-gray-700 text-white hover:text-white'
          )}
        >
          {selectedVariant.stock_level < 1 ? (
            'Out of Stock'
          ) : (
            <span className='flex items-center justify-center'>
              <ShoppingCart className='mr-2' /> Add to Cart
            </span>
          )}
        </Button>
      )}

      {/* Add gift wrapping/box options to add to the cart along with the product */}
      {product.product_type === 'wine' && (
        <div className='mt-4 flex flex-col gap-3'>
          <h3 className='text-md font-semibold'>Gift Wrapping Options</h3>
          {giftWrappingOptions.map(giftBox => (
            <div
              key={giftBox.name}
              onClick={() => setSelectedGiftBox(giftBox)}
              className={cn(
                'relative cursor-pointer rounded-md border p-3',
                selectedGiftBox?.name === giftBox.name
                  ? 'bg-blue-200'
                  : 'bg-slate-50'
              )}
            >
              <h4 className='font-semibold text-black'>{giftBox.name}</h4>
              <Badge className='text-xs text-white dark:text-slate-700 lg:absolute lg:right-2 lg:top-2'>
                {giftBox.dimensions}
              </Badge>
              <p className='text-xs text-gray-500'>{giftBox.description}</p>
              <span>{formatPrice(giftBox.price)}</span>
            </div>
          ))}
          <div
            onClick={() => setSelectedGiftBox(null)}
            className='flex items-center gap-2'
          >
            <Checkbox checked={selectedGiftBox === null} />
            <Label>No Gift Wrapping</Label>
          </div>
        </div>
      )}
    </div>
  )
}
export default AddToCart
