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
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>{gift.name}</CardTitle>
          <CardDescription>{gift.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              {image === '' || image === undefined ? (
                <div className="w-full aspect-square bg-slate-200 animate-pulse flex items-center justify-center">Loading Image...</div>
              ) : (
                <Image
                  width={900}
                  height={900}
                  src={image}
                  alt={gift.name}
                  className='h-auto w-full rounded-lg'
                />
              )}

              {/* <div className='flex space-x-2'>
                {[gift.main_image, ...(gift.images || [])].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${gift.name} thumbnail ${index + 1}`}
                    className='h-16 w-16 cursor-pointer rounded-md border-2 border-transparent hover:border-primary'
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div> */}
            </div>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold'>Price</h3>
                <p className='text-2xl font-bold'>${gift.price.toFixed(2)}</p>
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
            </div>
          </div>
        </CardContent>
        <Separator className='my-4' />
        <CardFooter className='flex justify-between'>
          <Badge
            // variant={gift.in_stock ? 'success' : 'destructive'}
            className='text-sm'
          >
            {gift.in_stock ? 'In Stock' : 'Out of Stock'}
          </Badge>
          <Button disabled={!gift.in_stock}>
            {gift.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
