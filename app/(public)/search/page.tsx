import { littlepot } from "@/app/fonts";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import ProductItem from "../_components/product-item";

const page = async ({searchParams}:{searchParams: Promise<{term:string}>}) => {

  const {term} = await searchParams;

  if(!term) return <div className="container">no search term</div>;

  const searchProducts = await fetchQuery(api.products.searchProducts, {term});


  return (
    <div className='container'>
      <p
        className={cn(littlepot.className, 'text-lg capitalize text-slate-700')}
      >
        Search term {term} - {searchProducts?.length}
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {searchProducts?.length === 0 || !searchProducts ? (
          <p>No products found</p>
        ) : (
          searchProducts.map(product => {
            return <ProductItem key={product._id} product_id={product._id} />;
          })
        )}
      </div>
    </div>
  )
};
export default page;
