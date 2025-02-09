import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import React from 'react'
import VoucherTable from './_components/voucher-table'

const VouchersPage = async () => {

  const vouchers = await fetchQuery(api.gift_vouchers.getGiftVouchers, {})

  return (
    <div>
        <VoucherTable vouchers={vouchers} />
    </div>
  )
}

export default VouchersPage