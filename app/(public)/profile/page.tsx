import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import ProfileContent from './_components/profile-content'
import { Id } from '@/convex/_generated/dataModel'

const ProfilePage = async () => {
  const { userId } = await auth()

  console.log('User ID:', userId)

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user's orders
  const orders = await fetchQuery(api.orders.getUserOrders, {
    userId: userId as string,
  })

  console.log('Orders:', orders)

  return (
    <div className='container mx-auto py-8'>
      <div className=''>
        <h1 className='mb-8 text-3xl font-bold'>My Profile</h1>
        <ProfileContent orders={orders} />
      </div>
    </div>
  )
}

export default ProfilePage
