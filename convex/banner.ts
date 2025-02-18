import { Doc, Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getBanner = query({
  args: {},
  handler: async (ctx, args) => {
    // get the first banner
    const banner = await ctx.db.query('banner').first()

    if (!banner) return null

    // get the image url from the image property of the banner object
    const imageUrl = await ctx.storage.getUrl(banner.image)

    return {
      ...banner,
      image: imageUrl,
    }
  },
})

export const getDefaultBanner = query({
    args: {},
    handler: async (ctx, args) => {
        // get the first banner
        const banner = await ctx.db.query('banner').first()
    
        return banner
    },
})


export const updateBanner = mutation({
    args: {
        id: v.id('banner'),
        title: v.string(),
        subtitle: v.string(),
        image: v.id('_storage'),
        link: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, title, subtitle, image, link } = args
        await ctx.db.patch(id, { title, subtitle, image, link })
    },
})

export const createBanner = mutation({
    args: {
        title: v.string(),
        subtitle: v.string(),
        image: v.id('_storage'),
        link: v.string(),
    },
    handler: async (ctx, args) => {
        const { title, subtitle, image, link } = args
        await ctx.db.insert('banner', { title, subtitle, image, link })
    },
})

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx, args) => {
        const url = await ctx.storage.generateUploadUrl()
        return url
    },
})

export const getBannerImage = query({
    args: {
        id: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const { id } = args
        return ctx.storage.getUrl(id)
    },
})

export const updateBannerImage = mutation({
    args: {
        id: v.id('banner'),
        imageId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const { id, imageId } = args
        await ctx.db.patch(id, { image: imageId })
    },
})