'use client'

import { startTransition, useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { createGiftSchema, Gift } from '@/lib/schemas'
import { createGiftAction } from '@/actions/gifts'
import { useToast } from '@/hooks/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'


export default function GiftProductForm() {
    const { toast } = useToast()
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(createGiftAction, null)
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<Gift>({
    resolver: zodResolver(createGiftSchema),
    defaultValues: {
      customization_options: {
        allows_message: false,
        allows_design_choice: false,
        message_max_length: 255,
        // available_designs: [],
      },
      compatible_wine_types: [],
      in_stock: true,
    },
  })

  let allowsMessage = watch('customization_options.allows_message')
  let allowsDesignChoice = watch('customization_options.allows_design_choice')



  return (
    <ScrollArea className='h-[calc(100dvh-350px)]'>
      <form
        action={formData => {
          startTransition(async () => {
            formAction(formData)
          })
        }}
        className='w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow'
      >
        <h1 className='mb-6 text-2xl font-bold'>Create Gift Product</h1>

        <div>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...register('name')} />
          {errors.name && (
            <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' {...register('description')} />
          {errors.description && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='price'>Price</Label>
          <Input id='price' type='number' step='0.01' {...register('price')} />
          {errors.price && (
            <p className='mt-1 text-sm text-red-500'>{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label>Type</Label>
          <RadioGroup name='type' defaultValue='box'>
            {['box', 'label', 'bag'].map(type => (
              <div key={type} className='flex items-center space-x-2'>
                <RadioGroupItem value={type} id={type} {...register('type')} />
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

        <div>
          <Label>Customization Options</Label>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <Switch
                id='allows_message'
                {...register('customization_options.allows_message')}
              />
              <Label htmlFor='allows_message'>Allows Message</Label>
            </div>
            <div>
              <Label htmlFor='message_max_length'>Max Message Length</Label>
              <Input
                id='message_max_length'
                type='number'
                {...register('customization_options.message_max_length')}
              />
            </div>
            {/* <div className='flex items-center space-x-2'>
            <Switch
              onCheckedChange={e => {
                allowsDesignChoice = e.valueOf()
                console.log(allowsDesignChoice)
              }}
              id='allows_design_choice'
              {...register('customization_options.allows_design_choice')}
            />
            <Label htmlFor='allows_design_choice'>Allows Design Choice</Label>
          </div> */}
            {/* <div>
            <Label htmlFor='available_designs'>
              Available Designs (comma-separated)
            </Label>
            <Input
              id='available_designs'
              {...register('customization_options.available_designs')}
              onChange={e => {
                const designs = e.target.value.split(',').map(d => d.trim())
                register('customization_options.available_designs').onChange({
                  target: { value: designs },
                })
              }}
            />
          </div> */}
          </div>
        </div>

        <div>
          <Label>Compatible Wine Types</Label>
          <div className='space-y-2'>
            {['red', 'white'].map(type => (
              <div key={type} className='flex items-center space-x-2'>
                <Checkbox
                  id={type}
                  value={type}
                  {...register('compatible_wine_types')}
                />
                <Label htmlFor={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
              </div>
            ))}
          </div>
          {errors.compatible_wine_types && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.compatible_wine_types.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='main_image'>Main Image URL</Label>
          <Input id='main_image' {...register('main_image')} />
          {errors.main_image && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.main_image.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='images'>
            Additional Image URLs (comma-separated)
          </Label>
          <Input
            id='images'
            {...register('images')}
            onChange={e => {
              const images = e.target.value.split(',').map(img => img.trim())
              register('images').onChange({
                target: { value: images },
              })
            }}
          />
        </div>

        <div className='flex items-center space-x-2'>
          <Switch id='in_stock' {...register('in_stock')} />
          <Label htmlFor='in_stock'>In Stock</Label>
        </div>

        <Button
          className='w-1/2 rounded-none'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Gift'}
        </Button>

        {/* {submitStatus && <p className='mt-4 text-green-500'>{submitStatus}</p>} */}
      </form>
    </ScrollArea>
  )
}
