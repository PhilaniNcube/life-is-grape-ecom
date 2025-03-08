'use client'

import { useEffect } from 'react'
import { trackViewItem, trackViewItemList } from '@/lib/analytics'
import { Doc, Id } from '@/convex/_generated/dataModel'

type ProductViewProps = {
  product: Doc<'products'>
}

interface ProductListViewProps {
  items: {
    main_image: string
    _id: Id<'products'>
    _creationTime: number
    on_sale?: boolean
    sale_price?: number
    volume?: number
    dimensions?: string
    featured: boolean
    name: string
    price: number
    // Add any other required product properties
  }[]
  listName: string
}

export function ProductViewTracker({ product }: ProductViewProps) {
  useEffect(() => {
    const productItem = {
      id: product._id,
      name: product.name,
      price: product.price,
    }

    trackViewItem(productItem)
  }, [product])

  return null // This component doesn't render anything
}

export function ProductListViewTracker({
  items,
  listName,
}: ProductListViewProps) {
  const listItems = items.map((item, index) => ({
    id: item._id,
    name: item.name,
    price: item.price,
  }))

  useEffect(() => {
    trackViewItemList(listItems, listName)
  }, [items, listName])

  return null // This component doesn't render anything
}
