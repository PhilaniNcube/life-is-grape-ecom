import { fetchQuery } from "convex/nextjs";
import NewProductForm from "../_components/new-product-form";
import { api } from "@/convex/_generated/api";

const CreateProductPage = async () => {

  const categoriesData = fetchQuery(api.categories.getCategories)
  const producersData = fetchQuery(api.producers.getProducers)

  const [categories, producers] = await Promise.all([categoriesData, producersData])

  return (
    <div>
      <div className='flex gap-5 mb-4'>

      </div>
      <NewProductForm categories={categories} producers={producers} />
    </div>
  )
};
export default CreateProductPage;
