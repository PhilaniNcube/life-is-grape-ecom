'use client'

import { Doc } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useOptimistic } from 'react'
import { set } from 'sanity'

const WinesFilter = ({ categories }: { categories: Doc<'categories'>[] }) => {
  const searchParams = useSearchParams()

  // optimistically set the filter value and update the URL using the use optimistic hook
  const [filter, setFilter] = useOptimistic(searchParams.get('filter') ?? '')

  // const filter = searchParams.get('filter') ?? '';
  const router = useRouter()
  // optimistacally set the filter value and update the URL using the use optimistic hook

  return (
    <div className='hidden min-w-[200px] md:block mt-16'>
      <h2 className='text-lg font-semibold'>Filter by Category</h2>
      <div>
        {categories.map(category => {
          if (category.parent_id) return null

          return (
            <div key={category._id}>
              <p
                onClick={() => {
                  startTransition(() => {
                    setFilter(category._id)
                    router.push(`?filter=${category._id}`)
                  })
                }}
                className={cn('cursor-pointer text-slate-700',
                  filter === category._id && 'font-bold'
                )}
              >
                <span className='cursor-pointer'>{category.name}</span>
              </p>
              <div className='indent-5'>
                {categories
                  .filter(c => c.parent_id === category._id)
                  .map(child => {
                    return (
                      <p
                        onClick={() => {
                          startTransition(() => {
                            setFilter(child._id)
                            router.push(`?filter=${child._id}`)
                          })
                        }}
                        className={cn('cursor-pointer text-slate-700',
                          filter === child._id && 'font-semibold'
                         )}
                        key={child._id}
                      >
                        {child.name}
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
export default WinesFilter
