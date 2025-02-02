import { Id } from "@/convex/_generated/dataModel";
import ConfirmVoucherPayment from "../_components/confirm-voucher-payment";

const page = async ({params}:{params:Promise<{id:Id<"gift_vouchers">}>}) => {

  const { id } = await params;

  return <div>
    <ConfirmVoucherPayment id={id} />
  </div>;
};
export default page;
