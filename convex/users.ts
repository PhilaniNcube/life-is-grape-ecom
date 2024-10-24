import type * as PropTypes from "prop-types";
import { v, Validator } from 'convex/values'
import { internalMutation, query, QueryCtx } from './_generated/server'
import { UserJSON } from '@clerk/backend'

export const getUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').collect()
  },
})

export const getUser = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, { clerkUserId }) => {
    return await userByClerkUserId(ctx, clerkUserId)
  },
})

export const getRecentUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('users').order('desc').take(5)
  },
})

export const current = query({
  handler: async ctx => {
    return await getCurrentUser(ctx)
  },
})

export const isAdmin = query({
  handler: async ctx => {
    const user = await getCurrentUser(ctx)

    if (user === null || user.role !== 'admin') {
      return false
    }

    if (user.role === 'admin') {
      return true
    }

    return false
  },
})

export const upsertFromClerk = internalMutation({
  // @ts-ignore
  args: { data: v.any() as PropTypes.Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const userAttributes = {
      // @ts-ignore
      email: data.email_addresses[0].email_address,
      // @ts-ignore
      clerkUserId: data.id,
      // @ts-ignore
      first_name: data.first_name ?? undefined,
      // @ts-ignore
      last_name: data.last_name ?? undefined,
      // @ts-ignore
      image_url: data.image_url ?? undefined,
    }
    // @ts-ignore
    const user = await userByClerkUserId(ctx, data.id)

    if (user === null) {
      await ctx.db.insert('users', {
        role: 'user',
        ...userAttributes,
      })
    } else {
      await ctx.db.patch(user._id, {
        ...userAttributes,
        role: 'user',
      })
    }
  },
})

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },

  handler: async (ctx, { clerkUserId }) => {
    const user = await userByClerkUserId(ctx, clerkUserId)
    if (user !== null) {
      await ctx.db.delete(user._id)
    } else {
      console.warn(`User with clerkUserId ${clerkUserId} not found`)
    }
  },
})

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    return null
  }
  return await userByClerkUserId(ctx, identity.subject)
}

async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query('users')
    .withIndex('byClerkUserId', q => q.eq('clerkUserId', clerkUserId))
    .unique()
}
