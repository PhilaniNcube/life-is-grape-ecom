import { ibm_sans, littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row lg:gap-8'>
          <div className='space-y-6'>
            <h2
              className={cn(
                'w-fit flex-1 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:min-w-[350px]',
                littlepot.className
              )}
            >
              The Grape Story
            </h2>
          </div>
          <div className='relative  lg:h-full'>
            <p className='text-lg text-gray-700'>
              Established on 1 April 2016, our purpose is to introduce proudly
              South African brands of hand-crafted wines and spirits to those
              operating in the trade, and to consumers. These products are
              produced in South Africa with quality and passion
            </p>
            <p className='text-lg text-gray-700 mt-2'>
              South Africa is recognised worldwide as producing premium quality,
              interesting and distinctive wines and spirits in an
              environmentally sensitive and ethically responsible manner.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
