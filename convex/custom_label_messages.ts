import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import slugify from 'slugify'


export const createCustomLabelMessage = mutation({
  args: {
    order_id: v.id('orders'),
    message: v.string(),
    image: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.order_id)
    if (!order) {
      throw new Error('Order not found')
    }

    const customLabelMessage = await ctx.db.insert('custom_label_messages', {
      order_id: args.order_id,
      message: args.message,
      image: args.image,
    })

    return customLabelMessage
  },
})
