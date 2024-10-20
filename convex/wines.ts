import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getCurrentUser } from './users'

export const getWines = query({

  handler: async (ctx) => {
    //  filter the wines by the optional search types array
    let wines = await ctx.db.query('wines').collect()



    return await Promise.all(
      wines.map(async wine => {
        return {
          ...wine,
          brand: await ctx.db
            .query('brands')
            .filter(q => q.eq(q.field('_id'), wine.brand))
            .first(),
          winery: await ctx.db
            .query('wineries')
            .filter(q => q.eq(q.field('_id'), wine.winery_id))
            .first(),
          main_image: (await ctx.storage.getUrl(wine.main_image)) || '',
        }
      })
    )
  },
})

export const getWine = query({
  args: { wine_id: v.id('wines') },
  handler: async (ctx, { wine_id }) => {
    return await ctx.db
      .query('wines')
      .filter(q => q.eq(q.field('_id'), wine_id))
      .first()
  },
})

export const getWinesByVariety = query({
  args: { variety: v.string() },
  handler: async (ctx, { variety }) => {
    return await ctx.db
      .query('wines')
      .filter(q => q.eq(q.field('variety'), variety))
      .collect()
  },
})

export const getWinesByType = query({
  args: { type: v.string() },
  handler: async (ctx, { type }) => {
    return await ctx.db
      .query('wines')
      .filter(q => q.eq(q.field('type'), type))
      .collect()
  },
})

export const getWinesByBrand = query({
  args: { brand: v.id('brands') },
  handler: async (ctx, { brand }) => {
    return await ctx.db
      .query('wines')
      .filter(q => q.eq(q.field('brand'), brand))
      .collect()
  },
})

export const createWine = mutation({
  args: {
    brand: v.id('brands'),
    winery_id: v.id('wineries'),
    name: v.string(),
    description: v.string(),
    year: v.number(),
    price: v.number(),
    main_image: v.id('_storage'),
    images: v.array(v.id('_storage')),
    in_stock: v.boolean(),
    alcohol_content: v.number(),
    serving_suggestion: v.string(),
    variety: v.union(
      v.literal('red'),
      v.literal('white'),
      v.literal('rose'),
      v.literal('sparkling'),
      v.literal('dessert'),
      v.literal('fortified')
    ),
    type: v.union(
      v.literal('Sauvignon Blanc'),
      v.literal('Chardonnay'),
      v.literal('Merlot'),
      v.literal('Cabernet Sauvignon'),
      v.literal('Pinot Noir'),
      v.literal('Pinot Grigio'),
      v.literal('Pinotage'),
      v.literal('Syrah'),
      v.literal('Zinfandel'),
      v.literal('Riesling'),
      v.literal('Rose'),
      v.literal('Port'),
      v.literal('Sherry'),
      v.literal('Madeira'),
      v.literal('Marsala'),
      v.literal('Vermouth'),
      v.literal('Rose')
    ),
  },
  handler: async (
    ctx,
    {
      brand,
      winery_id,
      name,
      description,
      year,
      price,
      main_image,
      images,
      in_stock,
      alcohol_content,
      serving_suggestion,
      variety,
      type,
    }
  ) => {
    const data = await ctx.db.insert('wines', {
      brand,
      winery_id,
      name,
      description,
      year,
      price,
      main_image,
      images,
      in_stock,
      alcohol_content,
      serving_suggestion,
      variety,
      type,
    })

    if(!data) {
      throw new Error('Failed to create wine')
    }

    return data
  },
})

export const updateWine = mutation({
  args: {
    id: v.id('wines'),
    brand: v.id('brands'),
    winery_id: v.id('wineries'),
    name: v.string(),
    description: v.string(),
    year: v.number(),
    price: v.number(),
    main_image: v.id('_storage'),
    images: v.array(v.id('_storage')),
    in_stock: v.boolean(),
    alcohol_content: v.number(),
    serving_suggestion: v.string(),
    variety: v.union(
      v.literal('red'),
      v.literal('white'),
      v.literal('rose'),
      v.literal('sparkling'),
      v.literal('dessert'),
      v.literal('fortified')
    ),
    type: v.union(
      v.literal('Sauvignon Blanc'),
      v.literal('Chardonnay'),
      v.literal('Merlot'),
      v.literal('Cabernet Sauvignon'),
      v.literal('Pinot Noir'),
      v.literal('Pinot Grigio'),
      v.literal('Pinotage'),
      v.literal('Syrah'),
      v.literal('Zinfandel'),
      v.literal('Riesling'),
      v.literal('Rose'),
      v.literal('Port'),
      v.literal('Sherry'),
      v.literal('Madeira'),
      v.literal('Marsala'),
      v.literal('Vermouth'),
      v.literal('Rose')
    ),
  },
  handler: async (
    ctx,
    {
      id,
      brand,
      winery_id,
      name,
      description,
      year,
      price,
      main_image,
      images,
      in_stock,
      alcohol_content,
      serving_suggestion,
      variety,
      type,
    }
  ) => {
    const data = await ctx.db.patch(id, {

      brand,
      winery_id,
      name,
      description,
      year,
      price,
      main_image,
      images,
      in_stock,
      alcohol_content,
      serving_suggestion,
      variety,
      type,
    })



    return data
  },
})

export const generateUploadUrl = mutation(async ctx => {
  const storageItem = await ctx.storage.generateUploadUrl()

  return storageItem
})


export const getImageUrl = query({
  args: {image_id: v.id('_storage')},
  handler: async (ctx, {image_id}) => {
    return await ctx.storage.getUrl(image_id)
  }
})
