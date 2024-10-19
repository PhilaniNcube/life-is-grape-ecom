import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

const Product = async ({params:{id}}:{params:{id:Id<"wines">}}) => {

  const wine = await fetchQuery(api.wines.getWine, { wine_id: id });

  return <div>Product: {wine?.name}</div>;
};
export default Product;
