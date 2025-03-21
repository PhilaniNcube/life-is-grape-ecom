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
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store-provider'
import { formatPrice, GiftWrappingOption } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CustomButton } from '@/components/ui'

export default function GiftDetails({ gift }: { gift: GiftWrappingOption }) {
  const { cart, addToCart, toggleCart } = useCartStore(state => state)

  const wines =
    useQuery(api.products.getShallowProductsWithMainImage, { type: 'wine' }) ||
    []

  const [selectedWineId, setSelectedWineId] = useState<
    Id<'products'> | undefined
  >()

  return (
    <div className='container mx-auto py-10'>
      <Card className='w-full border-none shadow-none'>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <Image
                width={900}
                height={900}
                src={gift.image}
                alt={gift.name}
                className='h-auto w-full rounded-lg'
              />
            </div>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold'>{gift.name}</h1>
              <p className='text-md'>{gift.description}</p>
              <div>
                <h3 className='text-lg font-semibold'>Price</h3>

                <p className='text-2xl font-bold'>{formatPrice(gift.price)}</p>
              </div>

              {/* list available wines */}
              <div>
                <h3 className='text-lg font-semibold'>Select a wine</h3>
                <Select
                  onValueChange={value => {
                    const wineId = value as Id<'products'>

                    setSelectedWineId(wineId)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a wine' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className='text-sm'>
                        Select a wine
                      </SelectLabel>

                      {wines?.map(wine => (
                        <SelectItem value={wine._id} key={wine._id}>
                          {wine.name} -{' '}
                          {wine.on_sale && wine.sale_price
                            ? formatPrice(wine.sale_price!)
                            : formatPrice(wine.price)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <CustomButton
                size='lg'
                className='rounded-none bg-slate-700 text-white'
                onClick={() => {
                  const selectedWine = wines.find(
                    wine => wine._id === selectedWineId
                  )
                  if (!selectedWine) {
                    alert('Please select a wine')
                    return
                  }

                  addToCart(selectedWine, {
                    name: gift.name,
                    price: gift.price,
                    description: gift.description,
                    dimensions: gift.dimensions,
                    quantity: 1,
                  })
                }}
              >
                Add to Cart
              </CustomButton>
            </div>
          </div>
        </CardContent>
        <Separator className='my-4' />
        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    </div>
  )
}
