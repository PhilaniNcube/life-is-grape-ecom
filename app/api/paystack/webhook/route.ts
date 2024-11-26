// write a nextjs route handler webhook to verify payments from paystack
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET;
  const hash = req.headers.get('x-paystack-signature');



  if (hash === secret) {
    // handle payment verification
    return NextResponse.json({ status: 'success' });
  } else {
    return NextResponse.json({ status: 'error' });
  }
}
