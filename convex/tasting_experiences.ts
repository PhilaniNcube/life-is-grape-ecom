import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getCurrentUser } from './users';


export const getTastingExperiences = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasting_experiences').collect();
  }
})

export const getTastingExperience = query({
  args: {tasting_experience_id: v.id('tasting_experiences')},
  handler: async (ctx, {tasting_experience_id}) => {
    return await ctx.db.query('tasting_experiences').filter((q) => q.eq(q.field("_id"), tasting_experience_id)).first();
  }
})

export const createExperience = mutation({
  args: {
    description: v.string(),
    price: v.number(),
    servings: v.string(),
    duration: v.string(),
    image: v.id('_storage'),
  },
  handler: async (ctx, {description, price, servings, duration, image}) => {

        const user = await getCurrentUser(ctx)

        // if user is not an admin, throw an error

        if (user === null || user.role !== 'admin') {
          throw new Error(
            'You do not have permission to perform this operation'
          )
        }

    return await ctx.db.insert('tasting_experiences', {description, price, servings, duration, image});
  }
})
