import { littlepot } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn, formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "./product-item";

const GiftBoxes = async () => {

  const giftBoxes = await fetchQuery(api.products.getShallowProductsWithMainImage, {
    type: "gift",
  })

  // Handle the case where no gift boxes are returned

  if (!giftBoxes || giftBoxes.length === 0) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold text-gray-900">
            Our Selection of Gift Boxes
          </h2>
          <p className="text-lg text-gray-600">
            Currently, we have no gift boxes available. Please check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className='mb-10 mt-8'>
      <div className='container'>
        {/* Section Heading */}
        <h2
          className={cn('text-center text-5xl font-extrabold text-fuchsia-900', littlepot.className)}
        >
          Need a Gift? We've Got You Covered!
        </h2>
        <div className='grid grid-cols-1 gap-6 @container md:grid-cols-2 lg:grid-cols-3'>
          {giftBoxes.map(giftBox => (
            <ProductItem key={giftBox._id} product_id={giftBox._id} />
          ))}
        </div>
      </div>
    </div>
  )
};
export default GiftBoxes;
