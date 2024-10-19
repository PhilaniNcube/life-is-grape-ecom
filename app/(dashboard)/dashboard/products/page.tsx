import { fetchQuery } from "convex/nextjs";
import DashboardProductsHeader from "./_components/dashboard-products-header";
import WineTable from "./_components/wine-table";
import { api } from "@/convex/_generated/api";

const DashboardProductsPage = async () => {

  const wines = await fetchQuery(api.wines.getWines);

  return <div>
    <DashboardProductsHeader />
    <WineTable wines={wines} />
  </div>;
};
export default DashboardProductsPage;
