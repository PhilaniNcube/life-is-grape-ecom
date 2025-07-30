'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface VerificationResult {
  success: boolean
  message: string
  data: any
}

interface PaymentVerifierProps {
  /** Initial order ID to pre-fill the input field */
  initialOrderId?: string
  /** Whether to automatically verify the payment on component mount */
  autoVerify?: boolean
}

/**
 * PaymentVerifier Component
 *
 * Provides a UI for verifying Paystack payment transactions.
 * Can be used standalone or integrated into other pages with pre-filled order IDs.
 *
 * @param initialOrderId - Pre-fills the order ID input field
 * @param autoVerify - Automatically triggers verification on mount when initialOrderId is provided
 */

export default function PaymentVerifier({
  initialOrderId = '',
  autoVerify = false,
}: PaymentVerifierProps) {
  const [orderId, setOrderId] = useState(initialOrderId)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  // Auto-verify on mount if initialOrderId is provided and autoVerify is true
  useEffect(() => {
    if (initialOrderId && autoVerify && !result) {
      handleVerify()
    }
  }, [initialOrderId, autoVerify])

  const handleVerify = async () => {
    if (!orderId.trim()) {
      toast.error('Please enter an order ID')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: orderId.trim() }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast.success('Payment verification completed')
      } else {
        toast.error('Payment verification failed')
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      toast.error('Failed to verify payment')
      setResult({
        success: false,
        message: 'Network error occurred',
        data: null,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount / 100) // Paystack amounts are in kobo/cents
  }

  return (
    <div className='mx-auto max-w-2xl space-y-6 p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Payment Verification</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label htmlFor='orderId'>Order ID / Reference</Label>
            <div className='mt-1 flex gap-2'>
              <Input
                id='orderId'
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder='Enter order ID or payment reference'
                disabled={loading}
              />
              <Button
                onClick={handleVerify}
                disabled={loading || !orderId.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              {result.success ? (
                <CheckCircle className='h-5 w-5 text-green-600' />
              ) : (
                <XCircle className='h-5 w-5 text-red-600' />
              )}
              Verification Result
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Badge variant={result.success ? 'default' : 'destructive'}>
                {result.success ? 'Success' : 'Failed'}
              </Badge>
              <p className='mt-2 text-sm text-muted-foreground'>
                {result.message}
              </p>
            </div>

            {result.success && result.data && (
              <>
                <Separator />
                <div className='grid gap-4 md:grid-cols-2'>
                  <div>
                    <h4 className='mb-2 font-semibold'>Transaction Details</h4>
                    <div className='space-y-1 text-sm'>
                      <p>
                        <strong>Status:</strong>{' '}
                        <Badge
                          variant={
                            result.data.status === 'success'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {result.data.status}
                        </Badge>
                      </p>
                      <p>
                        <strong>Reference:</strong> {result.data.reference}
                      </p>
                      <p>
                        <strong>Amount:</strong>{' '}
                        {formatAmount(result.data.amount)}
                      </p>
                      <p>
                        <strong>Currency:</strong> {result.data.currency}
                      </p>
                      <p>
                        <strong>Channel:</strong> {result.data.channel}
                      </p>
                      <p>
                        <strong>Gateway Response:</strong>{' '}
                        {result.data.gateway_response}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className='mb-2 font-semibold'>Customer Details</h4>
                    <div className='space-y-1 text-sm'>
                      <p>
                        <strong>Email:</strong> {result.data.customer?.email}
                      </p>
                      {result.data.customer?.first_name && (
                        <p>
                          <strong>Name:</strong>{' '}
                          {result.data.customer.first_name}{' '}
                          {result.data.customer.last_name}
                        </p>
                      )}
                      <p>
                        <strong>Customer Code:</strong>{' '}
                        {result.data.customer?.customer_code}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />
                <div>
                  <h4 className='mb-2 font-semibold'>Payment Timeline</h4>
                  <div className='space-y-1 text-sm'>
                    <p>
                      <strong>Created:</strong>{' '}
                      {new Date(result.data.created_at).toLocaleString()}
                    </p>
                    <p>
                      <strong>Paid:</strong>{' '}
                      {new Date(result.data.paid_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {result.data.authorization && (
                  <>
                    <Separator />
                    <div>
                      <h4 className='mb-2 font-semibold'>Payment Method</h4>
                      <div className='space-y-1 text-sm'>
                        <p>
                          <strong>Card:</strong> **** **** ****{' '}
                          {result.data.authorization.last4}
                        </p>
                        <p>
                          <strong>Brand:</strong>{' '}
                          {result.data.authorization.brand?.toUpperCase()}
                        </p>
                        <p>
                          <strong>Bank:</strong>{' '}
                          {result.data.authorization.bank}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
