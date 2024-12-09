import { fetchQuery } from "convex/nextjs"
import Products from "./_components/products"
import { api } from "@/convex/_generated/api"
import { Suspense } from "react"
import ProductImage from "../_components/product-image"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Filter from "./_components/filter"
import Image from "next/image"

const ShopPage = async () => {

  const products = await fetchQuery(api.products.getShallowProducts)


  return (
    <section className=' py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Heading */}
        <h2 className='mb-6 text-center text-3xl font-extrabold text-gray-900'>
          Explore Our Diverse Collection
        </h2>

        <div className='flex flex-col md:flex-row w-full'>
            <Filter />

          {/* 3-Column Grid */}
          <div className='grid mt-3 flex-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
              <div
                key={product._id}
                className='overflow-hidden rounded-lg bg-white shadow-md'
              >
                {/* product Image */}
                <Image
                  src={product.main_image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className='aspect-square w-full'
                />

                {/* product Details */}
                <div className='p-6'>
                  <h3 className='text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
                    {product.name}
                  </h3>
                  {/* <p className='mt-2 line-clamp-3 text-sm text-gray-600'>
                    {product.description}
                  </p> */}

                  {/* Price and Action Button */}
                  <div className='mt-4 flex items-center justify-between'>
                    <span className='text-lg font-bold text-gray-900'>
                      {formatPrice(product.price)}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <Button
                        className='rounded-md text-white hover:bg-red-700'
                        size='sm'
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Link to View All Wines */}
      </div>
    </section>
  )
}
export default ShopPage
