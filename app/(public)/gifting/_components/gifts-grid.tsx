import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import GiftCard from "./gift-card"
import { giftWrappingOptions } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"




export default async function GiftsGrid() {


  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {giftWrappingOptions.map(gift => (
        <GiftCard key={gift.name} gift={gift} />
      ))}
      <GiftVoucher />
    </div>
  )
}


const GiftVoucher = () => {

  return (
    <Card className='group overflow-hidden transition-all hover:shadow-lg'>
      <CardHeader className='p-0'>
        <div className='relative aspect-square'>
          <Image
            src='https://fabulous-peacock-233.convex.cloud/api/storage/144f1852-8993-4bac-b89b-1fb803b081da'
            alt="Gift Voucher"
            width={700}
            height={700}
            className='aspect-square w-full object-cover'
          />
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='mb-2 flex flex-col items-start justify-between gap-2'>
          <h3 className='line-clamp-1 text-lg font-semibold'>Gift Voucher</h3>
        </div>
        <p className='line-clamp-2 text-balance text-left text-sm text-muted-foreground'>
          The perfect gift for the wine lover in your life. Our gift vouchers are
          available in a range of denominations and can be redeemed against any
          of our products.
        </p>
      </CardContent>
      <CardFooter className='flex items-center justify-between p-4 pt-0'>
        <p className='font-semibold'>
          From R100.00
        </p>
        <Button asChild className='bg-slate-700 text-white'>
          <Link href="gift-voucher">View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
