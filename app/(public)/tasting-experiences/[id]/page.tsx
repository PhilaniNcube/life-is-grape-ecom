import { Id } from '@/convex/_generated/dataModel'
import ExperienceDetail from '../_components/experience-detail'


const ExperiencePage = async (
  props: {
    params: Promise<{ id: Id<'tasting_experiences'> }>
  }
) => {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div>
      <ExperienceDetail id={id} />

    </div>
  )
}
export default ExperiencePage
