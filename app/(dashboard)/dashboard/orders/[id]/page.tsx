import OrderSummary from '@/app/(public)/order/_components/order-summary'
import { Button } from '@/components/ui/button'
import PaymentVerifier from '@/components/payment-verifier'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'

const page = async ({ params }: { params: Promise<{ id: Id<'orders'> }> }) => {
  const orderId = (await params).id

  const orderData = fetchQuery(api.orders.getOrder, { order_id: orderId })
  const orderItemsData = fetchQuery(api.order_items.getOrderItemsByOrderId, {
    orderId: orderId,
  })

  const [order, orderItems] = await Promise.all([orderData, orderItemsData])

  if (order === null || orderItems === null) {
    return null
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Order Details</h1>
        <div className='flex gap-x-3'>
          <Button>Fulfil Order</Button>
          <Button variant='destructive'>Cancel Order</Button>
        </div>
      </div>

      <OrderSummary order={order} orderItems={orderItems} />

      <div className='mt-8'>
        <h2 className='mb-4 text-2xl font-bold'>Payment Verification</h2>
        <PaymentVerifier
          initialOrderId={order._id}
          autoVerify={order.status === 'pending'}
        />
      </div>
    </div>
  )
}
export default page
