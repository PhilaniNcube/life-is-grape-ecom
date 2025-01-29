import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'

const ExperiencePage = async (props: {
  params: Promise<{ id: Id<'tasting_experiences'> }>
}) => {
  const { id } = await props.params

  const experience = await fetchQuery(
    api.tasting_experiences.getTastingExperience,
    { tasting_experience_id: id }
  )

  return (
    <div>
      <h1 className='text-lg font-semibold'>{experience.name}</h1>
      <p>{formatPrice(experience.price)}</p>
      <Separator />
      <p>
        <strong>Description:</strong> {experience.description}
      </p>
      <p>
        <strong>Serving:</strong> {experience.servings}
      </p>
      <p>
        <strong>Duration:</strong> {experience.duration}
      </p>
    </div>
  )
}
export default ExperiencePage
