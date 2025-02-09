'use server'

import 'server-only'

import { api } from '@/convex/_generated/api'
import { CreatePersonalisedLabelSchema } from '@/lib/schemas'
import { z } from 'zod'
import { fetchMutation } from 'convex/nextjs'
import { Id } from '@/convex/_generated/dataModel'

export async function createPersonalisedLabel(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Validate the input
    const validatedFields = CreatePersonalisedLabelSchema.safeParse({
      order_id: formData.get('order_id'),
      image: formData.get('image'),
      message: formData.get('message'),
    })

 



    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors)  
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    // update thetypes of the fields
    const order_id = validatedFields.data.order_id as Id<'orders'>
    const image = validatedFields.data.image as Id<'_storage'>

    // Create the personalized label using Convex
    const result = await fetchMutation(
      api.personalised_labels.createPersonalisedLabel,
      {
        order_id: order_id,
        image: image,
        message: validatedFields.data.message,
      }
    )

    return { success: true, data: result }
  } catch (error) {
    console.error('Error creating personalised label:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
}
