import { v } from 'convex/values'
import { mutation, query } from './_generated/server'


export const getTastingExperiences = query({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db.query('tasting_experiences').collect();

    const promiseData = await Promise.all(experiences.map(async (experience) => {
      return {
        ...experience,
        image: await ctx.storage.getUrl(experience.image) || ''
      }
    }))

    return promiseData;
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

    return {
      ...experience,
      image: await ctx.storage.getUrl(experience.image) || ''
    };
  }
})

export const createExperience = mutation({
  args: {
    description: v.string(),
    name: v.string(),
    price: v.number(),
    servings: v.string(),
    duration: v.string(),
    image: v.id('_storage'),
  },
  handler: async (ctx, {description, price, servings, duration, image, name}) => {


    return await ctx.db.insert('tasting_experiences', {description, price, servings, duration, image, name});
  }
})
