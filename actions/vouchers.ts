'use server'

import { api } from '@/convex/_generated/api'
import { fetchMutation } from 'convex/nextjs'
import { z } from 'zod'

const purchaseSchema = z.object({
  voucherCode: z.string().min(1),
  buyerEmail: z.string().email(),
  recipientEmail: z.string().email(),
  voucherValue: z.number().min(100),
})

export async function purchaseGiftVoucher(
  data: z.infer<typeof purchaseSchema>
) {
  const validatedData = purchaseSchema.safeParse(data)

  if (!validatedData.success) {
    return { success: false, errors: validatedData.error.errors }
  }

  const { voucherCode, buyerEmail, recipientEmail, voucherValue } =
    validatedData.data

  const voucher = await fetchMutation(api.gift_vouchers.createGiftVoucher, {
    code: voucherCode,
    recipient_email: recipientEmail,
    purchaser_email: buyerEmail,
    value: voucherValue,
  })

  // Simulate storing the voucher in a database
  console.log('Purchased voucher:', validatedData)

  // In a real application, you would:
  // 1. Store the voucher details in your database
  // 2. Send confirmation emails to the buyer and recipient
  // 3. Generate a unique voucher code if not provided
  // 4. Handle payment processing

  return { success: true, data: validatedData.data }
}
