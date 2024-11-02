"use client";

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
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import Image from 'next/image';



export default function GiftDetails({gift}:{gift: Doc<'gifts'>}) {


  const image = useQuery(api.gifts.fetchGiftImage, {image:gift.main_image})

  return (
    <div className='container mx-auto py-10'>
      <Card className='w-full'>
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
                <p className='text-2xl font-bold'>${gift.price.toFixed(2)}</p>
                <Badge
                  // variant={gift.in_stock ? 'success' : 'destructive'}
                  className='text-sm'
                >
                  {gift.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Type</h3>
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
              <Button disabled={!gift.in_stock} size="lg" className='rounded-none'>
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
