'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Tag, Wine, Check, X } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store-provider'
import { formatPrice } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function GiftDetails({ gift, wines }: { gift: Doc<'gifts'>, wines: Doc<'products'>[] }) {
  const { cart, addToCart, toggleCart } = useCartStore(state => state)

  const image = useQuery(api.gifts.fetchGiftImage, { image: gift.main_image })


  const [selectedWineId, setSelectedWineId] = useState<
    string
  >(wines?.[0]._id as string)



  // Fetch variants based on selectedWineId
  const variants = useQuery(api.products.getProductVariants, {
    product_id: selectedWineId as Id<'products'>,
  })

  const updateCart = (wineId:string) => {

   console.log('updateCart', wineId)

    if (selectedWineId === undefined) {
      return
    }

    const variant = variants?.[0]

    if (variant === undefined) {
      return
    }

    // get the product from the selected wine id
    const selectedWine = wines?.find(wine => wineId === wine._id)

    if (selectedWine === undefined) {
      return
    }

    addToCart(selectedWine, variant, {
      name: gift.name,
      description: gift.description,
      price: gift.price,
      dimensions: '',
      quantity: gift.type === 'label' ? 6 : 1,
    })

    toggleCart()
  }

  return (
    <div className='container mx-auto py-10'>
      <Card className='w-full border-none shadow-none'>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              {image === '' || image === undefined ? (
                <div className='flex aspect-square w-full animate-pulse items-center justify-center bg-slate-200'>
                  Loading Image...
                </div>
              ) : (
                <Image
                  width={900}
                  height={900}
                  src={image}
                  alt={gift.name}
                  className='h-auto w-full rounded-lg'
                />
              )}
            </div>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold'>{gift.name}</h1>
              <p className='text-md'>{gift.description}</p>
              <div>
                <h3 className='text-lg font-semibold'>Price</h3>
                {/* IF is is a wine label it is a minimum of 6 labels */}
                {gift.type === 'label' && (
                  <p className='text-sm'>
                    Minimum order of 6 labels. Price per label.
                  </p>
                )}
                <p className='text-2xl font-bold'>{formatPrice(gift.price)}</p>
                <Badge
                  // variant={gift.in_stock ? 'success' : 'destructive'}
                  className='text-sm'
                >
                  {gift.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
              <div>

                <p className='flex items-center space-x-2'>
                  {gift.type === 'box' && (
                    <Package className='inline' size={20} />
                  )}
                  {gift.type === 'label' && (
                    <Tag className='inline' size={20} />
                  )}
                  {gift.type === 'bag' && (
                    <Package className='inline' size={20} />
                  )}
                  <span>
                    {gift.type.charAt(0).toUpperCase() + gift.type.slice(1)}
                  </span>
                </p>
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Compatible Wine Types</h3>
                <div className='flex flex-wrap gap-2'>
                  {gift.compatible_wine_types.map(type => (
                    <Badge key={type} variant='secondary'>
                      <Wine className='mr-1 inline' size={12} />
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Customization Options</h3>
                <ul className='list-inside list-disc'>
                  <li className='flex items-center space-x-2'>
                    {gift.customization_options.allows_message ? (
                      <Check className='text-green-500' size={16} />
                    ) : (
                      <X className='text-red-500' size={16} />
                    )}
                    <span>
                      Personalized message
                      {gift.customization_options.allows_message &&
                        ` (max ${gift.customization_options.message_max_length} characters)`}
                    </span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    {gift.customization_options.allows_design_choice ? (
                      <Check className='text-green-500' size={16} />
                    ) : (
                      <X className='text-red-500' size={16} />
                    )}
                    <span>Design choice</span>
                  </li>
                </ul>
                {gift.customization_options.allows_design_choice && (
                  <div className='mt-2'>
                    <h4 className='font-semibold'>Available Designs:</h4>
                    <ul className='list-inside list-disc'>
                      {gift.customization_options.available_designs?.map(
                        design => <li key={design}>{design}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* list available wines */}
              <div>
                <h3 className='text-lg font-semibold'>Select a wine</h3>
                <Select onValueChange={setSelectedWineId}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a wine' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className='text-sm'>
                        Select a wine
                      </SelectLabel>

                      {wines?.map(wine => (
                        <SelectItem

                          value={wine._id}
                          key={wine._id}
                        >
                          {wine.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                disabled={!gift.in_stock}
                onClick={() => updateCart(selectedWineId)}
                size='lg'
                className='rounded-none'
              >
                {gift.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </CardContent>
        <Separator className='my-4' />
        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    </div>
  )
}
