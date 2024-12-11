import { fetchQuery } from "convex/nextjs"
import Products from "./_components/products"
import { api } from "@/convex/_generated/api"
import { Suspense } from "react"
import ProductImage from "../_components/product-image"
import { cn, formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Filter from "./_components/filter"
import Image from "next/image"
import ListAddToCartButton from "./_components/list-add-to-cart-button"
import ProductItem from "../_components/product-item"
import { littlepot } from "@/app/fonts"

const ShopPage = async () => {

  const products = await fetchQuery(api.products.getShallowProducts)


  return (
    <section className='py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Heading */}
        <h2 className={cn('mb-6 text-3xl font-extrabold text-gray-900', littlepot.className)}>
          Explore Our Collection
        </h2>

        <div className='flex w-full flex-col md:flex-row'>
          <Filter />

          {/* 3-Column Grid */}
          <div className='mt-3 grid flex-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
              <ProductItem key={product._id} product_id={product._id} />
            ))}
          </div>
        </div>

        {/* Optional: Link to View All Wines */}
      </div>
    </section>
  )
}
export default ShopPage
