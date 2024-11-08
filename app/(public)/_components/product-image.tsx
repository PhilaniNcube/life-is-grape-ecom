import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'

const ProductImage = async ({ id }: { id: Id<'_storage'> }) => {
  const image = await fetchQuery(api.products.getMainImage, { id })

  return (
    <Image
      src={image!}
      alt='ProductImage'
      width={800}
      height={800}
      className='aspect-square w-full'
    />
  )
}
export default ProductImage
