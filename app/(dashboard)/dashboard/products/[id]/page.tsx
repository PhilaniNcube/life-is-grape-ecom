import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import UpdateProductForm from '../_components/update-product-form'
import AddProductVariant from '../_components/add-product-variant'
import { Suspense } from 'react'
import VariantList from '../_components/variant-list'
import AddProductAttributeDialog from '../_components/add-product-attribute'
import AttributeList from '../_components/attribute-list'
import MultiImageUpload from '../_components/multi-image-upload'

const ProductPage = async ({
  params,
}: {
  params: Promise<{ id: Id<'products'> }>
}) => {
  const { id } = await params

  const productData =  fetchQuery(api.products.getShallowProduct, { id })
  const categoriesData =  fetchQuery(api.categories.getCategories)
  const producersData =  fetchQuery(api.producers.getProducers)
  const attributesData =  fetchQuery(api.products.getProductAttributes, {
    product_id: id,
  })

  const [product, categories, producers, attributes] = await Promise.all([
    productData,
    categoriesData,
    producersData,
    attributesData,
  ])



  if (!product) return <div>Product not found</div>

  const productImages = await fetchQuery(api.products.getProductImages, { id })

  console.log({productImages})

  return (
    <div>
      <h1 className='text-2xl font-bold'>Update Product</h1>
      <div className='flex flex-row gap-x-5'>
        <UpdateProductForm
          product={product}
          categories={categories}
          producers={producers}
        />
        <div className='w-2/5'>
          {/* <AddProductVariant productId={id} />
          <Suspense fallback={<div>Loading...</div>}>
            <VariantList product_id={id} />
          </Suspense> */}
          {attributes.length > 0 ? (
            <h2 className='text-2xl font-bold'>Attribute</h2>
          ) : (
            <AddProductAttributeDialog
              productId={id}
              productType={product.product_type}
            />
          )}

          <AttributeList attributes={attributes} product_id={id} />
          <div className='my-3'>
            <MultiImageUpload productId={id} images={productImages!} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductPage
