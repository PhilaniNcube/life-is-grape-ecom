'use client'
import React, { startTransition, useActionState } from 'react'
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
import { Id } from '@/convex/_generated/dataModel'
import { CreateProductVariantSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { addVariantAction } from '@/actions/products'

// Infer the TypeScript type from the Zod schema
type FormSchema = z.infer<typeof CreateProductVariantSchema>

const AddProductVariant = ({ productId }: { productId: Id<'products'> }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const addVariant = useMutation(api.products.addProductVariant)
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(addVariantAction, null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateProductVariantSchema),
    defaultValues: {
      product_id: productId,
      price: 0,
      stock_level: 0,
      volume: 750,
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    try {
      const result = await addVariant({
        product_id: productId,
        volume: data.volume,
        price: data.price,
        sku: data.sku || productId,
        stock_level: data.stock_level,
      })
      // toast.success('Product variant added successfully')
      form.reset()
      // onVariantAdded()
      revalidatePath(`/dashboard/products/${productId}`)
      router.refresh()
      setIsLoading(false)
    } catch (error) {
      // toast.error('Failed to add product variant')
      console.error('Add Variant Error:', error)
      router.refresh()
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full bg-black text-white'>Add Variant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Variant</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new variant to this product.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action={(formData: FormData) => {
              startTransition(() => {
                formAction(formData)
              })
            }}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='volume'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume in ml</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='e.g., 750ml Bottle'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='product_id'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='hidden' defaultValue={productId} {...field} />
                  </FormControl>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Price</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='e.g., 10.00' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock_level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Stock On Hand</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='e.g., 10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sku'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., SKU12345' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={isPending} type='submit' variant='default'>
                {isPending ? 'Loading...' : 'Add Variant'}
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
export default AddProductVariant
