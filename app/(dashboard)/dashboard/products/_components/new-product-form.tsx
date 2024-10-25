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
import { CreateWineSchema } from '@/lib/schemas'
import SubmitButton from '@/components/submit-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { FormEvent, useActionState, useRef, useState } from 'react'
import { createWineAction } from '@/actions/wines'

type ProductFormValues = z.infer<typeof CreateWineSchema>

const NewProductForm = () => {
  const brands = useQuery(api.brands.getBrands)
  const wineries = useQuery(api.wineries.getWineries)

  const [state, formAction, isPending] = useActionState(createWineAction, null)

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
    resolver: zodResolver(CreateWineSchema),
    defaultValues: {
      brand: '',
      name: '',
      winery_id: '',
      description: '',
      year: new Date().getFullYear(),
      price: 0,
      main_image: '',
      images: [],
      in_stock: true,
      alcohol_content: 0,
      serving_suggestion: '',
      variety: '',
      type: '',
    },
    mode: 'onBlur',
  })

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl()
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': selectedImage!.type },
      body: selectedImage,
    })
    const { storageId } = await result.json()
    // Step 3: Save the newly allocated storage id to the database

    setImageId(storageId)

    setSelectedImage(null)
    imageInput.current!.value = ''
  }

  return (
    <div className='flex flex-row-reverse gap-x-5'>
      <Card className='h-fit w-[400px] py-4'>
        <CardContent>
          <h2 className='text-xl font-semibold'>Upload Image</h2>
          <form onSubmit={handleSendImage} className='space-y-2'>
            <Label htmlFor='file' className=''>
              File input
            </Label>
            <Input
              ref={imageInput}
              id='file'
              name='file'
              onChange={e => setSelectedImage(e.target.files![0])}
              type='file'
            />
            <SubmitButton>
              <PlusIcon size={16} />
              Save Image
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
      <section className='flex-1'>
        <h2 className='text-xl font-semibold'>New Product</h2>

        <Form {...form}>
          <form action={formAction} className='h-full space-y-8'>
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
                  {/* <FormMessage /> */}
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
            {imageId && (
              <Button disabled={isPending} className='mt-3 w-full'>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </form>
        </Form>
        {state?.status === 200 && (
          <p className='text-green-500'>{state.message}</p>
        )}
      </section>{' '}
    </div>
  )
}
export default NewProductForm
