'use client'

import { useState } from 'react'
import { AtSign } from 'lucide-react'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Id } from '@/convex/_generated/dataModel'
import { createBookingAction } from '@/actions/bookings'
import SubmitButton from '@/components/submit-button'

export default function BookingForm({ id }: { id: Id<'tasting_experiences'> }) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [guests, setGuests] = useState<string>('1')
  const [isBooked, setIsBooked] = useState(false)

  const [state, formAction] = useActionState(createBookingAction, null)

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 10; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    return slots
  }

  // write a function using datefns library to get the date 5 days from now
  // and set it as the initial date for the calendar
  const getInitialDate = () => {
    const today = new Date()
    // add 5 days to today's date
    const nextWeek = new Date(today.setDate(today.getDate() + 5))

    return nextWeek
  }

  return (
    <Card className='min:w-[350px]'>
      <CardHeader>
        <CardTitle>Book Wine Tasting</CardTitle>
        <CardDescription>
          Choose your preferred date and time for a 2-hour wine tasting
          experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={formData => {

            formAction(formData)
          }}
        >
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Enter your name' name='name' />
              <Input name='experience_id' type='hidden' value={id} />
            </div>

            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' name='email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='date'>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    <Input name='date' type='hidden' value={date?.toISOString()} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    today={new Date()}
                    fromDate={getInitialDate()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='time'>Time</Label>
              <Select name="time" value={time} onValueChange={setTime}>
                <SelectTrigger id='time'>
                  <SelectValue placeholder='Select time' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  {generateTimeSlots().map(slot => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='guests'>Number of Guests</Label>
              <Select name='guests' value={guests} onValueChange={setGuests}>
                <SelectTrigger id='guests'>
                  <SelectValue placeholder='Select guests' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  {[...Array(11)].map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {i + 10}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SubmitButton className="mt-3">Book Now</SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
