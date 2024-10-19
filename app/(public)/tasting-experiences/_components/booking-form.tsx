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

export default function BookingForm() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [guests, setGuests] = useState<string>('1')
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date && time && guests) {
      // Here you would typically send the booking data to your backend
      console.log('Booking submitted:', { date, time, guests })
      setIsBooked(true)
    }
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 10; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    return slots
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
        <form onSubmit={handleSubmit}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Enter your name' name='name' />
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
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='time'>Time</Label>
              <Select value={time} onValueChange={setTime}>
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
              <Select value={guests} onValueChange={setGuests}>
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
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button onClick={handleSubmit}>Book Now</Button>
      </CardFooter>
      {isBooked && (
        <div className='mt-4 rounded-md bg-green-100 p-4 text-green-700'>
          Booking confirmed for {guests} guest(s) on{' '}
          {date ? format(date, 'PPP') : ''} at {time}. Duration: 2 hours.
        </div>
      )}
    </Card>
  )
}


