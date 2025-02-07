import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PaystackEvent } from '@/lib/types'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET
  const hash = req.headers.get('x-paystack-signature')

  const event: PaystackEvent = await req.json()

  console.log('Event: ', event.event)
  console.log('Data: ', event.data)

  // Example: Verify the hash using HMAC (adjust as needed)
  const computedHash = crypto
    .createHmac('sha512', secret!)
    .update(JSON.stringify(event))
    .digest('hex')

  const checkHash = hash === computedHash

  console.log('Is hash the same', checkHash)

  if (!checkHash) {
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
    // check if the order exists
    const order = await fetchQuery(api.orders.getOrder, {
      order_id: event.data.reference as Id<'orders'>,
    })

    // if there is no order or the order is already paid, return
    if (!order || order.status === 'paid') {
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

    if (order) {
      await fetchMutation(api.orders.updateOrderPaidStatus, {
        payment_reference: event.data.reference as Id<'orders'>,
        status: 'paid',
      })

      // send email to shop@lifeisgrape.co.za that a new order has been placed
      await resend.emails.send({
        from: 'shop@lifeisgrape.co.za',
        to: 'shop@lifeisgrape.co.za',
        cc: 'wine@lifeisgrape.co.za',
        subject: 'New Order',
        html: `
        <div style="padding: 20px; background-color: #f9f9f9; font-family: Arial, sans-serif;">
        <p>A new order has been placed with order number ${order._id}. Please check the admin dashboard for more details.</p>
        <a href="https://lifeisgrape.co.za/dashboard/orders/${event.data.reference}">View Order</a>
        ,
        <div style="margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #ddd;">
        <p>Customer: ${order.first_name} ${order.last_name}</p>
        <p>Email: ${order.email}</p>
        <p>Phone: ${order.phone}</p>
        <p>Address: ${order.shipping_address.street}</p>
        <p>City: ${order.shipping_address.city}</p>
        <p>Province: ${order.shipping_address.province}</p>
        <p>Postal Code: ${order.shipping_address.postal_code}</p>
        <p> Total: ${order.total}</p>
        </div>
        </div>`,
      })

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
