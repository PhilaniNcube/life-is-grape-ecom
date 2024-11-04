import { v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'

// Create new cart
export const createCart = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.insert('cart', {
      userId: args.userId,
      created_at: Date.now(),
      updated_at: Date.now(),
      status: 'active',
    })
  },
})

// Add item to cart
export const addToCart = mutation({
  args: {
    cartId: v.id('cart'),
    itemType: v.union(
      v.literal('wine'),
      v.literal('gift'),
      v.literal('product')
    ),
    itemId: v.string(),
    quantity: v.number(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('cart_items', {
      cartId: args.cartId,
      item_type: args.itemType,
      item_id: args.itemId,
      quantity: args.quantity,
      price_at_time: args.price,
      added_at: Date.now(),
    })
  },
})

// Get cart with items
export const getCart = query({
  args: { cartId: v.id('cart') },
  handler: async (ctx, args) => {
    const cart = await ctx.db.get(args.cartId)
    const items = await ctx.db
      .query('cart_items')
      .withIndex('byCartId', q => q.eq('cartId', args.cartId))
      .collect()
    return { cart, items }
  },
})

// Update cart item quantity
export const updateCartItem = mutation({
  args: {
    cartItemId: v.id('cart_items'),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.cartItemId, {
      quantity: args.quantity,
    })
  },
})

// Remove item from cart
export const removeFromCart = mutation({
  args: { cartItemId: v.id('cart_items') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.cartItemId)
  },
})


// Add to cart.ts
export const completeOrder = mutation({
  args: {
    cartId: v.id("cart"),
    orderId: v.id("orders")
  },
  handler: async (ctx, args) => {
    // Get current cart
    const currentCart = await ctx.db.get(args.cartId);

    if (!currentCart) {
      throw new Error("Cart not found");
    }

    // Mark current cart as completed
    await ctx.db.patch(args.cartId, {
      status: "completed",
      updated_at: Date.now()
    });

    // Create new active cart
    const newCartId = await ctx.db.insert("cart", {
      userId: currentCart.userId,
      created_at: Date.now(),
      updated_at: Date.now(),
      status: "active"
    });

    return newCartId;
  }
});

// Optional: Add cleanup job for old completed carts (run weekly/monthly)
export const cleanupOldCarts = internalMutation({
  args: { olderThanDays: v.number() },
  handler: async (ctx, args) => {
    const cutoffDate = Date.now() - args.olderThanDays * 24 * 60 * 60 * 1000
    const oldCarts = await ctx.db
      .query('cart')
      .filter(q =>
        q.and(
          q.eq(q.field('status'), 'completed'),
          q.lt(q.field('updated_at'), cutoffDate)
        )
      )
      .collect()

    // Delete old cart items and carts
    for (const cart of oldCarts) {
      // First get the cart items
      const cartItems = await ctx.db
        .query('cart_items')
        .withIndex('byCartId', q => q.eq('cartId', cart._id))
        .collect()

      // Delete each cart item
      for (const item of cartItems) {
        await ctx.db.delete(item._id)
      }

      // Then delete the cart itself
      await ctx.db.delete(cart._id)
    }
  },
})
