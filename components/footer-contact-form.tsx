'use client'

import { startTransition, useActionState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
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
import { Textarea } from './ui/textarea'
import { CircleDashed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { contactFormAction } from '@/actions/contact-form-action'
import { CustomButton } from './ui'

const FormSchema = z.object({
  name: z.string({
    message: 'Please enter your name',
  }),
  email: z
    .string({
      message: 'Please enter a valid email address',
    })
    .email(),
  subject: z.string({
    message: 'Please enter a subject',
  }),
  tel: z.string({
    message: 'Please enter a valid phone number',
  }),
  message: z.string(),
})

const FooterContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  })

  const [state, formAction, isPending] = useActionState(contactFormAction, null)

  return (
    <div>
      {' '}
      <Form {...form}>
        <form action={formAction}>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className='bg-white' placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>Full Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        type='email'
                        className='bg-white'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder='' className='bg-white' {...field} />
                    </FormControl>
                    <FormDescription>Your message subject</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='tel'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input className='bg-white' placeholder='' {...field} />
                    </FormControl>
                    <FormDescription>Your phone number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className='bg-white'
                        placeholder=''
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your message</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-2'>
              <CustomButton
                disabled={isPending}
                className='w-full p-2 text-white md:w-1/2'
              >
                {isPending ? (
                  <CircleDashed className='animate-spin' />
                ) : (
                  'Send Message'
                )}
              </CustomButton>
            </div>
            <div className='col-span-2'>
              {state?.message && (
                <div
                  className={cn(
                    state.success ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {state.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default FooterContactForm
