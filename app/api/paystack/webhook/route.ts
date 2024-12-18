import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PaystackEvent } from '@/lib/types'
import { fetchMutation } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET
  const hash = req.headers.get('x-paystack-signature')

  const event: PaystackEvent = await req.json()

  console.log("Event: ", event.event)
  console.log("Data: ", event.data)

  // Example: Verify the hash using HMAC (adjust as needed)
  const computedHash = crypto
    .createHmac('sha512', secret!)
    .update(JSON.stringify(event))
    .digest('hex')

    const checkHash = hash === computedHash

    console.log("Is hash the same", checkHash)

    if(!checkHash) {
      console.error('Invalid webhook signature')
       return NextResponse.json(
        { status: 203 },
        {
          headers: {
            'Content-Type': 'application/json',
          },

        }
      )
    }

     if (event.event === 'charge.success') {
       await fetchMutation(api.orders.updateOrderPaidStatus, {
         payment_reference: event.data.reference as Id<'orders'>,
         status: 'paid',
       })
     }

      return NextResponse.json(
        { status: 200 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
        }
      )

}
