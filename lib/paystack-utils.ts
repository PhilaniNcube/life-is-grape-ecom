import { PaystackVerificationResponse } from '@/lib/types'

/**
 * Utility functions for Paystack payment verification
 */

export const PaystackUtils = {
  /**
   * Verify a transaction with Paystack
   */
  async verifyTransaction(
    reference: string
  ): Promise<PaystackVerificationResponse> {
    try {
      const response = await fetch(`/api/verify-payment?orderId=${reference}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error verifying transaction:', error)
      return {
        status: false,
        message: 'Failed to verify transaction',
      }
    }
  },

  /**
   * Check if a transaction was successful
   */
  isTransactionSuccessful(
    verificationData: PaystackVerificationResponse
  ): boolean {
    return (
      verificationData.status && verificationData.data?.status === 'success'
    )
  },

  /**
   * Format Paystack amount (from kobo/cents to main currency)
   */
  formatAmount(amount: number, currency: string = 'ZAR'): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100)
  },

  /**
   * Get human-readable transaction status
   */
  getTransactionStatusLabel(status: string): string {
    const statusLabels: Record<string, string> = {
      success: 'Successful',
      failed: 'Failed',
      abandoned: 'Abandoned',
      pending: 'Pending',
      ongoing: 'Processing',
      reversed: 'Reversed',
    }

    return statusLabels[status] || status
  },

  /**
   * Get status badge variant for UI components
   */
  getStatusVariant(
    status: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case 'success':
        return 'default'
      case 'failed':
      case 'reversed':
        return 'destructive'
      case 'pending':
      case 'ongoing':
        return 'secondary'
      default:
        return 'outline'
    }
  },
}
