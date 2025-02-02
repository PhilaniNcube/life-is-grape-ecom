import { Id } from "@/convex/_generated/dataModel";

const page = async ({params}:{params:Promise<{id:Id<"gift_vouchers">}>}) => {

  const { id } = await params;

  return <div>pages</div>;
};
export default page;
