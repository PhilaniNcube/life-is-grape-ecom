import { Suspense } from 'react'
import ItemsList from './_components/items-list'
import { Skeleton } from '@/components/ui/skeleton'

const ItemsPage = () => {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Our Products</h1>
      <Suspense
        fallback={
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
            <Skeleton className='aspect-square w-full animate-pulse' />
          </div>
        }
      >
        <ItemsList />
      </Suspense>
    </div>
  )
}
export default ItemsPage
