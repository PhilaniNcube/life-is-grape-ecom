import PaymentVerifier from '@/components/payment-verifier'

export default function VerifyPaymentPage() {
  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Payment Verification</h1>
        <p className='mt-2 text-muted-foreground'>
          Verify the payment status of orders using Paystack's verification API.
        </p>
      </div>

      <PaymentVerifier />
    </div>
  )
}
