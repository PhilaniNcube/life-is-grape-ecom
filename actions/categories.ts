'use server'
import "server-only"

import { revalidatePath } from 'next/cache'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { z } from 'zod'
import { CreateCategorySchema, UpdateCategorySchema } from "@/lib/schemas"
import { fetchMutation } from "convex/nextjs"



type ActionResponse = {
  success: boolean
  error?: string
  data?: any
}

export async function createCategoryAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const validatedFields = CreateCategorySchema.safeParse({
      name: formData.get('name'),
      parent_id: formData.get('parent_id') || undefined,
      type: formData.get('type')
    })

    console.log(formData.get('type'))

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    const parent_id = validatedFields.data.parent_id as Id<"categories">

    const category = await fetchMutation(
      api.categories.addCategory,
      {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        parent_id: parent_id,
        attributes: []
      }
    )

    revalidatePath('/dashboard/categories')
    return { success: true, data: category }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create category',
    }
  }
}

export async function updateCategoryAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const validatedFields = UpdateCategorySchema.partial().safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    const id = validatedFields.data.id as Id<"categories">
    const parent_id = validatedFields.data.parent_id as Id<"categories">


    const category = await fetchMutation(api.categories.updateCategory, {
      id: validatedFields.data.id as Id<"categories">,
      parent_id: parent_id ? parent_id : undefined,
      type: validatedFields.data.type,
      name: validatedFields.data.name,
    })

    revalidatePath('/dashboard/categories')
    return { success: true, data: category }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update category',
    }
  }
}

export async function deleteCategoryAction(prevState:unknown,formData:FormData): Promise<ActionResponse> {

  const id = formData.get('id') as Id<"categories">

  if(!id){
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  try {
    await fetchMutation(api.categories.deleteCategory, { id })

    revalidatePath('/dashboard/categories')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete category',
    }
  }
}
