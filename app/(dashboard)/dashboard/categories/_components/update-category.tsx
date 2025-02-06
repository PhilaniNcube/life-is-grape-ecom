'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CircleDashed, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { CreateCategorySchema, UpdateCategorySchema } from '@/lib/schemas'
import { startTransition, useActionState } from 'react'
import {
  createCategoryAction,
  updateCategoryAction,
} from '@/actions/categories'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Card } from '@/components/ui/card'

type FormSchema = z.infer<typeof UpdateCategorySchema>

const UpdateCategory = ({ category }: { category: Doc<'categories'> }) => {
  const categories = useQuery(api.categories.getCategories)

  const [state, fromAction, isPending] = useActionState(
    updateCategoryAction,
    null
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: category._id,
      name: category.name,
      type: category.type,
      parent_id: category.parent_id,
    },
  })

  return (
    <Card className='p-4'>
      <Form {...form}>
        <form
          action={formData => {
            startTransition(async () => {
              await fromAction(formData)
            })
          }}
          className='space-y-4'
        >

          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>

                <FormControl>
                  <Input type="hidden" {...field} />
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
                  <Input placeholder='Category name' {...field} />
                </FormControl>
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
            name='parent_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <Select
                  name='parent_id'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Parent Category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type='submit'
            className='w-full rounded-none'
          >
            {isPending ? (
              <CircleDashed className='animate-spin' />
            ) : (
              'Update Category'
            )}
          </Button>
        </form>
      </Form>
      {state?.error && <p>{state?.error}</p>}
    </Card>
  )
}
export default UpdateCategory
