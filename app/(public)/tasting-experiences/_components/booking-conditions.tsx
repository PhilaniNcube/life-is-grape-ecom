import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function BookingConditions() {
  return (
    <Card className='w-full max-w-3xl'>
      <CardHeader>
        <CardTitle>Wine Tasting Booking Conditions</CardTitle>
        <CardDescription>
          Please review our booking conditions before making a reservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Private and Corporate Bookings</AccordionTrigger>
            <AccordionContent>
              <ul className='list-disc space-y-2 pl-6'>
                <li>
                  A minimum of 10 guests is required for Private and Corporate
                  Bookings.
                </li>
                <li>
                  Private & Corporate Tastings are booked in 2-hour slots.
                </li>
                <li>Venue charge is not included in the Tasting charges.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Deposit and Payment</AccordionTrigger>
            <AccordionContent>
              <p>A 50% deposit is required to secure your booking.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Cancellation Policy</AccordionTrigger>
            <AccordionContent>
              <p>
                In the event of cancellations, full refunds will only be given
                if we are notified 5 business days or more before the date of
                the event via email to wine@lifeisgrape.co.za.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger>Attendee Substitution</AccordionTrigger>
            <AccordionContent>
              <p>
                Substitution of an attendee may be made at any time after
                payment.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-5'>
            <AccordionTrigger>
              Event Cancellation or Rescheduling
            </AccordionTrigger>
            <AccordionContent>
              <p>
                We reserve the right to cancel or reschedule an event due to low
                enrollment or other reasons beyond our control. If we have to
                cancel a tasting event, we will notify customers immediately and
                offer a full refund or the opportunity to reschedule.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
