import { Id } from "@/convex/_generated/dataModel";
import VoucherResponse from "../_components/voucher-response";

const page = async ({params}:{params:Promise<{id:Id<"gift_vouchers">}>}) => {

  const { id } = await params;

  return <div>
    <VoucherResponse id={id} />
  </div>;
};
export default page;
