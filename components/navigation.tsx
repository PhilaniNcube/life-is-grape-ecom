'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Doc } from '@/convex/_generated/dataModel'
import { ThemeToggle } from './theme-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const routes = [
  { name: 'Tasting Experiences', href: '/tasting-experiences' },
  { name: 'Wines', href: '/wines' },
  { name: 'Liquor', href: '/items' },
  { name: 'Gifting', href: '/gifting' },
  { name: 'Blog', href: '/blog' },
]

export default function Navigation({user}:{user:Doc<"users">}) {


  return (
    <header className='sticky top-0 z-50 w-full lg:px-0'>
      <div className='lg:px-0 flex h-16 items-center'>
        <MainNav />
        <MobileNav />
        <div className='flex items-center justify-end gap-6 flex-1'>
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

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <User className='h-5 w-5' />
          <span className='sr-only'>User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>John Doe</p>
            <p className='text-xs leading-none text-muted-foreground'>
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
