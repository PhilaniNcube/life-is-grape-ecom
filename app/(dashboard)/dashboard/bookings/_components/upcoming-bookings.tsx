import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BookingWithExperience } from '../page'

interface Booking {
  _creationTime: number
  _id: string
  date: string
  email: string
  experience_name: string
  guests: number
  name: string
  paid: boolean
  time: string
}

export default function UpcomingBookings({ bookings }: { bookings: BookingWithExperience[] }) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className='container mx-auto py-10'>
      <h2 className='mb-4 text-2xl font-bold'>Upcoming Bookings</h2>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead className='hidden md:table-cell'>
                Date & Time
              </TableHead>
              <TableHead className='hidden sm:table-cell'>Guests</TableHead>
              <TableHead className='hidden lg:table-cell'>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell className='font-medium'>{booking.name}</TableCell>
                <TableCell>{booking.experience_name}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4' />
                    {formatDate(booking.date)}
                  </div>
                  <div className='flex items-center text-muted-foreground'>
                    <Clock className='mr-2 h-4 w-4' />
                    {booking.time}
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <div className='flex items-center'>
                    <Users className='mr-2 h-4 w-4' />
                    {booking.guests}
                  </div>
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {booking.email}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      booking.paid ? 'bg-green-600' : 'bg-red-600',
                      'text-white'
                    )}
                  >
                    {booking.paid ? 'Paid' : 'Unpaid'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
