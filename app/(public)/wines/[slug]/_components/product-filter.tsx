'use client'

import { littlepot } from '@/app/fonts'
import { Badge } from '@/components/ui/badge'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

const ProductFilter = ({ slug }: { slug: string }) => {
  const categoriesQuery = useQuery(api.categories.getCategoriesByType, {
    type: 'wine',
  })

  console.log(categoriesQuery)

  return (
    <div>
      <div className='my-2 md:hidden'>
        <h2 className={cn('text-lg font-semibold', littlepot.className)}>
          Filter by Category
        </h2>
        <div className='flex flex-wrap gap-2'>
          {categoriesQuery?.map(category => {
            return (
              <Link key={category._id} href={`/wines/${category.slug}`}>
                <Badge
                  variant='outline'
                  className={cn(
                    'cursor-pointer text-xs data-[pending=true]:animate-pulse',
                    slug === category.slug &&
                      'bg-black font-semibold text-white'
                  )}
                >
                  {category.name}
                  {slug === category.slug && (
                    <CheckIcon className='ml-1 h-4 w-4' />
                  )}
                </Badge>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='peer mt-16 hidden min-w-[200px] md:block'>
        <h2 className='text-lg font-semibold'>Filter by Category</h2>
        <div>
          {categoriesQuery?.map(category => {
            if (category.parent_id) return null

            return (
              <div key={category._id}>
                <Link
                  href={`/wines/${category.slug}`}
                  className={cn(
                    'cursor-pointer py-1 text-slate-700 data-[pending=true]:animate-pulse',
                    slug === category.slug && 'font-bold',
                    littlepot.className
                  )}
                >
                  <span className='flex cursor-pointer items-center gap-x-2'>
                    {category.name}{' '}
                    {slug === category.slug && (
                      <CheckIcon className='ml-1 h-4 w-4' />
                    )}
                  </span>
                </Link>
                <div className='indent-3'>
                  {categoriesQuery
                    ?.filter(c => c.parent_id === category._id)
                    .map(child => {
                      return (
                        <Link
                          href={`/wines/${child.slug}`}
                          className={cn(
                            'flex cursor-pointer items-center gap-x-2 py-0.5 text-sm text-slate-700 data-[pending=true]:animate-pulse',
                            slug === child.slug && 'bg-slate-100 font-semibold',
                            littlepot.className
                          )}
                          key={child._id}
                        >
                          {child.name}
                          {slug === child.slug && (
                            <CheckIcon className='ml-1 h-4 w-4' />
                          )}
                        </Link>
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
export default ProductFilter
