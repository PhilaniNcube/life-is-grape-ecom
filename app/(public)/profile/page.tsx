import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import ProfileContent from './_components/profile-content'

const ProfilePage = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get the user from our database
  const user = await fetchQuery(api.users.getUser, { clerkUserId: userId })

  if (!user) {
    redirect('/sign-in')
  }

  // Get user's orders
  const orders = await fetchQuery(api.orders.getUserOrders, {
    userId: user._id,
  })

  return (
    <div className='container mx-auto py-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-3xl font-bold'>My Profile</h1>
        <ProfileContent user={user} orders={orders} />
      </div>
    </div>
  )
}

export default ProfilePage
