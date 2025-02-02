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

export default function GiftDetails({ gift, wines }: { gift: GiftWrappingOption, wines: Doc<'products'>[] }) {
  const { cart, addToCart, toggleCart } = useCartStore(state => state)



  const [selectedWineId, setSelectedWineId] = useState<
    string
  >(wines?.[0]?._id as string)



  // Fetch variants based on selectedWineId
  const variants = useQuery(api.products.getProductVariants, {
    product_id: selectedWineId as Id<'products'>,
  })

  if(!variants) {
    return null
  }

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
      quantity:  1,
    })

    toggleCart()
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

              <div>
                <h3 className='text-lg font-semibold'>Compatible Wine Types</h3>
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Customization Options</h3>
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
                className='rounded-none'
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
