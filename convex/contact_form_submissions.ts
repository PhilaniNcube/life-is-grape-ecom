import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createContactFormSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    tel: v.string(),
    subject: v.string(),
  },
  handler: async (ctx, args) => {
    const contactFormSubmission = await ctx.db.insert(
      'contact_form_submissions',
      {
        name: args.name,
        email: args.email,
        message: args.message,
        tel: args.tel,
        subject: args.subject,
      }
    )

    return contactFormSubmission
  },
})
