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
          <GiftsGrid />
      </section>




      {/* Call to Action */}

    </div>
  )
}
