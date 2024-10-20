import { fetchQuery } from "convex/nextjs";
import SuppliersHeader from "./_components/suppliers-header";
import { api } from "@/convex/_generated/api";
import WineryTable from "./_components/suppliers-table";

const SuppliersPage = async () => {

  const suppliers = await fetchQuery(api.wineries.getWineries)




  return <div>
    <SuppliersHeader />
    <WineryTable suppliers={suppliers} />
  </div>;
};
export default SuppliersPage;
