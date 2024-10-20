import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Clock, Users, WineIcon } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import Image from 'next/image'
import BookingConditions from './booking-conditions'
import BookingForm from './booking-form'

const ExperienceDetail = async ({ id }: { id: Id<'tasting_experiences'> }) => {
  const experience = await fetchQuery(
    api.tasting_experiences.getTastingExperience,
    { tasting_experience_id: id }
  )

  console.log(experience)

  if (!experience) {
    return <div>Experience not found</div>
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-red-100 py-12'>
      <div className='container mx-auto px-4'>
        <Card className='overflow-hidden'>
          <div className='md:flex'>
            <div className='md:w-1/2'>
              <Image
                src={experience.image}
                alt={experience.name}
                width={600}
                height={400}
                className='h-64 w-full object-cover md:h-full'
              />
            </div>
            <div className='p-6 md:w-1/2 md:p-8'>
              <CardHeader>
                <CardTitle className='text-3xl font-bold text-gray-900'>
                  {experience.name}
                </CardTitle>
                <CardDescription className='text-lg text-gray-600'>
                  Discover the flavors of South Africa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='mb-6 text-gray-700'>{experience.description}</p>
                <div className='mb-6 grid grid-cols-2 gap-4'>
                  <div className='flex items-center'>
                    <WineIcon className='mr-2 h-5 w-5 text-red-600' />
                    <span className='text-gray-700'>
                      {experience.servings} wines
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Clock className='mr-2 h-5 w-5 text-red-600' />
                    <span className='text-gray-700'>
                      {experience.duration} minutes
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Users className='mr-2 h-5 w-5 text-red-600' />
                    <span className='text-gray-700'>2-8 people</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-2xl font-bold text-red-600'>
                      R{experience.price}
                    </span>
                    <span className='ml-1 text-gray-600'>per person</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>

              </CardFooter>
            </div>
          </div>
        </Card>
        <div className='flex flex-col md:flex-row-reverse justify-between mt-8 gap-6 lg:gap-10'>
          <BookingConditions />
          <BookingForm id={experience._id} />
        </div>
      </div>
    </div>
  )
}
export default ExperienceDetail
