import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";


type Product =  Omit<Doc<"products">, 'main_image'> & {
  main_image: string
}


const ProductList = ({ products }: { products: Product[] }) => {


  return (
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {products.map(product => {

        return (
          <div
            key={product._id}
            className='overflow-hidden rounded-lg bg-white shadow-md relative'
          >


            {/* Product Image */}
            <Image
              src={product.main_image}
              alt={product.name}
              width={500}
              height={500}
              className='aspect-square w-full'
            />

            {/* Product Details */}
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-gray-800'>
                {product.name}
              </h3>
              {/* <p className='mt-2 text-gray-600'>{product.description}</p> */}
              {/* Price and Action Button */}
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-lg font-bold text-gray-900'>
                  {formatPrice(product.price)}
                </span>
                <Link href={`/products/${product.slug}`}>
                  <Button className=' text-white hover:bg-red-700'>
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ProductList;
