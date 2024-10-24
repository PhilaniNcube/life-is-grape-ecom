import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getCurrentUser } from './users'

export const getWineries = query({
  args: {},
  handler: async ctx => {
    const wineries = await ctx.db.query('wineries').collect()

    const promiseData = await Promise.all(wineries.map(async (winery) => {
      return {
        ...winery,
        image: (await ctx.storage.getUrl(winery.image)) || ''
      };
    }))

    return promiseData
  },
})

export const getWinery = query({
  args: { winery_id: v.id('wineries') },
  handler: async (ctx, { winery_id }) => {
    return await ctx.db
      .query('wineries')
      .filter(q => q.eq(q.field('_id'), winery_id))
      .first()
  },
})

export const createWinery = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    description: v.string(),
    image: v.id('_storage'),
  },
  handler: async (ctx, { name, location, description, image }) => {

    return await ctx.db.insert('wineries', {
      name,
      location,
      description,
      image,
    })
  },
})

export const generateUploadUrl = mutation(async ctx => {
  const storageItem = await ctx.storage.generateUploadUrl()

  return storageItem
})
