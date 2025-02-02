import { updatePaymentStatus } from "@/actions/vouchers";
import { littlepot } from "@/app/fonts";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn, formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";

const VoucherResponse = async ({id}:{id:Id<"gift_vouchers">}) => {

   await updatePaymentStatus(id);
   const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, {
    id: id,
   })

  return (
    <div className='container mx-auto py-10'>
      <h1 className={cn('mb-4 text-2xl font-bold', littlepot.className)}>
        Payment Status
      </h1>
      {voucher && (
        <div className='grid gap-6 md:grid-cols-2'>
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
          <div>
            <h2 className='mb-4 text-lg font-bold'>Payment Status</h2>
            <p>
              <span className='font-bold'>Status:</span>{' '}
              {voucher.paid ? 'Paid' : 'Not Paid'}
            </p>
            <p>
              <span className='font-bold'>Redeemed:</span>{' '}
              {voucher.redeemed ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
};
export default VoucherResponse;
