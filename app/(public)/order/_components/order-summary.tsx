import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Doc } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { trackPurchase } from '@/lib/analytics'

type OrderSummaryProps = {
  order: Doc<'orders'>
  orderItems: Doc<'order_items'>[]
}

export default async function OrderSummary({
  order,
  orderItems,
}: OrderSummaryProps) {
  // check if there is a personalised label attached to the order
  const personalisedLabel = await fetchQuery(
    api.personalised_labels.getPersonalisedLabelByOrderId,
    {
      order_id: order._id,
    }
  )

  const statusColor = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    paid: 'bg-green-500',
    fulfilled: 'bg-purple-500',
    cancelled: 'bg-red-500',
  }

  return (
    <div className='container mx-auto space-y-6 p-4'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Order Summary</CardTitle>
            <Badge className={statusColor[order.status]}>{order.status}</Badge>
          </div>
          <p className='text-sm text-muted-foreground'>Order ID: {order._id}</p>
          {order.updated_at && (
            <p className='text-sm text-muted-foreground'>
              Last updated: {format(order.updated_at, 'PPP')}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className='grid gap-6 md:grid-cols-2'>
            <div>
              <h3 className='mb-2 font-semibold'>Customer Information</h3>
              <p>
                {order.first_name} {order.last_name}
              </p>
              <p>{order.email}</p>
              <p>{order.phone}</p>
            </div>
            <div>
              <h3 className='mb-2 font-semibold'>Shipping Address</h3>
              <p>{order.shipping_address.street}</p>
              <p>
                {order.shipping_address.city}, {order.shipping_address.province}
              </p>
              <p>{order.shipping_address.postal_code}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>

                <TableHead className='hidden md:block'>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    {item.product.name}
                    {item.gift_box && (
                      <div className='text-sm text-muted-foreground'>
                        Gift Box: {item.gift_box.name}{' '}
                        {formatPrice(item.gift_box.price)} &times;{' '}
                        {item.gift_box.quantity}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className='hidden md:block'>
                    {formatPrice(item.price_at_time)} &times; {item.quantity}
                  </TableCell>
                  <TableCell>
                    {formatPrice(item.quantity * item.price_at_time)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {personalisedLabel && (
        <Card>
          <CardHeader>
            <CardTitle>Personalised Label</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2'>
              <div>
                <h3 className='mb-2 font-semibold'>Label Information</h3>
                <p>Message: {personalisedLabel.message}</p>
              </div>
              <div>
                <h3 className='mb-2 font-semibold'>Uploaded Image</h3>
                <img
                  src={personalisedLabel.image!}
                  alt='Personalised Label'
                  className='w-48 object-cover'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.voucher_value && order.voucher_value > 0 && (
              <div className='flex justify-between text-green-600'>
                <span>Voucher Applied</span>
                <span>-{formatPrice(order.voucher_value)}</span>
              </div>
            )}
            <div className='flex flex-row justify-between'>
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>
                {order.voucher_value
                  ? formatPrice(
                      order.subtotal - order.voucher_value + order.shipping
                    )
                  : formatPrice(order.total)}
              </span>
            </div>
            <Separator className='my-3' />
            {order.payment_reference && (
              <div className='mt-4 flex flex-col justify-between md:flex-row'>
                <span className='text-lg font-bold'>Payment Reference</span>
                <span className='text-sm'>{order.payment_reference}</span>
              </div>
            )}
            {order.paid_at && (
              <div className='flex flex-col justify-between md:flex-row'>
                <span className='mt-4 text-lg font-bold'>Paid At</span>
                <span>{format(order.paid_at, 'PPP')}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
