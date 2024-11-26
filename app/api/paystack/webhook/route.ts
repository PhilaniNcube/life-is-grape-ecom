import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET
  const hash = req.headers.get('x-paystack-signature')

  const event = await req.json()

  // Example: Verify the hash using HMAC (adjust as needed)
  const computedHash = crypto
    .createHmac('sha512', secret!)
    .update(JSON.stringify(event))
    .digest('hex')

  if (hash === computedHash) {
    // Handle the verified event here
   console.log(event)
    return NextResponse.json(
      { status: 200 },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    )
  } else {
    console.error('Invalid webhook signature')
    return NextResponse.json({ status: 400 }, { status: 400 })
  }
}
