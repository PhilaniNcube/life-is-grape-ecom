import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const getProducts = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('products').collect()
  },
})

export const getProductsByType = query({
  args: {
    type: v.union(
      v.literal('Brandy'),
      v.literal('Gin'),
      v.literal('Whiskey'),
      v.literal('Vodka'),
      v.literal('Rum'),
      v.literal('Tequila'),
    ),
  },
  handler: async (ctx, { type }) => {
    return await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('type'), type))
      .collect()
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

export const getProductList = query({

  handler: async ctx => {
    const products = await ctx.db.query('products').collect()

    // get the main image url and brand for each product
    return await Promise.all(
      products.map(async product => {
        const mainImageUrl = product.main_image
          ? await ctx.storage.getUrl(product.main_image)
          : ''

        const brand = await ctx.db.query('brands').filter(q => q.eq(q.field('_id'), product.brand)).first()



        return {
          name: product.name,
          _id: product._id,
          description: product.description,
          type: product.type,
          price: product.price,
          volume: product.volume,
          brand: brand?.name || '',
          main_image: mainImageUrl,
        }
      })
    )

  },
})

export const getProductById = query({
  args:{product_id: v.id('products')},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.product_id)
  }
})

export const getProductDetails = query({
  args: { product_id: v.id('products') },
  handler: async (ctx, args) => {

    const product = await ctx.db.get(args.product_id)

    if(!product) {
      throw new Error('Product not found')
    }

    const mainImageUrl = await ctx.storage.getUrl(product.main_image) || ''
    const brand = await ctx.db.query('brands').filter(q => q.eq(q.field('_id'), product.brand)).first()

     const images = product.images
       ? await Promise.all(
           product.images.map(async item => {
             const imageUrl =  await ctx.storage.getUrl(item)
             if(!imageUrl || imageUrl === undefined) return
              return imageUrl
           })
         )
       : []

    return {
      name: product.name,
      _id: product._id,
      description: product.description,
      type: product.type,
      price: product.price,
      volume: product.volume,
      tasting_notes: product.tasting_notes,
      pairing_suggestions: product.pairing_suggestions,
      suggested_cocktail: product.suggested_cocktail,
      main_image: mainImageUrl,
      imagesUrls: images,
      brand: brand
    }
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
    productId: v.id('products'),
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
      const product = await ctx.db.patch(args.productId, {
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


export const getProductCount = query({
  handler: async ctx => {
    const data= await ctx.db.query('products').collect()

    if(!data) {
      return 0
    }

    return data.length
  }
})


