import Image from "next/image";
import { GiftVoucherForm } from "./_components/voucher";


export default function GiftVoucherPage() {
  return (
    <div className='container mx-auto py-10'>
      <div className='grid grid-cols-2 gap-6'>
        <Image
          src='https://fabulous-peacock-233.convex.cloud/api/storage/144f1852-8993-4bac-b89b-1fb803b081da'
          alt='Gift Voucher'
          width={700}
          height={700}
          className='aspect-square w-full object-cover'
        />
        <div>
          <h1 className='mb-6 text-3xl font-bold'>Purchase a Gift Voucher</h1>
          <GiftVoucherForm />
        </div>
      </div>
    </div>
  )
}
