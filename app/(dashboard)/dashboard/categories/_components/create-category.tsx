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
import { Doc } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { CreateCategorySchema } from '@/lib/schemas'
import { startTransition, useActionState } from 'react'
import { createCategoryAction } from '@/actions/categories'

type FormSchema = z.infer<typeof CreateCategorySchema>

const CreateCategory = ({
  categories,
}: {
  categories: Doc<'categories'>[]
}) => {
  const [state, fromAction, isPending] = useActionState(
    createCategoryAction,
    null
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateCategorySchema),
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className='mr-2' />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            action={formData => {
              startTransition(async () => {
                const response = await fromAction(formData)
                console.log(response)
              })
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
                      {categories.map(category => (
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
              {isPending ? <CircleDashed className='animate-spin' /> : 'Create Category'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateCategory
