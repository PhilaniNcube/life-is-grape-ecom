import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductDetail from "../_components/product-detail";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params



  return (
    <div className='container'>
     <ProductDetail slug={slug} />
    </div>
  )
}
export default page;
