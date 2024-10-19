import Link from 'next/link'
import NewProductDialog from './new-product-dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const DashboardProductsHeader = () => {
  return (
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-xl font-semibold'>Wines</h2>
      <Link href='/dashboard/products/create'>
        <Button>
          {' '}
          <PlusIcon className='mr-2' /> Create Product
        </Button>
      </Link>
    </div>
  )
}
export default DashboardProductsHeader
