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
import { CreateProductSchema, UpdateProductSchema } from '@/lib/schemas'
import { Doc } from '@/convex/_generated/dataModel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { createProductAction, updateProductAction } from '@/actions/products'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

type FormSchema = z.infer<typeof UpdateProductSchema>

const UpdateProductForm = ({
  categories,
  producers,
  product,
}: {
  categories: Doc<'categories'>[]
  producers: Doc<'producers'>[]
  product: Doc<'products'>
}) => {
  const generateUploadUrl = useMutation(api.products.generateUploadUrl)
  const mainImageUrl = useQuery(api.products.getMainImage, {
    id: product.main_image,
  })
  const [productId, setProductId] = useState<string | null>(null)
  const [preview, setPreview] = useState<string>(
    mainImageUrl ? mainImageUrl : ''
  )
  const [mainImageId, setMainImageId] = useState<string | null>(
    product.main_image
  )
  const [state, formAction, isPending] = useActionState(
    updateProductAction,
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
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product._id,
      name: product.name,
      description: product.description,
      product_type: product.product_type,
      price: product.price,
      in_stock: product.in_stock,
      on_sale: product.on_sale || false,
      sale_price: product.sale_price || 0,
      volume: product.volume || 0,
      dimensions: product.dimensions || '',
      featured: product.featured,
      main_image: product.main_image,
      producer_id: product.producer_id,
      categories: product.categories,
    },
  })

  const onSale = form.watch('on_sale')

  return (
    <div className='space-y-6 px-2'>
      <Form {...form}>
        <form
          action={formData => {
            formAction(formData)
          }}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='hidden' {...field} />
                </FormControl>
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
                    rows={5}
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
                      {mainImageUrl ? (
                        <img
                          src={mainImageUrl}
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
                      <SelectItem value='gift'>Gift</SelectItem>
                      <SelectItem value='custom_label'>Custom Label</SelectItem>
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
              name='on_sale'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>On Sale</FormLabel>
                    <FormDescription>Is the product a on sale?</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      name='on_sale'
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
            {onSale && (
              <FormField
                control={form.control}
                name='sale_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        min={onSale ? 1 : 0}
                        max={product.price}
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='volume'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume (ml)</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dimensions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dimensions</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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

          <Button
            className='w-1/3 rounded-none'
            disabled={isPending}
            type='submit'
          >
            {isPending ? 'Updating...' : 'Update Product'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProductForm
