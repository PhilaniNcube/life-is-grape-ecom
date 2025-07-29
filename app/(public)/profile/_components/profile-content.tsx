'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Doc } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp, User, Package, Calendar } from 'lucide-react'

type ProfileContentProps = {
  orders: Doc<'orders'>[]
}

export default function ProfileContent({ orders }: ProfileContentProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const statusColor = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    paid: 'bg-green-500',
    fulfilled: 'bg-purple-500',
    cancelled: 'bg-red-500',
  }

  const statusLabel = {
    pending: 'Pending Payment',
    processing: 'Processing',
    paid: 'Paid',
    fulfilled: 'Fulfilled',
    cancelled: 'Cancelled',
  }

  return (
    <div className='space-y-8'>
      {/* Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            My Orders ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {orders.length === 0 ? (
            <div className='py-8 text-center'>
              <Package className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
              <p className='mb-4 text-muted-foreground'>No orders found</p>
              <Button asChild>
                <Link href='/products'>Start Shopping</Link>
              </Button>
            </div>
          ) : (
            orders.map(order => (
              <Card key={order._id} className='border'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Badge className={statusColor[order.status]}>
                        {statusLabel[order.status]}
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        Order #{order._id.slice(-8)}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>
                        {formatPrice(order.total)}
                      </span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => toggleOrderExpansion(order._id)}
                      >
                        {expandedOrders.has(order._id) ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Calendar className='h-4 w-4' />
                    <span>Ordered on {format(order._creationTime, 'PPP')}</span>
                    {order.paid_at && (
                      <span>• Paid on {format(order.paid_at, 'PPP')}</span>
                    )}
                  </div>
                </CardHeader>

                {expandedOrders.has(order._id) && (
                  <CardContent className='pt-0'>
                    <Separator className='mb-4' />
                    <div className='space-y-4'>
                      {/* Shipping Address */}
                      <div>
                        <h4 className='mb-2 font-semibold'>Shipping Address</h4>
                        <div className='text-sm text-muted-foreground'>
                          <p>{order.shipping_address.street}</p>
                          <p>
                            {order.shipping_address.city},{' '}
                            {order.shipping_address.province}
                          </p>
                          <p>{order.shipping_address.postal_code}</p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className='mb-2 font-semibold'>Order Summary</h4>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Subtotal:</span>
                            <span>{formatPrice(order.subtotal)}</span>
                          </div>
                          {order.voucher_value && order.voucher_value > 0 && (
                            <div className='flex justify-between text-green-600'>
                              <span>Voucher Applied:</span>
                              <span>-{formatPrice(order.voucher_value)}</span>
                            </div>
                          )}
                          <div className='flex justify-between'>
                            <span>Shipping:</span>
                            <span>{formatPrice(order.shipping)}</span>
                          </div>
                          <Separator />
                          <div className='flex justify-between font-semibold'>
                            <span>Total:</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Reference */}
                      {order.payment_reference && (
                        <div>
                          <h4 className='mb-2 font-semibold'>
                            Payment Reference
                          </h4>
                          <p className='text-sm text-muted-foreground'>
                            {order.payment_reference}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className='flex gap-2 pt-2'>
                        <Button asChild variant='outline' size='sm'>
                          <Link href={`/order/${order._id}`}>View Details</Link>
                        </Button>
                        {order.status === 'pending' && (
                          <Button asChild size='sm'>
                            <Link href={`/checkout/payment/${order._id}`}>
                              Complete Payment
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
