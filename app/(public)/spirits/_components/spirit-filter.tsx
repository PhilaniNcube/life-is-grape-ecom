'use client'

import { Doc } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useOptimistic } from 'react'

const SpiritFilter = ({ categories }: { categories: Doc<'categories'>[] }) => {
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  // optimistically set the filter value and update the URL using the use optimistic hook
  const [filter, setFilter] = useOptimistic(searchParams.get('filter') ?? '')

  // const filter = searchParams.get('filter') ?? '';
  const router = useRouter()

  return (
    <div className='peer mt-16 hidden min-w-[200px] md:block'>
      <h2 className='text-lg font-semibold'>Filter by Category</h2>
      <div>
        {categories.map(category => {
          if (category.parent_id) return null

          return (
            <div key={category._id}>
              <p
                data-pending={isPending}
                onClick={() => {
                  startTransition(() => {
                    setFilter(category._id)
                    router.push(`?filter=${category._id}`)
                  })
                }}
                className={cn(
                  'cursor-pointer text-slate-700 data-[pending=true]:animate-pulse',
                  filter === category._id && 'font-bold'
                )}
              >
                <span className='flex cursor-pointer items-center gap-x-2'>
                  {category.name}{' '}
                  {filter === category._id && (
                    <CheckIcon className='ml-1 h-4 w-4' />
                  )}
                </span>
              </p>
              <div className='indent-3'>
                {categories
                  .filter(c => c.parent_id === category._id)
                  .map(child => {
                    return (
                      <p
                        data-pending={isPending}
                        onClick={() => {
                          startTransition(() => {
                            setFilter(child._id)
                            router.push(`?filter=${child._id}`)
                          })
                        }}
                        className={cn(
                          'flex cursor-pointer items-center gap-x-2 text-sm text-slate-700 data-[pending=true]:animate-pulse',
                          filter === child._id && 'font-semibold'
                        )}
                        key={child._id}
                      >
                        {child.name}
                        {filter === child._id && (
                          <CheckIcon className='ml-1 h-4 w-4' />
                        )}
                      </p>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default SpiritFilter
