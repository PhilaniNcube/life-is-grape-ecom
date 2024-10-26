import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import ItemImage from './item-image'
import { Suspense } from 'react'
import Link from 'next/link'
import { LiqourListItem } from '@/lib/types'

const ItemCard = async ({ product }: { product: LiqourListItem }) => {


  return (
    <Link
      href={`/items/${product._id}`}
      className='cursor-pointer'
      prefetch={false}
    >
      <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
          <ItemImage image={product.main_image} />
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.brand}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='line-clamp-3 text-sm text-muted-foreground'>
            {product.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
export default ItemCard
