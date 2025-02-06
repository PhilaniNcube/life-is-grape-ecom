import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import slugify from 'slugify'

// Get all categories
export const getCategories = query({
  handler: async ctx => {
    const categories = await ctx.db.query('categories').collect()

    // Sort categories by sort_order
    const sortedCategories = categories.sort((a, b) => {
      return a.sort_order! - b.sort_order!
    })

    return sortedCategories
  },
})

// Get categories by type
export const getCategoriesByType = query({
  args: {
    type: v.union(v.literal('wine'), v.literal('spirit')),
  },
  handler: async (ctx, args) => {
    const categories = await ctx.db
      .query('categories')
      .filter(q => q.eq(q.field('type'), args.type))
      .collect()

    // Sort categories by sort_order

    const sortedCategories = categories.sort((a, b) => {
      return a.sort_order! - b.sort_order!
    })

    return sortedCategories
  },
})


// Get category by ID with children
export const getCategoryWithChildren = query({
  args: {
    categoryId: v.id('categories'),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db.get(args.categoryId)
    if (!category) return null

    const children = await ctx.db
      .query('categories')
      .withIndex('byParent', q => q.eq('parent_id', args.categoryId))
      .collect()

    return {
      category,
      children,
    }
  },
})

// Get parent categories only
export const getParentCategories = query({
  args: {
    type: v.optional(v.union(v.literal('wine'), v.literal('spirit'))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('categories')
      .filter(q => q.eq(q.field('parent_id'), null))

    if (args.type) {
      query = query.filter(q => q.eq(q.field('type'), args.type))
    }

    const categories = await query.collect()

    // Sort categories by sort_order
    const sortedCategories = categories.sort((a, b) => {
      return a.sort_order! - b.sort_order!
    })

    return sortedCategories
  },
})

// Add new category
export const addCategory = mutation({
  args: {
    name: v.string(),
    parent_id: v.optional(v.id('categories')),
    type: v.union(v.literal('wine'), v.literal('spirit')),
    attributes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // If parent_id provided, verify it exists
    if (args.parent_id) {
      const parent = await ctx.db.get(args.parent_id)
      if (!parent) throw new Error('Parent category not found')
    }

    // create a slug from the name
    const slug = slugify(args.name, {
      lower: true,
      replacement: '-',
      strict: true,
    })

    return await ctx.db.insert('categories', {
      name: args.name,
      parent_id: args.parent_id,
      type: args.type,
      attributes: [],
      slug,
    })
  },
})


export const updateCategorySortOrder = mutation({
  args: {
    id: v.id('categories'),
    sort_order: v.number(),
  },
  handler: async (ctx, args) => {

    const { id, sort_order } = args

    // Verify category exists
    const category = await ctx.db.get(id)
    if (!category) throw new Error('Category not found')

    return await ctx.db.patch(id, { sort_order })

  }
})


// Get category by ID
export const getCategory = query({
  args: { id: v.id('categories') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Update category
export const updateCategory = mutation({
  args: {
    id: v.id('categories'),
    name: v.optional(v.string()),
    parent_id: v.optional(v.id('categories')),
    type: v.optional(v.union(v.literal('wine'), v.literal('spirit'))),

  },
  handler: async (ctx, args) => {
    const { id, name, parent_id, type } = args

    // Verify category exists
    const category = await ctx.db.get(id)
    if (!category) throw new Error('Category not found')



    await ctx.db.patch(id, {
      name,
      parent_id : parent_id ? parent_id : undefined,
      type,
    })
    return id
  },
})

// Delete category
export const deleteCategory = mutation({
  args: { id: v.id('categories') },
  handler: async (ctx, args) => {
    // Check if category exists
    const category = await ctx.db.get(args.id)
    if (!category) throw new Error('Category not found')

    // Check for child categories
    const children = await ctx.db
      .query('categories')
      .withIndex('byParent', q => q.eq('parent_id', args.id))
      .collect()

    if (children.length > 0) {
      throw new Error('Cannot delete category with child categories')
    }

    // if (products.length > 0) {
    //   throw new Error('Cannot delete category while it is assigned to products')
    // }

    await ctx.db.delete(args.id)
    return args.id
  },
})

export const getProductsByCategoryId = query({
  args: {
    categoryId: v.id('categories'),
  },
  handler: async (ctx, args) => {
    try {
      const { categoryId } = args

      // Get all products
      const products = await ctx.db
        .query('products')
        .withIndex('byCategories')
        .collect()

      // each product has an array of category ids it belongs to so we need to filter the products that belong to the category id we are looking for
      const filteredProducts = products.filter(product =>
        product.categories.includes(categoryId)
      )

      return filteredProducts
    } catch (error) {
      console.error(error)
      return []
    }
  },
})

export const getCategoryBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const { slug } = args

      const category = await ctx.db
        .query('categories')
        .filter(q => q.eq(q.field('slug'), slug))
        .first()

      if (!category) {
        throw new Error('Category not found')
      }

      return category
    } catch (error) {
      console.error(error)
      return null
    }
  },
})

export const getProductsByCategorySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const { slug } = args

      // Get category by slug
      const category = await ctx.db
        .query('categories')
        .filter(q => q.eq(q.field('slug'), slug))
        .first()

      if (!category) {
        throw new Error('Category not found')
      }

      // Get all products
      const products = await ctx.db
        .query('products')
        .withIndex('byCategories')
        .collect()

      // each product has an array of category ids it belongs to so we need to filter the products that belong to the category id we are looking for
      const filteredProducts = products.filter(product =>
        product.categories.includes(category._id)
      )

      // return the filtered products with the product main image
      return Promise.all(
        filteredProducts.map(async product => {
          const mainImage = await ctx.storage.getUrl(product.main_image)

          return {
            ...product,
            main_image: mainImage
              ? mainImage
              : 'https://quiet-caterpillar-834.convex.cloud/api/storage/f0e6f530-ea17-4788-813c-e3f3df4b6a52',
          }
        })
      )


    } catch (error) {
      console.error(error)
      return []
    }
  },
})

export const getParentCategoryiesWithChildren = query({
  args: {},
  handler: async (ctx, args) => {
    try {
      const parentCategories = await ctx.db
        .query('categories')
        .filter(q => q.neq('parent_id', null))
        .collect()

      const categoriesWithChildren = await Promise.all(
        parentCategories.map(async parentCategory => {
          const children = await ctx.db
            .query('categories')
            .withIndex('byParent', q => q.eq('parent_id', parentCategory._id))
            .collect()
          return {
            ...parentCategory,
            children,
          }
        })
      )

      // sort parent categories by sort_order
      const sortedCategories = categoriesWithChildren.sort((a, b) => {
        return a.sort_order! - b.sort_order!
      })

      return sortedCategories
    } catch (error) {
      console.error(error)
      return []
    }
  },
})

export const getWineCategories = query({
  handler: async ctx => {
    const categories = await ctx.db
      .query('categories')
      .filter(q => q.eq(q.field('type'), 'wine'))
      .collect()

    // Sort categories by sort_order
    const sortedCategories = categories.sort((a, b) => {
      return a.sort_order! - b.sort_order!
    })

    return sortedCategories
  },
})

export const getWineCategoriesWithChildren = query({
  handler: async ctx => {
    const parentCategories = await ctx.db
      .query('categories')
      .filter(q => q.eq(q.field("type"), 'wine'))
      .filter(q => q.neq(q.field('parent_id'), null))
      .collect()

      console.log({parentCategories})

    const categoriesWithChildren = await Promise.all(
      parentCategories.map(async parentCategory => {
        const children = await ctx.db
          .query('categories').filter(q => q.eq(q.field('parent_id'), parentCategory._id))
        return {
          ...parentCategory,
          children,
        }
      })
    )

    // sort categories by sort_order
    const sortedCategories = categoriesWithChildren.sort((a, b) => {
      return a.sort_order! - b.sort_order!
    })


    return sortedCategories
  },
})
