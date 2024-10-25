import { Id } from "@/convex/_generated/dataModel";
import UpdateItemForm from "../_components/update-item-form";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const Product = async (props:{params: Promise<{id:Id<"products">}>}) => {
  const params = await props.params

  const { id } = params

  const item = await fetchQuery(api.products.getProductById, { product_id: id })

  if (!item || item === undefined) {
    return <div>Item not found</div>
  }



  return (
    <div>
      <UpdateItemForm item={item} />
    </div>
  )
};
export default Product;
