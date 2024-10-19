import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
              About Our Journey
            </h2>
            <p className='text-lg text-gray-700'>
              Established on 1 April 2016, our purpose is to introduce proudly
              South African brands of hand-crafted wines and spirits to those
              operating in the trade, and to consumers. These products are
              produced in South Africa with quality and passion.
            </p>
            <p className='text-lg text-gray-700'>
              South Africa is recognised worldwide as producing premium quality,
              interesting and distinctive wines and spirits in an
              environmentally sensitive and ethically responsible manner.
            </p>
            <Button className='bg-red-700 text-white hover:bg-red-800'>
              Discover Our Brands
            </Button>
          </div>
          <div className='relative h-96 lg:h-full'>
            <Image
              src='https://quiet-caterpillar-834.convex.cloud/api/storage/831668b5-06ec-4159-b603-91587dd3dec7'
              alt='South African vineyard landscape'
              layout='fill'
              objectFit='cover'
              className='rounded-lg shadow-lg'
            />
            <div className='absolute inset-0 rounded-lg bg-red-900 bg-opacity-20'></div>
          </div>
        </div>
      </div>
    </section>
  )
}
