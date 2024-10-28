import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import ProductDetail from "../_components/item-detail";
import { LiqourDetail } from "@/lib/types";

const LiquorPage = async (props: {
  params: Promise<{ id: Id<'products'> }>
}) => {

    const params = await props.params

    const { id } = params


  const product = await fetchQuery(api.products.getProductDetails, {
    product_id: id,
  })

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className='container mx-auto'>
      {product !== null && <ProductDetail product={product} />}
    </div>
  )
}
export default LiquorPage;
