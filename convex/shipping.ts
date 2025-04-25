import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getShippingCosts = query({
    args: {},
    handler: async (ctx) => {
        const shippingCosts = await ctx.db.query('shipping_costs').first()

        return shippingCosts
    },
})


export const updateShippingCosts = mutation({
    args: {
        inside_pe: v.number(),
        pe_outskirts: v.number(),
        rest_of_sa: v.number(),
    },
    handler: async (ctx, { inside_pe, pe_outskirts, rest_of_sa }) => {
        const shippingCosts = await ctx.db.query('shipping_costs').first()

        if (!shippingCosts) {
            throw new Error(
                `Shipping costs not found`
            )
        }

        return await ctx.db.patch(shippingCosts._id, { inside_pe, pe_outskirts, rest_of_sa })
    },
})
