import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import GiftDetails from '../_components/gift-details'

type GiftPageParams = Promise<{ id: Id<'gifts'> }>

const GiftPage = async ({
  params,
}: {
  params: Promise<{ id: Id<'gifts'> }>
}) => {
  const { id } = await params

  const gift = await fetchQuery(api.gifts.getGift, { gift_id: id })

  if (!gift) {
    return (
      <div className='container'>
        <h1 className='text-xl font-bold md:text-2xl'>Gift not found</h1>
      </div>
    )
  }

  return (
    <div>
      <GiftDetails gift={gift} />
    </div>
  )
}
export default GiftPage
