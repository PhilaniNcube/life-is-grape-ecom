import { Suspense } from 'react'
import TastingEventDescription from './_components/tasting-event-description'
import WineTastingHeader from './_components/wine-tasting-header'
import ExperienceOptions from './_components/experience-options'

const WineTastingPage = () => {
  return (
    <div>
      <WineTastingHeader />
      <section className='container mx-auto mt-12 grid gap-10 lg:grid-cols-2'>
        <TastingEventDescription />
        <Suspense
          fallback={
            <div className='w-full'>
              <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                Book A Tasting Experience
              </h2>
              <p>Loading...</p>
            </div>
          }
        >
          <ExperienceOptions />
        </Suspense>
      </section>
    </div>
  )
}
export default WineTastingPage
