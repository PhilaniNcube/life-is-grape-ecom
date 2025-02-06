import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import UpdateCategory from "../_components/update-category";

const CategoryPage = async ({params}:{params:Promise<{id:Id<"categories">}>}) => {

  const id = (await params).id;

  const productData = fetchQuery(api.categories.getProductsByCategoryId, { categoryId: id });
  const categoryData = fetchQuery(api.categories.getCategoryWithChildren, { categoryId: id });

  const [products, category] = await Promise.all([productData, categoryData])



  return (
    <div>
      <h1 className='text-2xl font-semibold'>
        {category?.category.name}{' '}
        <span className='text-xs text-slate-600'>
          ({category?.category.type})
        </span>
      </h1>
      <Separator className='my-2' />
      <div className="grid md:grid-cols-2 gap-4">

      </div>
      {category?.children && category?.children.length > 0 && (
        <>
          <p>Sub Categories</p>
          <div className='flex flex-row gap-3'>
            {category?.children.map(child => (
              <Link href={`/dashboard/categories/${child._id}`} key={child._id}>
                <Badge>{child.name}</Badge>
              </Link>
            ))}
          </div>{' '}
        </>
      )}

      <Separator className='my-2' />
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
};
export default CategoryPage;
