import { BookA, Layout, PenIcon, Ribbon, ShoppingBag, ShoppingCart, Users, Wine } from "lucide-react"
import Link from "next/link"

const NavItems = () => (
  <>
    <Link
      href='/dashboard'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Layout className='h-4 w-4' />
      Dashboard
    </Link>
    <Link
      href='/dashboard/orders'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <ShoppingCart className='h-4 w-4' />
      Orders
    </Link>
    <Link
      href='/dashboard/bookings'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <BookA className='h-4 w-4' />
      Bookings
    </Link>
    <Link
      href='/dashboard/brands'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Ribbon className='h-4 w-4' />
      Brands
    </Link>
    <Link
      href='/dashboard/products'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <ShoppingBag className='h-4 w-4' />
      Wines
    </Link>{' '}
    <Link
      href='/dashboard/items'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Users className='h-4 w-4' />
      Brandy/Whiskey/Gin
    </Link>
    <Link
      href='/dashboard/suppliers'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <ShoppingBag className='h-4 w-4' />
      Wineries/Suppliers
    </Link>
    <Link
      href='/dashboard/customers'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Users className='h-4 w-4' />
      Customers
    </Link>
  </>
)


export default NavItems
