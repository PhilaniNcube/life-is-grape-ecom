'use server'

import 'server-only'

import { Resend } from 'resend'
import OrderNotificationTemplate from '@/components/email/order-notification'
import { Doc } from '@/convex/_generated/dataModel'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderNotificationData {
  order: Doc<'orders'>
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
}

export async function sendOrderNotificationEmail({
  order,
  orderItems,
}: OrderNotificationData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Life Is Grape <shop@lifeisgrape.co.za>',
      to: ['wine@lifeisgrape.co.za'],
      subject: `New Order Placed - ${order._id} (Pending Payment)`,
      text: `
        New Order Notification
        
        Order ID: ${order._id}
        Customer: ${order.first_name} ${order.last_name}
        Email: ${order.email}
        Phone: ${order.phone}
        Total: R${order.total.toFixed(2)}
        Status: Pending Payment
        
        Shipping Address:
        ${order.shipping_address.street}
        ${order.shipping_address.city}, ${order.shipping_address.province}
        ${order.shipping_address.postal_code}
        
        Order Items:
        ${orderItems
          .map(
            item =>
              `- ${item.product.name} x${item.quantity} = R${(item.quantity * item.price_at_time).toFixed(2)}${
                item.gift_box
                  ? `\n  + Gift Box: ${item.gift_box.name} x${item.gift_box.quantity} = R${item.gift_box.price.toFixed(2)}`
                  : ''
              }`
          )
          .join('\n')}
        
        Subtotal: R${order.subtotal.toFixed(2)}
        Shipping: ${order.shipping === 0 ? 'Free' : `R${order.shipping.toFixed(2)}`}
        Total: R${order.total.toFixed(2)}
      `,
      react: OrderNotificationTemplate({
        orderId: order._id,
        customerName: `${order.first_name} ${order.last_name}`,
        customerEmail: order.email,
        customerPhone: order.phone,
        shippingAddress: order.shipping_address,
        orderItems: orderItems,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        orderDate: new Date(order._creationTime).toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }),
    })

    if (error) {
      console.error('Error sending order notification email:', error)
      return { success: false, error }
    }

    console.log('Order notification email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send order notification email:', error)
    return { success: false, error }
  }
}
