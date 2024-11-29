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
import { useCartStore } from '@/store/cart-store-provider'

export function PaymentStatus({ status, order }: { status: 'success' | 'failure', order:Doc<"orders"> | null }) {
  const router = useRouter()
  const {clearCart} = useCartStore(state => state)

  const handleContinue = () => {
    clearCart()
    router.push('/') // Redirect to home page or order confirmation page
  }

  const handleGoToOrder = () => {
    clearCart()
    router.push(`/order/${order?._id}`) // Redirect back to the checkout page
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>Order is being processed</CardTitle>
        <CardDescription className='text-center'>
          Your order is being processed, please look out for a confirmation
          email.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center py-6'>
        <CheckCircle2 className='h-16 w-16 text-green-500' />
      </CardContent>
      <CardFooter className='flex justify-center space-x-4'>
        <Button onClick={handleContinue}>Continue Shopping</Button>
        <Button onClick={handleGoToOrder}>View Order</Button>
      </CardFooter>
    </Card>
  )
}
