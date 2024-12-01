
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



type OrderSummaryProps = {
  order: Doc<"orders">
  orderItems: Doc<"order_items">[]
}

export default function OrderSummary({ order, orderItems }: OrderSummaryProps) {


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
              Last updated: {format(order.updated_at, "PPP")}
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
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
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
                        Gift Box: {item.gift_box.name}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price_at_time}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.price_at_time)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            {order.payment_reference && (
              <div className='flex justify-between'>
                <span>Payment Reference</span>
                <span>{order.payment_reference}</span>
              </div>
            )}
            {order.paid_at && (
              <div className='flex justify-between'>
                <span>Paid At</span>
                <span>{format(order.paid_at, "PPP")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}