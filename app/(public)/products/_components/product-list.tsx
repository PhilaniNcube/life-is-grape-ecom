import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const ProductList = ({products}:{products:Doc<"products">[]}) => {

  const getImage = async (id:Id<"_storage">) => {
    const image = await useQuery(api.products.getMainImage, {id})
    return image
  }


  return (
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {products.map(product => {
          const image = use(getImage(product.main_image))
        return (
          <div
            key={product._id}
            className='overflow-hidden rounded-lg bg-white shadow-md'
          >
            {/* Product Image */}
            <Image
              src={image!}
              alt={product.name}
              width={500}
              height={500}
              className='aspect-square w-full'
            />

            {/* Product Details */}
            <div className='p-6'>
              <h3 className='text-xl font-semibold text-gray-800'>
                {product.name}
              </h3>
              <p className='mt-2 text-gray-600'>{product.description}</p>
              {/* Price and Action Button */}
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-lg font-bold text-gray-900'>
                  {formatPrice(product.price)}
                </span>
                <Link href={`/products/${product.slug}`}>
                  <Button className='bg-red-600 text-white hover:bg-red-700'>
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
};
export default ProductList;
