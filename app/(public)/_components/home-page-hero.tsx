import { littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const HomePageHero = () => {
  return (
    <section className='relative flex h-[80vh] items-center justify-center overflow-hidden lg:h-[75vh]'>
      <Image
        src='https://quiet-caterpillar-834.convex.cloud/api/storage/fab54c25-b425-4a60-b930-9fbe5c41a8c3'
        alt='Elegant wine glass in a vineyard setting'
        width={1920}
        height={1400}
        className='absolute inset-0 h-full w-full object-cover'
        priority
      />
      <div className='absolute inset-0 bg-white/40 lg:bg-transparent' />
      <div className='container relative z-10 px-4 sm:px-6 lg:px-8'>
        <h1
          className={cn(
            'mb-4 w-[20ch] text-5xl font-bold lowercase text-slate-700 sm:text-4xl lg:text-6xl'
          , littlepot.className)}
        >
          We Make
          <br />
          grape descisions
        </h1>
        <p className='mb-8 max-w-[23ch] text-sm'>
          Discover a wide range of fine wines and spirits tailored to develop
          and satisfy every palate.
        </p>
        <Link href='/products'>
          <Button
            size='lg'
            className='transform rounded-none px-8 py-3 text-lg text-white bg-gray-700 transition duration-300 ease-in-out hover:bg-slate-800 lg:min-w-[300px]'
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
export default HomePageHero
