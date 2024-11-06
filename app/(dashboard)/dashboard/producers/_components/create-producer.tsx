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
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CircleDashed, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { startTransition, useActionState } from 'react'
import { createProducerAction } from '@/actions/producers'

const producerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['winery', 'distillery', 'brand']),
  location: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
})

type FormData = z.infer<typeof producerFormSchema>

export default function CreateProducer() {
  const [state, formAction, isPending] = useActionState(
    createProducerAction,
    null
  )

  const form = useForm<FormData>({
    resolver: zodResolver(producerFormSchema),
    defaultValues: {
      name: '',
      type: 'winery',
      location: '',
      description: '',
      website: '',
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Producer
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Producer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            action={formData => {
              startTransition(async () => {
                await formAction(formData)
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
                    <Input placeholder='Producer name' {...field} />
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
                      <SelectItem value='winery'>Winery</SelectItem>
                      <SelectItem value='distillery'>Distillery</SelectItem>
                      <SelectItem value='brand'>Brand</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='Location' {...field} />
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
                    <Textarea placeholder='Description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input type='url' placeholder='Website URL' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full rounded-none'
              disabled={isPending}
            >
              {isPending ? (
                <CircleDashed className='animate-spin' />
              ) : (
                'Create Producer'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
