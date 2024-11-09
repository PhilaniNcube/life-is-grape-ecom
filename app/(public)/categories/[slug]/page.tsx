import { fetchQuery } from "convex/nextjs";
import Filter from "../../products/_components/filter";
import { api } from "@/convex/_generated/api";
import { Suspense } from "react";
import ProductImage from "../../_components/product-image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryProducts from "./_components/category-products";

const CategoryPage = async ({params}:{params:Promise<{slug:string}>}) => {

  const { slug = '' } = await params


   return (

    <Suspense fallback={<Loading />}>
      <CategoryProducts slug={slug} />
    </Suspense>
   )
};
export default CategoryPage;


const Loading = () => {

  return (
    <div className='container'>
      <div className="flex w-full">
        <div className="w-1/4">
          <Filter />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
           <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="flex aspect-square w-full animate-pulse items-center justify-center">
              Image Loading...
            </div>
            <div className="p-6">
              <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                Product Name
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Product Description
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  R0.00
                </span>
                <Button className="rounded-none text-white hover:bg-red-700">
                  View Details
                </Button>
              </div>
            </div>
           </div>
        </div>






      </div>
    </div>
  )
}
