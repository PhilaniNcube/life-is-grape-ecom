import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

const ProductAttributes = async ({product_id}:{product_id:Id<"products">}) => {

  // fetch the product attributes
  const productAttributes = await fetchQuery(api.products.getProductAttributes, { product_id });



 return (
   <div>
      <h3 className='text-lg font-semibold'>Attributes</h3>

   </div>
 )
};
export default ProductAttributes;
