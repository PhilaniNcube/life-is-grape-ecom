'use server'

import 'server-only'

import { Resend } from 'resend'
import TastingBooking from '@/components/email/tasting-booking'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function experienceBookingAction(
  prevState: unknown,
  formData: FormData
) {
  const values = Object.fromEntries(formData.entries())

  if (!values.email || !values.name || !values.guests || !values.date) {
    return { error: 'Please fill out all fields' }
  }

  const { email, name, guests, date, extras, experience, price } = values

  const { data, error } = await resend.emails.send({
    from: 'Life Is Grape <shop@lifeisgrape.co.za>',
    to: 'Life Is Grape <shop@lifeisgrape.co.za>',
    cc: email as string,
    subject: 'New Tasting Booking Enquiry',
    react: TastingBooking({
      email: email as string,
      name: name as string,
      guests: guests as string,
      date: date as string,
      extras: extras as string,
      experience: experience as string,
      price: price as string,
    }),
  })

  if (error) {
    console.log(error)
    return { error: 'Something went wrong, please try again' }
  }

  return { data }
}
