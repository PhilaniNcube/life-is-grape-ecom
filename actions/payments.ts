'use server'
import { Id } from '@/convex/_generated/dataModel'
import 'server-only'

export async function initiatePayment(
  order_id: Id<'orders'>,
  amount: number,
  email: string
) {
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
        amount: amount * 100,
        email,
        reference: order_id,
        currency: 'ZAR',
      }),
    }
  )

  const data = await response.json()
  console.log(data)

}
