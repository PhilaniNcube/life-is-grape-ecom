import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { cn, formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import BookingDialog from './booking-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { littlepot } from '@/app/fonts'

const ExperienceOptions = async () => {
  const experiences = await fetchQuery(
    api.tasting_experiences.getTastingExperiences
  )

  return (
    <div id='experiences' className='mb-10'>
      <h2
        className={cn(
          'mb-6 text-center text-2xl font-bold text-gray-900',
          littlepot.className
        )}
      >
        Book A Tasting Experience
      </h2>
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='grid w-full gap-3 md:grid-cols-2'>
          {experiences.map(experience => (
            <Card key={experience._id} className=''>
              <CardHeader>
                <CardTitle>
                  {experience.servings} @{formatPrice(experience.price)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>{experience.description}</p>
                <p className='mt-2 text-sm'>
                  <strong>Duration:</strong> {experience.duration} hours
                </p>
              </CardContent>
              <CardFooter className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>
                  {formatPrice(experience.price)} per person
                </span>
                <BookingDialog
                  servings={experience.servings}
                  price={experience.price}
                  type={experience.type}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ExperienceOptions
