'use server'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { CreateItemSchema, UpdateItemSchema, UpdateWineSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { revalidatePath } from 'next/cache'
import 'server-only'


export async function createItemAction(prevState: unknown, formData: FormData) {

  const validatedFields = CreateItemSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    main_image: formData.get('main_image'),
    brand_id: formData.get('brand_id'),
    volume: formData.get('volume'),
    tasting_notes: formData.get('tasting_notes'),
    pairing_suggestions: formData.get('pairing_suggestions'),
    type: formData.get('type'),
    images: formData.getAll('images'),
    cocktail_name: formData.get('cocktail_name'),
    ingredients: formData.get('ingredients'),
    by: formData.get('by'),
    cocktail_description: formData.get('cocktail_description'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { status: 400, error: validatedFields.error.flatten().fieldErrors }
  }

  const brandId = validatedFields.data.brand_id as Id<"brands">
  const mainImage = validatedFields.data.main_image as Id<'_storage'>
  const imageIds = validatedFields.data.images as Id<'_storage'>[]

  try {

    const result = await fetchMutation(api.products.createProduct, {
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    price: validatedFields.data.price,
    main_image: mainImage,
    brand: brandId,
    volume: validatedFields.data.volume,
    tasting_notes: validatedFields.data.tasting_notes,
    pairing_suggestions: validatedFields.data.pairing_suggestions,
    type: validatedFields.data.type,
    images: imageIds ,
    cocktail_name: validatedFields.data.cocktail_name,
    ingredients: validatedFields.data.ingredients,
    cocktail_description: validatedFields.data.cocktail_description,
    by: validatedFields.data.by,
  })

  console.log(result)

  revalidatePath('/products', "layout")
  revalidatePath('/', "layout")
  revalidatePath('/dashboard/items', "layout")
  revalidatePath('/dashboard', "layout")

  return {
    status: 200,
    data: result,
    message: 'Item created successfully'
  }

  } catch (error) {
    console.error(error)
    return { status: 500, error: 'Internal server error'}
  }



}

export async function updateItemAction(prevState: unknown, formData: FormData) {

  const validatedFields = UpdateItemSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    main_image: formData.get('main_image'),
    brand_id: formData.get('brand_id'),
    volume: formData.get('volume'),
    tasting_notes: formData.get('tasting_notes'),
    pairing_suggestions: formData.get('pairing_suggestions'),
    type: formData.get('type'),
    // images: formData.getAll('images'),
    cocktail_name: formData.get('cocktail_name'),
    ingredients: formData.get('ingredients'),
    by: formData.get('by'),
    cocktail_description: formData.get('cocktail_description'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { status: 400, error: validatedFields.error.flatten().fieldErrors }
  }


  const product_id = validatedFields.data.id as Id<"products">
  const brandId = validatedFields.data.brand_id as Id<"brands">
  const mainImage = validatedFields.data.main_image as Id<'_storage'>


  try {

    const result = await fetchMutation(api.products.updateProduct, {
      productId: product_id,
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      price: validatedFields.data.price,
      main_image: mainImage,
      brand: brandId,
      volume: validatedFields.data.volume,
      tasting_notes: validatedFields.data.tasting_notes,
      pairing_suggestions: validatedFields.data.pairing_suggestions,
      type: validatedFields.data.type,
      cocktail_name: validatedFields.data.cocktail_name,
      ingredients: validatedFields.data.ingredients,
      cocktail_description: validatedFields.data.cocktail_description,
      by: validatedFields.data.by,
    })

  console.log(result)

  revalidatePath('/products', "layout")
  revalidatePath('/', "layout")
  revalidatePath('/dashboard/items', "layout")
  revalidatePath('/dashboard', "layout")

  return {
    status: 200,
    data: result,
    message: 'Product created successfully'
  }

  } catch (error) {
    console.error(error)
    return { status: 500, error: 'Internal server error'}
  }



}
