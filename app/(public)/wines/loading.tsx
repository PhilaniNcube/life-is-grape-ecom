import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className='flex flex-col gap-6 md:flex-row container'>
      <div className='max-w-[200px]'>
        <h2 className='text-lg font-semibold'>Filter</h2>
        <div className="mt-4 bg-slate-300">
          <Skeleton className='h-8' />
          <Skeleton className='h-8' />
          <Skeleton className='h-8' />
          <Skeleton className='h-8' />
          <Skeleton className='h-8' />
        </div>

      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 flex-1'>
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
        <Skeleton className='aspect-square w-full bg-slate-300' />
      </div>
    </div>
  )
}
export default Loading
