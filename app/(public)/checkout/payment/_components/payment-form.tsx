'use client'

import { Doc } from '@/convex/_generated/dataModel'
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
import { formatPrice } from '@/lib/utils'
import { startTransition, useActionState, useState } from 'react'
import { useCartStore } from '@/store/cart-store-provider'
import Voucher from '../../_components/voucher'

const PaymentForm = ({ order }: { order: Doc<'orders'> }) => {
  const [state, formAction, isPending] = useActionState(updateOrderStatus, null)
  const { clearCart } = useCartStore(state => state)

  const [code, setCode] = useState('')
  const [voucherValue, setVoucherValue] = useState(0)

  const orderTotal = order.voucher_value
    ? order.subtotal - order.voucher_value + order.shipping
    : order.total

  return (
    <div className='my-8'>
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <h3 className='font-semibold'>Customer Details</h3>
            <div>
              <p className='font-medium'>
                {order.first_name} {order.last_name}
              </p>
              <p>{order.shipping_address.street}</p>
              <p>{order.shipping_address.city}</p>
              <p>{order.shipping_address.postal_code}</p>
              <p>{order.shipping_address.province}</p>
            </div>
          </div>
          <Separator />
          <Voucher
            code={code}
            setCode={setCode}
            setVoucherValue={setVoucherValue}
            order_id={order._id}
          />
          <div className='space-y-2'>
            {order.voucher_value && (
              <div className='flex justify-between bg-blue-600 text-white p-2'>
                <small>Voucher</small>
                <small>{formatPrice(order.voucher_value)}</small>
              </div>
            )}
            <div className='flex justify-between'>
              <span>Subtotal</span>

              <div className='flex flex-col'>
                <small className='text-red-600 line-through'>
                  {formatPrice(order.subtotal)}
                </small>
                <small>
                  {order.voucher_value &&
                    formatPrice(order.subtotal - order.voucher_value)}
                </small>
              </div>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
          </div>

          <form
            action={() => {
              const data = new FormData()

              data.append('order_id', order._id)
              data.append('email', order.email)
              data.append('amount', orderTotal.toString())

              startTransition(() => {
                formAction(data)
                // clearCart()
              })
            }}
            className=''
          >
            <Button
              disabled={isPending}
              className='w-full rounded-none'
              size='lg'
            >
              Confirm Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default PaymentForm
