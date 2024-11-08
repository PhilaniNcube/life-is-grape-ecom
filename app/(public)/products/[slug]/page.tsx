import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params

  const product = await fetchQuery(api.products.getProductBySlug, { slug })

  return (
    <div className='container'>
      <h1>
        Page Under Construction: <strong>{product?.product.name}</strong>
      </h1>
    </div>
  )
}
export default page;
