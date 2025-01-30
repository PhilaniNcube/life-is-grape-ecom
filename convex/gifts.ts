import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import { Id } from './_generated/dataModel'

// Query to get all gifts
export const getGifts = query({
  args: {},
  handler: async ctx => {
    const gifts = await ctx.db.query('gifts').collect()
    return gifts
  },
})

// Query to get a single gift by ID
export const getGift = query({
  args: { gift_id: v.id('gifts') },
  handler: async (ctx, { gift_id }) => {
    const gift = await ctx.db.get(gift_id)
    return gift
  },
})

// Query to get gifts by type
export const getGiftsByType = query({
  args: {
    type: v.union(v.literal('box'), v.literal('label'), v.literal('bag')),
  },
  handler: async (ctx, { type }) => {
    const gifts = await ctx.db
      .query('gifts')
      .filter(q => q.eq(q.field('type'), type))
      .collect()
    return gifts
  },
})

// Mutation to create a new gift
export const createGift = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    type: v.union(v.literal('box'), v.literal('label'), v.literal('bag'), v.literal('voucher')),
    customization_options: v.object({
      allows_message: v.boolean(),
      message_max_length: v.optional(v.number()),
      allows_design_choice: v.boolean(),
      // available_designs: v.optional(v.array(v.string())),
    }),
    compatible_wine_types: v.array(
      v.union(v.literal('red'), v.literal('white'))
    ),
    main_image: v.id('_storage'),
    // images: v.optional(v.array(v.id('_storage'))),
    in_stock: v.boolean(),
    dimensions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const giftId = await ctx.db.insert('gifts', args)
    return giftId
  },
})

// Mutation to create a gift customization
export const createGiftCustomization = mutation({
  args: {
    gift_id: v.id('gifts'),
    customer_message: v.optional(v.string()),
    selected_design: v.optional(v.string()),
    selected_wine_type: v.union(
      v.literal('red'),
      v.literal('white'),
      v.literal('none')
    ),
    selected_wine_id: v.optional(v.id('products')),
    order_id: v.string(),
  },
  handler: async (ctx, args) => {
    const customizationId = await ctx.db.insert('gift_customizations', {
      ...args,
      created_at: Date.now(),
    })
    return customizationId
  },
})

// Mutation to update gift details
export const updateGift = mutation({
  args: {
    gift_id: v.id('gifts'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    in_stock: v.optional(v.boolean()),
    main_image: v.optional(v.id('_storage')),
    images: v.optional(v.array(v.id('_storage'))),
  },
  handler: async (ctx, args) => {
    const { gift_id, ...updates } = args
    await ctx.db.patch(gift_id, updates)
    return gift_id
  },
})

// fetch the main image url
export const fetchGiftImage = query({
  args: { image: v.id('_storage') },
  handler: async (ctx, args) => {
    const image = await ctx.storage.getUrl(args.image)
    if (!image || image === null) {
      throw new Error('Image not found')
    }
    return image
  },
})

export const generateGiftUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl()
})


export const deleteGift = mutation({
  args: { gift_id: v.id('gifts') },
  handler: async (ctx, { gift_id }) => {
    await ctx.db.delete(gift_id)
  },
})
