import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import GiftDetails from '../_components/gift-details'
import { giftWrappingOptions } from '@/lib/utils'

const GiftPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params

  const gift = giftWrappingOptions.find((gift) => gift.slug === slug)

    const wines = await fetchQuery(api.products.getUnlabelledProducts)

  if (!gift) {
    return (
      <div className='container'>
        <h1 className='text-xl font-bold md:text-2xl'>Gift not found</h1>
      </div>
    )
  }

  return (
    <div>
      <GiftDetails gift={gift} wines={wines} />
    </div>
  )
}
export default GiftPage
