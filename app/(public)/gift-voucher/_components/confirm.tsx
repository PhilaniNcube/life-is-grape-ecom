"use client";

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Doc } from '@/convex/_generated/dataModel';
import { giftVoucherPayment } from '@/actions/vouchers';
import { formatPrice } from '@/lib/utils';


interface GiftVoucherConfirmationProps {
  voucher: Doc<'gift_vouchers'>

}

export default function GiftVoucherConfirmation({
  voucher,
}: GiftVoucherConfirmationProps) {

  const [isPending, startTransition] = useTransition()




  return (
    <Card className='mx-auto w-full max-w-md py-16'>
      <CardHeader>
        <CardTitle>Gift Voucher Confirmation</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className='space-y-2'>
          <div className='flex justify-between'>
            <dt className='font-semibold'>Voucher Code:</dt>
            <dd>{voucher.code}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='font-semibold'>Value:</dt>
            <dd>{formatPrice(voucher.value)}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='font-semibold'>Purchaser Email:</dt>
            <dd>{voucher.purchaser_email}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='font-semibold'>Recipient Email:</dt>
            <dd>{voucher.recipient_email}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='font-semibold'>Payment Status:</dt>
            <dd>{voucher.paid ? 'Paid' : 'Unpaid'}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            startTransition(() => {
              giftVoucherPayment(voucher._id)
            })
          }}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Confirming...' : 'Confirm and Pay'}
        </Button>
      </CardFooter>
    </Card>
  )
}
