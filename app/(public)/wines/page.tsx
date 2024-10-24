
import WineCollection from './_components/wine-collections'
import WineFilter from './_components/wine-filter'
import { Suspense } from 'react'


const WinesPage = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) => {
  const searchParams = await props.searchParams;

  let search_types = Array.isArray(searchParams.search_types)
    ? searchParams.search_types
    : searchParams.search_types
      ? [searchParams.search_types]
      : []

  return (
    <div className='group container has-[[data-pending]]:animate-pulse'>
      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='relative h-full max-w-[200px] flex-1'>
          <WineFilter search_types={search_types} />
        </div>
          <WineCollection searchParams={searchParams} />
      </div>
    </div>
  )
}
export default WinesPage


const LoadingSkeleton = () => {
  return (
    <div className='ml-3 grid grid-cols-1 gap-6 has-[[data-pending]]:animate-pulse sm:grid-cols-2 md:grid-cols-3'>
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
      <div className='aspect-square w-full animate-pulse bg-slate-400' />
    </div>
  )
}
