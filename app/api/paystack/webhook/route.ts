// write a nextjs route handler webhook to verify payments from paystack

import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.PAYSTACK_SECRET;
  const hash = req.headers['x-paystack-signature'];

  if (hash === secret) {
    // handle payment verification
    res.status(200).json({ status: 'success' });
  } else {
    res.status(401).json({ status: 'unauthorized' });
  }
}
