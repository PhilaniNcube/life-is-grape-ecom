import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import Link from 'next/link'
import MobileFilter from './mobile-filter'

const Filter = async () => {
  const categories = await fetchQuery(
    api.categories.getParentCategoryiesWithChildren
  )

  return (
    <div>
      {/* createt a mobile filter */}
    <MobileFilter categories={categories} />
      <div className='mt-10 hidden w-[200px] max-w-[200px] pr-3 md:block'>
        <h2 className='text-lg font-semibold text-gray-800'>Filter</h2>
        <ScrollArea className='mt-4 h-[400px] w-full'>
          {categories.map(category => {
            // if category has a parent_id it is a child category so we skip it
            if (category.parent_id) {
              return null
            }

            return (
              <div key={category.name} className='flex w-full flex-col'>
                <Link
                  href={`/categories/${category.slug}`}
                  className='text-md w-full rounded px-2 py-2 font-semibold text-gray-800 hover:bg-slate-300'
                >
                  {category.name}
                </Link>
                <ul className='mt-2 flex flex-col px-5'>
                  {category.children.map(child => (
                    <Link
                      href={`/categories/${child.slug}`}
                      key={child._id}
                      className='mb-1 text-sm text-gray-600'
                    >
                      {child.name}
                    </Link>
                  ))}
                </ul>
              </div>
            )
          })}
        </ScrollArea>
      </div>
    </div>
  )
}
export default Filter
