import { v } from 'convex/values'
import { mutation, query } from './_generated/server'


export const getTastingExperiences = query({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db.query('tasting_experiences').collect();

    return experiences;
  }
})

export const getTastingExperience = query({
  args: {tasting_experience_id: v.id('tasting_experiences')},
  handler: async (ctx, {tasting_experience_id}) => {
    const experience = await ctx.db.query('tasting_experiences').filter((q) => q.eq(q.field("_id"), tasting_experience_id)).first();

        if (!experience) {
          throw new Error(
            `Tasting experience with ID ${tasting_experience_id} not found`
          )
        }

    return experience;
  }
})

export const createExperience = mutation({
  args: {
    description: v.string(),
    name: v.string(),
    price: v.number(),
    servings: v.string(),
    duration: v.string(),
    image: v.optional(v.id('_storage')),
    type: v.optional(v.string())
  },
  handler: async (ctx, {description, price, servings, duration, image, name, type}) => {


    return await ctx.db.insert('tasting_experiences', {description, price, servings, duration, image, name, type});
  }
})

export const updateExperience = mutation({
  args: {
    id: v.id('tasting_experiences'),
    description: v.optional(v.string()),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    servings: v.optional(v.string()),
    duration: v.optional(v.string()),
  },
  handler: async (ctx, {id, description, price, servings, duration, name}) => {

    const experience = await await ctx.db.get(id)

    if (!experience) {
      throw new Error(
        `Tasting experience with ID ${id} not found`
      )
    }

    const data = await ctx.db.patch( id, {description, price, servings, duration, name, type:experience.type})

    return data;
  
  }
})
