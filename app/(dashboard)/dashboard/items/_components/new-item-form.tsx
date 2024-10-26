'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { CircleDashed, PlusIcon } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CreateItemSchema } from '@/lib/schemas'
import SubmitButton from '@/components/submit-button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  FormEvent,
  startTransition,
  useActionState,
  useRef,
  useState,
} from 'react'
import { createItemAction } from '@/actions/products'
import NewBrandDialog from '../../brands/_components/new-brand-dialog'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'

type ProductFormValues = z.infer<typeof CreateItemSchema>

const NewItemForm = () => {
  const brands = useQuery(api.brands.getBrands)

  const [state, formAction, isPending] = useActionState(createItemAction, null)

  const types = ['Brandy', 'Whiskey', 'Gin', 'Vodka', 'Rum', 'Tequila']

  const generateUploadUrl = useMutation(api.products.generateUploadUrl)
  const [isLoading, setIsLoading] = useState(false)

  const imageInput = useRef<HTMLInputElement>(null)
  const [imageId, setImageId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  // const [imageUrl, setImageUrl] = useState<string | null>(null)

  let mainImage

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(CreateItemSchema),
    defaultValues: {
      name: '',
      description: '',
      brand_id: '',
      // tasting_notes: '',
      price: 0,
      pairing_suggestions: '',
      volume: 0,
      main_image: '',
      images: [],
      cocktail_name: '',
      ingredients: '',
      cocktail_description: '',
      by: '',
    },
  })



  //  const { fields, append, prepend, remove, swap, move, insert } =
  //    useFieldArray({
  //      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
  //      name: 'ingredients', // unique name for your Field Array
  //    })

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

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

    mainImage = fetchQuery(api.products.getImageUrl, {image_id: storageId})
    setImageId(storageId)

    setIsLoading(false)
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
                required
                accept='image/*'
                onChange={e => setSelectedImage(e.target.files![0])}
                type='file'
              />
              <Button
                disabled={isLoading}
                type='submit'
                className='w-full rounded-none'
              >
                {isLoading ? (
                  <CircleDashed size={16} className='animate-sping' />
                ) : (
                  <span className="flex flex-row items-center">
                    <PlusIcon size={16} className='mr-1' />
                    Save Image
                  </span>
                )}
              </Button>
            </form>
            {mainImage && (
              <img
                src={mainImage}
                alt='main image'
                className='aspect-square w-full'
              />
            )}
          </CardContent>
        </Card>
      </div>
      <section className='flex-1'>
        <h2 className='text-xl font-semibold'>New Product</h2>

        <Form {...form}>
          <form
            action={formData => {
              startTransition(() => {
                formAction(formData)
                redirect('/dashboard/items')
              })
            }}
            className='h-full space-y-8'
          >
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

            {imageId && (
              <Button disabled={isPending} className='mt-3 w-full rounded-none'>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </form>
          {state?.status === 200 && (
            <p className='text-green-500'>{state.message}</p>
          )}
        </Form>
      </section>{' '}
    </div>
  )
}
export default NewItemForm
