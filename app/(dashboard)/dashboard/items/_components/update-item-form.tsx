'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { PlusIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CreateItemSchema, UpdateItemSchema } from '@/lib/schemas'
import SubmitButton from '@/components/submit-button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { FormEvent, useActionState, useRef, useState } from 'react'
import {  updateItemAction } from '@/actions/products'
import NewBrandDialog from '../../brands/_components/new-brand-dialog'
import { Doc } from '@/convex/_generated/dataModel'

type ProductFormValues = z.infer<typeof UpdateItemSchema>

type UpdateItemFormProps = {
  item: Doc<'products'>
}

const UpdateItemForm = ({ item }: UpdateItemFormProps) => {
  const brands = useQuery(api.brands.getBrands)



  const [state, formAction] = useActionState(updateItemAction, null)

  const types = ['Brandy', 'Whiskey', 'Gin', 'Vodka', 'Rum', 'Tequila']

  const generateUploadUrl = useMutation(api.products.generateUploadUrl)

  const imageInput = useRef<HTMLInputElement>(null)
  const [imageId, setImageId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(UpdateItemSchema),
    defaultValues: {
      type: item.type || undefined,
      name: item.name,
      description: item.description,
      brand_id: item.brand,
      tasting_notes: item.tasting_notes,
      price: item.price,
      pairing_suggestions: item.pairing_suggestions,
      volume: item.volume,
      main_image: item.main_image,
      // images: item.images || [],
      cocktail_name: item.suggested_cocktail.name,
      ingredients: item.suggested_cocktail.ingredients,
      cocktail_description: item.suggested_cocktail.description,
      by: item.suggested_cocktail.by,
    },
    mode: 'onBlur',
  })

  //  const { fields, append, prepend, remove, swap, move, insert } =
  //    useFieldArray({
  //      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
  //      name: 'ingredients', // unique name for your Field Array
  //    })

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl()
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': selectedImage?.type || 'image/jpeg' },
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
      <div>
        <NewBrandDialog />
        <Card className='mt-4 h-fit w-[400px] py-4'>
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
      </div>
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

            <div className='mt-2 grid grid-cols-3 gap-3'>
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
              />{' '}
              <FormField
                control={form.control}
                name='brand_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      name='brand_id'
                      onValueChange={field.onChange}
                      defaultValue={field.value}

                    >
                      <FormControl>
                        <SelectTrigger name='brand'>
                          <SelectValue placeholder='Select a brand' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={item.brand}>
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
              />{' '}
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
            <div className='mt-2 grid grid-cols-2 gap-3'>
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
              />{' '}
              <FormField
                control={form.control}
                name='tasting_notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tasting Notes</FormLabel>
                    <FormControl>
                      <Textarea className='col-span-2' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
              <FormField
                control={form.control}
                name='volume'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume (ml)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='1'
                        min={0}
                        {...field}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
            </div>
            <FormField
              control={form.control}
              name='pairing_suggestions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pairing Suggestion</FormLabel>
                  <FormControl>
                    <Textarea
                      className='col-span-2'
                      placeholder='Enter pairing suggestion'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-2 grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='cocktail_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cocktail Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter cocktail name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='by'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cocktail By</FormLabel>
                    <FormControl>
                      <Input placeholder='Cocktail created by' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ingredients'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cocktail Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter cocktail ingredients'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cocktail_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cocktail Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter cocktail description'
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
            </div>
            {imageId && <SubmitButton className='mt-3'>Submit</SubmitButton>}
          </form>
        </Form>
      </section>{' '}
    </div>
  )
}
export default UpdateItemForm
