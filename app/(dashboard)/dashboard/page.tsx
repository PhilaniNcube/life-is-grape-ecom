import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import OrdersAnalytics from './orders/_components/orders-analytics'
import { Suspense } from 'react'

const DashboardPage = async () => {




  return (
    <div className='@container'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <Separator className='my-2' />
      <Suspense
        fallback={
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
          </div>
        }
      >
        <OrdersAnalytics />
      </Suspense>
    </div>
  )
}
export default DashboardPage
