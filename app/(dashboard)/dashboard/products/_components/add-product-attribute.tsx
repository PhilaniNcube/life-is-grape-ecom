'use client'

import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { CreateAttributesSchema } from '@/lib/schemas'
import { Id } from '@/convex/_generated/dataModel'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

// Infer TypeScript type
type FormSchema = z.infer<typeof CreateAttributesSchema>

interface AddProductAttributeDialogProps {
  productId: Id<'products'> // ID of the product to which the attribute will be added
  // onAttributeAdded: () => void // Callback to refresh attributes list or similar
  productType: 'wine' | 'spirit' | 'gift' // Type of the product
}

const AddProductAttributeDialog: React.FC<AddProductAttributeDialogProps> = ({
  productId,
  // onAttributeAdded,
  productType,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  // Initialize the mutation for adding a product attribute
  const addAttribute = useMutation(api.products.addProductAttributes)
  const router = useRouter()

  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateAttributesSchema),
    defaultValues:{
      product_id: productId,
      variety: '',
      vintage: undefined,
      region: '',
      tasting_notes: '',
      alcohol_content: 0,
      aging: '',
      distillation_method: '',
    }
  })

  // Handle form submission
  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    try {
      const payload =
        productType === 'wine'
          ? {
              product_id: productId,
              variety: data.variety,
              vintage: data.vintage,
              region: data.region,
              tasting_notes: data.tasting_notes,
              alcohol_content: data.alcohol_content,
            }
          : {
              product_id: productId,
              aging: data.aging,
              distillation_method: data.distillation_method,
              region: data.region,
              tasting_notes: data.tasting_notes,
              alcohol_content: data.alcohol_content,
            }

      const result = await addAttribute(payload)
      console.log('result', result)
      toast.success('Product attribute added successfully')
      form.reset()
      router.refresh()
      setIsLoading(false)

    } catch (error) {
      toast.error('Failed to add product attribute')
      console.error('Add Attribute Error:', error)
      router.refresh()
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full bg-black'>Add Attribute</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Attribute</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new attribute to this product.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='product_id'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='hidden'
                      placeholder='Volume'
                      {...field}
                      value={productId}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {productType === 'wine' ? (
              <>
                <FormField
                  control={form.control}
                  name='variety'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variety</FormLabel>
                      <FormControl>
                        <Input placeholder='Variety' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='vintage'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vintage</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='Vintage' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='alcohol_content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol Content</FormLabel>
                      <FormControl>
                        <Input placeholder='Alcohol Content' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='region'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input placeholder='Region' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tasting_notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tasting Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder='Tasting Notes'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name='distillation_method'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distillation Method</FormLabel>
                      <FormControl>
                        <Input placeholder='Distillation Method' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='aging'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aging</FormLabel>
                      <FormControl>
                        <Input placeholder='Aging' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='region'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input placeholder='Region' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tasting_notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tasting Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder='Tasting Notes'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='alcohol_content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol Content</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Alcohol Content'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <Button disabled={isLoading} type='submit' variant='default'>
                {isLoading ? 'Loading...' : 'Add Attribute'}
              </Button>
              <DialogTrigger asChild>
                <Button type='button' variant='ghost'>
                  Cancel
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductAttributeDialog
