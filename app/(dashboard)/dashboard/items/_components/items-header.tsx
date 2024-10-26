import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const ItemsHeader = () => {
  return (
    <div className='flex w-full items-center justify-between'>
      <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>
        Items
      </h1>
      <div className='flex items-center gap-4'>
        <Link href='/dashboard/items/create'>
          <Button className='flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-blue-950 rounded-none focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50'>
            <Plus className='h-5 w-5' />
            <span>New Item</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default ItemsHeader
