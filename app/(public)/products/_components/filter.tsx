import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

const Filter = async () => {

  const categories = await fetchQuery(api.categories.getParentCategoryiesWithChildren)

  console.log(JSON.stringify(categories, null, 2))

  return <div className="w-full pr-3">
    <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
    <ScrollArea className="mt-4 w-full h-[400px]">
      {categories.map(category => {

        // if category has a parent_id it is a child category so we skip it
        if (category.parent_id) {
          return null
        }



        return (
          <div key={category.name} className="w-full flex flex-col">
            <Link
              href={`/products?category=${category.slug}`}
              className='text-md font-semibold text-gray-800 w-full px-2 py-2 hover:bg-slate-300 rounded'
            >
              {category.name}
            </Link>
            <ul className='mt-2 flex flex-col px-5'>
              {category.children.map((child) => (
                <Link
                  href={`/products?category=${child.slug}`}
                  key={child._id}
                  className='text-sm text-gray-600 mb-1'
                >
                  {child.name}
                </Link>
              ))}

            </ul>
          </div>
        )
      })}
    </ScrollArea>
    </div>;
};
export default Filter;
