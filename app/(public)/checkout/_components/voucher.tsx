'use client'


import { applyGiftVoucherAction } from '@/actions/gift-voucher-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Id } from '@/convex/_generated/dataModel'
import { useTransition } from 'react'

const Voucher = ({
  code,
  setCode,
  setVoucherValue,
  order_id
}: {
  code: string
  setCode: (code: string) => void
  setVoucherValue: (value: number) => void
  order_id: Id<'orders'>
}) => {
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <Label htmlFor='gift-voucher'>Apply Gift Voucher</Label>
      <Input
        id='gift-voucher'
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <small className='block text-sm text-gray-500'>
        If you have a gift voucher, enter your gift voucher code to apply it to your order. The value will
        be deducted from your total.
      </small>
      <Button
        onClick={async () => {
          startTransition(async () => {
            const voucher = await applyGiftVoucherAction(order_id, code)
            console.log('Voucher:', voucher)

             if (voucher.error) {
              alert(voucher.error)
              return
            }
          })
        }}
        type='submit'
        className='mt-2 rounded bg-slate-800'
      >
        {isPending ? 'Applying...' : 'Apply'}
      </Button>
    </div>
  )
}
export default Voucher
