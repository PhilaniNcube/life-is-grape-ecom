import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getCurrentUser } from './users'

export const getBrands = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('brands').collect()
  },
})

export const getBrand = query({
  args: { brand_id: v.id('brands') },
  handler: async (ctx, { brand_id }) => {
    return await ctx.db
      .query('brands')
      .filter(q => q.eq(q.field('_id'), brand_id))
      .first()
  },
})

export const createBrand = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    return await ctx.db.insert('brands', { name })
  },
})
