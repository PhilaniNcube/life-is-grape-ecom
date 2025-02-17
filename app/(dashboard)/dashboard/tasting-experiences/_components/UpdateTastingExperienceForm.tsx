'use client'

import React, { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { Experience, UpdateExperienceSchema } from '@/lib/schemas'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { updateTastingExperienceAction } from '@/actions/tasting-experiences'
import { CircleDashed } from 'lucide-react'

interface UpdateTastingExperienceFormProps {
  experience: Doc<'tasting_experiences'>
}

const UpdateTastingExperienceForm = ({
  experience,
}: UpdateTastingExperienceFormProps) => {
  const form = useForm<Experience>({
    resolver: zodResolver(UpdateExperienceSchema),
    defaultValues: {
      id: experience?._id,
      name: experience?.name,
      description: experience?.description,
      price: experience?.price,
      duration: experience?.duration,
      servings: experience?.servings,
      // Add other fields as necessary
    },
    mode: 'onBlur',
  })

  const [state, formAction, isPending] = useActionState(
    updateTastingExperienceAction,
    null
  )

  return (
    <Form {...form}>
      <form action={formAction} className='max-w-2xl space-y-4 px-4'>
        <FormField
          control={form.control}
          name='id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='hidden'
                  placeholder='Name of the experience'
                  className='bg-white'
                  {...field}
                />
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
                <Input
                  placeholder='Name of the experience'
                  className='bg-white'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of the tasting experience.
              </FormDescription>
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
                  placeholder='Description of the experience'
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormDescription>
                Write a detailed description of the tasting experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name='servings'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servings</FormLabel>
              <FormControl>
                <Input
                  placeholder='Description of the experience'
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormDescription>
                How many people can be served in this experience.
              </FormDescription>
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
                <Input
                  type='number'
                  placeholder='Price of the experience'
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormDescription>
                Set the price for the tasting experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
       
        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder='Duration of the experience'
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormDescription>
                Specify the duration of the tasting experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type='submit' className='relative'>
          Update Tasting Experience
          {isPending && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <CircleDashed className='h-6 w-6 animate-spin' />
            </div>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default UpdateTastingExperienceForm
