import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductItem from "../_components/product-item";
import { cn } from "@/lib/utils";
import { littlepot } from "@/app/fonts";

const SalePage = async () => {

   const products = await fetchQuery(api.products.getProductsOnSaleWithMainImage)


  return (
    <div className="container mx-auto py-12">
      <h1 className={cn('text-2xl md:text-3xl text-center', littlepot.className)}>Products on Sale</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-6">
        {products.map(product => {
          return <ProductItem key={product._id} product_id={product._id} />
        })}
      </div>
    </div>
  )
};
export default SalePage;
