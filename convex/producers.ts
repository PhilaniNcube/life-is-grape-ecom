import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

// Get all producers
export const getProducers = query({
  args: {},
  handler: async ctx => {
    const producers = await  ctx.db.query('producers').collect()

    // order the producers by name which is a string
    return producers.sort((a, b) => a.name.localeCompare(b.name))

  },
})

// Get producer by ID
export const getProducerById = query({
  args: { id: v.id('producers') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Get producers by type
export const getProducersByType = query({
  args: {
    type: v.union(
      v.literal('winery'),
      v.literal('distillery'),
      v.literal('brand')
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('producers')
      .filter(q => q.eq(q.field('type'), args.type))
      .collect()
  },
})

// Add new producer
export const addProducer = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal('winery'),
      v.literal('distillery'),
      v.literal('brand')
    ),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    logo: v.optional(v.id('_storage')),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('producers', args)
  },
})

// Update producer
export const updateProducer = mutation({
  args: {
    id: v.id('producers'),
    name: v.optional(v.string()),
    type: v.optional(
      v.union(v.literal('winery'), v.literal('distillery'), v.literal('brand'))
    ),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    logo: v.optional(v.id('_storage')),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const producer = await ctx.db.get(id)

    if (!producer) throw new Error('Producer not found')

    await ctx.db.patch(id, updates)
    return id
  },
})

// Delete producer
export const deleteProducer = mutation({
  args: { id: v.id('producers') },
  handler: async (ctx, args) => {
    const producer = await ctx.db.get(args.id)

    if (!producer) throw new Error('Producer not found')

    // Check if producer has any products
    const products = await ctx.db
      .query('products')
      .withIndex('byProducer', q => q.eq('producer_id', args.id))
      .collect()

    if (products.length > 0) {
      throw new Error('Cannot delete producer with associated products')
    }

    await ctx.db.delete(args.id)
    return args.id
  },
})
