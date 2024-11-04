import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";

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
  brands: defineTable({
    name: v.string(),
  }),
  wineries: defineTable({
    name: v.string(),
    location: v.string(),
    description: v.string(),
    image: v.id('_storage'),
  }),
  wines: defineTable({
    winery_id: v.id('wineries'),
    name: v.string(),
    brand: v.id('brands'),
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
      v.literal('Malbec'),
      v.literal('Champagne'),
      v.literal('Prosecco'),
      v.literal('Port'),
      v.literal('Sherry'),
      v.literal('Madeira'),
      v.literal('Marsala'),
      v.literal('Vermouth'),
      v.literal('Rose')
    ),
  }),
  tasting_experiences: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    servings: v.string(),
    duration: v.string(),
    image: v.id('_storage'),
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
    type: v.union(v.literal('box'), v.literal('label'), v.literal('bag')),
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
  products: defineTable({
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
    suggested_cocktail: v.object({
      name: v.string(),
      ingredients: v.string(),
      description: v.string(),
      by: v.optional(v.string()),
    }),
  }),
  cart: defineTable({
    userId: v.id('users'),
    created_at: v.number(),
    updated_at: v.number(),
    status: v.union(v.literal('active'), v.literal('completed')),
  }).index('byUserId', ['userId']),
  cart_items: defineTable({
    cartId: v.id('cart'),
    item_type: v.union(
      v.literal('wine'),
      v.literal('gift'),
      v.literal('product')
    ),
    item_id: v.string(), // References the ID from respective tables
    quantity: v.number(),
    price_at_time: v.number(), // Store price when added to cart
    added_at: v.number(),
  }).index('byCartId', ['cartId']),
  orders: defineTable({
    userId: v.id('users'),
    cartId: v.id('cart'),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('paid'),
      v.literal('failed'),
      v.literal('fulfilled'),
      v.literal('cancelled')
    ),
    total: v.number(),
    payment_reference: v.string(), // FNB merchant reference number
    transaction_id: v.optional(v.string()), // FNB transaction ID
    payment_method: v.union(
      v.literal('credit_card'),
      v.literal('debit_card'),
      v.literal('eft'),
      v.literal('instant_eft')
    ),
    paid_at: v.optional(v.number()),
    shipping_address: v.object({
      street: v.string(),
      city: v.string(),
      province: v.string(),
      postal_code: v.string(),
    }),
  })
    .index('byUserId', ['userId'])
    .index('byPaymentReference', ['payment_reference']),
})
