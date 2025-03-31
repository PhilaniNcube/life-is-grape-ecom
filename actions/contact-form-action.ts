'use server'

import 'server-only'

import { Resend } from 'resend'
import ContactFormTemplate from '@/components/email/contact-form'
import { z } from 'zod'

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

const resend = new Resend(process.env.RESEND_API_KEY)

export async function contactFormAction(
  prevState: unknown,
  formData: FormData
) {
  const formValues = Object.fromEntries(formData.entries())

  const values = FormSchema.safeParse({
    name: formValues.name,
    email: formValues.email,
    subject: formValues.subject,
    tel: formValues.tel,
    message: formValues.message,
  })

  if (!values.success) {
    return {
      success: false,
      message: 'Please enter all required fields',
      errors: values.error.flatten(),
      values: values.data,
    }
  }

  const { name, email, subject, tel, message } = values.data

  const { data, error } = await resend.emails.send({
    from: 'Life Is Grape <shop@lifeisgrape.co.za>',
    to: ['wine@lifeisgrape.co.za', 'ncbphi001@gmail.com', 'info@yellowlizard.com'],
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nPhone: ${tel}\nMessage: ${message}`,
    react: ContactFormTemplate({
      name: name,
      email: email,
      subject: subject,
      tel: tel,
      message: message,
    }),
  })

  console.log(data, error)

  return {
    success: true,
    message: 'Your message has been sent',
    values: values.data,
  }
}
