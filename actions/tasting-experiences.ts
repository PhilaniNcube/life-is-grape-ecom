'use server'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { CreateExperienceSchema, UpdateExperienceSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { revalidatePath } from 'next/cache'
import 'server-only'

// add a form action to create a new tasting experience
export async function createTastingExperienceAction(
  prevState: unknown,
  formData: FormData
) {
  // Add your action logic here

  const validatedFields = CreateExperienceSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    duration: formData.get('duration'),
    servings: formData.get('servings'),
    // image: formData.get('image'),
    type: formData.get('type'),
  })

  try {
    if (!validatedFields.success) {
      console.log(
        'Validated fields',
        validatedFields.error.flatten().fieldErrors
      )
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const fields = validatedFields.data

    const image = validatedFields.data.image as Id<'_storage'>

    // create the tasting experience
    const result = await fetchMutation(
      api.tasting_experiences.createExperience,
      {
        name: fields.name,
        description: fields.description,
        price: fields.price,
        duration: fields.duration,
        servings: fields.servings,
        image,
        type: fields.type,
      }
    )

    return {
      success: true,
      message: 'Tasting experience created successfully',
    }
  } catch (error) {
    console.log('Error creating tasting experience', error)

    return {
      success: false,
      errors: {
        general: 'Failed to create the tasting experience',
      },
    }
  } finally {
    revalidatePath('/dashboard/tasting-experiences')
  }
}

export async function updateTastingExperienceAction(
  prevState: unknown,
  formData: FormData
) {
  // Add your action logic here

  const validatedFields = UpdateExperienceSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    duration: formData.get('duration'),
    servings: formData.get('servings'),
  })

  try {
    if (!validatedFields.success) {
      console.log(
        'Validated fields',
        validatedFields.error.flatten().fieldErrors
      )
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { id, ...fields } = validatedFields.data

    // convert id to the convex id type
    const experienceId = id as Id<'tasting_experiences'>

    // update the tasting experience
    const result = await fetchMutation(
      api.tasting_experiences.updateExperience,
      {
        id: experienceId,
        name: fields.name,
        description: fields.description,
        price: fields.price,
        duration: fields.duration,
        servings: fields.servings,
      }
    )

    return {
      success: true,
      message: 'Tasting experience updated successfully',
    }
  } catch (error) {
    console.log('Error updating tasting experience', error)

    return {
      success: false,
      errors: {
        general: 'Failed to update the tasting experience',
      },
    }
  } finally {
    revalidatePath('/dashboard/tasting-experiences')
  }
}
