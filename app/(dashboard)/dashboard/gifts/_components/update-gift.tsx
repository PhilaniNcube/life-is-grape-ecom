'use client'

import { startTransition, useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {   UpdateGift, updateGiftSchema } from '@/lib/schemas'
import {  updateGiftAction } from '@/actions/gifts'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'

export default function UpdateGiftProductForm({
  gift,
}: {
  gift: Doc<'gifts'>
}) {

 
  const [state, formAction, isPending] = useActionState(updateGiftAction, null)
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UpdateGift>({
    resolver: zodResolver(updateGiftSchema),
    defaultValues: {
      gift_id: gift._id,
      in_stock: gift.in_stock,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      type: gift.type,
     dimensions: gift.dimensions,
    },
  })

  const inStock = watch('in_stock')

  const router = useRouter()


 


  return (
    <div className=''>
      <form
        action={(formData) => {
            startTransition(() => {
                formAction(formData)
            })
            router.push('/dashboard/gifts')
        }}
        className='w-full max-w-4xl space-y-6 rounded-lg bg-white p-6 shadow'
      >
        <h1 className='mb-6 text-2xl font-bold'>Create Gift Product</h1>
        <div className='grid grid-cols-2 gap-4'>
            <Input type='hidden' id='id' {...register('gift_id')} />
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' {...register('name')} />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>{' '}
          <div className='flex w-full flex-col-reverse items-start space-y-4 rounded-md'>
            <Switch
              id='in_stock'
              checked={inStock}
              onCheckedChange={value => setValue('in_stock', value)}
              className='-translate-y-3'
              {...register('in_stock')}
            />
            <Label htmlFor='in_stock' className='-translate-y-6'>
              In Stock
            </Label>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='dimensions'>Dimensions</Label>
            <Input id='dimensions' {...register('dimensions')} />
            {errors.dimensions && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.dimensions.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              type='number'
              step='0.01'
              {...register('price')}
            />
            {errors.price && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea id='description' {...register('description')} />
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div className='pl-10'>
            <Label>Type</Label>
            <RadioGroup name='type' defaultValue='box'>
              {['box', 'label', 'bag', 'voucher'].map(type => (
                <div key={type} className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={type}
                    id={type}
                    {...register('type')}
                  />
                  <Label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.type && (
              <p className='mt-1 text-sm text-red-500'>{errors.type.message}</p>
            )}
          </div>
        </div>

     

       

   

        <Button
          className='w-1/2 rounded-none'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Gift'}
        </Button>

      
      </form>
    </div>
  )
}
