import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Metadata } from "next";
import WineList from "../_components/wine-list";
import { littlepot } from "@/app/fonts";
import { cn } from "@/lib/utils";
import ProductItem from "../../_components/product-item";
import ProductFilter from "./_components/product-filter";
import { ScrollArea } from "@/components/ui/scroll-area";
import Script from "next/script";
import { Doc } from "@/convex/_generated/dataModel";



const generateJsonLd = (slug: string, products: any[]) => {
  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${title} Wines`,
    "description": `Explore our selection of ${title.toLowerCase()} wines at Life is Grape`,
    "url": `https://lifeisgrape.co.za/wines/${slug}`,
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": product.description,
      "image": product.main_image,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "ZAR",
        "availability": "https://schema.org/InStock"
      }
    }))
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // capitalize first letter and replace hyphens with spaces
  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} Wines | Life is Grape`,
    description: `Explore our selection of ${title.toLowerCase()} wines at Life is Grape. Find the perfect wine for your taste.`,
    keywords: `${title}, wines, red wine, white wine, rose wine, sparkling wine, champagne, wine shop, wine store, wine delivery, wine online, wine tasting, wine club, wine subscription, wine gift, wine accessories, wine glasses, wine decanters, wine openers, wine aerators, wine preservers, wine coolers, wine fridges, wine racks, wine cellars, wine cabinets, wine books, wine magazines, wine education, wine courses, wine events, wine tours, wine travel, wine regions, wine producers, wine makers, wine labels, wine brands, wine varietals, wine grapes, wine vintages, wine ratings, wine reviews, wine awards, wine competitions, wine news, wine trends, wine culture, wine history, wine art, wine photography, wine videos, wine podcasts, wine blogs, wine websites, wine social media, wine influencers`,
    openGraph: {
      title: `${title} Wines | Life is Grape`,
      description: `Explore our selection of ${title.toLowerCase()} wines at Life is Grape. Find the perfect wine for your taste.`,
      type: "website",
    },

  };
}

const WineCategoryPage = async ({params}:{params:Promise<{slug:string}>}) => {

  const { slug } = await params;

  console.log(slug);

  const products = await fetchQuery(api.categories.getProductsByCategorySlug, {slug})

  console.log(products);

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(slug, products))
        }}
      />
      <div className='peer container mx-auto flex flex-col gap-4 md:flex-row'>
        <div>
          <ProductFilter slug={slug} />
        </div>
        <section className='w-full py-4 @container peer-has-[data-[pending=true]]:animate-pulse'>
          <ScrollArea className='mx-auto max-w-7xl h-[calc(100dvh-12rem)]'>
            {/* Section Heading */}
            <h2
              className={cn(
                'mb-6 text-3xl font-extrabold text-gray-900',
                littlepot.className
              )}
            >
              Our Selection of Fine Wines
            </h2>

            {/* 3-Column Grid */}
            <div className='grid w-full grid-cols-2 gap-8 @lg:grid-cols-3'>
              {products.map(wine => (
                <ProductItem key={wine._id} product_id={wine._id} />
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </>
  )
};
export default WineCategoryPage;
