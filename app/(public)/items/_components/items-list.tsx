import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ItemCard from "./item-card";

const ItemsList = async () => {

  const products = await fetchQuery(api.products.getProductList)

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product, index) => (
        <ItemCard key={index} product={product} />
      ))}
    </div>
  )
};
export default ItemsList;
