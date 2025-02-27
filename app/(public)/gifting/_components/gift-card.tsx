import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Gift } from '@/lib/schemas'
import { Doc } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { formatPrice } from '@/lib/utils'
import { CustomButton } from '@/components/ui'

interface GiftCardProps {
  gift: {
    name: string
    price: number
    description: string
    dimensions: string
    image: string
    slug: string
  }
}

const GiftCard = async ({ gift }: GiftCardProps) => {
  return (
    <Card className='group overflow-hidden transition-all hover:shadow-lg'>
      <CardHeader className='p-0'>
        <div className='relative aspect-square'>
          <Image
            src={gift.image}
            alt={gift.name}
            width={700}
            height={700}
            className='aspect-square w-full object-cover'
          />
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='mb-2 flex flex-col items-start justify-between gap-2'>
          <h3 className='line-clamp-1 text-lg font-semibold'>{gift.name}</h3>
        </div>
        <p className='line-clamp-2 text-balance text-left text-sm text-muted-foreground'>
          {gift.description}
        </p>
      </CardContent>
      <CardFooter className='flex items-center justify-between p-4 pt-0'>
        <p className='font-semibold'>{formatPrice(gift.price)}</p>
        <CustomButton className=''>
          <Link href={`/gifting/${gift.slug}`}>View Details</Link>
        </CustomButton>
      </CardFooter>
    </Card>
  )
}

export default GiftCard
