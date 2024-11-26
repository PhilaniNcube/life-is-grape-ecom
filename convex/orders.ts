import { auth } from '@clerk/nextjs/server'
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { redirect } from 'next/navigation'

// create a new order
export const createOrder = mutation({
  args: {

    total: v.number(),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('completed'),
      v.literal('cancelled')
    ),
    street: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    province: v.string(),
    postal_code: v.string(),
    subtotal: v.number(),
    shipping: v.number(),
    order_items: v.array(
      v.object({
        product: v.object({
          id: v.id('products'),
          name: v.string(),
        }),
        quantity: v.number(),
        price_at_time: v.number(),
        variant: v.object({
          id: v.id('product_variants'),
          volume: v.number(),
          price: v.number(),
        }),
        gift_box: v.optional(
          v.object({
            name: v.string(),
            price: v.number(),
            description: v.string(),
            dimensions: v.string(),
          })
        ),
      })
    )
  },
  handler: async (ctx, args) => {

    console.log("Creating order", args)

    // create a new order
    const order = await ctx.db.insert("orders", {
      status: "pending",
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      phone: args.phone,
      shipping_address: {
        street: args.street,
        city: args.city,
        province: args.province,
        postal_code: args.postal_code,
      },
      subtotal: args.subtotal,
      shipping: args.shipping,
      total: args.total,
    })





    // create the order items
    for (const item of args.order_items) {
      await ctx.db.insert("order_items", {
        order_id: order,
        product: item.product,
        quantity: item.quantity,
        price_at_time: item.price_at_time,
        variant: item.variant,
        gift_box: item.gift_box,
      })
    }

    redirect(`/checkout/payment?order_id=${order}`)
    return order

  },
})



// get order by order_id
export const getOrder = query({
  args: {
    order_id: v.id('orders'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.order_id)
  },
})
