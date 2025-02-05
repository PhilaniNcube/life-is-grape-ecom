'use server'

import 'server-only'

import { Resend } from 'resend'
import ContactFormTemplate from '@/components/email/contact-form'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function contactFormAction(formData: FormData) {
  const formValues = Object.fromEntries(formData.entries())

  if (
    !formValues.name ||
    !formValues.email ||
    !formValues.subject ||
    !formValues.tel ||
    !formValues.message
  ) {
    return { error: 'Please fill out all fields' }
  }

  const { name, email, subject, tel, message } = formValues

  const { data, error } = await resend.emails.send({
    from: 'Life Is Grape <shop@lifeisgrape.co.za',
    to: 'Life Is Grape <shop@lifeisgrape.co.za>',
    cc: email as string,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nPhone: ${tel}\nMessage: ${message}`,
    react: ContactFormTemplate({
      name: name as string,
      email: email as string,
      subject: subject as string,
      tel: tel as string,
      message: message as string,
    }),
  })

  console.log(data, error)
}
