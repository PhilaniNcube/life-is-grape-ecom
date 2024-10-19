import { Id } from '@/convex/_generated/dataModel'
import ExperienceDetail from '../_components/experience-detail'

const ExperiencePage = ({
  params: { id },
}: {
  params: { id: Id<'tasting_experiences'> }
}) => {
  return (
    <div>
      <ExperienceDetail id={id} />
    </div>
  )
}
export default ExperiencePage
