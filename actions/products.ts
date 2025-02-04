'use server'
import "server-only"

import { revalidatePath } from 'next/cache'

import { CreateAttributesSchema, CreateProductSchema, CreateProductVariantSchema, UpdateProductSchema, UpdateProductVariantSchema, UpdateVariantPriceSchema, UpdateVariantSaleStatusSchema, UpdateVariantStockSchema, UpdateVariantVolumeSchema } from '@/lib/schemas'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
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
    console.log(formData.get("on_sale"))

    const validatedFields = CreateProductSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      producer_id: formData.get('producer_id'),
      categories: cats.split(','),
      price: formData.get('price'),
      in_stock: formData.get('in_stock') === 'on' ? true : false,
      featured: formData.get('featured') === 'on' ? true : false,
      on_sale: formData.get('on_sale') === 'on' ? true : false,
      sale_price: formData.get('sale_price'),
      volume: formData.get('volume'),
      dimensions: formData.get('dimensions'),
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
      on_sale: validatedFields.data.on_sale,
      sale_price: validatedFields.data.sale_price,
      volume: validatedFields.data.volume,
      dimensions: validatedFields.data.dimensions,
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

export async function toggleOnSaleAction(prevState:unknown , id: Id<"products">){

  try {
    const product = await fetchMutation(api.products.toggleOnSale, { id })

    if (!product) {
      throw new Error('Failed to toggle on sale')
    }

    revalidatePath('/dashboard/products', 'layout')

    return true
  } catch (error) {
    return false
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
      on_sale: formData.get('on_sale') === 'on' ? true : false,
      sale_price: formData.get('sale_price') || undefined,
      volume: formData.get('volume') || undefined,
      dimensions: formData.get('dimensions'),
      main_image: formData.get('main_image'),
      // images: [],
      slug: '',
      product_type: formData.get('product_type'),
    })

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        error: 'Invalid form data',
      }
    }

    console.log("Sale Price", formData.get('sale_price'))


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
        on_sale: validatedFields.data.on_sale,
        sale_price: validatedFields.data.sale_price,
        volume: validatedFields.data.volume,
        dimensions: validatedFields.data.dimensions,
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
    is_on_sale: formData.get('is_on_sale') === 'on' ? true : false,
    sale_price: formData.get('sale_price'),
    sale_start_date: formData.get('sale_start_date'),
    sale_end_date: formData.get('sale_end_date'),
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
      is_on_sale: validatedFields.data.is_on_sale,
      sale_price: validatedFields.data.sale_price,
      sale_start_date: validatedFields.data.sale_start_date,
      sale_end_date: validatedFields.data.sale_end_date,
    })

    console.log(result)

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


export async function updateVariantPriceAction(prevState: unknown, formData: FormData) {
  const validatedFields = UpdateVariantPriceSchema.safeParse({
    id: formData.get('id'),
    price: formData.get('price'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const variantId = validatedFields.data.id as Id<"product_variants">

  try {
    const result = await fetchMutation(api.products.updateVariantPrice, {
      id: variantId,
      price: validatedFields.data.price,
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

export async function updateStockAction(prevState: unknown, formData: FormData) {
  const validatedFields = UpdateVariantStockSchema.safeParse({
    id: formData.get('id'),
    stock_level: formData.get('stock_level'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const variantId = validatedFields.data.id as Id<"product_variants">

  try {
    const result = await fetchMutation(api.products.updateVariantStockLevel, {
      id: variantId,
      stock_level: validatedFields.data.stock_level,
    })

    if (!result) {
      throw new Error('Failed to add product variant')
    }
} catch (error) {
    return {
      success: false,
      error: 'Failed to add product variant',
    }
  }
}


export async function updateSaleStatusAction(prevState: unknown, formData: FormData) {

  const validatedFields = UpdateVariantSaleStatusSchema.safeParse({
    id: formData.get('id'),
    is_on_sale: formData.get('is_on_sale') === 'on' ? true : false,
    sale_price: formData.get('sale_price'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const variantId = validatedFields.data.id as Id<"product_variants">

  try {
    const result = await fetchMutation(
      api.products.updateProductVariantSaleStatus,
      {
        id: variantId,
        is_on_sale: validatedFields.data.is_on_sale,
        sale_price: validatedFields.data.sale_price,
      }
    )

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
    variety: formData.get('variety') || '',
    vintage: formData.get('vintage') || 1990,
    alcohol_content: formData.get('alcohol_content'),
    region: formData.get('region'),
    tasting_notes: formData.get('tasting_notes'),
    serving_suggestion: formData.get('serving_suggestion') || '',
    awards: formData.get('awards') || [],
    pairing_suggestions: formData.get('pairing_suggestions') || '',
    aging: formData.get('aging') || "",
    distillation_method: formData.get('distillation_method') || '',
  })





  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const productId = validatedFields.data.product_id as Id<'products'>

  // get the product from the ProductId
  const product = await fetchQuery(api.products.getShallowProduct, { id: productId })

  if (!product) {
    return {
      success: false,
      error: 'Product not found',
    }
  }

  // get the product type
  const productType = product.product_type

  try {

    // if the product type is not wine, then we don't need to add the variety and vintage
    if(productType !== 'wine') {
     const data = await fetchMutation(api.products.addProductAttributes, {
        product_id: productId,
        alcohol_content: validatedFields.data.alcohol_content,
        region: validatedFields.data.region,
        tasting_notes: validatedFields.data.tasting_notes,
        serving_suggestion: validatedFields.data.serving_suggestion,
        awards: validatedFields.data.awards || [],
        // pairing_suggestions: validatedFields.data.pairing_suggestions,
        aging: validatedFields.data.aging,
        distillation_method: validatedFields.data.distillation_method,
      })

          revalidatePath(`/dashboard/products/${productId}`, 'layout')

          return { success: true, data }
    }

    const result = await fetchMutation(api.products.addProductAttributes, {
      product_id: productId,
      variety: validatedFields.data.variety,
      vintage: validatedFields.data.vintage,
      alcohol_content: validatedFields.data.alcohol_content,
      region: validatedFields.data.region,
      tasting_notes: validatedFields.data.tasting_notes,
      // serving_suggestion: validatedFields.data.serving_suggestion,
      // awards: validatedFields.data.awards,
      // pairing_suggestions: validatedFields.data.pairing_suggestions,
      // aging: validatedFields.data.aging,
      // distillation_method: validatedFields.data.distillation_method,
    })

    if(!result) {
      console.log(result)
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


export const updateSortOrderAction = async (id: Id<'products'>, sortOrder: number) => {

  try {
    const result = await fetchMutation(api.products.updateSortOrder, {
      id,
      sort_order: sortOrder,
    })

    if (!result) {
      throw new Error('Failed to update sort order')
    }

    revalidatePath('/dashboard/products', 'layout')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update sort order',
    }
  }

}
