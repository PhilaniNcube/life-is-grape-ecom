'use server'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { mutation } from '@/convex/_generated/server'
import { createGiftSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { revalidatePath } from 'next/cache'
import 'server-only'

export const createGiftAction = async (
  prevState: unknown,
  formData: FormData
) => {


  const validatedFields = createGiftSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    type: formData.get('type'),
    customization_options: {
      allows_message:
        formData.get('customization_options.allows_message') === 'on'
          ? true
          : false,
      message_max_length:
        Number(formData.get('customization_options.message_max_length')) ,
      allows_design_choice:
        formData.get('customization_options.allows_design_choice') === 'on'
          ? true
          : false,
      // available_designs:
      //   formData.getAll('customization_options.available_designs') || [],
    },
    compatible_wine_types: formData.getAll('compatible_wine_types'),
    main_image: formData.get('main_image'),
    // images: formData.getAll('images'),
    in_stock: formData.get('in_stock') === 'true' ? true : false,
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      error: `Error invalid fields ${validatedFields.error.message}`,
      status: 400,
    }
  }

  const mainImage = validatedFields.data.main_image as Id<'_storage'>
  const images = validatedFields.data.images
    ? validatedFields.data.images.map(id => id as Id<'_storage'>)
    : []

  const createdGift = fetchMutation(api.gifts.createGift, {
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    price: validatedFields.data.price,
    type: validatedFields.data.type,
    customization_options: {
      allows_message: validatedFields.data.customization_options.allows_message,
      message_max_length: validatedFields.data.customization_options.message_max_length,
      allows_design_choice: validatedFields.data.customization_options.allows_design_choice,

    },
    compatible_wine_types: validatedFields.data.compatible_wine_types,
    main_image: mainImage,
    // images: images,
    in_stock: validatedFields.data.in_stock,
  })

  console.log(JSON.stringify(createdGift, null, 2))

  if (!createdGift) {
    return { error: 'Gift not created', status: 400 }
  }

  revalidatePath('/dashboard/gifts')
  revalidatePath(`/gifts`, "page")

  return { data: createdGift, status: 200 }
}
