import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import UpdateProductForm from "../_components/update-product-form";

const Product = async (props:{params: Promise<{id:Id<"wines">}>}) => {
  const params = await props.params;

  const {
    id
  } = params;

  const wine:Doc<"wines"> = await fetchQuery(api.wines.getSimpleWineObject, { wine_id: id });

  if (!wine) {
    return <div>Product not found</div>;
  }

  return <div>
    <UpdateProductForm product={wine} />
  </div>;
};
export default Product;
