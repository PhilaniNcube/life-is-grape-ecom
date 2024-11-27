'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Doc } from '@/convex/_generated/dataModel'

export function PaymentStatus({ status, order }: { status: 'success' | 'failure', order:Doc<"orders"> | null }) {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/') // Redirect to home page or order confirmation page
  }

  const handleTryAgain = () => {
    router.push('/checkout') // Redirect back to the checkout page
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>
          {status === 'success' ? 'Payment Successful' : 'Payment Failed'}
        </CardTitle>
        <CardDescription className='text-center'>
          {status === 'success'
            ? 'Your payment has been processed successfully.'
            : 'There was an issue processing your payment.'}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center py-6'>
        {status === 'success' ? (
          <CheckCircle2 className='h-16 w-16 text-green-500' />
        ) : (
          <XCircle className='h-16 w-16 text-red-500' />
        )}
      </CardContent>
      <CardFooter className='flex justify-center space-x-4'>
        {status === 'success' ? (
          <Button onClick={handleContinue}>Continue Shopping</Button>
        ) : (
          <>
            <Button onClick={handleTryAgain} variant='outline'>
              Try Again
            </Button>
            <Button onClick={handleContinue}>Back to Home</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
