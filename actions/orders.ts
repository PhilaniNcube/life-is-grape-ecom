'use server'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { PaystackVerificationResponse } from '@/lib/types'
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

  const payment_amount = parseInt(amount) * 100

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
        amount: payment_amount,
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
    payment_reference: data.data.reference,
  })

  if (data.status === true) {
    redirect(data.data.authorization_url)
  }
}

export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerificationResponse> {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      }
    )

    const data: PaystackVerificationResponse = await response.json()

    console.log('Paystack verification response:', data)

    return data
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error)
    return {
      status: false,
      message: 'Failed to verify transaction',
    }
  }
}

export async function verifyOrderPayment(orderId: Id<'orders'>) {
  try {
    // Use the orderId as the reference since that's what we send to Paystack
    const verificationResult = await verifyPaystackTransaction(orderId)

    if (!verificationResult.status) {
      return {
        success: false,
        message: verificationResult.message,
        data: null,
      }
    }

    // Check if the transaction was successful
    if (verificationResult.data?.status === 'success') {
      // Update the order status to paid
      await fetchMutation(api.orders.updateOrderPaidStatus, {
        payment_reference: orderId,
        status: 'paid',
      })

      return {
        success: true,
        message: 'Payment verified successfully',
        data: verificationResult.data,
      }
    } else {
      return {
        success: false,
        message: `Transaction status: ${verificationResult.data?.status || 'unknown'}`,
        data: verificationResult.data,
      }
    }
  } catch (error) {
    console.error('Error verifying order payment:', error)
    return {
      success: false,
      message: 'Failed to verify order payment',
      data: null,
    }
  }
}
