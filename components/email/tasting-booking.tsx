import {
  Button,
  Container,
  Html,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface TastingBookingProps {
  name: string
  email: string
  guests: string
  date: string
  experience: string
  price: string
  extras: string | undefined
}

const TastingBooking = ({
  name,
  email,
  guests,
  experience,
  date,
  price,
  extras,
}: TastingBookingProps) => {
  return (
    <Tailwind>
      <Html>
        <Container className='bg-slate-100 py-5'>
          <Text className='text-center text-2xl font-extrabold'>
            Tasting Booking Enquiry
          </Text>
          <Text className='text-center text-lg'>
            You have received a new booking enquiry for a tasting experience
          </Text>
          <Section className='mt-5 bg-white p-5'>
            <Text className='text-xl font-bold'>Booking Details</Text>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            <Text>
              <strong>Guests:</strong> {guests}
            </Text>
            <Text>
              <strong>Experience:</strong> {experience}
            </Text>
            <Text>
              <strong>Price:</strong> {price}
            </Text>
            <Text>
              <strong>Date:</strong> {date}
            </Text>
            {extras && (
              <Text>
                <strong>Extras:</strong> {extras}
              </Text>
            )}
          </Section>
          <Link href='https://lifeisgrape.co.za/products' className='w-fit mx-auto'>
            <Button className='mt-5 bg-slate-700 text-white font-semibold uppercase'>View Products</Button>
          </Link>
        </Container>
      </Html>
    </Tailwind>
  )
}
export default TastingBooking
