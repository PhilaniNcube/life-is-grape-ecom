import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

// get the button ui properties
export const getButton = query({
  handler: async ctx => {
    const button = await ctx.db.query('buttons').first()
    return button
  },
})

export const updateButton = mutation({
  args: {
    id: v.id('buttons'),
    bg: v.string(),
    color: v.string(),
    radius: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      bg: args.bg,
      color: args.color,
      radius: args.radius,
    })
  },
})
