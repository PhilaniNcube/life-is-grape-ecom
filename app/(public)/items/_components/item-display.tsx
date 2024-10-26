import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import ItemCard from "./item-card"

export default async function ItemsDisplay() {

  const products = await fetchQuery(api.products.getProducts)


  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Our Products</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product, index) => (
          <ItemCard
            key={index}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
