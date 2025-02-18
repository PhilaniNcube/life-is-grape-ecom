import { BottleIcon } from '@sanity/icons'
import {
  BookA,
  BookMarkedIcon,
  BookPlus,
  Boxes,
  CogIcon,
  GiftIcon,
  Layout,
  PenIcon,
  Ribbon,
  ShoppingBag,
  ShoppingCart,
  TicketIcon,
  Users,
  Wine,
} from 'lucide-react'
import Link from 'next/link'

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
      href='/dashboard/vouchers'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <TicketIcon className='h-4 w-4' />
      Vouchers
    </Link>
    <Link
      href='/dashboard/bookings'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <BookA className='h-4 w-4' />
      Bookings
    </Link>
    <Link
      href='/dashboard/categories'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Boxes className='h-4 w-4' />
      Categories
    </Link>
    <Link
      href='/dashboard/products'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <ShoppingBag className='h-4 w-4' />
      Products
    </Link>{' '}
    <Link
      href='/dashboard/gifts'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <GiftIcon className='h-4 w-4' />
      Gifts
    </Link>
    <Link
      href='/dashboard/tasting-experiences'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <BookPlus className='h-4 w-4' />
      Tasting Experiences
    </Link>
    <Link
      href='/dashboard/producers'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <CogIcon className='h-4 w-4' />
      Producers
    </Link>
    <Link
      href='/dashboard/customers'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <Users className='h-4 w-4' />
      Customers
    </Link>
    <Link
      href='/dashboard/promotions'
      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
    >
      <BookMarkedIcon className='h-4 w-4' />
      Promotional Banners
    </Link>
  </>
)

export default NavItems
