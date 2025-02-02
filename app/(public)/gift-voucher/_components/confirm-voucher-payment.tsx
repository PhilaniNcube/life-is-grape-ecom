import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import GiftVoucherConfirmation from './confirm'

const ConfirmVoucherPayment = async ({ id }: { id: Id<'gift_vouchers'> }) => {
  const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, { id })

  if (!voucher) {
    return (
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold'>Voucher not found</h1>
      </div>
    )
  }

  return (
    <div>
      <GiftVoucherConfirmation voucher={voucher} />
    </div>
  )
}
export default ConfirmVoucherPayment
