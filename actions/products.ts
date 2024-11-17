'use server'
import "server-only"

import { revalidatePath } from 'next/cache'

import { CreateAttributesSchema, CreateProductSchema, CreateProductVariantSchema, UpdateProductSchema, UpdateProductVariantSchema, UpdateVariantVolumeSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { redirect } from "next/navigation"
import { form } from "sanity/structure"



type ActionResponse = {
  success: boolean
  error?: string
  data?: any
}



export async function createProductAction(
  prevState:unknown,
  formData: FormData
): Promise<ActionResponse> {


  try {
    const cats = formData.get('categories') as string

    console.log(formData.get("in_stock"))

    const validatedFields = CreateProductSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      producer_id: formData.get('producer_id'),
      categories: cats.split(','),
      price: formData.get('price'),
      in_stock: formData.get('in_stock') === 'on' ? true : false,
      featured: formData.get('featured') === 'on' ? true : false,
      main_image: formData.get('main_image'),
      images: [],
      slug: '',
      product_type: formData.get('product_type'),
    })

    console.log(JSON.stringify(validatedFields, null, 2))

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    // convert producer_id to the type expected by the API
    const producer_id = validatedFields.data.producer_id as Id<'producers'>
    const categories = validatedFields.data.categories as Id<'categories'>[]
    const main_image = validatedFields.data.main_image as Id<'_storage'>

    // function to slugify a string e.g. "Hello World" => "hello-world"
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '')

    const product = await fetchMutation(api.products.addProduct, {
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      producer_id: producer_id,
      categories: categories,
      price: validatedFields.data.price,
      main_image: main_image,
      images: [],
      in_stock: validatedFields.data.in_stock,
      product_type: validatedFields.data.product_type,
      slug: slugify(validatedFields.data.name),
      featured: false,
    })
    revalidatePath('/dashboard/products', "layout")
    revalidatePath(`/dashboard/products/${product}`)

    // redirect(`/dashboard/products/${product}`)

    return { success: true, data: product }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create product',
    }
  }
}

export async function updateProductAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {



  try {

     const cats = formData.get('categories') as string

    const validatedFields = UpdateProductSchema.safeParse({
      id: formData.get('id'),
      name: formData.get('name'),
      description: formData.get('description'),
      producer_id: formData.get('producer_id'),
      categories: cats.split(','),
      price: formData.get('price'),
      in_stock: formData.get('in_stock') === 'on' ? true : false,
      featured: formData.get('featured') === 'on' ? true : false,
      main_image: formData.get('main_image'),
      // images: [],
      slug: '',
      product_type: formData.get('product_type'),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data',
      }
    }



    const product = await fetchMutation(
      api.products.updateProduct,
      {

        id: validatedFields.data.id as Id<"products">,
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        producer_id: validatedFields.data.producer_id as Id<"producers">,
        categories: validatedFields.data.categories as Id<"categories">[],
        price: validatedFields.data.price,
        main_image: validatedFields.data.main_image as Id<"_storage">,
        product_type: validatedFields.data.product_type,
        in_stock: validatedFields.data.in_stock,
        meta_description: validatedFields.data.meta_description,
        featured: validatedFields.data.featured,
      }
    )

    revalidatePath('/dashboard/products')
    return { success: true, data: product }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update product',
    }
  }
}

export async function deleteProductAction(id: Id<"products">): Promise<ActionResponse> {
  try {
    await fetchMutation(api.products.deleteProduct, { id })

    revalidatePath('/admin/products')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete product',
    }
  }
}


export async function addVariantAction(prevState:unknown, formData:FormData) {

  const validatedFields = CreateProductVariantSchema.safeParse({
    product_id: formData.get('product_id'),
    volume: formData.get('volume'),
    price: formData.get('price'),
    sku: formData.get('sku'),
    stock_level: formData.get('stock_level'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const productId = validatedFields.data.product_id as Id<'products'>

  try {
  const result = await fetchMutation(api.products.addProductVariant, {
      product_id: productId,
      volume: validatedFields.data.volume,
      price: validatedFields.data.price,
      sku: validatedFields.data.sku || validatedFields.data.product_id,
      stock_level: validatedFields.data.stock_level,
    })

    if(!result) {
      throw new Error('Failed to add product variant')
    }

    revalidatePath(`/dashboard/products/${productId}`, "layout")

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to add product variant',
    }
  }

}


export async function updateVariantVolumeAction(prevState: unknown, formData: FormData) {
  const validatedFields = UpdateVariantVolumeSchema.safeParse({
    id: formData.get('id'),
    volume: formData.get('volume'),
  })

  console.log("Volume",formData.get('volume'))

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const variantId = validatedFields.data.id as Id<"product_variants">

  try {
    const result = await fetchMutation(api.products.updateVariantVolume, {
      id: variantId,
      volume: validatedFields.data.volume,
    })

    if (!result) {
      throw new Error('Failed to add product variant')
    }


    revalidatePath(`/dashboard/products`, 'layout')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to add product variant',
    }
  }
}


export async function addAttributeAction(prevState:unknown, formData:FormData) {

  const validatedFields = CreateAttributesSchema.safeParse({
    product_id: formData.get('product_id'),
    variety: formData.get('variety'),
    vintage: formData.get('vintage'),
    alcohol_content: formData.get('alcohol_content'),
    region: formData.get('region'),
    tasting_notes: formData.get('tasting_notes'),
    serving_suggestion: formData.get('serving_suggestion'),
    awards: formData.get('awards'),
    pairing_suggestions: formData.get('pairing_suggestions'),
    aging: formData.get('aging'),
    distillation_method: formData.get('distillation_method'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const productId = validatedFields.data.product_id as Id<'products'>

  try {

    const result = await fetchMutation(api.products.addProductAttributes, {
      product_id: productId,
      variety: validatedFields.data.variety,
      vintage: validatedFields.data.vintage,
      alcohol_content: validatedFields.data.alcohol_content,
      region: validatedFields.data.region,
      tasting_notes: validatedFields.data.tasting_notes,
      serving_suggestion: validatedFields.data.serving_suggestion,
      awards: validatedFields.data.awards,
      pairing_suggestions: validatedFields.data.pairing_suggestions,
      aging: validatedFields.data.aging,
      distillation_method: validatedFields.data.distillation_method,
    })

    if(!result) {
      throw new Error('Failed to add product attribute')
    }

    revalidatePath(`/dashboard/products/${productId}`, "layout")

    return { success: true, data: result }

  } catch (error) {

    return {
      success: false,
      error: 'Failed to add product attribute',
    }

  }

}
