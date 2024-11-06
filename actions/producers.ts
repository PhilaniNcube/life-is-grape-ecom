'use server'

import "server-only"

import { revalidatePath } from 'next/cache'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

import { z } from 'zod'
import { Id } from '@/convex/_generated/dataModel'
import { CreateProducerSchema, UpdateProducerSchema } from "@/lib/schemas"
import { fetchMutation } from "convex/nextjs"



type ActionResponse = {
  success: boolean
  error?: string
  data?: any
}

export async function createProducerAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const validatedFields = CreateProducerSchema.safeParse({
      name: formData.get('name'),
      type: formData.get('type'),
      location: formData.get('location'),
      description: formData.get('description'),
      website: formData.get('website'),
    })

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    const producer = await fetchMutation(
      api.producers.addProducer,
      {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        location: validatedFields.data.location,
        description: validatedFields.data.description,
        website: validatedFields.data.website,
      }
    )

    revalidatePath('/dashboard/producers')
    return { success: true, data: producer }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create producer',
    }
  }
}

export async function updateProducerAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const id = formData.get('id') as Id<'producers'>
    const validatedFields = UpdateProducerSchema.partial().safeParse({
      name: formData.get('name'),
      type: formData.get('type'),
      location: formData.get('location'),
      description: formData.get('description'),
      website: formData.get('website'),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    const producer = await fetchMutation(api.producers.updateProducer, {
      id: id,
      name: validatedFields.data.name,
      type: validatedFields.data.type,
      location: validatedFields.data.location,
      description: validatedFields.data.description,
      website: validatedFields.data.website,
    })

    revalidatePath('/dashboard/producers')
    return { success: true, data: producer }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update producer',
    }
  }
}

export async function deleteProducerAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const id = formData.get('id') as Id<'producers'>
    await fetchMutation(api.producers.deleteProducer, {
      id: id,
    })

    revalidatePath('/admin/producers')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete producer',
    }
  }
}
