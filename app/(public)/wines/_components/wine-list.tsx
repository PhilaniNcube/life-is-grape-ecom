import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductImage from "../../_components/product-image";
import { Suspense } from "react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";

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
            <div
              key={wine._id}
              className='overflow-hidden rounded-lg bg-white shadow-md'
            >
              {/* spirit Image */}
              <Image
                src={wine.main_image}
                alt={wine.name}
                width={800}
                height={800}
                className='aspect-square w-full'
              />

              {/* Wine Details */}
              <div className='p-6'>
                <h3 className='line-clamp-1 text-lg font-semibold text-gray-800'>
                  {wine.name}
                </h3>
                {/* <p className='mt-2 line-clamp-3 text-gray-600'>
                  {wine.description}
                </p> */}

                {/* Price and Action Button */}
                <div className='mt-4 flex items-center justify-between'>
                  <span className='text-lg font-bold text-gray-900'>
                    {formatPrice(wine.price)}
                  </span>
                  <Link href={`/products/${wine.slug}`}>
                    <Button className='rounded-md text-white hover:bg-red-700'>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};
export default WineList;
