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
import { set } from 'sanity'

export default function GiftDetails({ gift }: { gift: GiftWrappingOption }) {
  const { cart, addToCart, toggleCart } = useCartStore(state => state)

  const wines = useQuery(api.products.getUnlabelledProducts)

  if (!wines) {
    return
  }

  const [selectedWineId, setSelectedWineId] = useState<
    Id<'products'> | undefined
  >(wines[0]._id)

  if (!selectedWineId) {
    return
  }

  // Fetch variants based on selectedWineId
  const variants = wines.map(wine => wine.variants).flat()

  console.log('variants', variants)

  if (!variants) {
    return
  }

  const updateCart = (wineId: Id<'products'>) => {
    console.log('updateCart', wineId)

    setSelectedWineId(wineId)

    if (selectedWineId === undefined) {
      return
    }

    const selectedWine = wines?.find(wine => wine._id === selectedWineId)

    // get the product from the selected wine id

    if (selectedWine === undefined) {
      return
    }

    const variant = selectedWine.variants[0]

    addToCart(selectedWine, variant, {
      name: gift.name,
      description: gift.description,
      price: gift.price,
      dimensions: '',
      quantity: 1,
    })


  }

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
                    console.log('value', value)
                    setSelectedWineId(value as Id<'products'>)
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
                          {wine.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => updateCart(selectedWineId)}
                size='lg'
                className='rounded-none bg-slate-700 text-white'
              >
                Add to Cart
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
