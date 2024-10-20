'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { PlusIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UpdateWineSchema } from '@/lib/schemas'
import SubmitButton from '@/components/submit-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { updateWineAction } from '@/actions/wines'
import Image from 'next/image'
import { fetchQuery } from 'convex/nextjs'
import { Id, Doc } from '@/convex/_generated/dataModel'

type ProductFormValues = z.infer<typeof UpdateWineSchema>


export default function UpdateProductForm(
  { product }: { product: Doc<'wines'> },
) {
  const brands = useQuery(api.brands.getBrands)
  const wineries = useQuery(api.wineries.getWineries)

  const [state, formAction] = useFormState(updateWineAction, null)

  const varieties = [
    'red',
    'white',
    'rose',
    'sparkling',
    'dessert',
    'fortified',
  ]

  const types = [
    'Cabernet Sauvignon',
    'Chardonnay',
    'Madeira',
    'Marsala',
    'Merlot',
    'Pinot Grigio',
    'Pinot Noir',
    'Pinotage',
    'Port',
    'Riesling',
    'Rose',
    'Sauvignon Blanc',
    'Sherry',
    'Syrah',
    'Vermouth',
    'Zinfandel',
  ]

  const generateUploadUrl = useMutation(api.wines.generateUploadUrl)
  const imageInput = useRef<HTMLInputElement>(null)
  const [imageId, setImageId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(UpdateWineSchema),
    defaultValues: {
      ...product,
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    form.reset(product)
    setImageId(product.main_image)
  }, [product, form])

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()

    if (selectedImage) {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': selectedImage.type },
        body: selectedImage,
      })
      const { storageId } = await result.json()
      setImageId(storageId)
      form.setValue('main_image', storageId)
    }

    setSelectedImage(null)
    if (imageInput.current) imageInput.current.value = ''
  }

  const mainImage = useQuery(api.wines.getImageUrl, {
    image_id: product.main_image as Id<'_storage'>,
  })

  return (
    <div className='flex flex-row-reverse gap-x-5'>
      <Card className='h-fit w-[400px] py-4'>
        <CardContent>
          <h2 className='text-xl font-semibold'>Update Image</h2>
          <form onSubmit={handleSendImage} className='space-y-2'>
            {mainImage && (
              <Image
                src={mainImage}
                alt='Product Image'
                width={400}
                height={400}
                className='p-3 border object-contain h-[200px]'
              />
            )}
            <Label htmlFor='file' className=''>
              File input
            </Label>
            <Input
              ref={imageInput}
              id='file'
              name='file'
              onChange={e =>
                setSelectedImage(e.target.files ? e.target.files[0] : null)
              }
              type='file'
            />
            <SubmitButton>
              <PlusIcon size={16} />
              Update Image
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
      <section className='flex-1'>
        <h2 className='text-xl font-semibold'>Update Product</h2>

        <Form {...form}>
          <form action={formAction} className='h-full space-y-8'>
            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <Input type="hidden" defaultValue={product._id}  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-2 grid grid-cols-2 gap-x-3'>
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        {...field}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-2 grid grid-cols-2 gap-x-3'>
              <FormField
                control={form.control}
                name='brand'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      name='brand'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger name='brand'>
                          <SelectValue placeholder='Select a brand' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands?.map(brand => (
                          <SelectItem
                            id='brand'
                            key={brand._id}
                            value={brand._id}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='winery_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Winery</FormLabel>
                    <Select
                      name='winery_id'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a winery' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wineries?.map(winery => (
                          <SelectItem key={winery._id} value={winery._id}>
                            {winery.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter product description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='main_image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter main image URL'
                      {...field}
                      value={imageId || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='in_stock'
              render={({ field }) => (
                <FormItem className='mt-2 flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>In Stock</FormLabel>
                    <FormDescription>
                      Is this product currently in stock?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      name='in_stock'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='alcohol_content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol Content (%)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.1'
                      max={90}
                      min={0}
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='serving_suggestion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serving Suggestion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter serving suggestion'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-2 grid grid-cols-2 gap-x-3'>
              <FormField
                control={form.control}
                name='variety'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variety</FormLabel>
                    <Select
                      name='variety'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a variety' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {varieties.map(variety => (
                          <SelectItem key={variety} value={variety}>
                            {variety}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      name='type'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {types.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton className='mt-3'>Update Product</SubmitButton>
          </form>
        </Form>
      </section>
    </div>
  )
}
