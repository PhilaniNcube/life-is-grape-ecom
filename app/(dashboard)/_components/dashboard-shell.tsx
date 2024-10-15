'use client'

import { ReactNode, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Layout,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from '@clerk/nextjs'
import NavItems from './nav-items'

export default function DashboardShell({children}:{children:ReactNode}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)



  return (
    <div className='flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900'>
      {/* Sidebar for desktop */}
      <aside className='hidden w-64 overflow-y-auto border-r bg-white dark:bg-gray-800 md:block'>
        <div className='flex h-full flex-col'>
          <div className='flex h-14 items-center border-b px-4'>
            <Link href='#' className='flex items-center gap-2 font-semibold'>
              <ShoppingBag className='h-6 w-6' />
              <span>Life Is Grape</span>
            </Link>
          </div>
          <nav className='flex-1 space-y-2 px-2 py-4'>
            <NavItems />
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side='left' className='w-64 p-0'>
          <div className='flex h-full flex-col'>
            <div className='flex h-14 items-center border-b px-4'>
              <Link href='#' className='flex items-center gap-2 font-semibold'>
                <ShoppingBag className='h-6 w-6' />
                <span>Life Is Grape</span>
              </Link>
            </div>
            <nav className='flex-1 space-y-2 px-2 py-4'>
              <NavItems />
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header */}
        <header className='flx-row flex h-14 w-full items-center justify-between border-b bg-white px-4 dark:bg-gray-800'>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Toggle sidebar</span>
          </Button>
          <div className='flex flex-1 items-center justify-between gap-4'>
            <form className='hidden md:block'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-full appearance-none bg-white pl-8 dark:bg-gray-950 md:w-[300px]'
                />
              </div>
            </form>

            <UserButton />
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </div>
  )
}
