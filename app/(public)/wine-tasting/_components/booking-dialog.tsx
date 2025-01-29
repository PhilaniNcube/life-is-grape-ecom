'use client'

import { littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Doc } from '@/convex/_generated/dataModel'
import { cn, formatPrice } from '@/lib/utils'
import { EnvelopeIcon } from '@sanity/icons'
import { PhoneCall } from 'lucide-react'
import { useState } from 'react'

const BookingDialog = ({
  servings,
  price,
}: {
  servings: string
  price: number
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='rounded-none' size='sm'>
          Enquire Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className={cn('text-2xl', littlepot.className)}>
          Enquire about making a tasting experience booking for the {servings}{' '}
          experience @{formatPrice(price)} per person
        </DialogTitle>
        <form>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' name='email' type='email' />
            </div>
            <div>
              <Label htmlFor='guests'>Guests</Label>
              <Select name='guests'>
                <SelectTrigger className=''>
                  <SelectValue placeholder='How many guests' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='10'>10 Guests</SelectItem>
                  <SelectItem value='11'>11 Guests</SelectItem>
                  <SelectItem value='12'>12 Guests</SelectItem>
                  <SelectItem value='13'>13 Guests</SelectItem>
                  <SelectItem value='14'>14 Guests</SelectItem>
                  <SelectItem value='15'>15 Guests</SelectItem>
                  <SelectItem value='16+'>16+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='date'>Date</Label>
              <Input id='date' name='date' type='date' />
            </div>
          </div>
          <Button type='submit' className='mt-4'>
            Send
          </Button>
        </form>
        <div className='mt-3'>
          <div className='flex items-center gap-x-2'>
            <EnvelopeIcon className='h-6 w-6' />
            <a href='mailto:wine@lifeisgrape.co.za'>wine@lifeisgrape.co.za</a>
          </div>
          <div className='flex mt-2 items-center gap-x-2'>
            <PhoneCall className='h-6 w-6' />
            <a href='tel:0027829311253'>082 9311 253</a>
          </div>
        </div>

        <p className='text-sm text-gray-500'>
          By sending this enquiry, you agree to our terms and conditions
        </p>
        <ul className='list-disc text-xs text-gray-500'>
          <li>A minimum of 10 guests for Private and Corporate Bookings.</li>
          <li>a 50% deposit is required to secure your booking.</li>
          <li>
            In the event of cancellations, full refunds will only be given if we
            are notified 5 business days or more before the date of the event
            via email to{' '}
            <span className='text-blue-500 underline'>
              wine@lifeisgrape.co.za
            </span>{' '}
          </li>
          <li>
            Substitution of an attendee may be made at any time after payment.
          </li>
          <li>
            We reserve the right to cancel or reschedule an event due to low
            enrolment or other reasons beyond our control. If we have to cancel
            a tasting event, we will notify customers immediately and offer a
            full refund or the opportunity to reschedule.
          </li>
          <li>Private and Corporate are booked in 2-hour slots.</li>
          <li>Venue Charge: Not included in the Tasting charges</li>
          <li>We supply the tasting wine/spirits and glasses/ice.</li>
        </ul>
      </DialogContent>
    </Dialog>
  )
}
export default BookingDialog
