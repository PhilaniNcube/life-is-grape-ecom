import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import GiftCard from "./gift-card"

export default async function GiftsGrid() {

  const gifts = await fetchQuery(api.gifts.getGifts)

  if (!gifts?.length) {
    return (
      <div className='py-10 text-center'>
        <p className='text-muted-foreground'>No gifts found</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {gifts.map(gift => (
        <GiftCard key={gift._id} gift={gift} />
      ))}
    </div>
  )
}
