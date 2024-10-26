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

const ItemCard = async ({ product }: { product: Doc<'products'> }) => {
  const brand = (await fetchQuery(api.brands.getBrand, {
    brand_id: product.brand,
  })) as Doc<'brands'>

  return (
    <Link href={`/items/${product._id}`} className="cursor-pointer" prefetch={false}>
      <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
        <Suspense
          fallback={<div className='aspect-square w-full animate-pulse' />}
        >
          <ItemImage imageId={product.main_image} />
        </Suspense>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{brand.name}</CardDescription>
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
