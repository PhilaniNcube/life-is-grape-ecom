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
import { startTransition, useActionState } from 'react'
import { useCartStore } from '@/store/cart-store-provider'

const PaymentForm = ({ order }: { order: Doc<'orders'> }) => {
  const [state, formAction, isPending] = useActionState(updateOrderStatus, null)
   const { clearCart } = useCartStore(state => state)

  return (
    <form
      action={() => {
        const data = new FormData()

        data.append('order_id', order._id)
        data.append('email', order.email)
        data.append('amount', order.total.toString())

        startTransition(() => {
          formAction(data)
          // clearCart()
        })
      }}
      className='container mx-auto py-10'
    >
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
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isPending}
            className='w-full rounded-none'
            size='lg'
          >
            Confirm Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
export default PaymentForm
