import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import UpdateProductForm from "../_components/update-product-form";

const Product = async ({params:{id}}:{params:{id:Id<"wines">}}) => {

  const wine = await fetchQuery(api.wines.getWine, { wine_id: id });

  if (!wine) {
    return <div>Product not found</div>;
  }

  return <div>
    <UpdateProductForm product={wine} />
  </div>;
};
export default Product;