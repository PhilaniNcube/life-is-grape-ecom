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
import { useRouter } from 'next/navigation'
import { CustomButton } from '@/components/ui'

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
    watch,
  } = useForm<CheckoutFormInputs>()

  const { cart, totalCartPrice, clearCart } = useCartStore(state => state)
  const totalPrice = totalCartPrice()

  const streetAddress = watch('street') || ''
  const city = watch('city') || ''

  const shipping =
    totalPrice > 2000
      ? 0
      : streetAddress.toLowerCase().includes('seaview') ||
          streetAddress.toLowerCase().includes('chelsea') ||
          streetAddress.toLowerCase().includes('rowallan park')
        ? 65
        : city.toLowerCase() === 'port elizabeth' ||
            city.toLowerCase() === 'gqeberha'
          ? 35
          : 150
  const total = totalPrice + shipping

  const addOrder = useMutation(api.orders.createOrder)

  const router = useRouter()

  // check if the cart items include a custom label product
  const customLabelProduct = cart.find(
    item => item.product.product_type === 'custom_label'
  )

  const onSubmit: SubmitHandler<CheckoutFormInputs> = async data => {
    const orderItems = cart.map(item => ({
      product: { id: item.product._id, name: item.product.name },
      quantity: item.quantity,
      price_at_time: item.product.price,
      gift_box: item.giftBox
        ? {
            name: item.giftBox.name,
            price: item.giftBox.price,
            description: item.giftBox.description,
            dimensions: item.giftBox.dimensions,
            quantity: item.giftBox.quantity,
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

      console.log('Creating order:', order)

      toast.success('Order placed successfully!')
      router.push(`/checkout/payment/${order}`)
      // Optionally, redirect or reset the form here
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      // Clear the cart
      // clearCart()
      toast.info('Please wait while order is being created!')
    }

    // Clear the cart
    // clearCart()
  }

  const applyVoucher = () => {}

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
                    {...register('first_name', {
                      required: 'First name is required',
                    })}
                    id='first_name'
                    placeholder='John'
                  />
                  {errors.first_name && (
                    <span className='text-sm text-red-500'>
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='last_name'>Last Name</Label>
                  <Input
                    id='last_name'
                    {...register('last_name', {
                      required: 'Last name is required',
                    })}
                    placeholder='Doe'
                  />
                  {errors.last_name && (
                    <span className='text-sm text-red-500'>
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    id='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className='text-sm text-red-500'>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    type='tel'
                    id='phone'
                    {...register('phone', {
                      required: 'Phone is required',
                    })}
                  />
                  {errors.phone && (
                    <span className='text-sm text-red-500'>
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='city'>Address</Label>
                <Input
                  id='city'
                  {...register('street', {
                    required: 'Address is required',
                  })}
                  placeholder='123 Main St'
                />
                {errors.street && (
                  <span className='text-sm text-red-500'>
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    {...register('city', {
                      required: 'City is required',
                    })}
                    placeholder='Port Elizabeth'
                  />
                  {errors.city && (
                    <span className='text-sm text-red-500'>
                      {errors.city.message}
                    </span>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='province'>Province</Label>
                  <Input
                    id='province'
                    {...register('province', {
                      required: 'Province is required',
                    })}
                  />
                  {errors.province && (
                    <span className='text-sm text-red-500'>
                      {errors.province.message}
                    </span>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='postal_code'>Postal Code</Label>
                  <Input
                    id='postal_code'
                    {...register('postal_code', {
                      required: 'Postal code is required',
                    })}
                    placeholder='10001'
                  />
                  {errors.postal_code && (
                    <span className='text-sm text-red-500'>
                      {errors.postal_code.message}
                    </span>
                  )}
                </div>
              </div>

              {customLabelProduct && (
                <div>
                  <Separator className='my-3' />
                  <h3 className='text-md font-semibold'>
                    Custom Label Information
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Please note that custom label orders have a minimum order
                    quantity of 6. On completion of your order, you will be
                    contacted by a member of our team to confirm your custom
                    label details.
                  </p>
                </div>
              )}
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
                  key={`${item.product._id}-${item.product._id}`}
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
                <CustomButton
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-none'
                >
                  Proceed to Payment
                </CustomButton>
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
