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
