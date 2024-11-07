import { fetchQuery } from "convex/nextjs";
import DashboardProductsHeader from "./_components/dashboard-products-header";
import { api } from "@/convex/_generated/api";
import ProductTable from "./_components/products-table";




const DashboardProductsPage = async () => {

  const products = await fetchQuery(api.products.getShallowProducts);

  return (
    <div>
      <DashboardProductsHeader />
      <ProductTable products={products} />
    </div>
  )
};
export default DashboardProductsPage;
