import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePageHero = () => {
  return (
    <section className='relative flex h-[50vh] items-center justify-center overflow-hidden lg:h-[60vh]'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/16e92e8e-7dea-446b-b756-ab38a5ee1774'
        alt='Elegant wine glass in a vineyard setting'
        width={1920}
        height={1080}
        className='absolute inset-0 h-full w-full object-cover'
        priority
      />
      <div className='absolute inset-0 bg-black bg-opacity-50' />
      <div className='relative z-10 px-4 text-center sm:px-6 lg:px-8'>
        <h1 className='mb-4 text-2xl font-bold text-white sm:text-4xl lg:text-6xl'>
          Discover the Art of Wine Tasting
        </h1>
        <p className='mx-auto mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl'>
          Embark on a sensory journey through the South Africa&apos;s finest
          vineyards.
        </p>
        <Button className='transform rounded-full bg-red-700 px-8 py-3 text-lg text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800'>
          Book Your Experience
        </Button>
      </div>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 transform'>
        <svg
          className='h-6 w-6 animate-bounce text-white'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
        </svg>
      </div>
    </section>
  )
};
export default HomePageHero;
