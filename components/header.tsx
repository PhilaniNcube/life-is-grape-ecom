
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { auth } from '@clerk/nextjs/server'

import Navigation from './navigation'

export default async function PublicHeader() {
  const clerkUser =  await auth()

  const clerKUserId = clerkUser?.userId || ''

  const user = await fetchQuery(api.users.getUser, { clerkUserId: clerKUserId })



  return (
    <header className='py-4 w-full sticky top-0 z-50 shadow-md bg-white '>
     <Navigation user={user} />
    </header>
  )
}
