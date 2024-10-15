import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'


export default async function Header() {

  const clerkUser = auth()

  const clerKUserId = clerkUser?.userId || ''

 const user = await fetchQuery(api.users.getUser, { clerkUserId: clerKUserId })


  return (
    <header className='py-4'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-10 text-sm font-medium items-center'>
          <li>
            <Link href='/'>
             <Image src="/images/life-is-grape-logo.png" alt="logo" width={532} height={222} className="w-44 object-cover" />
            </Link>
          </li>
          <li>
            <Link href='/wines'>Wines</Link>
          </li>
          <li>
            <Link href='/tasting-experiences'>Tasting Experiences</Link>
          </li>
          <li>
            <Link href='/blog'>Blog</Link>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />

          <SignedOut>
            <SignInButton mode='modal'>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user?.role === 'admin' && (
              <Link href="/dashboard">
                Dashboard
              </Link>
            )}
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
