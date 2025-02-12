'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UpdateAttributesSchema } from '@/lib/schemas'

import { Doc, Id } from '@/convex/_generated/dataModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { updateProductAttributeAction } from '@/actions/products'

type FormData = z.infer<typeof UpdateAttributesSchema>

interface Props {
  attributes: Doc<'product_attributes'>
}

const UpdateAttribute = ({ attributes }: Props) => {
  const [state, formAction, isPending] = useActionState(
    updateProductAttributeAction,
    null
  )

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateAttributesSchema),
    defaultValues: {
      id: attributes?._id,
      variety: attributes?.variety || '',
      vintage: attributes?.vintage,
      alcohol_content: attributes?.alcohol_content,
      region: attributes?.region || '',
      tasting_notes: attributes?.tasting_notes || '',
      serving_suggestion: attributes?.serving_suggestion || '',
      pairing_suggestions: attributes?.pairing_suggestions || '',
      aging: attributes?.aging || '',
      distillation_method: attributes?.distillation_method || '',
      description: attributes?.description || '',
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>Update Attributes</Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Update Product Attributes</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='variety'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variety</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input type='number' {...field} />
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
                    <FormLabel>Alcohol Content (%)</FormLabel>
                    <FormControl>
                      <Input type='number' step='0.1' {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='tasting_notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasting Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='pairing_suggestions'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pairing Suggestions</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <Button type='submit' disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Save Changes
            </Button>
          </form>
          {state?.error && (
        <DialogFooter>
            <p className='text-red-600'>{state.error}</p>
        </DialogFooter>
      )}
      {state?.success && (
        <DialogFooter>
          <p className='text-green-600'>Attribute has been updated</p>
        </DialogFooter>
      )}
        </Form>
      </DialogContent>
     
    </Dialog>
  )
}

export default UpdateAttribute
