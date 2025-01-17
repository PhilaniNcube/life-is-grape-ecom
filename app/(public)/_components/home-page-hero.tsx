import { littlepot } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const HomePageHero = () => {
  return (
    <section className='relative flex h-[80vh] overflow-hidden lg:h-[75vh]'>
      <div className='mx-auto grid container lg:grid-cols-3'>
        <div className='relative z-10 flex flex-col justify-center col-span-1'>
          <h1
            className={cn(
              'mb-4 text-5xl font-bold lowercase text-slate-700 sm:text-4xl lg:text-6xl',
              littlepot.className
            )}
          >
            We Make
            <br />
            grape descisions
          </h1>
          <p className='mb-8 max-w-[44ch] text-sm'>
            Discover a wide range of fine wines and spirits tailored to develop
            and satisfy every palate.
          </p>
          <Link href='/products'>
            <Button
              size='lg'
              className='transform rounded-none bg-gray-700 px-8 py-3 text-lg text-white transition duration-300 ease-in-out hover:bg-slate-800 lg:min-w-[300px]'
            >
              Shop Now
            </Button>
          </Link>
        </div>{' '}
        <Image
          src='https://quiet-caterpillar-834.convex.cloud/api/storage/fab54c25-b425-4a60-b930-9fbe5c41a8c3'
          alt='Elegant wine glass in a vineyard setting'
          width={1920}
          height={1400}
          className='h-full w-full object-cover object-right hidden lg:flex lg:col-span-2'
          priority
        />
      </div>

      <div className='absolute inset-0 bg-white/40 lg:bg-transparent' />
    </section>
  )
}
export default HomePageHero
