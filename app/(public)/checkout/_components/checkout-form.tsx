'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart-store-provider'
import { formatPrice } from '@/lib/utils'



export default function CheckoutForm() {

  const {cart, totalCartPrice} = useCartStore(state => state)
  const totalPrice = totalCartPrice()

  const shipping = 99
  const total = totalPrice + shipping

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>
      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='first_name'>First Name</Label>
                  <Input id='first_name' name='first_name' placeholder='John' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='last_name'>Last Name</Label>
                  <Input id='last_name' name='last_name' placeholder='Doe' />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                <Input id='address' name='address' placeholder='123 Main St' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input id='city' name='city' placeholder='Port Elizabeth' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='postal_code'>Postal Code</Label>
                  <Input
                    id='postal_code'
                    name='postal_code'
                    placeholder='10001'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {cart.map(item => (
                <div
                  key={`${item.product._id}-${item.variant._id}`}
                  className='flex justify-between'
                >
                  <span>
                    {item.product.name} &times; {item.quantity}
                  </span>
                  {item.giftBox ? (
                  <span>{formatPrice((item.product.price * item.quantity) + item.giftBox.price) }</span>
                  ) : (
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                  )}
                </div>
              ))}
              <Separator />
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold'>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className='w-full space-y-4'>
                <Button className='w-full rounded-none'>Proceed to Payment</Button>
                <p className='text-sm text-muted-foreground'>
                  You will be redirected to a secure payment gateway to complete
                  your order.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
