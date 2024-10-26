'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LiqourDetail } from '@/lib/types'

type Id<T extends string> = string & { __brand: T }



export default function ProductDetail({ product }: { product: LiqourDetail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = [
    product.main_image,
    ...product.imagesUrls.filter((img): img is string => img !== undefined),
  ]

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + allImages.length) % allImages.length
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='relative aspect-square'>
          <Image
            src={allImages[currentImageIndex]}
            alt={product.name}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
          <div className='absolute inset-0 flex items-center justify-between'>
            <Button
              variant='ghost'
              size='icon'
              onClick={prevImage}
              className='m-2 rounded-full bg-black/50 p-2 text-white'
            >
              <ChevronLeft className='h-6 w-6' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={nextImage}
              className='m-2 rounded-full bg-black/50 p-2 text-white'
            >
              <ChevronRight className='h-6 w-6' />
            </Button>
          </div>
        </div>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>{product.name}</h1>
          <Badge variant='secondary' className='mb-4'>
            {product.type}
          </Badge>
          {product.brand && (
            <p className='mb-4 text-muted-foreground'>
              by {product.brand.name}
            </p>
          )}
          <p className='mb-4 text-2xl font-semibold'>
            ${product.price.toFixed(2)}
          </p>
          <p className='mb-4'>{product.volume}ml</p>
          <p className='mb-6'>{product.description}</p>
          <Button className='mb-4 w-full rounded-none'>Add to Cart</Button>
          <Separator className='my-6' />
          <div className='grid gap-6'>
            <div>
              <h2 className='mb-2 text-xl font-semibold'>Tasting Notes</h2>
              <p>{product.tasting_notes}</p>
            </div>
            <div>
              <h2 className='mb-2 text-xl font-semibold'>
                Pairing Suggestions
              </h2>
              <p>{product.pairing_suggestions}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-8' />
      <Card>
        <CardHeader>
          <CardTitle>Suggested Cocktail</CardTitle>
          <CardDescription>{product.suggested_cocktail.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className='mb-2 font-semibold'>Ingredients:</h3>
          <p className='mb-4'>{product.suggested_cocktail.ingredients}</p>
          <h3 className='mb-2 font-semibold'>How to Make:</h3>
          <p>{product.suggested_cocktail.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
