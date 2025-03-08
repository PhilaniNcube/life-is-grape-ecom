'use client'
import { Doc } from '@/convex/_generated/dataModel'
import { trackViewItemList } from '@/lib/analytics'
import React, { useEffect } from 'react'

const SendOnSaleTrackingEvent = ({
  products,
}: {
  products: Doc<'products'>[]
}) => {
  useEffect(() => {
    trackViewItemList(
      products.map((product, index) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.product_type,
        position: index + 1,
      })),
      'On Sale'
    )
  }, [products])

  return null
}

export default SendOnSaleTrackingEvent
