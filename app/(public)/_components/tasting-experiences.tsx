'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Clock, Users } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'

export default function TastingExperiences() {
  const tastingExperiences = useQuery(
    api.tasting_experiences.getTastingExperiences
  )

  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-6 text-center text-3xl font-bold'>
        Tasting Experiences
      </h1>
      <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {tastingExperiences?.map((experience, index) => (
          <Card key={index} className='flex flex-col overflow-hidden'>
            <div className='relative h-48'>
              <Image
                src={experience.image}
                alt={experience.name}
                layout='fill'
                objectFit='cover'
              />
            </div>
            <CardHeader>
              <CardTitle className='text-md'>{experience.name}</CardTitle>
              <CardDescription className='flex items-center justify-between gap-4'>
                <span className='flex items-center gap-1 text-xs'>
                  {experience.servings} servings
                </span>
                <span className='flex items-center gap-1 text-xs'>
                  <Clock className='h-4 w-4' />
                  {experience.duration} min
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              <p className='text-sm text-muted-foreground'>
                {experience.description}
              </p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>R{experience.price}</span>
              <Link href={`/tasting-experiences/${experience._id}`}>
                <Button>Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
