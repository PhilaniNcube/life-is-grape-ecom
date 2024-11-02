import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

type GiftPageParams = Promise<{id: Id<"gifts">}>

const GiftPage = async ({ params }: { params: Promise<{ id: Id<"gifts"> }> }) => {
  const { id } = await params

  const gift = await fetchQuery(api.gifts.getGift, { gift_id: id })

  return <div>GiftPage</div>
}
export default GiftPage;
