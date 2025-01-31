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
import { ScrollArea } from "@/components/ui/scroll-area"

const ShopPage = async () => {

  const products = await fetchQuery(api.products.getShallowProducts)


  return (
    <section className='py-12'>
      <div className='max-w-7xl mx-auto '>
        {/* Section Heading */}

        <div className='flex w-full flex-col md:flex-row'>
          <div className=''>
            <Filter />
          </div>

          {/* 3-Column Grid */}
          <ScrollArea className='md:flex-1 @container h-[calc(100dvh-14rem)]'>
            <div className='grid w-full grid-cols-2 gap-8 @lg:gap-16 @lg:grid-cols-3'>
              {products.map(product => (
                <ProductItem key={product._id} product_id={product._id} />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Optional: Link to View All Wines */}
      </div>
    </section>
  )
}
export default ShopPage
