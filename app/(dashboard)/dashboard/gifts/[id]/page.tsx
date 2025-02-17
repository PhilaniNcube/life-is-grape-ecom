import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import React from 'react'
import UpdateGiftProductForm from '../_components/update-gift'

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
    <div>
        <UpdateGiftProductForm gift={gift} />
    </div>
  )
}

export default GiftDashboardPage