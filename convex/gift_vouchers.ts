import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { ArrowRightSquare } from 'lucide-react'

// create a new gift voucher
export const createGiftVoucher = mutation({
  args: {
    purchaser_email: v.string(),
    recipient_email: v.string(),
    value: v.number(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    //  first check if the code already exists using the convex syntax
    const existingGiftVoucher = await ctx.db
      .query('gift_vouchers')
      .filter(q => q.eq(q.field('code'), args.code))
      .first()

    // if the code already exists, throw an error
    if (existingGiftVoucher) {
      throw new Error('Gift voucher code already exists')
    }

    // if the code does not exist, create the gift voucher
    const giftVoucherId = await ctx.db.insert('gift_vouchers', {
      paid: false,
      redeemed: false,
      recipient_email: args.recipient_email,
      purchaser_email: args.purchaser_email,
      value: args.value,
      code: args.code,
      payment_reference: '',
    })

    return giftVoucherId
  },
})

// update gift voucher payment reference and status
export const updateGiftVoucherPaymentReference = mutation({
  args: {
    id: v.id('gift_vouchers'),
    payment_reference: v.string(),
  },
  handler: async (ctx, args) => {
    // update the gift voucher
    await ctx.db.patch(args.id, {
      paid: true,
      payment_reference: args.payment_reference,
    })
  },
})


// redeem a gift voucher
export const redeemGiftVoucher = mutation({
  args: {
    code: v.string(),
    order_id: v.id('orders'),
    redeemed_by: v.string(),
  },
  handler: async (ctx, args) => {
    // check if the gift voucher code exists
    const giftVoucher = await ctx.db
      .query('gift_vouchers')
      .filter(q => q.eq(q.field('code'), args.code))
      .first()

    if (!giftVoucher) {
      throw new Error('Gift voucher code does not exist')
    }

    // check if the gift voucher has already been redeemed
    if (giftVoucher.redeemed) {
      throw new Error('Gift voucher has already been redeemed')
    }

    // check if the gift voucher has been paid for
    if (!giftVoucher.paid) {
      throw new Error('Gift voucher has not been paid for')
    }

    // check if the receipient email matches the redeemed by email
    if (giftVoucher.recipient_email !== args.redeemed_by) {
      throw new Error('Gift voucher recipient email does not match redeemed by email')
    }

    // update the gift voucher
    await ctx.db.patch(giftVoucher._id, {
      redeemed: true,
      redeemed_at: Date.now(),
      redeemed_order_id: args.order_id,
      redeemed_by: args.redeemed_by,
    })

    return giftVoucher
  },
})


// get all gift vouchers
export const getGiftVouchers = query({

  handler: async (ctx, { redeemed }) => {
    const giftVouchers = await ctx.db.query('gift_vouchers').collect()

    return giftVouchers
  },
})


// get a single gift voucher
export const getGiftVoucher = query({
  args: {
    id: v.id('gift_vouchers'),
  },
  handler: async (ctx, { id }) => {
    const giftVoucher = await ctx.db.get(id)

    return giftVoucher
  },
})

// delete a gift voucher
export const deleteGiftVoucher = mutation({
  args: {
    id: v.id('gift_vouchers'),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})


// get giftVoucher by code
export const getGiftVoucherByCode = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, { code }) => {
    const giftVoucher = await ctx.db
      .query('gift_vouchers')
      .filter(q => q.eq(q.field('code'), code))
      .first()

    return giftVoucher
  },
})


// apply the gift voucher to the order
export const applyGiftVoucher = mutation({
  args: {
    code: v.string(),
    order_id: v.id('orders'),
  },
  handler: async (ctx, args) => {
    // check if the gift voucher code exists
    const giftVoucher = await ctx.db
      .query('gift_vouchers')
      .filter(q => q.eq(q.field('code'), args.code))
      .first()

    if (!giftVoucher) {
      throw new Error('Gift voucher code does not exist')
    }

    // check if the gift voucher has already been redeemed
    if (giftVoucher.redeemed) {
      throw new Error('Gift voucher has already been redeemed')
    }

    // check if the gift voucher has been paid for
    if (!giftVoucher.paid) {
      throw new Error('Gift voucher has not been paid for')
    }

    //  update the order value with the gift voucher value
    const order = await ctx.db.get(args.order_id)

    //  check if the order exists
    if (!order) {
      throw new Error('Order does not exist')
    }

    //  check if the order has already been paid for
    if (order.status === 'paid') {
      throw new Error('Order has already been paid for')
    }

    // check if the voucher value is greater than the order total
    if (giftVoucher.value > order.subtotal) {
      throw new Error('Gift voucher value is greater than order total')
    }

    // patch the order with the gift voucher value
    await ctx.db.patch(args.order_id, {
      voucher_value: giftVoucher.value,
      voucher_id: giftVoucher._id,
    })

    return giftVoucher
  },
})
