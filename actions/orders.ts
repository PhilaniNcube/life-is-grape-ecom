'use server'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchMutation } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { form } from 'sanity/structure'
import 'server-only'

export async function updateOrderStatus(
  prevState: unknown,
  formData: FormData
) {
  const order_id = formData.get('order_id') as Id<'orders'>
  const email = formData.get('email') as string
  const amount = formData.get('amount') as string

  // validate the formData
  if (!order_id || !email || !amount) {
    throw new Error('Invalid form data')
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
    },
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/initialize`,
    {
      ...options,
      body: JSON.stringify({
        amount: Number(amount) * 100,
        email,
        reference: order_id,
        currency: 'ZAR',
      }),
    }
  )

  const data: {
    status: boolean
    message: string
    data: {
      authorization_url: string
      access_code: string
      reference: string
    }
  } = await response.json()
  console.log(data)

  await fetchMutation(api.orders.updateOrderPaymentReference, {
    order_id,
    payment_reference: data.data.reference
  })

  if(data.status === true) {
    redirect(data.data.authorization_url)
  }


}
