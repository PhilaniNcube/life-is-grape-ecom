import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";

const ExperienceOptions = async () => {

  const experiences = await fetchQuery(api.tasting_experiences.getTastingExperiences)



  return (
    <div>
      <h2 className='mb-6 text-2xl font-bold text-gray-900'>
        Book A Tasting Experience
      </h2>
      <div className='grid gap-y-4'>
        {experiences.map(experience => (
          <Card key={experience._id}>
            <CardHeader>
              <CardTitle>{experience.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>{experience.description}</p>
              <p className='text-sm mt-2'>
                <strong>Duration:</strong> {experience.duration} hours
              </p>
              <p className='text-sm mt-2'>
                <strong>Includes:</strong> {experience.servings}
              </p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <span className='text-sm text-gray-500'>
                {formatPrice(experience.price)} per person
              </span>
              <Button className='rounded-none'>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
};
export default ExperienceOptions;
