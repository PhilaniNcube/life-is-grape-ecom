"use server"


import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { v } from 'convex/values'
import { revalidatePath } from 'next/cache'


export async function getGiftVoucher(code: string) {

  if (!code) {
    return null
  }

  const giftVoucher = await fetchQuery(api.gift_vouchers.getGiftVoucherByCode, {
    code,
  })

  return giftVoucher
}


export async function applyGiftVoucherAction(order_id: Id<'orders'>, code: string) {
  const giftVoucher = await getGiftVoucher(code)

  if (!giftVoucher) {
    return { error: 'Invalid gift voucher code' }
  }

  if (giftVoucher.redeemed) {
    return { error: 'Gift voucher has already been redeemed' }
  }

  if (!giftVoucher.paid) {
    return { error: 'Gift voucher has not been paid for.' }
  }

  await fetchMutation(api.gift_vouchers.applyGiftVoucher, {
    code,
    order_id,
  })

  revalidatePath(`/checkout/payment/${order_id}`)

  return { value: giftVoucher.value }
}
