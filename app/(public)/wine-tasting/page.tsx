import { Suspense } from 'react'
import TastingEventDescription from './_components/tasting-event-description'
import WineTastingHeader from './_components/wine-tasting-header'
import ExperienceOptions from './_components/experience-options'

const WineTastingPage = () => {
  return (
    <div>
      <WineTastingHeader />
      <section className='container mx-auto mt-12'>
        <ExperienceOptions />
      </section>
    </div>
  )
}
export default WineTastingPage
