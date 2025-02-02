'use server'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import 'server-only'

const createVoucherSchema = z.object({
  voucherCode: z.string().min(1),
  buyerEmail: z.string().email(),
  recipientEmail: z.string().email(),
  voucherValue: z.number().min(100),
})

export async function createGiftVoucher(
  prevState: unknown,
  data: z.infer<typeof createVoucherSchema>
) {
  const validatedData = createVoucherSchema.safeParse(data)

  if (!validatedData.success) {
    return { success: false, errors: validatedData.error.errors }
  }

  const { voucherCode, buyerEmail, recipientEmail, voucherValue } =
    validatedData.data

  const voucherId = await fetchMutation(api.gift_vouchers.createGiftVoucher, {
    code: voucherCode,
    recipient_email: recipientEmail,
    purchaser_email: buyerEmail,
    value: voucherValue,
  })


  redirect(`/gift-voucher/${voucherId}`)

  return { success: true, voucher_id: voucherId }
}


export async function giftVoucherPayment(voucherId:Id<'gift_vouchers'>) {

  const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, { id: voucherId })

  if (!voucher) {
    throw new Error('Gift voucher not found')
  }

  if (voucher.paid) {
    throw new Error('Gift voucher has already been paid for')
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
        amount: voucher.value * 100,
        email: voucher.purchaser_email,
        reference: voucher._id,
        currency: 'ZAR',
        callback_url: `https://life-is-grape-ecom.vercel.app/vouchers/${voucher._id}`,
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

  if (!data.status) {
    throw new Error(data.message)
  }

   redirect(data.data.authorization_url)

}


export async function updatePaymentStatus(id:Id<"gift_vouchers">) {

    const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, {
      id: id,
    })

    if (!voucher) {
      return
    }

    if (voucher.paid) {
     return
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    }


    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${voucher._id}`,
      options
    )



    const data: {
      status: boolean
      message: string
      data: {
        status: string
        domain: string
        id: number
        reference: string
        amount: number
        paid_at: string
        channel: string
      }
    } = await response.json()

    if (data.status) {
      await fetchMutation(api.gift_vouchers.updateGiftVoucherPaymentReference, {
        id: voucher._id,
        payment_reference: data.data.id.toString(),
      })

      return data.data.id
    }



}
