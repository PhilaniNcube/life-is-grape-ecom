import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

const Filter = async () => {

  const categories = await fetchQuery(api.categories.getParentCategoryiesWithChildren)

  console.log(JSON.stringify(categories, null, 2))

  return <div className="w-full">
    <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
    <div className="mt-4">
      {categories.map(category => {

        // if category has a parent_id it is a child category so we skip it
        if (category.parent_id) {
          return null
        }



        return (
          <div key={category.name}>
            <Link
              href={`/products?category=${category.slug}`}
              className='text-md font-semibold text-gray-800'
            >
              {category.name}
            </Link>
            <ul className='mt-2 flex flex-col space-y-2'>
              {category.children.map((child) => (
                <Link
                  href={`/products?category=${child.slug}`}
                  key={child._id}
                  className='text-sm text-gray-600'
                >
                  {child.name}
                </Link>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
    </div>;
};
export default Filter;
