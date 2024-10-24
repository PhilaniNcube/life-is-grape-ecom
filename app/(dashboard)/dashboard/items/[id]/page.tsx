import { Id } from "@/convex/_generated/dataModel";

const Product = async (props:{params: Promise<{id:Id<"products">}>}) => {
  const params = await props.params;

  const {
    id
  } = params;

  return <div>Product</div>;
};
export default Product;
