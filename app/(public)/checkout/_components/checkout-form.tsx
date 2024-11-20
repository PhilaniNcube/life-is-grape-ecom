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
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

interface CheckoutFormInputs {
  first_name: string
  last_name: string
  phone: string
  email: string
  street: string
  city: string
  province: string
  postal_code: string
}

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInputs>()

  const { cart, totalCartPrice, clearCart } = useCartStore(state => state)
  const totalPrice = totalCartPrice()

  const shipping = totalPrice > 1500 ? 0 : 150
  const total = totalPrice + shipping

  const addOrder = useMutation(api.orders.createOrder)

  const onSubmit: SubmitHandler<CheckoutFormInputs> = async data => {
    const orderItems = cart.map(item => ({
      product: { id: item.product._id, name: item.product.name },
      quantity: item.quantity,
      price_at_time: item.variant.price || item.product.price,
      variant: {
        id: item.variant._id,
        volume: item.variant.volume,
        price: item.variant.price,
      },
      gift_box: item.giftBox
        ? {
            name: item.giftBox.name,
            price: item.giftBox.price,
            description: item.giftBox.description,
            dimensions: item.giftBox.dimensions,
          }
        : undefined,
    }))

    try {
      const order = await addOrder({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        status: 'pending',
        street: data.street,
        city: data.city,
        province: data.province,
        postal_code: data.postal_code,
        subtotal: totalPrice,
        shipping: shipping,
        total: total,
        order_items: orderItems,
      })

      if (!order) {
        console.log('Failed to create order', order)
        throw new Error('Failed to create order')
      }

      toast.success('Order placed successfully!')
      redirect(`/checkout/payment?order_id=${order}`)
      // Optionally, redirect or reset the form here
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      // Clear the cart
      // clearCart()
    }

    // Clear the cart
    // clearCart()
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-8 lg:grid-cols-2'
      >
        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='first_name'>First Name</Label>
                  <Input
                    {...register('first_name')}
                    id='first_name'
                    placeholder='John'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='last_name'>Last Name</Label>
                  <Input
                    id='last_name'
                    {...register('last_name')}
                    placeholder='Doe'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    id='email'
                    {...register('email')}
                    placeholder='Doe'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  {...register('street')}
                  name='address'
                  placeholder='123 Main St'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    {...register('city')}
                    placeholder='Port Elizabeth'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='postal_code'>Postal Code</Label>
                  <Input
                    id='postal_code'
                    {...register('postal_code')}
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
                    <span>
                      {formatPrice(
                        item.product.price * item.quantity + item.giftBox.price
                      )}
                    </span>
                  ) : (
                    <span>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
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
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold'>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className='w-full space-y-4'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-none'
                >
                  Proceed to Payment
                </Button>
                <p className='text-sm text-muted-foreground'>
                  You will be redirected to a secure payment gateway to complete
                  your order.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
