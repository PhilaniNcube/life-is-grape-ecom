import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

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

  return <div className="mt-8 mb-10">
    <div className="container">
      {/* Section Heading */}
      <h2 className="text-center text-3xl font-extrabold text-fuchsia-900">
        Need a Gift? We've Got You Covered!
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 @container">
        {giftBoxes.map(giftBox => (
          <div
            key={giftBox._id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            {/* giftBox Image */}
            <Image
              src={giftBox.main_image}
              alt={giftBox.name}
              width={800}
              height={800}
              className="aspect-square w-full"
            />

              {/* giftBox Details */}
              <div className="p-6">
                <h3 className="text-md line-clamp-1 font-semibold text-gray-800 lg:text-lg">
                  {giftBox.name}
                </h3>

                {/* Price and Action Button */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(giftBox.price)}
                  </span>
                  <Link href={`/products/${giftBox.slug}`}>
                    <Button
                      className="rounded-none text-white hover:bg-red-700"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
          </div>

        ))}
      </div>
    </div>
  </div>;
};
export default GiftBoxes;
