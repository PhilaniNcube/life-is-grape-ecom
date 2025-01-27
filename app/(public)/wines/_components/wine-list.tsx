import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import ProductItem from "../../_components/product-item";
import { cn } from "@/lib/utils";
import { littlepot } from "@/app/fonts";

const WineList = async ({filter}:{filter:Id<"categories"> | ''}) => {



   const wines = await fetchQuery(
     api.products.getShallowProductsWithMainImage,
     {
       type: 'wine',
     }
   )

  // take the filter and filter the wines by the category by checking the array of category ids on each product
  const filteredWines = wines.filter(wine => {
    if (filter === '') return true
    return wine.categories.includes(filter)
  }
  )

  // Handle the case where no wines are returned
  if (!filteredWines || filteredWines.length === 0) {
    return (
      <section className='peer py-4'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2
            className={cn(
              'mb-6 text-3xl font-extrabold text-gray-900',
              littlepot.className
            )}
          >
            Our Selection of Fine Wines
          </h2>
          <p className='text-lg text-gray-600'>
            Currently, we have no wines available. Please check back later!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className='py-4 peer-has-[data-[pending=true]]:animate-pulse w-full @container'>
      <div className='mx-auto max-w-7xl'>
        {/* Section Heading */}
        <h2
          className={cn(
            'mb-6 text-3xl font-extrabold text-gray-900',
            littlepot.className
          )}
        >
          Our Selection of Fine Wines
        </h2>

        {/* 3-Column Grid */}
        <div className='grid w-full grid-cols-2 @lg:grid-cols-3 gap-8'>
          {filteredWines.map(wine => (
            <ProductItem key={wine._id} product_id={wine._id} />
          ))}
        </div>
      </div>
    </section>
  )
};
export default WineList;
