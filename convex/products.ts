import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getProducts = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('products').collect()
  },
})

export const getProductsByBrand = query({
  args: {
    brand_id: v.id('brands'),
  },
  handler: async (ctx, { brand_id }) => {
    return await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('brand'), brand_id))
      .collect()
  },
})

export const getProductById = query({
  args:{product_id: v.id('products')},
  handler: async (ctx, {product_id}) => {
    return await ctx.db.query('products').filter(q => q.eq(q.field('_id'), product_id)).first()
  }
})

export const getProduct = query({
  args: { product_id: v.id('products') },
  handler: async (ctx, { product_id }) => {
    const product = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('_id'), product_id))
      .first()

    const mainImageUrl = product?.main_image
      ? await ctx.storage.getUrl(product.main_image)
      : ''

    const images = product?.images
      ? await Promise.all(
          product.images.map(async image_id => {
            return await ctx.storage.getUrl(image_id)
          })
        )
      : []

    return {
      ...product,
      main_image: mainImageUrl,
      images,
    }
  },
})

export const getImageUrl = query({
  args: { image_id: v.id('_storage') },
  handler: async (ctx, { image_id }) => {
    return await ctx.storage.getUrl(image_id)
  },
})

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    type: v.union(
      v.literal('Brandy'),
      v.literal('Gin'),
      v.literal('Whiskey'),
      v.literal('Vodka'),
      v.literal('Rum'),
      v.literal('Tequila'),
    ),
    brand: v.id('brands'),
    tasting_notes: v.string(),
    price: v.number(),
    pairing_suggestions: v.string(),
    volume: v.number(),
    main_image: v.id('_storage'),
    images: v.optional(v.array(v.id('_storage'))),
    cocktail_name: v.string(),
    ingredients: v.string(),
    cocktail_description: v.string(),
    by: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const product = await ctx.db.insert('products', {
        name: args.name,
        description: args.description,
        type: args.type,
        brand: args.brand,
        tasting_notes: args.tasting_notes,
        price: args.price,
        pairing_suggestions: args.pairing_suggestions,
        volume: args.volume,
        main_image: args.main_image,
        suggested_cocktail: {
          name: args.cocktail_name,
          ingredients: args.ingredients,
          description: args.cocktail_description,
          by: args.by,
        },
      })

      console.log(product)

      return product
    } catch (error) {
      throw new Error('Failed to create product')
    }
  },
})


export const updateProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    type: v.union(
      v.literal('Brandy'),
      v.literal('Gin'),
      v.literal('Whiskey'),
      v.literal('Vodka'),
      v.literal('Rum'),
      v.literal('Tequila')
    ),
    brand: v.id('brands'),
    tasting_notes: v.string(),
    price: v.number(),
    pairing_suggestions: v.string(),
    volume: v.number(),
    main_image: v.id('_storage'),
    images: v.optional(v.array(v.id('_storage'))),
    cocktail_name: v.string(),
    ingredients: v.string(),
    cocktail_description: v.string(),
    by: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const product = await ctx.db.insert('products', {
        name: args.name,
        description: args.description,
        type: args.type,
        brand: args.brand,
        tasting_notes: args.tasting_notes,
        price: args.price,
        pairing_suggestions: args.pairing_suggestions,
        volume: args.volume,
        main_image: args.main_image,
        suggested_cocktail: {
          name: args.cocktail_name,
          ingredients: args.ingredients,
          description: args.cocktail_description,
          by: args.by,
        },
      })

      console.log(product)

      return product
    } catch (error) {
      throw new Error('Failed to update product')
    }
  },
})

export const generateUploadUrl = mutation(async ctx => {
  const storageItem = await ctx.storage.generateUploadUrl()

  return storageItem
})
