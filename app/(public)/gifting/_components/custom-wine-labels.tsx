import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { littlepot } from '@/app/fonts'
import Link from 'next/link'
import { CustomButton } from '@/components/ui'

export default function CustomWineLabels() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        <h2
          className={cn(
            'mb-8 text-center text-3xl font-bold text-gray-800',
            littlepot.className
          )}
        >
          Message On A Bottle
        </h2>
        <div className='mb-12 flex flex-col items-center lg:flex-row'>
          <div className='mb-8 flex justify-center space-x-4 lg:mb-0 lg:w-1/2'>
            <div className='relative h-64 w-40 md:h-72 md:w-48'>
              <Image
                src='https://fabulous-peacock-233.convex.cloud/api/storage/a6af796d-04cd-4d71-bab8-4a82e7015aad'
                alt='Custom White Wine Label'
                layout='fill'
                objectFit='cover'
                className='rounded-lg shadow-lg'
              />
              <div className='absolute bottom-0 left-0 right-0 rounded-b-lg bg-white bg-opacity-75 p-2'>
                <p className='text-center text-sm font-semibold'>White Wine</p>
              </div>
            </div>
            <div className='relative h-64 w-40 md:h-72 md:w-48'>
              <Image
                src='https://fabulous-peacock-233.convex.cloud/api/storage/51584ccf-995a-474a-b526-406033bfe5fe'
                alt='Custom Red Wine Label'
                layout='fill'
                objectFit='cover'
                className='rounded-lg shadow-lg'
              />
              <div className='absolute bottom-0 left-0 right-0 rounded-b-lg bg-white bg-opacity-75 p-2'>
                <p className='text-center text-sm font-semibold'>Red Wine</p>
              </div>
            </div>
          </div>
          <div className='lg:w-1/2 lg:pl-12'>
            <p className='mb-6 text-lg text-gray-600'>
              We do personalised wine labels for weddings or corporate gifting.
              We print your wine label on matt vinyl or matt paper stickers
              suitable for red and white wine bottles. You simply need to email
              through your high resolution, print-ready design after your order
              is received.
            </p>
            <div className='mb-6'>
              <h3 className='mb-2 text-xl font-semibold text-gray-700'>
                Wedding Wine Labels
              </h3>
              <p className='text-gray-600'>
                Commemorate your special day with custom-designed wine labels
                featuring your names, wedding date, and a personal message.
              </p>
            </div>
            <div className='mb-6'>
              <h3 className='mb-2 text-xl font-semibold text-gray-700'>
                Corporate Event Labels
              </h3>
              <p className='text-gray-600'>
                Impress clients and employees with branded wine labels
                showcasing your company logo and event details.
              </p>
            </div>
            <Link href='/products/personalised-labels'>
              <CustomButton size='lg' className='rounded-none bg-slate-700'>
                Get Custom Labels
              </CustomButton>
            </Link>
          </div>
        </div>
        <p className='mx-auto max-w-4xl text-center text-sm font-semibold text-gray-600'>
          NB: please note the maximum dimensions possible for the label is 120mm
          W x 100mm H with the most common label size that fits most claret and
          burgundy 750ml bottles being 100mm H x 90mm W and we strongly
          recommend designing your label to this size for best fit.
        </p>
      </div>
    </section>
  )
}
