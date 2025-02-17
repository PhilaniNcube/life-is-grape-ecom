import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import UpdateTastingExperienceForm from '../_components/UpdateTastingExperienceForm'

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
       <UpdateTastingExperienceForm experience={experience} />
    </div>
  )
}
export default ExperiencePage
