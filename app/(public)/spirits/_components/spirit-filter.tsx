'use client'

import { littlepot } from '@/app/fonts'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { CheckIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useOptimistic } from 'react'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

const SpiritFilter = ({
  categories,
}: {
  categories: Preloaded<typeof api.categories.getCategoriesByType>
}) => {
  const searchParams = useSearchParams()

  const [open, setOpen] = React.useState(false)

  const preloadedCategories = usePreloadedQuery(categories)

  const [isPending, startTransition] = useTransition()

  // optimistically set the filter value and update the URL using the use optimistic hook
  const [filter, setFilter] = useOptimistic(searchParams.get('filter') ?? '')

  // const filter = searchParams.get('filter') ?? '';
  const router = useRouter()

  return (
    <div className=''>
      <div className='my-2 md:hidden'>
        <h2 className={cn('text-lg font-semibold', littlepot.className)}>
          Filter by Category
        </h2>
        <div className='flex flex-wrap gap-2'>
          {preloadedCategories.map(category => {
            if (category.parent_id) return null

            return (
              <Badge
                key={category._id}
                onClick={() => {
                  startTransition(() => {
                    setFilter(category._id)
                    router.push(`?filter=${category._id}`)
                  })
                }}
                variant='outline'
                className={cn(
                  'text-xs cursor-pointer data-[pending=true]:animate-pulse',
                  filter === category._id && 'font-semibold bg-black text-white',
                )}
              >
                {category.name}
                {filter === category._id && <CheckIcon className='ml-1 h-4 w-4' />}
              </Badge>
            )
          })}
          </div>
      </div>
      <div className='peer hidden min-w-[200px] md:inline-block'>
        <h2 className='text-lg font-semibold'>Filter by Category</h2>
        <div>
          {preloadedCategories.map(category => {
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
                    filter === category._id && 'font-bold',
                    littlepot.className
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
                  {preloadedCategories
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
    </div>
  )
}
export default SpiritFilter
