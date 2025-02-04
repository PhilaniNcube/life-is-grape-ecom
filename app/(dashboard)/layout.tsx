import { ReactNode } from 'react'
import DashboardShell from './_components/dashboard-shell'
import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { redirect } from 'next/navigation'


const DashboardLayout = async ({ children }: { children: ReactNode }) => {

    const clerkUser = await auth()

    const clerKUserId = clerkUser?.userId || ''

    const user = await fetchQuery(api.users.getUser, {
      clerkUserId: clerKUserId,
    })

    if (!user || user.role !== 'admin') {
      redirect('/sign-in')
    }

  return <DashboardShell>{children}</DashboardShell>
}
export default DashboardLayout
