import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createPersonalisedLabel = mutation({
  args: {
    order_id: v.id('orders'),
    image: v.id('_storage'),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify order exists
    const order = await ctx.db.get(args.order_id);
    if (!order) throw new Error('Order not found');

    return await ctx.db.insert('personalised_labels', {
      order_id: args.order_id,
      image: args.image,
      message: args.message,
    });
  },
});

export const getAllPersonalisedLabels = query({
  args: {},
  handler: async (ctx) => {
    const labels = await ctx.db.query('personalised_labels').collect();
    
    return await Promise.all(
      labels.map(async (label) => {
        const imageUrl = await ctx.storage.getUrl(label.image);
        return {
          ...label,
          image: imageUrl,
        };
      })
    );
  },
});

export const getPersonalisedLabelByOrderId = query({
  args: { order_id: v.id('orders') },
  handler: async (ctx, args) => {
    const label = await ctx.db
      .query('personalised_labels')
      .filter((q) => q.eq(q.field('order_id'), args.order_id))
      .first();
    
    if (!label) return null;

    const imageUrl = await ctx.storage.getUrl(label.image);
    return {
      ...label,
      image: imageUrl,
    };
  },
});

export const generatePersonalisedLabelUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});