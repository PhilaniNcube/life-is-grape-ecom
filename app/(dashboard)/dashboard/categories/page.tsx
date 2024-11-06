
import CreateCategory from "./_components/create-category";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryTable from "./_components/category-table";

const CategoriesPage = async () => {

  const categories = await fetchQuery(api.categories.getCategories)

  return <div>
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-xl font-semibold'>Categories</h2>
      <CreateCategory categories={categories} />
    </div>
    <CategoryTable categories={categories} />
  </div>;
};
export default CategoriesPage;
