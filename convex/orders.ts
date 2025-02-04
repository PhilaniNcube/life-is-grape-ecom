
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { Quando } from 'next/font/google'

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
        gift_box: v.optional(
          v.object({
            name: v.string(),
            price: v.number(),
            description: v.string(),
            dimensions: v.string(),
            quantity: v.number(),
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
        gift_box: item.gift_box,
      })
    }

    // redirect(`/checkout/payment?order_id=${order}`)
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

// get all orders
export const getOrders = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect()
  },
})

// get paid orders
export const getPaidOrders = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").filter(q => q.eq(q.field("status"), "paid")).collect()
  },
})




// update order payment_reference
export const updateOrderPaymentReference = mutation({
  args: {
    order_id: v.id('orders'),
    payment_reference: v.string(),
  },
  handler: async (ctx, args) => {

    const id = args.order_id

    return await ctx.db.patch(id, {
      payment_reference: args.payment_reference,
    })
  },
})


// update order paid status and paid_at timestamp
export const updateOrderPaidStatus = mutation({
  args: {
    payment_reference: v.id('orders'),
    status: v.string(),
  },
  handler: async (ctx, args) => {

    const payment_reference = args.payment_reference
    const status = args.status

    const order = await ctx.db.get(payment_reference)
    if (!order) {
      throw new Error("Order not found")
    }

    if(order.status === "paid") {
      console.log("Order already paid")
      return
    }

     await ctx.db.patch(order._id, {
      status: status === "paid" ? "paid" : "pending",
      paid_at: Date.now(),
    })
  },
})


export const getPaginatedOrders = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('orders')
      .order('desc')
      .paginate(args.paginationOpts)
  },
})
