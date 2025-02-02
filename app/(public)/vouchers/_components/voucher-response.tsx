import { updatePaymentStatus } from "@/actions/vouchers";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";

const VoucherResponse = async ({id}:{id:Id<"gift_vouchers">}) => {

   await updatePaymentStatus(id);
   const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, {
    id: id,
   })

  return (
    <div className='container mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>Payment Status</h1>
      {voucher && (
        <div>
          <h2 className='mb-4 text-lg font-bold'>Gift Voucher</h2>
          <p>
            <span className='font-bold'>Recipient:</span>{' '}
            {voucher.recipient_email}
          </p>
          <p>
            <span className='font-bold'>Value:</span>{' '}
            {formatPrice(voucher.value)}
          </p>
          <p>
            <span className='font-bold'>Voucher:</span> {voucher.code}
          </p>
        </div>
      )}
    </div>
  )
};
export default VoucherResponse;
