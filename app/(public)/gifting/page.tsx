import { fetchQuery } from 'convex/nextjs'
import GiftingContent from './_components/gifting-content'
import CustomWineLabels from './_components/custom-wine-labels'
import WhyChooseUs from './_components/why-choose-us'

const GiftingPage =  () => {



  return (
    <div>
      <GiftingContent />
      <CustomWineLabels />
      <WhyChooseUs />
    </div>
  )
}
export default GiftingPage
