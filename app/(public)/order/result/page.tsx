import { Suspense } from 'react'
import { PaymentStatus } from '../_components/payment-status'


export default function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // In a real-world scenario, you would verify the payment status with your payment gateway here
  const paymentStatus =
    searchParams.status === 'success' ? 'success' : 'failure'

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>Payment Status</h1>
      <Suspense fallback={<div>Loading payment status...</div>}>
        <PaymentStatus status={paymentStatus} />
      </Suspense>
    </div>
  )
}
