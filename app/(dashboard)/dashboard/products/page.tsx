import { fetchQuery } from "convex/nextjs";
import DashboardProductsHeader from "./_components/dashboard-products-header";
import WineTable from "./_components/wine-table";
import { api } from "@/convex/_generated/api";
import { Wine } from "@/lib/types";



const DashboardProductsPage = async () => {

  const wines: Wine[] = await fetchQuery(api.wines.getWines);

  return (
    <div>
      <DashboardProductsHeader />
      {wines.length === 0 || wines === null ? (
        <div>No wines found</div>
      ) : (
        <WineTable wines={wines} />
      )}
    </div>
  )
};
export default DashboardProductsPage;
