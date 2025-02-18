import React from 'react'
import CreatePromotionalBanner from './_components/create-promotional-banner'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import UpdatePromotionalBanner from './_components/update-promotional-banner'

const PromotionalBanners = async () => {
  const banner = await fetchQuery(api.banner.getDefaultBanner)

  return (
    <div>
      {banner ? <UpdatePromotionalBanner banner={banner} /> : <CreatePromotionalBanner />}
    </div>
  )
}

export default PromotionalBanners
