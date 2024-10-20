'use server'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { CreateWineSchema, UpdateWineSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { revalidatePath } from 'next/cache'
import 'server-only'

type WineType =
  | 'Sauvignon Blanc'
  | 'Chardonnay'
  | 'Merlot'
  | 'Cabernet Sauvignon'
  | 'Pinot Noir'
  | 'Pinot Grigio'
  | 'Pinotage'
  | 'Syrah'
  | 'Zinfandel'
  | 'Riesling'
  | 'Port'
  | 'Sherry'
  | 'Madeira'
  | 'Marsala'
  | 'Vermouth'
  | 'Rose'

export type WineVariety =
  | 'red'
  | 'white'
  | 'rose'
  | 'sparkling'
  | 'dessert'
  | 'fortified'

export async function createWineAction(prevState: unknown, formData: FormData) {



  const inStock = formData.get('in_stock')


  const validatedFields = CreateWineSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    main_image: formData.get('main_image'),
    in_stock: inStock === 'on' ? true : false,
    winery_id: formData.get('winery_id'),
    type: formData.get('type'),
    year: formData.get('year'),
    variety: formData.get('variety') as unknown as string,
    brand: formData.get('brand'),
    alcohol_content: formData.get('alcohol_content'),
    serving_suggestion: formData.get('serving_suggestion'),
  })

  if (!validatedFields.success) {

    return {
      status: 400,
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    name,
    description,
    price,
    main_image,
    in_stock,
    winery_id,
    type,
    year,
    variety,
    brand,
    alcohol_content,
    serving_suggestion,
  } = validatedFields.data

  const storageId = main_image as Id<'_storage'>
  const wineryId = winery_id as Id<'wineries'>
  const brandId = brand as Id<'brands'>
  const wineType = type as WineType
  const wineVariety = variety as WineVariety

  try {
    const data = await fetchMutation(api.wines.createWine, {
      name,
      description,
      price,
      main_image: storageId,
      in_stock,
      winery_id: wineryId,
      type: wineType,
      year,
      variety: wineVariety,
      brand: brandId,
      alcohol_content,
      serving_suggestion,
      images: [],
    })

    revalidatePath('/dashboard/wines')
    revalidatePath('/dashboard', 'layout')

    return {
      status: 200,
      message: 'Wine created successfully',
    }
  } catch (error) {
    console.error(error)
    return {
      status: 400,
      message: 'Could not save to the database',
    }
  }
}



export async function updateWineAction(prevState: unknown, formData: FormData) {


  const inStock = formData.get('in_stock')


  const validatedFields = UpdateWineSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    main_image: formData.get('main_image'),
    in_stock: inStock === 'on' ? true : false,
    winery_id: formData.get('winery_id'),
    type: formData.get('type'),
    year: formData.get('year'),
    variety: formData.get('variety') as unknown as string,
    brand: formData.get('brand'),
    alcohol_content: formData.get('alcohol_content'),
    serving_suggestion: formData.get('serving_suggestion'),
  })

  if (!validatedFields.success) {

    return {
      status: 400,
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    id,
    name,
    description,
    price,
    main_image,
    in_stock,
    winery_id,
    type,
    year,
    variety,
    brand,
    alcohol_content,
    serving_suggestion,
  } = validatedFields.data

  const productId = id as Id<'wines'>
  const storageId = main_image as Id<'_storage'>
  const wineryId = winery_id as Id<'wineries'>
  const brandId = brand as Id<'brands'>
  const wineType = type as WineType
  const wineVariety = variety as WineVariety

  try {
    const data = await fetchMutation(api.wines.updateWine, {
      id: productId,
      name,
      description,
      price,
      main_image: storageId,
      in_stock,
      winery_id: wineryId,
      type: wineType,
      year,
      variety: wineVariety,
      brand: brandId,
      alcohol_content,
      serving_suggestion,
      images: [],
    })

    revalidatePath('/dashboard/wines')
    revalidatePath('/dashboard', 'layout')

    return {
      status: 200,
      message: 'Wine created successfully',
    }
  } catch (error) {
    console.error(error)
    return {
      status: 400,
      message: 'Could not save to the database',
    }
  }
}
