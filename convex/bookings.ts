import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getBookings = query({
  handler: async ctx => {
    const bookings = await ctx.db.query('bookings').collect()

    const booking_with_experience_name = await Promise.all(bookings.map(async booking => {
      const experience = await ctx.db.get(booking.tasting_experience_id)
      return { ...booking, experience_name: experience?.name }
    }))

    return booking_with_experience_name
  },
})

export const getBookingsByDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, { date }) => {
    return await ctx.db
      .query('bookings')
      .filter(q => q.eq(q.field('date'), date))
      .collect()
  },
})

export const getBookingsByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query('bookings')
      .filter(q => q.eq(q.field('email'), email))
      .collect()
  },
})

export const getBookingById = query({
  args: {
    booking_id: v.id('bookings'),
  },
  handler: async (ctx, { booking_id }) => {
    return await ctx.db.get(booking_id)
  },
})

export const createBooking = mutation({
  args: {
    experience_id: v.id('tasting_experiences'),
    name: v.string(),
    email: v.string(),
    date: v.string(),
    time: v.string(),
    guests: v.number(),
    paid: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('bookings', {
      name: args.name,
      email: args.email,
      date: args.date,
      time: args.time,
      guests: args.guests,
      tasting_experience_id: args.experience_id,
      paid: args.paid,
    })
  },
})
