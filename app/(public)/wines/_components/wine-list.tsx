import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductImage from "../../_components/product-image";
import { Suspense } from "react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import ListAddToCartButton from "../../products/_components/list-add-to-cart-button";
import ProductItem from "../../_components/product-item";

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
      <section className='py-12 peer'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
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
    <section className='py-12 peer-has-[data-[pending=true]]:animate-pulse'>
      <div className='mx-auto max-w-7xl'>
        {/* Section Heading */}
        <h2 className='mb-6 text-center text-3xl font-extrabold text-gray-900'>
          Explore Our Diverse Collection of Wines
        </h2>

        {/* 3-Column Grid */}
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredWines.map(wine => (
           <ProductItem key={wine._id} product_id={wine._id} />
          ))}
        </div>
      </div>
    </section>
  )
};
export default WineList;
