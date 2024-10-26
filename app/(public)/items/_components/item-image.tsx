import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

const ItemImage = async ({ imageId }: { imageId: Id<'_storage'> }) => {

  const image = await fetchQuery(api.products.getImageUrl, { image_id: imageId});

  return (
    <div className={cn('aspect-square w-full', image === null && 'animate-pulse')}>
      {image && (
        <Image
          width={600}
          height={600}
          src={image}
          alt='Product Image'
          className='h-full w-full object-cover'
        />
      )}
    </div>
  )
}
export default ItemImage;
