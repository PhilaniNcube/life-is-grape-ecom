import { ibm_sans, littlepot } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { GiftIcon, PinIcon, WineIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HomePageGrid = () => {
  return (
    <div className='py-8'>
      <div className='container grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10'>
        <Link
          href='/products'
          className='relative flex cursor-pointer flex-col items-center justify-center text-balance rounded-md text-center shadow-sm hover:shadow-lg'
        >
          <Image
            src='/images/circle_logo.png'
            width={200}
            height={200}
            alt='Wine'
            className='z-0 w-full object-cover opacity-35'
          />
          <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-200/80 p-6'>
            <div className='text-2xl font-bold '>
              <p className={cn(littlepot.className, 'font-bold text-3xl md:text-4xl')}>shop</p>
              <p className={cn(ibm_sans.className, 'uppercase')}>
                Wines & Spirits
              </p>
            </div>
            <p className='mt-3 text-gray-700'>
              Want to descover the world of crafted beverages? Looking to
              diversify your collection or simply want to feel more confident in
              your choice of beverage?
            </p>
            <p className='mt-2 text-gray-700'>
              We have a selection of proudly South African, hand-crafted wines
              and spirits for consumers who like diversity and uniqueness.
            </p>
          </div>
        </Link>
        <Link
          href='/wine-tasting'
          className='relative flex cursor-pointer flex-col items-center justify-center text-balance rounded-md text-center shadow-sm hover:shadow-lg'
        >
          <Image
            src='/images/circle_logo.png'
            width={200}
            height={200}
            alt='Wine'
            className='z-0 w-full object-cover opacity-35'
          />
          <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-200/80 p-6'>
            <div className='text-2xl font-bold '>
              <p className={cn(littlepot.className, 'font-bold text-3xl md:text-4xl')}>Book</p>
              <p className={cn(ibm_sans.className, 'uppercase')}>Experiences</p>
            </div>
            <p className='mt-3 text-gray-700'>
              Looking for something different to celebrate your special
              occasion? We are creators of tasting experiences.
            </p>
            <p className='mt-2 text-gray-700'>
              Choose your own venue or we will source a venue and catering
              solutions to fit within your budget and make the tasting a
              memorable event.
            </p>
          </div>
        </Link>
        <Link
          href='/gifting'
          className='relative flex cursor-pointer flex-col items-center justify-center text-balance rounded-md text-center shadow-sm hover:shadow-lg'
        >
          {' '}
          <Image
            src='/images/circle_logo.png'
            width={200}
            height={200}
            alt='Wine'
            className='z-0 w-full object-cover opacity-35'
          />
          <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-200/80 p-6'>
            <div className='text-2xl font-bold '>
              <p className={cn(littlepot.className, 'font-bold text-3xl md:text-4xl')}>shop</p>
              <p className={cn(ibm_sans.className, 'uppercase')}>
                Personalised Gifting
              </p>
            </div>
            <p className='mt-3 text-gray-700'>
              There are many reasons to celebrate and no better way to say
              congratulations than presenting the lucky receiver with a bottle
              of their favourite Sip!
            </p>
            <p className='mt-2 text-gray-700'>
              Select from our range of gift boxes, personalised labels or bags,
              complimented with our "attention to detail" ribbon wrapping.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default HomePageGrid
