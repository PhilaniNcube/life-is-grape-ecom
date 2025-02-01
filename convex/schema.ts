import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    image_url: v.optional(v.string()),
    role: v.union(v.literal('admin'), v.literal('user')),
    posts: v.optional(v.array(v.id('posts'))),
  }).index('byClerkUserId', ['clerkUserId']),
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    authorId: v.id('users'),
    likes: v.number(),
    published: v.boolean(),
  }).index('bySlug', ['slug']),
  // Main products table
  products: defineTable({
    name: v.string(),
    description: v.string(),
    producer_id: v.id('producers'),
    categories: v.array(v.id('categories')),
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
    // SEO and display
    slug: v.string(),
    meta_description: v.optional(v.string()),
    featured: v.boolean(),
  })
    .searchIndex('name', {
      searchField: 'name',
    })
    .searchIndex('description', {
      searchField: 'description',
    })
    .index('bySlug', ['slug'])
    .index('byCategories', ['categories'])
    .index('byProducer', ['producer_id']),
  // Product variants (different sizes/packaging)
  product_variants: defineTable({
    product_id: v.id('products'),
    sku: v.string(),
    volume: v.optional(v.number()), // in ml
    label_dimensions: v.optional(v.string()), // in mm
    price: v.number(),
    stock_level: v.number(),
    barcode: v.optional(v.string()),
    is_on_sale: v.optional(v.boolean()),
    sale_price: v.optional(v.number()),
    sale_start_date: v.optional(v.number()),
    sale_end_date: v.optional(v.number()),
  }).index('byProduct', ['product_id']),
  // Producers (replaces wineries/brands)
  producers: defineTable({
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
  }),
  // Categories and subcategories
  categories: defineTable({
    name: v.string(),
    parent_id: v.optional(v.id('categories')),
    slug: v.string(),
    type: v.union(v.literal('wine'), v.literal('spirit')),
    attributes: v.array(v.string()), // List of applicable attribute IDs
  })
    .index('byParent', ['parent_id'])
    .index('bySlug', ['slug']),
  // Product-specific attributes
  product_attributes: defineTable({
    product_id: v.id('products'),
    // Wine-specific
    variety: v.optional(v.string()),
    vintage: v.optional(v.number()),
    alcohol_content: v.optional(v.number()),
    region: v.optional(v.string()),
    // Spirit-specific
    aging: v.optional(v.string()),
    distillation_method: v.optional(v.string()),
    // Common
    tasting_notes: v.optional(v.string()),
    serving_suggestion: v.optional(v.string()),
    awards: v.optional(v.array(v.string())),
    pairing_suggestions: v.optional(v.string()),
  }).index('byProduct', ['product_id']),
  tasting_experiences: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    servings: v.string(),
    duration: v.string(),
    image: v.id('_storage'),
    type: v.optional(v.string()),
  }),
  bookings: defineTable({
    tasting_experience_id: v.id('tasting_experiences'),
    name: v.string(),
    email: v.string(),
    date: v.string(),
    time: v.string(),
    guests: v.number(),
    paid: v.boolean(),
    notes: v.optional(v.string()),
  }),
  gifts: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    type: v.union(v.literal('box'), v.literal('label'), v.literal('bag'), v.literal('voucher')),
    customization_options: v.object({
      allows_message: v.boolean(),
      message_max_length: v.optional(v.number()),
      allows_design_choice: v.boolean(),
      available_designs: v.optional(v.array(v.string())),
    }),
    compatible_wine_types: v.array(
      v.union(v.literal('red'), v.literal('white'))
    ),
    main_image: v.id('_storage'),
    images: v.optional(v.array(v.id('_storage'))),
    in_stock: v.boolean(),
    dimensions: v.optional(v.string())
  }),
  gift_customizations: defineTable({
    gift_id: v.id('gifts'),
    customer_message: v.optional(v.string()),
    selected_design: v.optional(v.string()),
    selected_wine_type: v.union(
      v.literal('red'),
      v.literal('white'),
      v.literal('none')
    ),
    selected_wine_id: v.optional(v.id('products')),
    order_id: v.string(), // Reference to order system
    created_at: v.number(),
  }),
  orders: defineTable({
    // Order info
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('paid'),
      v.literal('fulfilled'),
      v.literal('cancelled')
    ),
    // Customer info - now optional
    userId: v.optional(v.id('users')),
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    phone: v.string(),
    shipping_address: v.object({
      street: v.string(),
      city: v.string(),
      province: v.string(),
      postal_code: v.string(),
    }),
    // Payment details
    payment_reference: v.optional(v.string()),
    subtotal: v.number(),
    shipping: v.number(),
    total: v.number(),
    // Timestamps
    updated_at: v.optional(v.number()),
    paid_at: v.optional(v.number()),
  })
    .index('byUserId', ['userId'])
    .index('byStatus', ['status']),
  custom_label_messages: defineTable({
    order_id: v.id('orders'),
    message: v.string(),
    image: v.optional(v.id('_storage')),
  }),
  order_items: defineTable({
    order_id: v.id('orders'),
    product: v.object({
      id: v.id('products'),
      name: v.string(),
    }),
    quantity: v.number(),
    price_at_time: v.number(),
    gift_box: v.optional(
      v.object({
        name: v.string(),
        price: v.number(),
        description: v.string(),
        dimensions: v.string(),
        quantity: v.optional(v.number()),
      })
    ),
    variant: v.object({
      id: v.id('product_variants'),
      volume: v.optional(v.number()),
      price: v.number(),
    }),
  })
    .index('byOrder', ['order_id'])
    .index('byProduct', ['product.id'])
    .index('byVariant', ['variant.id']),
})

