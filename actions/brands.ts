'use server'

import { api } from '@/convex/_generated/api'
import { fetchMutation } from 'convex/nextjs'
import 'server-only'
import { z } from 'zod'

const CreateBrandSchema = z.object({
  name: z.string(),
})

export async function createBrandAction(prevState: unknown, formData: FormData) {
  const validatedFields = CreateBrandSchema.safeParse({
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      status: 400,
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name } = validatedFields.data

  const data = await fetchMutation(api.brands.createBrand, {
    name,
  })

  return {
    status: 200,
    message: 'Brand created successfully',
    data,
  }
}
