import { Doc } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getOrderItems = query({

  handler: async (ctx) => {
    const orderItems = await ctx.db.query("order_items").collect()
    return orderItems
  }
})

export const getOrderItemsByOrderId = query({
  args: {
    orderId: v.id("orders")
  },
  handler: async (ctx, { orderId }) => {
    const orderItems = await ctx.db.query("order_items").filter((q) => q.eq(q.field("order_id"), orderId) ).collect()
    return orderItems
  }
})

// write a function to get all the order items from paid orders
export const getOrderItemsFromPaidOrders = query({
  handler: async (ctx) => {
    const paidOrders = await ctx.db.query("orders").filter(q => q.eq(q.field("status"), "paid")).collect()
    const paidOrderIds = paidOrders.map(order => order._id)

    let orderItems: Doc<"order_items">[] = []

    // map over the paid order ids and get the order items for each order id and add them to the orderItems array
    for (const orderId of paidOrderIds) {
      const items = await ctx.db.query("order_items").filter(q => q.eq(q.field("order_id"), orderId)).collect()
      orderItems = [...orderItems, ...items]
    }

    return orderItems

  }
})
