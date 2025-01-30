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
import ImageUpload from '../../products/_components/upload-image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function GiftProductForm() {
  const generateUploadUrl = useMutation(api.gifts.generateGiftUploadUrl)
  const [imageId, setImageId] = useState<string | null>(null)

  const { toast } = useToast()
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(createGiftAction, null)
  const {
    register,
    formState: { errors },
    watch,
    setValue,
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

  async function handleUploadImage(file: File) {
    const postUrl = await generateUploadUrl()

    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const { storageId } = await response.json()
    // setImageId(storageId)
    setValue('main_image', storageId)
  }

  let allowsMessage = watch('customization_options.allows_message')
  let allowsDesignChoice = watch('customization_options.allows_design_choice')

  return (
    <div className=''>
      <form
        action={formData => {
          startTransition(async () => {
            formAction(formData)
          })
        }}
        className='w-full max-w-4xl space-y-6 rounded-lg bg-white p-6 shadow'
      >
        <h1 className='mb-6 text-2xl font-bold'>Create Gift Product</h1>
        <div className='grid grid-cols-2 gap-4'>
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

        <div className='grid grid-cols-3 gap-4'>
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
            </div>
          </div>
          <div>
            <Label htmlFor='message_max_length'>Max Message Length</Label>
            <Input
              id='message_max_length'
              type='number'
              {...register('customization_options.message_max_length')}
            />
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
          </div>{' '}
        </div>

        <div className='grid grid-cols-2 gap-4'></div>

        <div className='rounded-md bg-slate-100 p-5 shadow'>
          <Label htmlFor='main_image'>Main Image URL</Label>
          <ImageUpload handleImageUpload={handleUploadImage} />
          <Input type='hidden' id='main_image' {...register('main_image')} />
          {errors.main_image && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.main_image.message}
            </p>
          )}
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
    </div>
  )
}
