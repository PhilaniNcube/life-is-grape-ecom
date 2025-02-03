import { fetchQuery } from "convex/nextjs";
import DashboardProductsHeader from "./_components/dashboard-products-header";
import { api } from "@/convex/_generated/api";
import ProductTable from "./_components/products-table";




const DashboardProductsPage = async () => {

  const productsData = fetchQuery(api.products.getProducts);
  const categoryData = fetchQuery(api.categories.getCategories);

  const [products, categories] = await Promise.all([productsData, categoryData]);

  return (
    <div>
      <DashboardProductsHeader />
      <ProductTable products={products} categories={categories} />
    </div>
  )
};
export default DashboardProductsPage;
