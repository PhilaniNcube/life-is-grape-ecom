import OrderSummary from '@/app/(public)/order/_components/order-summary'
import { Button } from '@/components/ui/button'
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
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Order Details</h1>
        <div className="flex gap-x-3">
          <Button>Update Order Status</Button>
        </div>
      </div>
      <OrderSummary order={order} orderItems={orderItems} />
    </div>
  )
}
export default page
