'use server'
import "server-only"

import { revalidatePath } from 'next/cache'

import { CreateProductSchema, UpdateProductSchema } from '@/lib/schemas'
import { fetchMutation } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { redirect } from "next/navigation"



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
