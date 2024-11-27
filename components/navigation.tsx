'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Doc } from '@/convex/_generated/dataModel'
import { ThemeToggle } from './theme-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Cart from './cart'

const routes = [
  { name: 'Wines', href: '/wines' },
  { name: 'Spirits', href: '/spirits' },
  { name: 'Shop', href: '/products' },
  { name: 'Gifting', href: '/gifting' },

]

export default function Navigation({user}:{user:Doc<"users"> | null}) {



  return (
    <header className='sticky top-0 z-50 w-full lg:px-0'>
      <div className='flex h-16 items-center lg:px-0'>
        <MainNav />
        <MobileNav />
        <div className='flex flex-1 items-center justify-end gap-6'>
          <ThemeToggle />

          <SignedOut>
            <SignInButton mode='modal'>
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
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <span className='hidden font-bold sm:inline-block'>Life Is Grape</span>
      </Link>
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        {routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className='text-foreground/60 transition-colors hover:text-foreground/80'
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
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <Link
          href='/'
          className='flex items-center'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='font-bold'>Life Is Grape</span>
        </Link>
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
