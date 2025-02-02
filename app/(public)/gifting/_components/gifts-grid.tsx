import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import GiftCard from "./gift-card"
import { giftWrappingOptions } from "@/lib/utils"




export default async function GiftsGrid() {


  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {giftWrappingOptions.map(gift => (
        <GiftCard key={gift.name} gift={gift} />
      ))}
    </div>
  )
}
