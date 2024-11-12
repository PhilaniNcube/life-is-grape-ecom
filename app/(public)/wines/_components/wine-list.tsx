import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductImage from "../../_components/product-image";
import { Suspense } from "react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WineList = async () => {

   const wines = await fetchQuery(api.products.getShallowProductsByType, {
    type: 'wine',
  })

  // Handle the case where no wines are returned
  if (!wines || wines.length === 0) {
    return (
      <section className='py-12'>
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
    <section className='py-12'>
      <div className='mx-auto max-w-7xl'>
        {/* Section Heading */}
        <h2 className='mb-6 text-center text-3xl font-extrabold text-gray-900'>
          Explore Our Diverse Collection of Wines
        </h2>

        {/* 3-Column Grid */}
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {wines.map(wine => (
            <div
              key={wine._id}
              className='overflow-hidden rounded-lg bg-white shadow-md'
            >
              {/* Wine Image */}
              <Suspense fallback={<div className="w-full aspect-square animate-pulse flex items-center justify-center">Image Loading...</div>}>
                <ProductImage id={wine.main_image} />
              </Suspense>

              {/* Wine Details */}
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {wine.name}
                </h3>
                <p className='mt-2 text-gray-600 line-clamp-3'>{wine.description}</p>


                {/* Price and Action Button */}
                <div className='mt-4 flex items-center justify-between'>
                  <span className='text-lg font-bold text-gray-900'>
                    {formatPrice(wine.price)}
                  </span>
                  <Link href={`/products/${wine.slug}`}>
                    <Button className='text-white hover:bg-red-700'>
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
