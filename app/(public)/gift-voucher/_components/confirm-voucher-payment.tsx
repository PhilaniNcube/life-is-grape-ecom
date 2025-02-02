import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

const ConfirmVoucherPayment = async ({id}:{id:Id<"gift_vouchers">}) => {

  const voucher = await fetchQuery(api.gift_vouchers.getGiftVoucher, { id });

  if(!voucher) {
    return <div className="mx-auto container">
      <h1 className="text-2xl font-bold">Voucher not found</h1>
    </div>;
  }

  return <div>ConfirmVoucherPayment</div>;
};
export default ConfirmVoucherPayment;
