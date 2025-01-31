import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GrapeIcon, GiftIcon, PaintbrushIcon, TicketIcon } from 'lucide-react'
import { Suspense } from 'react'
import GiftsGrid from './gifts-grid'
import { cn } from '@/lib/utils'
import { littlepot } from '@/app/fonts'

export default function GiftingContent() {
  return (
    <div className='container mx-auto space-y-12 px-4 py-8'>
      <section className='space-y-6'>
        <h1
          className={cn(
            'mb-4 w-[20ch] text-5xl font-bold lowercase text-slate-700 sm:text-4xl lg:text-6xl',
            littlepot.className
          )}
        >
          Grape Packaging
        </h1>
        <p className='text-lg text-muted-foreground'>
          Life is Grape is truly the ideal online shop to buy gifts for boutique
          wine and craft spirit lovers. There are many reasons to
          celebrate...birthdays, buying a new house, weddings, graduations, job
          promotions and welcoming a child into the world. There’s no better way
          to say congratulations than presenting the lucky receiver with a
          bottle of their favourite Sip! A high-quality, crowd-pleasing bottle
          of wine or spirits shows that you’ve got taste. It can be added to
          your client’s collection, re-gifted or most likely, consumed on the
          spot!
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <GiftsGrid />
        </Suspense>
      </section>
      {/* Hero Section */}
      <section className='space-y-4 text-center'></section>

      {/* Feature Highlights */}
      <section className='grid gap-8 md:grid-cols-3'></section>

      {/* Why Choose Us Section */}
      <section className='rounded-lg bg-secondary p-8'>
        <h2 className='mb-6 text-center text-2xl font-bold'>
          Why Choose Life is Grape?
        </h2>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='flex items-start space-x-4'>
            <GiftIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Effortlessly Thoughtful</h3>
              <p>Wine is a timeless and universally appreciated gift.</p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <GrapeIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Personalization Perfection</h3>
              <p>
                Customized labels and hand-painted boxes make it truly special.
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <PaintbrushIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Unforgettable Impressions</h3>
              <p>Elevate your corporate gifting and leave a lasting mark.</p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <TicketIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Stress-Free Gifting</h3>
              <p>
                Gift vouchers take the guesswork out of finding the perfect
                wine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}

    </div>
  )
}
