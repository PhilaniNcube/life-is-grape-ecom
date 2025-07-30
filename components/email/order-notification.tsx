import {
  Button,
  Container,
  Html,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface OrderNotificationProps {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    province: string
    postal_code: string
  }
  orderItems: Array<{
    product: {
      name: string
    }
    quantity: number
    price_at_time: number
    gift_box?: {
      name: string
      price: number
      quantity: number
    }
  }>
  subtotal: number
  shipping: number
  total: number
  orderDate: string
}

const OrderNotificationTemplate = ({
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  orderItems,
  subtotal,
  shipping,
  total,
  orderDate,
}: OrderNotificationProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(price)
  }

  return (
    <Tailwind>
      <Container className='my-5 bg-slate-100 py-5'>
        <Text className='text-center text-2xl font-extrabold text-purple-800'>
          New Order Notification
        </Text>
        <Text className='text-center text-lg text-gray-600'>
          A new order has been placed and is pending payment
        </Text>

        <Section className='mt-5 rounded-lg bg-white p-5'>
          <Text className='mb-4 text-xl font-bold text-purple-800'>
            Order Details
          </Text>

          <div className='mb-4'>
            <Text className='font-semibold'>
              Order ID: <span className='font-normal'>{orderId}</span>
            </Text>
            <Text className='font-semibold'>
              Order Date: <span className='font-normal'>{orderDate}</span>
            </Text>
            <Text className='font-semibold text-orange-600'>
              Status: Pending Payment
            </Text>
          </div>
        </Section>

        <Section className='mt-3 rounded-lg bg-white p-5'>
          <Text className='mb-4 text-xl font-bold text-purple-800'>
            Customer Information
          </Text>

          <Text className='font-semibold'>
            Name: <span className='font-normal'>{customerName}</span>
          </Text>
          <Text className='font-semibold'>
            Email: <span className='font-normal'>{customerEmail}</span>
          </Text>
          <Text className='font-semibold'>
            Phone: <span className='font-normal'>{customerPhone}</span>
          </Text>

          <div className='mt-4'>
            <Text className='font-semibold'>Shipping Address:</Text>
            <Text className='ml-4 font-normal'>{shippingAddress.street}</Text>
            <Text className='ml-4 font-normal'>
              {shippingAddress.city}, {shippingAddress.province}
            </Text>
            <Text className='ml-4 font-normal'>
              {shippingAddress.postal_code}
            </Text>
          </div>
        </Section>

        <Section className='mt-3 rounded-lg bg-white p-5'>
          <Text className='mb-4 text-xl font-bold text-purple-800'>
            Order Items
          </Text>

          {orderItems.map((item, index) => (
            <div
              key={index}
              className='mb-3 border-b border-gray-200 pb-3 last:border-b-0'
            >
              <Text className='font-semibold'>{item.product.name}</Text>
              <Text className='text-gray-600'>
                Quantity: {item.quantity} × {formatPrice(item.price_at_time)} ={' '}
                {formatPrice(item.quantity * item.price_at_time)}
              </Text>
              {item.gift_box && (
                <Text className='text-sm text-purple-600'>
                  + Gift Box: {item.gift_box.name} × {item.gift_box.quantity} ={' '}
                  {formatPrice(item.gift_box.price)}
                </Text>
              )}
            </div>
          ))}
        </Section>

        <Section className='mt-3 rounded-lg bg-white p-5'>
          <Text className='mb-4 text-xl font-bold text-purple-800'>
            Order Summary
          </Text>

          <div className='border-t border-gray-200 pt-3'>
            <Text className='flex justify-between'>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </Text>
            <Text className='flex justify-between'>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </Text>
            <Text className='mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold'>
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </Text>
          </div>
        </Section>

        <Section className='mt-5 text-center'>
          <Text className='text-sm text-gray-600'>
            Please note: This order is pending payment. The customer will need
            to complete payment to confirm the order.
          </Text>
        </Section>
      </Container>
    </Tailwind>
  )
}

export default OrderNotificationTemplate
