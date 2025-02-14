import { api } from './_generated/api'
import { Doc, Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'


export const getShallowProduct = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// get shallow product by id and include the main image
export const getShallowProductWithMainImage = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) {
      throw new Error('Product not found')
    }

    const mainImage = await ctx.storage.getUrl(product.main_image)

    return {
      ...product,
      main_image: mainImage
        ? mainImage
        : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
    }
  },
})

// get shallow product by id and include the main image and product vaiants
export const getProductWithVairants = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) {
      throw new Error('Product not found')
    }

    const mainImage = await ctx.storage.getUrl(product.main_image)

    // fetch the product variants
    const variants = await ctx.db
      .query('product_variants')
      .filter(q => q.eq(q.field('product_id'), args.id))
      .collect()

    return {
      ...product,
      main_image: mainImage
        ? mainImage
        : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
      variants,
    }
  },
})

export const getProducts = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('products').collect()
  },
})

export const getShallowProducts = query({
  args: {},
  handler: async ctx => {
    const products = await ctx.db.query('products').collect()

    // order the products by the sort_order field
    const sortedProducts = products.sort(
      (a: Doc<'products'>, b: Doc<'products'>) => a.sort_order! - b.sort_order!
    )

    return Promise.all(
      sortedProducts.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)
        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
        }
      })
    )
  },
})

export const getShallowOneSaleProducts = query({
  args: {},
  handler: async ctx => {
    const products = await ctx.db.query('products').collect()

    // order the products by the sort_order field
    const sortedProducts = products.sort(
      (a: Doc<'products'>, b: Doc<'products'>) => a.sort_order! - b.sort_order!
    )

    return Promise.all(
      sortedProducts.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)
        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
        }
      })
    )
  },
})

// get products by producer id
export const getProductsByProducer = query({
  args: { producer_id: v.id('producers') },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('producer_id'), args.producer_id))
      .collect()

    return Promise.all(
      products.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)
        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
        }
      })
    )
  },
})

export const getUnlabelledProducts = query({
  args: {},
  handler: async (ctx, args) => {

    //  get the unlabelled category
    const unlabelledCategory = await ctx.db.query('producers').filter(q => q.eq(q.field('name'), 'Unlabelled')).first()

    const unlabbledWines = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('producer_id'), unlabelledCategory?._id))
      .filter(q => q.eq(q.field('product_type'), 'wine'))
      .collect()

    return Promise.all(
      unlabbledWines.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)

        // fetch the product variants
        const variants = await ctx.db
          .query('product_variants')
          .filter(q => q.eq(q.field('product_id'), product._id))
          .collect()

        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
          variants,
        }
      })
    )
  },
})

export const getShallowProductsByType = query({
  args: {
    type: v.union(v.literal('wine'), v.literal('spirit'), v.literal('gift')),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('product_type'), args.type))
      .collect()
  },
})

// get shallow products by type and includ the main image
export const getShallowProductsWithMainImage = query({
  args: {
    type: v.union(
      v.literal('wine'),
      v.literal('spirit'),
      v.literal('gift'),
      v.literal('custom_label')
    ),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('product_type'), args.type))
      .collect()

    // order the products by the first item in the categories array
    const sortedProducts = products.sort(
      (a: Doc<'products'>, b: Doc<'products'>) => a.sort_order! - b.sort_order!
    )

    return Promise.all(
      sortedProducts.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)

        // fetch the product variants
        const variants = await ctx.db
          .query('product_variants')
          .filter(q => q.eq(q.field('product_id'), product._id))
          .collect()

        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
          variants,
        }
      })
    )
  },
})

// get shallow products by type and includ the main image
export const getProductsOnSaleWithMainImage = query({
  args: {},
  handler: async (ctx, args) => {
    const products = await ctx.db.query('products').filter(q => q.eq(q.field('on_sale'), true)).collect()

    // order the products by the first item in the categories array
    const sortedProducts = products.sort(
      (a: Doc<'products'>, b: Doc<'products'>) => a.sort_order! - b.sort_order!
    )

  return await Promise.all(
      sortedProducts.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)

        // fetch the product variants
        const variants = await ctx.db
          .query('product_variants')
          .filter(q => q.eq(q.field('product_id'), product._id))
          .collect()



        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
          variants,
        }
      })
    )




  },
})


// get related products
export const getRelatedProducts = query({
  args: {
    product_id: v.id('products'),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
   
    const product = await ctx.db.get(args.product_id)

    if (!product) {
      throw new Error('Product not found')
    }

    // get the first category id
    const categoryId = product.categories[0]

    // get all products in the same category
       const products = await ctx.db
            .query('products')
            .withIndex('byCategories')
            .collect()

    // filter the products to include products with the same category id but exclude the current product
    const filteredProducts = products.filter(product => product._id !== args.product_id && product.categories.includes(categoryId))
    
    // limit the number of products to return based on the limit argument
    const limitedProducts = filteredProducts.slice(0, args.limit)

    return Promise.all(
      limitedProducts.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)

        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
        }
      })
    )
    

  }
})


export const getFilteredProducts = query({
  args: {
    type: v.optional(v.union(v.literal('wine'), v.literal('spirit'))),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query('products')

    // Handler logic
    if (args.type) {
      q = q.filter(queryBuilder =>
        queryBuilder.eq(queryBuilder.field('product_type'), args.type)
      )
    }

    if (args.name) {
      q = q.filter(queryBuilder =>
        queryBuilder.eq(queryBuilder.field('name'), args.name)
      )
    }

    return await q.collect()
  },
})

// Get product by slug
export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query('products')
      .withIndex('bySlug', q => q.eq('slug', args.slug))
      .first()

    if (!product) return null

    // Get product attributes
    const attributes = await ctx.db
      .query('product_attributes')
      .withIndex('byProduct', q => q.eq('product_id', product._id))
      .first()

    // Get product variants
    const variants = await ctx.db
      .query('product_variants')
      .withIndex('byProduct', q => q.eq('product_id', product._id))
      .collect()

    return { product, attributes, variants }
  },
})

export const getProductBySlugWithMainImage = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query('products')
      .withIndex('bySlug', q => q.eq('slug', args.slug))
      .first()

    if (!product) return null

    const mainImage = await ctx.storage.getUrl(product.main_image)

    return {
      ...product,
      main_image: mainImage
        ? mainImage
        : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
    }
  },
})

// Get product by ID
export const getProductById = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)
    if (!product) return null

    const attributes = await ctx.db
      .query('product_attributes')
      .withIndex('byProduct', q => q.eq('product_id', args.id))
      .first()

    const variants = await ctx.db
      .query('product_variants')
      .withIndex('byProduct', q => q.eq('product_id', args.id))
      .collect()

    return { product, attributes, variants }
  },
})

// Get products by type
export const getProductsByType = query({
  args: {
    type: v.union(v.literal('wine'), v.literal('spirit')),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Create a single query chain
    const products = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('product_type'), args.type))
      .take(args.limit ?? 1000) // Use nullish coalescing for default limit

    return products
  },
})

// get first 3 products by type
export const getFeaturedProducts = query({
  args: {
    type: v.union(v.literal('wine'), v.literal('spirit')),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Create a single query chain
    const products = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('product_type'), args.type))
      // .filter(q => q.eq(q.field('featured'), true))
      .take(args.limit ?? 3) // Use nullish coalescing for default limit

    return products
  },
})

// Add new product
export const addProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    producer_id: v.id('producers'),
    categories: v.array(v.id('categories')), // Changed from single category_id
    price: v.number(),
    main_image: v.id('_storage'),
    images: v.array(v.id('_storage')),
    in_stock: v.boolean(),
    product_type: v.union(
      v.literal('wine'),
      v.literal('spirit'),
      v.literal('gift'),
      v.literal('custom_label')
    ),
    on_sale: v.optional(v.boolean()),
    sale_price: v.optional(v.number()),
    volume: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    slug: v.string(),
    meta_description: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Verify all categories exist
    for (const categoryId of args.categories) {
      const category = await ctx.db.get(categoryId)
      if (!category) {
        throw new Error(`Category ${categoryId} not found`)
      }
    }

    const productId = await ctx.db.insert('products', {
      ...args,
    })
    return productId
  },
})

// Update existing product
export const updateProduct = mutation({
  args: {
    id: v.id('products'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    producer_id: v.optional(v.id('producers')),
    categories: v.optional(v.array(v.id('categories'))),
    price: v.optional(v.number()),
    main_image: v.optional(v.id('_storage')),
    images: v.optional(v.array(v.id('_storage'))),
    in_stock: v.optional(v.boolean()),
    on_sale: v.optional(v.boolean()),
    sale_price: v.optional(v.number()),
    volume: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    product_type: v.optional(
      v.union(
        v.literal('wine'),
        v.literal('spirit'),
        v.literal('gift'),
        v.literal('custom_label')
      )
    ),
    slug: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, categories, ...updates } = args

    // Verify all new categories exist if updating categories
    if (categories) {
      for (const categoryId of categories) {
        const category = await ctx.db.get(categoryId)
        if (!category) {
          throw new Error(`Category ${categoryId} not found`)
        }
      }
    }

    const product = await ctx.db.get(id)

    if (!product) throw new Error('Product not found')

    await ctx.db.patch(id, { ...updates, categories })
    return id
  },
})

export const updateProductPrice = mutation({
  args: {
    id: v.id('products'),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) {

      throw new Error('Product not found')
    }

     console.log('product', product)

   const updatedProduct = await ctx.db.patch(args.id, { price: args.price })
    return updatedProduct
  },
})

export const toggleOnSale = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) throw new Error('Product not found')

    await ctx.db.patch(args.id, { on_sale: !product.on_sale })
  },
})

export const updateSortOrder = mutation({
  args: {
    id: v.id('products'),
    sort_order: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) throw new Error('Product not found')

    await ctx.db.patch(args.id, { sort_order: args.sort_order })
    return args.id
  },
})

// Delete product
export const deleteProduct = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) throw new Error('Product not found')

    // delete product attributes based on product id
    const attributes = await ctx.db
      .query('product_attributes')
      .filter(q => q.eq(q.field('product_id'), args.id))
      .collect()

    for (const attribute of attributes) {
      await ctx.db.delete(attribute._id)
    }

    await ctx.db.delete(args.id)
    return args.id
  },
})

// Create product attributes
export const addProductAttributes = mutation({
  args: {
    product_id: v.id('products'),
    variety: v.optional(v.string()),
    vintage: v.optional(v.number()),
    alcohol_content: v.optional(v.number()),
    region: v.optional(v.string()),
    aging: v.optional(v.string()),
    distillation_method: v.optional(v.string()),
    tasting_notes: v.optional(v.string()),
    serving_suggestion: v.optional(v.string()),
    awards: v.optional(v.array(v.string())),
    pairing_suggestions: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify product exists
    const product = await ctx.db.get(args.product_id)
    if (!product) throw new Error('Product not found')

    // Create attributes
    return await ctx.db.insert('product_attributes', args)
  },
})

// Update product attributes
export const updateProductAttributes = mutation({
  args: {
    id: v.id('product_attributes'),
    variety: v.optional(v.string()),
    vintage: v.optional(v.number()),
    alcohol_content: v.optional(v.number()),
    region: v.optional(v.string()),
    aging: v.optional(v.string()),
    distillation_method: v.optional(v.string()),
    tasting_notes: v.optional(v.string()),
    serving_suggestion: v.optional(v.string()),
    awards: v.optional(v.array(v.string())),
    pairing_suggestions: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const attributes = await ctx.db.get(id)

    if (!attributes) throw new Error('Product attributes not found')

    await ctx.db.patch(id, updates)
    return id
  },
})

// Delete product attributes
export const deleteProductAttributes = mutation({
  args: {
    id: v.id('product_attributes'),
  },
  handler: async (ctx, args) => {
    const attributes = await ctx.db.get(args.id)

    if (!attributes) throw new Error('Product attributes not found')

    await ctx.db.delete(args.id)
    return args.id
  },
})

// Add product variant
export const addProductVariant = mutation({
  args: {
    product_id: v.id('products'),
    sku: v.string(),
    volume: v.number(),
    price: v.number(),
    stock_level: v.number(),
    barcode: v.optional(v.string()),
    is_on_sale: v.optional(v.boolean()),
    label_dimensions: v.optional(v.string()),
    sale_price: v.optional(v.number()),
    sale_start_date: v.optional(v.number()),
    sale_end_date: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Verify product exists
    const product = await ctx.db.get(args.product_id)
    if (!product) throw new Error('Product not found')

    return await ctx.db.insert('product_variants', args)
  },
})

// Update product variant
export const updateProductVariant = mutation({
  args: {
    id: v.id('product_variants'),
    sku: v.optional(v.string()),
    volume: v.optional(v.number()),
    price: v.optional(v.number()),
    stock_level: v.optional(v.number()),
    barcode: v.optional(v.string()),
    label_dimensions: v.optional(v.string()),
    is_on_sale: v.optional(v.boolean()),
    sale_price: v.optional(v.number()),
    sale_start_date: v.optional(v.number()),
    sale_end_date: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    const variant = await ctx.db.get(id)

    if (!variant) throw new Error('Product variant not found')

    // If SKU is being updated, check for uniqueness
    if (updates.sku) {
      const existingVariant = await ctx.db
        .query('product_variants')
        .filter(q => q.eq(q.field('sku'), updates.sku))
        .first()
      if (existingVariant && existingVariant._id !== id) {
        throw new Error('SKU already exists')
      }
    }

    await ctx.db.patch(id, updates)
    return id
  },
})

export const updateVariantVolume = mutation({
  args: {
    id: v.id('product_variants'),
    volume: v.number(),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, { volume: args.volume })
    return args.id
  },
})

export const updateVariantPrice = mutation({
  args: {
    id: v.id('product_variants'),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, { price: args.price })
    return args.id
  },
})

export const updateVariantSalePrice = mutation({
  args: {
    id: v.id('product_variants'),
    sale_price: v.number(),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, { sale_price: args.sale_price })
    return args.id
  },
})

export const updateProductVariantSaleStatus = mutation({
  args: {
    id: v.id('product_variants'),
    is_on_sale: v.boolean(),
    sale_price: v.number(),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, {
      is_on_sale: args.is_on_sale,
      sale_price: args.sale_price,
    })
    return args.id
  },
})

export const toggleVariantIsOnSale = mutation({
  args: {
    id: v.id('product_variants'),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, { is_on_sale: !variant.is_on_sale })
  },
})

export const updateVariantStockLevel = mutation({
  args: {
    id: v.id('product_variants'),
    stock_level: v.number(),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.patch(args.id, { stock_level: args.stock_level })
    return args.id
  },
})

// Delete product variant
export const deleteProductVariant = mutation({
  args: {
    id: v.id('product_variants'),
  },
  handler: async (ctx, args) => {
    const variant = await ctx.db.get(args.id)

    if (!variant) throw new Error('Product variant not found')

    await ctx.db.delete(args.id)
    return args.id
  },
})

// Get product variants by product ID
export const getProductVariants = query({
  args: { product_id: v.id('products') },
  handler: async (ctx, args) => {
    const variants = await ctx.db
      .query('product_variants')
      .filter(q => q.eq(q.field('product_id'), args.product_id))
      .collect()

    return variants
  },
})

// Get product attributes by product ID
export const getProductAttributes = query({
  args: { product_id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('product_attributes')
      .filter(q => q.eq(q.field('product_id'), args.product_id))
      .collect()
  },
})

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl()
})

export const getMainImage = query({
  args: { id: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.id)
  },
})

export const uploadProductImages = mutation({
  args: { files: v.array(v.bytes()) },
  handler: async (ctx, args) => {
    // Upload files to storage from the array of bytes
    const files = args.files
    const urls = await Promise.all(
      files.map(async file => {
        const uploadUrl = await ctx.storage.generateUploadUrl()

        // Upload file to storage
        const result = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
        })

        if (!result.ok) {
          throw new Error('Failed to upload file')
        }

        console.log('Uploaded file:', result.body)
      })
    )
  },
})

export const setProductImages = mutation({
  args: { id: v.id('products'), image_id: v.id('_storage') },
  handler: async (ctx, args) => {
    // get the images array from the product
    const product = await ctx.db.get(args.id)
    const images = product?.images

    // if there are no images, then just add the image to the images array
    if (!images) {
      await ctx.db.patch(args.id, { images: [args.image_id] })
      return args.id
    }

    await ctx.db.patch(args.id, { images: [...images, args.image_id] })
    return args.id
  },
})

export const getProductImages = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id)

    if (!product) return []

    const images = product.images

    if (!images) return []

    return Promise.all(
      images.map(async imageId => {
        return await ctx.storage.getUrl(imageId)
      })
    )
  },
})

// write a query to return a list of products based on a search term
export const searchProducts = query({
  args: { term: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query('products')
      .withSearchIndex('name', q => q.search('name', args.term))
      .take(20)

    if (!results) return null

    // fetch the main image for each product
    const products = await Promise.all(
      results.map(async product => {
        const mainImage = await ctx.storage.getUrl(product.main_image)

        return {
          ...product,
          main_image: mainImage
            ? mainImage
            : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
        }
      })
    )

    return products
  },
})
