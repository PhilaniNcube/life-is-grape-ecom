'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useActionState, useState } from 'react'
import { toast } from 'sonner'
import { CreateProductSchema } from '@/lib/schemas'
import { Doc } from '@/convex/_generated/dataModel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { createProductAction } from '@/actions/products'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

type FormSchema = z.infer<typeof CreateProductSchema>

const NewProductForm = ({
  categories,
  producers,
}: {
  categories: Doc<'categories'>[]
  producers: Doc<'producers'>[]
}) => {
  const generateUploadUrl = useMutation(api.products.generateUploadUrl)

  const [productId, setProductId] = useState<string | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [mainImageId, setMainImageId] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Create preview
      setPreview(URL.createObjectURL(file))

      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl()

      const result = await fetch(postUrl, {
        method: 'POST',
        body: file,
      })

      if (!result.ok) {
        throw new Error('Upload failed')
      }

      const { storageId } = await result.json()
      console.log('Uploaded image:', storageId)
      setMainImageId(storageId)

      form.setValue('main_image', storageId)

    } catch (error) {
      toast.error('Failed to upload image')
      setPreview('')
    }
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: '',
      description: '',
      product_type: 'wine',
      price: 0,
      in_stock: true,
      featured: false,
      main_image: mainImageId || '',
    },
  })

  return (
    <div className='space-y-6 px-2'>
      {!productId ? (
        <Form {...form}>
          <form
            action={formData => {
              formAction(formData)
            }}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Product description'
                      minLength={10}
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
                  <FormLabel>Main Image</FormLabel>
                  <FormControl>
                    <div className='space-y-2'>
                      <div className='relative h-48 w-48'>
                        {preview ? (
                          <img
                            src={preview}
                            alt='Preview'
                            className='h-full w-full rounded-md object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center rounded-md bg-gray-100'>
                            <span className='text-gray-400'>No image</span>
                          </div>
                        )}
                      </div>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                      />
                      <Input type='hidden' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='producer_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producer</FormLabel>
                    <Select
                      name='producer_id'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select producer' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {producers.map(producer => (
                          <SelectItem key={producer._id} value={producer._id}>
                            {producer.name} ({producer.type})
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
                name='product_type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      name='product_type'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='wine'>Wine</SelectItem>
                        <SelectItem value='spirit'>Spirit</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='in_stock'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>In Stock</FormLabel>
                      <FormDescription>
                        Is the product currently in stock?
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
                name='featured'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Featured Product
                      </FormLabel>
                      <FormDescription>
                        Is the product a featured product?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        name='featured'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='categories'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <ScrollArea className='h-72 rounded-md border bg-white p-4'>
                      <div className='space-y-4'>
                        {categories
                          ?.filter(category => !category.parent_id) // Only parent categories
                          .map(category => (
                            <div key={category._id} className='space-y-2'>
                              <Badge
                                variant={
                                  field.value?.includes(category._id)
                                    ? 'default'
                                    : 'outline'
                                }
                                className='cursor-pointer hover:bg-primary/80'
                                onClick={() => {
                                  const newValue = field.value?.includes(
                                    category._id
                                  )
                                    ? field.value.filter(
                                        id => id !== category._id
                                      )
                                    : [...(field.value || []), category._id]
                                  field.onChange(newValue)
                                }}
                              >
                                {category.name}
                              </Badge>

                              {/* Child categories */}
                              <div className='ml-6 space-x-3 space-y-2'>
                                {categories
                                  ?.filter(
                                    child => child.parent_id === category._id
                                  )
                                  .map(child => (
                                    <Badge
                                      key={child._id}
                                      variant={
                                        field.value?.includes(child._id)
                                          ? 'default'
                                          : 'outline'
                                      }
                                      className='cursor-pointer hover:bg-primary/80'
                                      onClick={() => {
                                        const newValue = field.value?.includes(
                                          child._id
                                        )
                                          ? field.value.filter(
                                              id => id !== child._id
                                            )
                                          : [...(field.value || []), child._id]
                                        field.onChange(newValue)
                                      }}
                                    >
                                      {child.name}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </FormControl>
                  <input type='hidden' name='categories' value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='rounded-none' disabled={isPending} type='submit'>
              {isPending ? 'Creating...' : 'Create Product'}
            </Button>
          </form>
        </Form>
      ) : (
        <Tabs defaultValue='attributes'>
          <TabsList>
            <TabsTrigger value='attributes'>Attributes</TabsTrigger>
            <TabsTrigger value='variants'>Variants</TabsTrigger>
          </TabsList>
          <TabsContent value='attributes'>
            {/* <ProductAttributesForm productId={productId} /> */}
          </TabsContent>
          <TabsContent value='variants'>
            {/* <ProductVariantsForm productId={productId} /> */}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default NewProductForm
