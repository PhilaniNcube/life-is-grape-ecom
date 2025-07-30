# Payment Verification with Paystack

This implementation provides a comprehensive payment verification system using Paystack's verification API.

## Features

### 1. Server Actions (`actions/orders.ts`)
- `verifyPaystackTransaction(reference: string)` - Direct API call to Paystack
- `verifyOrderPayment(orderId: Id<'orders'>)` - Complete order payment verification with status update

### 2. API Routes (`app/api/verify-payment/route.ts`)
- `POST /api/verify-payment` - Verify payment via JSON body
- `GET /api/verify-payment?orderId=xxx` - Verify payment via query parameter

### 3. UI Components
- `PaymentVerifier` - React component for manual payment verification
- Dashboard page at `/dashboard/verify-payment`

### 4. Utility Functions (`lib/paystack-utils.ts`)
- Helper functions for formatting amounts, status labels, and UI variants
- Client-side verification utilities

## Usage Examples

### Server-Side Verification
```typescript
import { verifyOrderPayment } from '@/actions/orders'

// Verify payment and update order status
const result = await verifyOrderPayment(orderId)
if (result.success) {
  console.log('Payment verified:', result.data)
}
```

### API Usage
```typescript
// POST request
const response = await fetch('/api/verify-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderId: 'order_id_here' })
})

// GET request
const response = await fetch('/api/verify-payment?orderId=order_id_here')
```

### Client-Side Utilities
```typescript
import { PaystackUtils } from '@/lib/paystack-utils'

// Verify transaction
const result = await PaystackUtils.verifyTransaction(reference)

// Format amount
const formattedAmount = PaystackUtils.formatAmount(40333) // "R403.33"

// Check if successful
const isSuccess = PaystackUtils.isTransactionSuccessful(result)
```

## Response Format

The Paystack verification API returns the following structure:

```typescript
{
  status: boolean
  message: string
  data?: {
    id: number
    status: string // 'success', 'failed', 'pending', etc.
    reference: string
    amount: number // in kobo/cents
    currency: string
    paid_at: string
    gateway_response: string
    customer: {
      email: string
      // ... other customer fields
    }
    authorization: {
      last4: string
      brand: string
      bank: string
      // ... other card details
    }
    // ... other transaction details
  }
}
```

## Transaction Statuses

- `success` - Payment completed successfully
- `failed` - Payment failed
- `abandoned` - Customer abandoned the payment
- `pending` - Payment is still being processed
- `ongoing` - Payment is in progress
- `reversed` - Payment was reversed/refunded

## Integration Points

1. **Order Creation**: Use order `_id` as the Paystack reference
2. **Webhook Processing**: Verify payments in webhook handlers
3. **Manual Verification**: Admin dashboard for manual checks
4. **Status Updates**: Automatically update order status when payment is verified

## Environment Variables Required

```env
PAYSTACK_SECRET=your_paystack_secret_key
```

## Security Notes

- All verification calls use the secret key on the server side
- Never expose secret keys to the client
- The verification endpoint validates transactions against Paystack directly
- Order status is only updated when Paystack confirms the payment
