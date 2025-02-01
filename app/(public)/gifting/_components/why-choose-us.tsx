import { GiftIcon, GrapeIcon, PaintbrushIcon, TicketIcon } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className='container mx-auto space-y-12 px-4 py-8'>
      {/* Why Choose Us Section */}
      <section className='rounded-lg bg-secondary p-8'>
        <h2 className='mb-6 text-center text-2xl font-bold'>
          Why Choose Life is Grape?
        </h2>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='flex items-start space-x-4'>
            <GiftIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Effortlessly Thoughtful</h3>
              <p>Wine is a timeless and universally appreciated gift.</p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <GrapeIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Personalization Perfection</h3>
              <p>
                Customized labels and hand-painted boxes make it truly special.
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <PaintbrushIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Unforgettable Impressions</h3>
              <p>Elevate your corporate gifting and leave a lasting mark.</p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <TicketIcon className='h-6 w-6 flex-shrink-0 text-primary' />
            <div>
              <h3 className='font-semibold'>Stress-Free Gifting</h3>
              <p>
                Gift vouchers take the guesswork out of finding the perfect
                wine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};
export default WhyChooseUs;
