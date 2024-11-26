import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'

const page = async ({
  params,
}: {
  params: Promise<{ order_id: Id<'orders'> }>
}) => {
  const { order_id } = await params

  const order = await fetchQuery(api.orders.getOrder, { order_id })

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>
      <p>Order Status: {order.status}</p>
      <p>Order Total: {order.total}</p>
      <p>
        Name: {order.first_name} {order.last_name}
      </p>
      <p>Email: {order.email}</p>
      <p>Phone: {order.phone}</p>
      <p>
        Shipping Address: {order.shipping_address.street},{' '}
        {order.shipping_address.city}, {order.shipping_address.province},{' '}
        {order.shipping_address.postal_code}
      </p>
    </div>
  )
}
export default page
