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
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { add } from 'date-fns'

type GiftWrappingOption = {
  name: string
  price: number
  description: string
  dimensions: string
}

// Add gift wrapping/box options to add to the cart along with the product
const giftWrappingOptions: GiftWrappingOption[] = [
  {
    name: 'Single gift bag',
    price: 25,
    description:
      'A beautiful brown kraft bottle bag with strong rope handles. Hand-Painted for your celebration. Perfect for gifts',
    dimensions: '36cm x 12cm',
  },
  {
    name: 'Single gift box',
    price: 35,
    description:
      'A beautiful brown kraft bottle box with black vinyl lettering of your choice for your celebration.',
    dimensions: '(L)325mm x (W)120mm x (H)85mm',
  },
  {
    name: 'Double gift box',
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
  const { addToCart, toggleCart } = useCartStore(state => state)

  const [selectedVariantId, setSelectedVariantId] =
    useState<Id<'product_variants'> | null>(variants[0]?._id)

  const selectedVariant = variants.find(
    variant => variant._id === selectedVariantId
  )

  const [selectedGiftBox, setSelectedGiftBox] =
    useState<GiftWrappingOption | null>(null)

  return (
    <div className='w-full'>
      <Select
        value={selectedVariantId?.toString()}
        onValueChange={(value: Id<'product_variants'>) =>
          setSelectedVariantId(value)
        }
      >
        <SelectTrigger id='variant'>
          <SelectValue placeholder='Select product variant' />
        </SelectTrigger>
        <SelectContent>
          {variants.map(variant => (
            <SelectItem
              disabled={variant.stock_level <= 0}
              key={variant._id}
              value={variant._id.toString()}
            >
              {variant.volume}ml - {formatPrice(variant.price)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Add gift wrapping/box options to add to the cart along with the product */}
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
            <Badge className='lg:absolute lg:right-2 lg:top-2 text-xs text-white dark:text-slate-700'>
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

      <Button
        onClick={() => {
          if (!selectedVariant) return

          if (!selectedGiftBox) {
            addToCart(product, selectedVariant)
            toggleCart()
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

          toggleCart()
        }}
        className='mt-4 w-full rounded-none'
      >
        <ShoppingCart className='mr-2' /> Add to Cart
      </Button>
    </div>
  )
}
export default AddToCart
