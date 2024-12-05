import { fetchQuery } from "convex/nextjs";
import Filter from "../../products/_components/filter";
import { api } from "@/convex/_generated/api";
import { Suspense } from "react";
import ProductImage from "../../_components/product-image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryProducts from "./_components/category-products";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

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
    <div className='grid flex-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <Card className='overflow-hidden rounded-lg bg-white shadow-md'>
       <div className="w-full aspect-square bg-slate-100 animate-pulse" />
        <div className='p-6'>
          <h3 className='text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
            Loading...
          </h3>
          <div className='mt-2 text-sm text-gray-600'>
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <span className='text-lg font-bold text-gray-900'>Loading...</span>
            <Button
              className='rounded-none text-white hover:bg-red-700'
              size='sm'
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
      <Card className='overflow-hidden rounded-lg bg-white shadow-md'>
       <div className="w-full aspect-square bg-slate-100 animate-pulse" />
        <div className='p-6'>
          <h3 className='text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
            Loading...
          </h3>
          <div className='mt-2 text-sm text-gray-600'>
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <span className='text-lg font-bold text-gray-900'>Loading...</span>
            <Button
              className='rounded-none text-white hover:bg-red-700'
              size='sm'
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
      <Card className='overflow-hidden rounded-lg bg-white shadow-md'>
       <div className="w-full aspect-square bg-slate-100 animate-pulse" />
        <div className='p-6'>
          <h3 className='text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
            Loading...
          </h3>
          <div className='mt-2 text-sm text-gray-600'>
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <span className='text-lg font-bold text-gray-900'>Loading...</span>
            <Button
              className='rounded-none text-white hover:bg-red-700'
              size='sm'
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
      <Card className='overflow-hidden rounded-lg bg-white shadow-md'>
       <div className="w-full aspect-square bg-slate-100 animate-pulse" />
        <div className='p-6'>
          <h3 className='text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg'>
            Loading...
          </h3>
          <div className='mt-2 text-sm text-gray-600'>
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
            <Skeleton className='h-3 w-full rounded bg-slate-200' />
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <span className='text-lg font-bold text-gray-900'>Loading...</span>
            <Button
              className='rounded-none text-white hover:bg-red-700'
              size='sm'
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
