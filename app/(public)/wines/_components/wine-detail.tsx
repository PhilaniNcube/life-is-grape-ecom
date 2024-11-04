import * as React from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import Link from 'next/link'
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type WineType =
  | 'Sauvignon Blanc'
  | 'Chardonnay'
  | 'Merlot'
  | 'Cabernet Sauvignon'
  | 'Pinot Noir'
  | 'Pinot Grigio'
  | 'Pinotage'
  | 'Syrah'
  | 'Zinfandel'
  | 'Riesling'
  | 'Port'
  | 'Sherry'
  | 'Madeira'
  | 'Marsala'
  | 'Vermouth'
  | 'Rose'
  | 'Malbec'
  | 'Champagne'
  | 'Prosecco'
  | 'Sangiovese'
  | 'Moscato'

type Wine = {
  _id: string
  name: string
  year: number
  alcohol_content: number
  in_stock: boolean
  type: WineType
  price: number
  main_image: string
  images: string[]
  serving_suggestion: string
  variety: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'fortified'
  brand: { _id: string; _creationTime: number; name: string } | null
  winery: {
    _id: string
    _creationTime: number
    name: string
    location: string
    description: string
    image: string
  } | null
}

interface WineDetailsProps {
  wine: Wine
}

export default function WineDetail({ wine }: WineDetailsProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        href='/wines'
        className='mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Wine Collection
      </Link>
      <div className='grid gap-8 md:grid-cols-2'>
        <div>
          <Carousel className='mx-auto w-full max-w-xs'>
            <CarouselContent>
              {[wine.main_image, ...wine.images].map((image, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <img
                          src={image}
                          alt={`${wine.name} - Image ${index + 1}`}
                          className='max-h-full max-w-full object-contain'
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>{wine.name}</h1>
          <p className='mb-4 text-xl'>{wine.year}</p>
          <div className='mb-4 flex flex-wrap gap-2'>
            <Badge>{wine.type}</Badge>
            <Badge variant='outline'>{wine.variety}</Badge>
            <Badge variant={wine.in_stock ? 'default' : 'secondary'}>
              {wine.in_stock ? (
                <Check className='mr-1 h-4 w-4' />
              ) : (
                <X className='mr-1 h-4 w-4' />
              )}
              {wine.in_stock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
          {wine.in_stock && (
            <Button  className='my-4 rounded-none' size="lg">
              Add to Cart
            </Button>
          )}
          <p className='mb-4'>Alcohol Content: {wine.alcohol_content}%</p>
          <h3 className='mb-2 text-2xl font-bold'>R{wine.price}</h3>
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Serving Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{wine.serving_suggestion}</p>
            </CardContent>
          </Card>
          {wine.brand && (
            <Card className='mb-6'>
              <CardHeader>
                <CardTitle>Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{wine.brand.name}</p>
              </CardContent>
            </Card>
          )}
          {wine.winery && (
            <Card>
              <CardHeader>
                <CardTitle>Winery</CardTitle>
                <CardDescription>{wine.winery.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{wine.winery.description}</p>
              </CardContent>

            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
