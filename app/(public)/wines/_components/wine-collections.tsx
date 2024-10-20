import * as React from 'react'
import { Check, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import WineFilter from './wine-filter'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'

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

interface WineCollectionProps {
  wines?: Wine[],
  search_types?: string[]
}

export default async function WineCollection({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const wines = await fetchQuery(api.wines.getWines)


  const searchTypes = searchParams?.search_types as string[]
  // filter the wines based an array for the searchTyypes
  // if searchTypes is empty, return all wines
  const filteredWines = searchTypes?.length
    ? wines.filter(wine => searchTypes.includes(wine.type))
    : wines


  if (!filteredWines || filteredWines.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-6 text-3xl font-bold'>Wine Collection</h1>
        <p className='text-gray-600'>No wines available in the collection.</p>
      </div>
    )
  }

  return (
    <div className='px-4'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {filteredWines.map(wine => (
          <Link key={wine._id} href={`/wines/${wine._id}`}>
            <Card className='flex flex-col'>
              <CardHeader>
                <div className='relative mb-4 aspect-square'>
                  <img
                    src={wine.main_image}
                    alt={wine.name}
                    className='mx-auto h-[220px] w-[220px] rounded-md object-contain'
                    width={300}
                    height={300}
                  />
                </div>
                <CardTitle className='text-lg font-semibold'>
                  {wine.name}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                <p className='mb-2 text-sm text-gray-600'>{wine.type}</p>
                <p className='mb-2 text-sm'>Year: {wine.year}</p>
                <p className='mb-2 text-sm'>
                  Alcohol Content: {wine.alcohol_content}%
                </p>
                <div className='mb-3 flex items-center justify-between'>
                  <Badge
                    variant={wine.in_stock ? 'default' : 'secondary'}
                    className=''
                  >
                    {wine.in_stock ? (
                      <Check className='mr-1 h-4 w-4' />
                    ) : (
                      <X className='mr-1 h-4 w-4' />
                    )}
                    {wine.in_stock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                  <Badge className='bg-gray-300 capitalize' variant='outline'>
                    {wine.variety}
                  </Badge>
                </div>

                {wine.brand && (
                  <p className='mb-2 text-sm'>Brand: {wine.brand.name}</p>
                )}
                {wine.winery && (
                  <p className='mb-2 text-sm'>Winery: {wine.winery.name}</p>
                )}
              </CardContent>
              <CardFooter>
                <p className='line-clamp-1 text-xs text-gray-500'>
                  {wine.serving_suggestion}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
