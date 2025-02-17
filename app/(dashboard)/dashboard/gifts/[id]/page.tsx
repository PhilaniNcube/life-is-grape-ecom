import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import React from 'react'
import UpdateGiftProductForm from '../_components/update-gift'
import UpdateGiftImage from '../_components/update-gift-image'

const GiftDashboardPage = async ({params}:{params:Promise<{id:Id<'gifts'>}>}) => {

    const {id} = await params

    const gift = await fetchQuery(api.gifts.getGift,{gift_id:id})

    if (!gift) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Gift not found</p>
            </div>
        )
    }


  return (
    <div className="flex flex-col md:flex-row gap-4">
        <UpdateGiftProductForm gift={gift} />
        <UpdateGiftImage gift_id={id} image_id={gift.main_image} />
    </div>
  )
}

export default GiftDashboardPage