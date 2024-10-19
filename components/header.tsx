import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Navigation from './navigation'

export default async function Header() {
  const clerkUser = auth()

  const clerKUserId = clerkUser?.userId || ''

  const user = await fetchQuery(api.users.getUser, { clerkUserId: clerKUserId })

  return (
    <header className='py-4 container'>
     <Navigation user={user!} />
    </header>
  )
}
