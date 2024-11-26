import { updateOrderStatus } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import PaymentForm from '../_components/payment-form'

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

  return <PaymentForm order={order} />
}
export default page
