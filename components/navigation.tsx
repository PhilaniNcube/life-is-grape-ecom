'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Doc } from '@/convex/_generated/dataModel'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Cart from './cart'
import Image from 'next/image'

const routes = [
  { name: 'Wines', href: '/wines' },
  { name: 'Spirits', href: '/spirits' },
  { name: 'Shop', href: '/products' },
  { name: 'Gifting', href: '/gifting' },
  { name: 'Sale', href: '/sale' },
  // { name: 'Wine Tasting', href: '/wine-tasting' },
]

export default function Navigation({ user }: { user: Doc<'users'> | null }) {
  return (
    <header className='sticky top-0 z-50 w-full flex-1 lg:px-0 container'>
      <div className='flex h-16 items-center lg:px-0'>
        <div className='flex flex-1 items-center justify-end gap-6'>
          <div className='flex flex-1 flex-row justify-start'>
            <MainNav />
            <MobileNav />
            <Link href='/' className='md:hidden flex items-center space-x-2'>
              <Image
                src='https://quiet-caterpillar-834.convex.cloud/api/storage/f73007fc-e4e4-4ab6-a05d-e21895641152'
                width={500}
                height={194}
                className='w-[80px] object-cover'
                alt='Life Is Grape'
              />
              <span className='sr-only hidden font-bold sm:inline-block'>
                Life Is Grape
              </span>
            </Link>
          </div>

          <SignedOut>
            <SignInButton >
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user?.role === 'admin' && <Link href='/dashboard'>Dashboard</Link>}
            <UserButton />
          </SignedIn>
        </div>
        <div className='relative ml-3'>
          <Cart />
        </div>
      </div>
    </header>
  )
}

function MainNav() {
  return (
    <div className='mr-4 hidden w-full md:flex md:justify-between'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <Image
          src='https://quiet-caterpillar-834.convex.cloud/api/storage/f73007fc-e4e4-4ab6-a05d-e21895641152'
          width={500}
          height={194}
          className='w-[200px] object-cover'
          alt='Life Is Grape'
        />
        <span className='sr-only hidden font-bold sm:inline-block'>
          Life Is Grape
        </span>
      </Link>
      <nav className='flex flex-1 items-center justify-end space-x-6 font-medium'>
        {routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className='md:text-md text-sm text-foreground/60 transition-colors hover:text-foreground/80'
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className=''>
        <Button
          variant='ghost'
          role='button'
          aria-describedby='menu'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <SheetTitle>
          <Link
            href='/'
            className='flex items-center'
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src='https://quiet-caterpillar-834.convex.cloud/api/storage/f73007fc-e4e4-4ab6-a05d-e21895641152'
              width={500}
              height={194}
              className='w-[100px] object-cover'
              alt='Life Is Grape'
            />
            <span className='sr-only font-bold'>Life Is Grape</span>
          </Link>
        </SheetTitle>
        <nav className='mt-6 flex flex-col space-y-3'>
          {routes.map(route => (
            <Link
              onClick={() => setIsOpen(!isOpen)}
              key={route.href}
              href={route.href}
              className='text-muted-foreground transition-colors hover:text-foreground'
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
