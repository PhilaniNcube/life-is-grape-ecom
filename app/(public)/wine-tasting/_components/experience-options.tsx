import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import BookingDialog from "./booking-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";


const ExperienceOptions = async () => {

  const experiences = await fetchQuery(api.tasting_experiences.getTastingExperiences)




  return (
    <div id='experiences'>
      <h2 className='mb-6 text-2xl font-bold text-gray-900'>
        Book A Tasting Experience
      </h2>
      <ScrollArea className='grid h-[700px] gap-y-4'>
        {experiences.map(experience => (
          <Card key={experience._id} className='mb-4'>
            <CardHeader>
              <CardTitle>{experience.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>{experience.description}</p>
              <p className='mt-2 text-sm'>
                <strong>Duration:</strong> {experience.duration} hours
              </p>
              <p className='mt-2 text-sm'>
                <strong>Includes:</strong> {experience.servings}
              </p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <span className='text-sm text-gray-500'>
                {formatPrice(experience.price)} per person
              </span>
              <BookingDialog id={experience._id} />
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
};
export default ExperienceOptions;
