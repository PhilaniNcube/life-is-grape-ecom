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


const FormSchema = z.object({
  name: z.string({
    message: 'Please enter your name',
  }),
  email: z.string({
    message: 'Please enter a valid email address',
  }).email(),
  subject: z.string({
    message: 'Please enter a subject',
  }),
  tel: z.string({
    message: 'Please enter a valid phone number',
  }),
  message: z.string(),
})

const FooterContactForm = () => {

  const sendMessageMutation = useMutation(api.contact_form_submissions.createContactFormSubmission)


  async function sendMessage(prevState: unknown, formData: FormData) {

    const formValues = Object.fromEntries(formData.entries())

    // get the values from the formData
    const values = FormSchema.safeParse({
      name: formValues.name,
      email: formValues.email,
      subject: formValues.subject,
      tel: formValues.tel,
      message: formValues.message,
    })

    if(!values.success) {
      return {
        success: false,
        message: 'Please enter all required fields',
        errors: values.error.flatten(),
        values: values.data,
      }
    }


    // send the message
    await sendMessageMutation({
      name: values.data.name,
      email: values.data.email,
      subject: values.data.subject,
      tel: values.data.tel,
      message: values.data.message,
    })

    const formEntries = new FormData()
    formData.append('name', values.data.name)
    formData.append('email', values.data.email)
    formData.append('subject', values.data.subject)
    formData.append('tel', values.data.tel)
    formData.append('message', values.data.message)

    contactFormAction(formEntries)

    // startTransition(() => {
    // })


    return {
      success: true,
      message: 'Message sent successfully',
      values: values.data,
    }

  }

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: 'onBlur',
    })

  const [state, formAction, isPending] = useActionState(sendMessage, null)

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
              <Button
                disabled={isPending}
                className='w-full rounded-md bg-primary p-2 text-white md:w-1/2'
              >
                {isPending ? (
                  <CircleDashed className='animate-spin' />
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
            <div className="col-span-2">
              {state?.message && (
                <div
                  className={cn(state.success ? 'text-green-500' : 'text-red-500')}
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
