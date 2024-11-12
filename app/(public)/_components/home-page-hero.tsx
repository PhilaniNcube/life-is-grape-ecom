import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePageHero = () => {
  return (
    <section className='relative flex h-[80vh] items-center justify-center overflow-hidden lg:h-[75vh]'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/c42d1e73-5c2e-426c-8937-9e10fc9efe37'
        alt='Elegant wine glass in a vineyard setting'
        width={1920}
        height={1400}
        className='absolute inset-0 h-full w-full object-cover'
        priority
      />
      <div className='absolute inset-0 bg-white lg:bg-transparent' />
      <div className='container relative z-10 px-4 sm:px-6 lg:px-8'>
        <h1 className='mb-4 w-[20ch] text-2xl font-bold text-black sm:text-4xl lg:text-6xl'>
          Explore Our Diverse Collection of{' '}
          <span className='font-extrabold text-purple-900'>Wines</span> and{' '}
          <span className="text-red-700">Spirits</span>
        </h1>
        <p className='mb-8 max-w-[30ch] text-lg sm:text-xl'>
          Discover a wide range of fine wines and spirits tailored to develop
          and satisfy every palate.
        </p>
        <Button
          size='lg'
          className='transform rounded-full px-8 py-3 text-lg text-white transition duration-300 ease-in-out hover:bg-slate-800 lg:min-w-[300px]'
        >
          Shop Now
        </Button>
      </div>
    </section>
  )
};
export default HomePageHero;
