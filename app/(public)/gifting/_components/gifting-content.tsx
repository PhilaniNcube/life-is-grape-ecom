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
      <section className='space-y-6 text-center'>
        <h1
          className={cn(
            'mb-4 w-[20ch] mx-auto text-5xl text-center font-bold lowercase text-slate-700 sm:text-4xl lg:text-6xl',
            littlepot.className
          )}
        >
          Life is Grape: Uncork a Memorable Gift
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          Looking for a unique and thoughtfully presented gift that&apos;s
          guaranteed to please? At Life is Grape, we believe the perfect present
          should be as special as the occasion. That&apos;s why we offer
          personalised wine labels to elevate your wedding favors, corporate
          gifts, or any special celebration.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <GiftsGrid />
        </Suspense>
      </section>
      {/* Hero Section */}
      <section className='space-y-4 text-center'></section>

      {/* Feature Highlights */}
      <section className='grid gap-8 md:grid-cols-3'>
        <Card>
          <CardContent className='space-y-4 p-6'>
            <GrapeIcon className='mx-auto h-12 w-12 text-primary' />
            <h2 className='text-center text-xl font-semibold'>
              Personalized Labels
            </h2>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                Their name or a heartfelt message for a truly personal touch.
              </li>
              <li>Your company logo for impactful corporate branding.</li>
              <li>
                A unique design celebrating a wedding, anniversary, or special
                milestone.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='space-y-4 p-6'>
            <PaintbrushIcon className='mx-auto h-12 w-12 text-primary' />
            <h2 className='text-center text-xl font-semibold'>
              Hand-Painted Boxes
            </h2>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                Choose the perfect size: Available for one, two, or three
                bottles.
              </li>
              <li>
                Extra space for added treats: Include chocolates, gourmet
                snacks, or personalized trinkets.
              </li>
              <li>
                Elegant finishing touch: Each box is wrapped with a beautiful
                ribbon to complement your gift.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='space-y-4 p-6'>
            <TicketIcon className='mx-auto h-12 w-12 text-primary' />
            <h2 className='text-center text-xl font-semibold'>Gift Vouchers</h2>
            <p>
              Not sure what wine they&apos;d prefer? No problem! Give the gift
              of choice with a Life is Grape gift voucher. They can browse our
              curated selection of high-quality wines and create their own
              perfect present.
            </p>
          </CardContent>
        </Card>
      </section>

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
