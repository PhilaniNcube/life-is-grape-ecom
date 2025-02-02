import { Suspense } from 'react'
import { PaymentStatus } from '../_components/payment-status'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function PaymentCallbackPage(props:{searchParams:SearchParams}) {
  const searchParams  = await props.searchParams
  // In a real-world scenario, you would verify the payment status with your payment gateway here
  const paymentStatus = searchParams.status === 'success' ? 'success' : 'failure'
  const reference = searchParams.reference as Id<'orders'>


  const order = await fetchQuery(api.orders.getOrder, { order_id: reference })

  if(!order) {
    return <div className='mx-auto container py-12'>
      <h1 className='text-2xl font-bold'>Order not found</h1>
      <p className='mt-4'>The order you are looking for does not exist.</p>
    </div>
  }



  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>Payment Status</h1>
      {order && (
        <Suspense fallback={<div>Loading gift voucher...</div>}>
          <PaymentStatus status={paymentStatus} order={order} />
        </Suspense>
      )}
    </div>
  )
}
