import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import UpdateProductForm from '../_components/update-product-form'
import AddProductVariant from '../_components/add-product-variant'
import { Suspense } from 'react'
import VariantList from '../_components/variant-list'
import AddProductAttributeDialog from '../_components/add-product-attribute'
import AttributeList from '../_components/attribute-list'

const ProductPage = async ({ params }: { params: Promise<{ id: Id<'products'> }> }) => {
  const { id } = await params

  const product = await fetchQuery(api.products.getShallowProduct, { id })
  const categories = await fetchQuery(api.categories.getCategories)
  const producers = await fetchQuery(api.producers.getProducers)
  const attributes = await fetchQuery(api.products.getProductAttributes, {
    product_id: id,
  })

  if (!product) return <div>Product not found</div>

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
          <AddProductVariant productId={id} />
          <Suspense fallback={<div>Loading...</div>}>
            <VariantList product_id={id} />
          </Suspense>
          {attributes.length > 0 ? (
            <h2 className='text-2xl font-bold text-center'>Attribute</h2>
          ) : (
            <AddProductAttributeDialog
              productId={id}
              productType={product.product_type}
            />
          )}

          <AttributeList attributes={attributes} product_id={id} />
        </div>
      </div>
    </div>
  )
}
export default ProductPage
