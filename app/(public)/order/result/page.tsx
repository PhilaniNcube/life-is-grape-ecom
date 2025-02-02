import { Suspense } from 'react'
import { PaymentStatus } from '../_components/payment-status'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function PaymentCallbackPage(props:{searchParams:SearchParams}) {
  const searchParams  = await props.searchParams
  // In a real-world scenario, you would verify the payment status with your payment gateway here
  const paymentStatus = searchParams.status === 'success' ? 'success' : 'failure'
  const reference = searchParams.reference as Id<'orders'> | Id<'gift_vouchers'>

  const orderRef = reference as Id<'orders'>

  const order = await fetchQuery(api.orders.getOrder, { order_id: orderRef })

  const giftVoucherRef = reference as Id<'gift_vouchers'>

  const giftVoucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, {
    id: giftVoucherRef,
  })





  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>Payment Status</h1>
      {order && (
        <Suspense fallback={<div>Loading gift voucher...</div>}>
          <PaymentStatus status={paymentStatus} order={order} />
        </Suspense>
      )}
      {giftVoucher && (
        <Suspense fallback={<div>Loading payment status...</div>}>
          <div>
            <h2 className='mb-4 text-lg font-bold'>Gift Voucher</h2>
            <p>
              <span className='font-bold'>Recipient:</span> {giftVoucher.recipient_email}
            </p>
            <p>
              <span className='font-bold'>Value:</span> {formatPrice(giftVoucher.value)}
            </p>
            <p>
              <span className='font-bold'>Voucher:</span> {giftVoucher.code}
            </p>
          </div>
        </Suspense>
      )}
    </div>
  )
}
