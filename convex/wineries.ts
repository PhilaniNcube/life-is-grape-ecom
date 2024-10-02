import { v } from 'convex/values'
import { mutation, query } from './_generated/server'


export const getWineries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('wineries').collect();
  }
})

export const getWinery = query({
  args: {winery_id: v.id('wineries')},
  handler: async (ctx, {winery_id}) => {
    return await ctx.db.query('wineries').filter((q) => q.eq(q.field("_id"), winery_id)).first();
  }
})

export const createWinery = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    description: v.string(),
    image: v.id('_storage'),
  },
  handler: async (ctx, {name, location, description, image}) => {
    return await ctx.db.insert('wineries', {name, location, description, image});
  }
})
