import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import WineDetail from "../_components/wine-detail";
import { Wine, WineType } from "@/lib/types";

const WinePage = async (props:{params: Promise<{id: Id<"wines">}>}) => {
  const params = await props.params;

  const {
    id
  } = params;

  const wine:Wine|null  = await fetchQuery(api.wines.getWine, { wine_id: id });

  if (!wine) {
    return <div>Wine not found</div>;
   }

  return <div>
    <WineDetail wine={wine} />
  </div>;
};
export default WinePage;
